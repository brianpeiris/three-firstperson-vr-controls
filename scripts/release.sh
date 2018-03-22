npm install && 
npm run build -- --mode=production && 

cd demo && 
npm install &&
npm run build -- --mode=production &&
cd .. &&

echo "" &&
echo "Build complete. Do some testing. Ctrl-C when you're done." &&
echo "" &&

trap '' INT
serve

echo "Press enter to release or Ctrl-C to abort."
read _

git commit -am 'update builds' ||
git push &&
np
