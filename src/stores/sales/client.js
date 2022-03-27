import { defineStore } from 'pinia';
import {
  createClientService,
  extractRelationships,
  formatIncludedData,
  responseToMapReducer
} from '@/services/huitzilopochtli';
import { useAuthStore } from '@/stores/authentication';

const bearerToken = useAuthStore().bearerToken;
const clientService = createClientService(bearerToken);

export const useSalesClientStore = defineStore({
  id: 'huitzilopochtli-client',

  state: () => ({
    clientList: {},
    clientIncludedData: {},
    selectedClient: null,
  }),

  getters: {
    clients: (state) => Object.values(state.clientList),
    clientsFixed: (state) => Object.values(state.clientList).map((c) => ({ ...c, id: parseInt(c.id, 10) })),
    clientWithRelationships: (state) => {
      if (state.selectedClient) {
        const contacts = state.selectedClient.contacts.map(
          contactId => state.clientIncludedData['contacts'][contactId]
        );

        return { ...state.selectedClient, contacts }
      }

      return null;
    }
  },

  actions: {
    async fetchClientList(pagination = null) {
      const { data } = await clientService.fetchClientList(pagination);
      this.$patch((state) => {
        state.clientList = responseToMapReducer(data.data);
        state.clientIncludedData = formatIncludedData(data.included);
      });
    },

    async fetchOneClient(client_id) {
      if (this.clientList[client_id]) {
        this.$patch((state) => state.selectedClient = this.clientList[client_id]);
        return;
      }

      const { data } = await clientService.fetchClient(client_id);
      this.$patch((state) => {
        state.selectedClient = {
          id: data.data.id,
          ...data.data.attributes,
          ...extractRelationships(data.data.relationships)
        };
        state.clientIncludedData = formatIncludedData(data.included);
      });
    },

    async createClient({ name, legal_document_code }) {
      const { data } = await clientService.createClient({ name, legal_document_code });
      this.$patch((state) => state.clientList[data.data.id] = data.data);
      return data.data.id;
    },

    async createClientContact(client_id, contact) {
      await clientService.createClientContact(client_id, contact);
    },

    async updateClient({ id, name, legal_document_code }) {
      const updatedClient = { id, name, legal_document_code };
      await clientService.updateClient(updatedClient);
      this.$patch((state) => state.clientList[id] = updatedClient);
      return id;
    },

    async updateClientContact(client_id, { id, ...contact }) {
      await clientService.createClientContact(client_id, { id, ...contact });
      this.$patch((state) => state.clientIncludedData['contacts'][id] = contact);
    },

    async deleteClient(client_id) {
      await clientService.deleteClient(client_id);
      this.$patch((state) => delete state.clientList[client_id]);
    },

    async deleteClientContact(client_id, contact_id) {
      await clientService.deleteClientContact(client_id, contact_id);
      this.$patch((state) => delete state.clientIncludedData['contacts'][contact_id]);
    }
  },
});
