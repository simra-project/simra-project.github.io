#!/bin/bash

# Returns current date
getDate() {
  date +%F
}

# Check for uncommitted changes in the repo
checkForUncommitedChanges() {
  echo "checking for uncommited changes..." >&2

  # Checks the output of git diff to determine if there's any uncommitted change
  if (git diff --exit-code &>/dev/null && git diff --cached --exit-code &> /dev/null); then
    echo "no uncommited changes found" >&2
    echo 0
  else
    echo "uncommited changes found" >&2
    echo 1
  fi
}

# Generate a new commit message for now
generateCommitMsg() {
  echo "Add dashboard `getDate`"
}

# Do commit if there are uncommited changes
UNCOMMITTED_CHANGES=`checkForUncommitedChanges`

if [ 1 -eq "$UNCOMMITTED_CHANGES" ]; then
  # Generate commit message
  GIT_COMMIT_MSG=`generateCommitMsg`
  # Commit the uncommitted code
  git commit -a -m "$GIT_COMMIT_MSG"
fi

# Pull in latest changes without merge commit
git pull ssh master --rebase

# Push commit to master
git push ssh master
