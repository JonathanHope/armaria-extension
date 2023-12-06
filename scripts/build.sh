#!/usr/bin/env bash

set -e

package_version=`cat package.json | jq '.version'`
version="${package_version:1:${#package_version}-2}"

npx parcel build src/actions/add-book/add-book.html --dist-dir dist/$1
npx parcel build src/background-scripts/native-messaging.ts --dist-dir dist/$1
cp manifest.$1.json dist/$1/manifest.json
cp -r art/* dist/$1
cd dist/$1
zip -r -j armaria_$1_$version.zip *
