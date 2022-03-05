import { ElNotification } from 'element-plus';
import MessageService from './message';

export default {
  notifySuccess: (textMessage, title = 'Success') => {
    const notification = MessageService.createSuccess(textMessage, title);
    ElNotification(notification);
  },

  notifyWarning: (textMessage, title = 'Warning') => {
    const notification = MessageService.createWarning(textMessage, title);
    ElNotification(notification);
  },

  notifyError: (textMessage, title = 'Error') => {
    const notification = MessageService.createError(textMessage, title);
    ElNotification(notification);
  },
};
