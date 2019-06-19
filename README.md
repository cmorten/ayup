# ayup

CLI / module for listing the test files relevant to the changes in the last commit of a branch in a provided repository.

Built with the purpose of slimming down the number of tests run in CI agents by limiting to the tests relevant to the files that actually changed in the last commit, plus any files that import said change files (e.g. parent modules).

## Setup

This is a Node project which uses `yarn` for is dependency management. To install dependencies run:

```console
yarn
```

System prerequisites:

- Node
- Npm
- Yarn

## Usage

```console
Usage:
        [yarn] ayup [flags]

Flags:
        -d,     --directory             The absolute path of the git repository to watch.
        -b,     --branch                The branch of the git repository to watch.
```

## Examples

To get relevant test files for the `develop` branch of the local repo located at `/path/to/repo/` run:

```console
yarn ayup -d "/path/to/repo/" -b "develop"
```

This can be used in conjunction with testing frameworks such as jest like so:

```bash
#!/bin/bash

echo "Here is the file diff:"
echo -e "$(git diff --name-only HEAD HEAD~1)\n"

files=$(ayup -d ./ -b develop)

echo "Here are the relevant test files:"
echo -e "${files}\n"

if [ ! -z "${files}" ]; then
  jest test ${files}
else
  echo "No relevant test files found!"
fi
```
