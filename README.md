# LCARS

An LCARS-inspired high-contrast dark color theme for Visual Studio Code.

The root `COLOR-ACCESSIBILITY.md` file records the approved palette, its theme
roles, and the accessibility rationale for each assignment.

## Development

Open this folder in VS Code and press `F5` to launch an Extension Development
Host. In that window, use **Preferences: Color Theme** and select **LCARS**.

The generated `.vscode/launch.json` starts the theme with the same
Extension Host development-path pattern used by Deckard:

```text
--extensionDevelopmentPath=${workspaceFolder}
```

## Packaging

Package the extension with:

```sh
npm ci
npm run package:vsix
```

Install the resulting VSIX through **Extensions: Install from VSIX...**.

Pull requests and pushes to `master` are validated and packaged by GitHub
Actions. A push to `master` creates a GitHub Release and attaches the VSIX
when the version in `package.json` has not been released before.
