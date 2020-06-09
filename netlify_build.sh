# build web version
npx webpack --progress -p
# make a public directory
mkdir -p public
# move js into public folder
cp -r dist public
# move index.html to public
cp index.html public