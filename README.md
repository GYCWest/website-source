# GYC West Website Source

This is the source code to the GYC West website.

## Development

While you can edit using the online editor for simple changes, if you want to validate and check your changes locally we recommend installing the following tools:

- [Docker Desktop](docker.com)
- [VSCode](https://code.visualstudio.com/)

Once those are installed you'll need to clone this repository and then open the result in VSCode. It should prompt you to open in a Dev Container, and if not you can [do that manually](https://code.visualstudio.com/docs/devcontainers/containers#_quick-start-open-an-existing-folder-in-a-container).

Once open in the VSCode Dev Container, start a new terminal in VSCode and type the following command:

```sh
npm ci
```

Once that completes you should be able to run the application with the `F5` key or use the menu entry `Run > Start Debugging`. This will launch a local server and load the page in a new Chrome window for quick feedback every time you save a changed file.
