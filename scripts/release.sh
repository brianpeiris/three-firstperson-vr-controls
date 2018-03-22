npm install && 
NODE_ENV=production npm run build && 

cd demo && 
npm install &&
NODE_ENV=production npm run build &&
cd .. &&

echo "" &&
echo "Build complete. Do some testing." &&
echo "" &&

trap '' INT
serve &
wait %1

git commit -am 'update builds' &&
git push &&
np
