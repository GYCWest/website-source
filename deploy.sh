#!/bin/bash

echo -e "\033[0;32mDeploying updates...\033[0m"

# Build the project.
hugo

cd ../frontend.live

# Add changes to git.
git add -Af

# Commit changes.
msg="Rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin master
#git subtree push --prefix=public git@github.com:revivaltoolkit/revivaltoolkit.github.io.git master
