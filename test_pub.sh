#将hhos_aigc_h5_package和项目放在一个目录里即可
yarn build--test
cd ../hhos_aigc_h5_package
git pull
rm -rf static
rm index.html
rm favicon.ico

cd -
cp -r dist/* ../hhos_aigc_h5_package/
cd -
git add .
git commit -m 'update'
git push
cd -
