#!/bin/bash
if [ ! -d "." ] || [ "$(basename "$PWD")" != "nra-client" ]; then
  echo "Script must be run from within nra-client directory"
  exit 1
fi
echo "Running in nra-client directory"

current_version=$(grep -r "?v=" "." | grep -o 'v=[0-9]\+\.[0-9]\+\.[0-9]\+' | head -n1)
if [ -z "$current_version" ]; then
  echo "No version found in files"
else
  echo "Current version: ${current_version#v=}"
fi

read -p "Enter new version (x.x.x format): " new_version
if ! [[ $new_version =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "Invalid version format. Use x.x.x"
  exit 1
fi

find "." -type f \( -name "*.html" -o -name "*.js" -o -name "*.css" \) | while read file; do
  sed -i "s/\([^?]\+\)?v=[0-9]\+\.[0-9]\+\.[0-9]\+/\1?v=$new_version/g" "$file"
  sed -i "s/href=\"\([^\"]*\.\(html\|css\)\)\"/href=\"\1?v=$new_version\"/g" "$file"
  sed -i "s/src=\"\([^\"]*\.js\)\"/src=\"\1?v=$new_version\"/g" "$file"
  sed -i "s/window\.location\.href = \"\([^\"]*\.html\)\"/window.location.href = \"\1?v=$new_version\"/g" "$file"
done
echo "Updated to version $new_version"
