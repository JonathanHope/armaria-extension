#!/usr/bin/env bash

# We want to keep the tag version in sync with the versions in the code.
# This script pushes up a tag that matches the version in the code.

set -e

package_version=`cat package.json | jq '.version'`
version="${package_version:1:${#package_version}-2}"
version="v${version}"

git tag $version
git push origin $version
