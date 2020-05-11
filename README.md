# ayup

Module and CLI for listing test files relevant to the changes made in the last commit of a git branch in a repository.

Built with the purpose of slimming down the number of tests run in CI. This is done by limiting scope to the tests related to files that actually changed in the last commit, plus any files that import said change files (e.g. parent modules).

## Usage

### CLI Usage

```console
Usage:
        [yarn] ayup [flags]

Flags:
        -d,     --directory             The path of the git repository to analyse.
        -b,     --branch                The branch of the git repository to analyse.
```

When used as a CLI, the relevant test files are outputted to stdout separated by newlines. For example

```console
$ ayup
path/to/test/file1
path/to/test/file2
```

To get the relevant test files for the current working directory and branch run:

```console
ayup
```

To get the relevant test files for the `develop` branch of the local repo located at `/path/to/repo/` run:

```console
ayup -d "/path/to/repo/" -b "develop"
```

This can be used in conjunction with testing frameworks, such as jest, in shell scripts like so:

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

### Module Usage

`ayup` can also be used as an imported module.

To get the relevant test files for the current working directory and branch run:

```js
import ayup from "ayup";

const testFiles = ayup();

console.log(testFiles);
```

To get the relevant test files for the `develop` branch of the local repo located at `/path/to/repo/` run:

```js
import ayup from "ayup";

const testFiles = ayup({ d: "/path/to/repo/", b "develop" });

console.log(testFiles);
```

#### Options

| Parameter   | Description                                  |
| ----------- | -------------------------------------------- |
| `directory` | The path of the git repository to analyse.   |
| `d`         | Short form of the `directory` parameter.     |
| `branch`    | The branch of the git repository to analyse. |
| `b`         | Short form of the `branch` parameter.        |

## Developing

### Install

```console
yarn install --frozen-lockfile
```

### Build

```console
yarn build
```

To continuously build while developing by watching changed files use:

```console
yarn dev
```

### Lint

```console
yarn lint
```

### Test

#### Unit Tests

```console
yarn test:unit
```

#### Integration Tests

```console
yarn test:int
```

Note that these tests rely on the existence of the built assets.

## Contributing

Please check out the [CONTRIBUTING](./docs/CONTRIBUTING.md) docs.

## Changelog

Please check out the [CHANGELOG](./docs/CHANGELOG.md) docs.
