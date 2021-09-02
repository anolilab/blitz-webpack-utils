import { buildExtensionRegex } from "./build/utils";
import { Options, recursiveFindFilesOfType } from "./recursive-readdir";

function collect(
    typeOf: string,
    directory: string,
    options: Partial<Options & { extensions: string[] }> = {},
): Promise<string[]> {
    const config = {
        extensions: ["js", "mjs", "cjs", "ts"],
        ...options,
    } as Options & { extensions: string[] };

    return recursiveFindFilesOfType(directory, buildExtensionRegex(config.extensions), typeOf, config);
}

export default collect;
