const CracoLessPlugin = require('craco-less');

module.exports = {
    // 远程访问映射取消host检查
    // devServer: {
    //     disableHostCheck: true
    // },
    babel: {   //用来支持装饰器
        plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]]
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#1DA57A' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
