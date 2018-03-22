npm install && 
npm run build && 

cd demo && 
npm install &&
npm run build &&
cd .. &&

echo "" &&
echo "Build complete. Do some testing." &&
echo "" &&

serve &
wait %1

git commit -am 'update builds' &&
git push &&
np
