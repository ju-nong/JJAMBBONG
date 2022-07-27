const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.join(__dirname, "src"),
                "@api": path.join(__dirname, "src/api"),
                "@assets": path.join(__dirname, "src/assets"),
                "@components": path.join(__dirname, "src/components"),
                "@pages": path.join(__dirname, "src/pages"),
                "@router": path.join(__dirname, "src/router"),
                "@store": path.join(__dirname, "src/store"),
            },
            extensions: [".js", ".vue", ".json"],
        },
    },
    // css: {
    //     loaderOptions: {
    //         sass: {
    //             additionalData: `
    //                 @import "~@/assets/scss/header.scss";
    //             `,
    //         },
    //     },
    // },
});
