import { promises } from "fs";
import path from "path";

import { isFileTypeOf, topLevelFoldersThatMayContainFiles } from "./build/utils";

export type Options = {
    ignore: RegExp;
    array: string[];
    rootDir: string;
    topLevelFoldersThatMayContainFiles: string[];
};

/**
 * Recursively read directory
 * @param {string} directory Directory to read
 * @param {RegExp} filter Filter for the file name, only the name part is considered, not the full path
 * @param {string} typeOf
 * @param {object} options
 *        {RegExp} ignore
 *        {string=dir`} rootDir Used to replace the initial path,
 *                      only the relative path is left, it's faster than path.relative.
 *        {string[]=topLevelFoldersThatMayContainFiles} topLevelFoldersThatMayContainFiles
 * @param  {string[]=[]} recursion This doesn't have to be provided, it's used for the recursion
 * @returns Promise array holding all relative paths
 */
export async function recursiveFindFilesOfType(
    directory: string,
    filter: RegExp,
    typeOf: string,
    options: Partial<Options>,
    recursion: string[] = [],
): Promise<string[]> {
    const config = {
        rootDir: directory,
        topLevelFoldersThatMayContainFiles,
        ...options,
    } as Options;

    let folders = await promises.readdir(directory);

    if (directory === config.rootDir) {
        folders = folders.filter((folder) => config.topLevelFoldersThatMayContainFiles.includes(folder));
    }

    // eslint-disable-next-line compat/compat
    await Promise.all(
        folders.map(async (part: string) => {
            const absolutePath = path.join(directory, part);

            if (config.ignore && config.ignore.test(part)) {
                return;
            }

            const pathStat = await promises.stat(absolutePath);

            if (pathStat.isDirectory()) {
                await recursiveFindFilesOfType(absolutePath, filter, typeOf, config, recursion);

                return;
            }

            if (!filter.test(part)) {
                return;
            }

            const relativeFromRoot = absolutePath.replace(config.rootDir, "");

            if (isFileTypeOf(relativeFromRoot, typeOf)) {
                recursion.push(relativeFromRoot);
            }
        }),
    );

    return recursion.sort();
}
