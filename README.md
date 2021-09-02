# Webpack utils for BlitzJs

---

<div align="center">
    <p>
        <sup>
            Daniel Bannert's open source work is supported by the community on <a href="https://github.com/sponsors/prisis">GitHub Sponsors</a>
        </sup>
    </p>
</div>

---

## Install

```bash
npm install --dev-save @anolilab/blitz-webpack-utils

or

yarn add --dev @anolilab/blitz-webpack-utils
```

## Usage

These helpers can be used to find specific files in all blitz `['src', 'app', 'integrations']` folders.

This example will find all files in the sub-folder `commands` and add it to the build process.

```typescript
import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from "blitz";
import { collect } from "@anolilab/blitz-webpack-utils";

const config: BlitzConfig = {
    middleware: [
        sessionMiddleware({
            cookiePrefix: "blitz",
            isAuthorized: simpleRolesIsAuthorized,
        }),
    ],
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        if (isServer) {
            return {
                ...config,
                entry() {
                    return config.entry().then(async (entry) => {
                        const allCommands = await collect("commands", __dirname);
                        const commands: { [key: string]: string } = {};

                        allCommands.forEach((commandPath) => {
                            commands[commandPath.replace(/\.[^./]+$/, "").slice(1)] = `.${commandPath}`;
                        });

                        return {
                            ...entry,
                            ...commands,
                        };
                    });
                },
            };
        }

        return config;
    },
};
module.exports = config;
```

## Supported Node.js Versions

Libraries in this ecosystem make the best effort to track
[Node.js' release schedule](https://nodejs.org/en/about/releases/). Here's [a
post on why we think this is important](https://medium.com/the-node-js-collection/maintainers-should-consider-following-node-js-release-schedule-ab08ed4de71a).

## Contributing

If you would like to help take a look at the [list of issues](https://github.com/anolilab/blitz-webpack-utils/issues) and check our [Contributing](.github/CONTRIBUTING.md) guild.

> **Note:** please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.

## Credits

-   [Daniel Bannert](https://github.com/prisis)
-   [All Contributors](https://github.com/anolilab/blitz-webpack-utils/graphs/contributors)

## License

The anolilab blitz-webpack-utils is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT)
