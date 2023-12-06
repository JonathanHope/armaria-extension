#!/usr/bin/env bash

# There are a bunch of different versions in the source tree.
# We want all of them to remain the same so we implement a check with this file.

set -e

package_version=`cat package.json | jq '.version'`
firefox_manifest_version=`cat manifest.firefox.json | jq '.version'`
chrome_manifest_version=`cat manifest.chrome.json | jq '.version'`

if [ $package_version != $firefox_manifest_version ]; then
    echo "Package.json and Firefox manifest out of sync."
    exit 1
fi

if [ $package_version != $chrome_manifest_version ]; then
    echo "Package.json and Chrome manifest out of sync."
    exit 1
fi

echo "Versions are in sync"
