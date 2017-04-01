#!/bin/bash

echo -e "\033[0;32mDeploying updates...\033[0m"

# Disallow unstaged changes in the working tree. Thank you to http://www.spinics.net/lists/git/msg142043.html
if ! git diff-files --quiet --ignore-submodules --; then
	echo >&2 "! Cannot deploy: you have unstaged changes."
	git diff-files --name-status -r --ignore-submodules -- >&2
	exit 1
fi

# Disallow uncommitted changes in the index. Again, thank you to http://www.spinics.net/lists/git/msg142043.html
if ! git diff-index --cached --quiet HEAD --ignore-submodules --; then
	echo >&2 "! Cannot deploy: your index contains uncommitted changes."
	git diff-index --cached --name-status -r --ignore-submodules HEAD -- >&2
	exit 1
fi

# Build the project.
hugo --destination ../frontend.live

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
