npm install && 
npm run build && 

cd demo && 
npm install &&
npm run build &&
cd .. &&

echo "" &&
echo "Build complete. Do some testing." &&
echo "" &&

serve &&

git commit -am 'update builds' &&
git push
