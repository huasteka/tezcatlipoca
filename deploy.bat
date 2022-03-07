:: build
npm run build || exit /b

:: navigate into the build output directory
cd dist

git init
git checkout -b main
git add -A
git commit -m 'Application deployment is ready'

git push -f git@github.com:huasteka/tezcatlipoca.git main:gh-pages

cd ..
