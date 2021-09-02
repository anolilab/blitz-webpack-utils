export const topLevelFoldersThatMayContainFiles = ["src", "app", "integrations"];

export function isFileTypeOf(filePathFromAppRoot: string, type: string) {
    const pattern1 = "/[\\/]";
    const pattern2 = "[\\/]/";

    return new RegExp(pattern1 + type + pattern2).test(filePathFromAppRoot);
}

export function buildExtensionRegex(pageExtensions: string[]) {
    return new RegExp(`(?<!\\.test|\\.spec)\\.(?:${pageExtensions.join("|")})$`);
}
