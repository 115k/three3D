const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: "./",
  productionSourceMap: process.env.VUE_APP_ENV !== "production", // 生产环境是否生成 sourceMap 文件
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项
  chainWebpack: (config) => {
    // 移除 prefetch 插件
    config.plugins.delete("prefetch");
    config.resolve.symlinks(true); // 修复热更新失效
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@components", resolve("src/components"))
      .set("@assets", resolve("src/assets"))
      .set("@static", resolve("public/static"))
      .end();
  },
  pluginOptions: {
    // 第三方插件配置
    // ...
  },
};
