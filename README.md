# README

Run local webserver with `python3 -m http.server`.
This DOES NOT convert *.md* files to *.html* files, but you can open the *.html* files that are already there.

It makes sense to add a deploy-key for simra.project.github.io, so that we can push without having to enter passwords etc.
Then add the ssh remote, e.g., via `git remote add ssh git@github.com:simra-project/simra-project.github.io.git`
Now, we can push with `git push ssh master` without enteriy a password.
There is script that does this: **./commit.sh**.
