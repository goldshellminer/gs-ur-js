const path = require('path');

module.exports = {
    // 入口文件
    entry: './dist/index.js',

    // 输出配置
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    // 模块配置
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            // 其他规则...
        ],
    },

    // 插件配置
    plugins: [
        // 插件实例...
    ],

    // 开发服务器配置
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },

    // 模式
    mode: 'development', // 或 'production'
};
