module.exports = {
    root: true,
    extends: ["@anolilab/eslint-config"],
    parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
    },
    env: {
        // Your environments (which contains several predefined global variables)
        //
        // browser: true,
        node: true,
        commonjs: true,
        es6: true,
        // mocha: true,
        jest: true,
        // jquery: true
    },
    globals: {
        // Your global variables (setting to false means it's not allowed to be reassigned)
        //
        // myGlobal: false
    },
    rules: {
        // Customize your rules
    }
};
