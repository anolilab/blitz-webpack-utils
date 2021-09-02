export const topLevelFoldersThatMayContainFiles = ["src", "app", "integrations"];

export function isFileTypeOf(filePathFromAppRoot: string, type: string) {
    const pattern = "[\\\\/]";

    return new RegExp(pattern + type + pattern).test(filePathFromAppRoot);
}

export function buildExtensionRegex(pageExtensions: string[]) {
    return new RegExp(`(?<!\\.test|\\.spec)\\.(?:${pageExtensions.join("|")})$`);
}
