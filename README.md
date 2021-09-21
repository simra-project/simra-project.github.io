# README

Run local webserver with `python3 -m http.server`.
This DOES NOT convert *.md* files to *.html* files, but you can open the *.html* files that are already there.

Hint: you might have to create `~/.ssh/config`, if ssh-agent keeps forgetting they key:
```
Host github.com
 HostName github.com
 IdentityFile ~/.ssh/simra_project_github_io
```

## Dashboard

The `dashboard/resources/dashboard.json` is created from the *data-parser* of the (simra-dashboard)[xxx] project.
The `dashboard/css/dashboard.css` and `dashboard/js/dashboard.js` are created from the *website* of the (simra-dashboard)[xxx] project.
All other files in the resources directory are created manually:
- `mapLinks.json`: links the region names from the dashboard.json to the given (map) url
- `regionNames.json`: links the region names from the dashboard.json to the region name text that should be shown to the end-user (created manually from Ahmet's *simRa_regions_coords_ID.config*)
- `tableMeta.json`: meta information for the table such as header names, tag-styles, etc.

It is possible to put a region at the top of the table on page load by supplying it as query parameter. E.g., `https://simra-project.github.io/dashboard?region=Nuernberg` or `https://simra-project.github.io/dashboard?region=Stuttgart`

## SimRa VM setup

To commit without having to enter a password, we need to [add a deploy-key](https://docs.github.com/en/developers/overview/managing-deploy-keys) for simra.project.github.io.
Test the ssh connection with `ssh -T git@github.com`.
Then add the ssh remote, e.g., via `git remote add ssh git@github.com:simra-project/simra-project.github.io.git`
Now, we can push with `git push ssh master` without entering a password.

There is script that does this: **./commit.sh**, it is used by some of the projects that have this project as a submodule.
