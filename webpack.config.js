const Encore = require('@symfony/webpack-encore');
const webpack = require('webpack');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')

    .addPlugin(new webpack.ProvidePlugin({
      MiscEvent: [ require.resolve("./assets/javascript/misc/Event.js"), "default"],
      MiscAccessibility: [ require.resolve("./assets/javascript/misc/Accessibility.js"), "default"],
      Config: [ require.resolve("./assets/javascript/config/Config.js"), "default"],
      Debug: [ !Encore.isProduction() ?
        require.resolve("./assets/javascript/debug/Debug.js") :
        require.resolve("./assets/javascript/debug/NoDebug.js"),
        "default"
      ],
    }))

    .addEntry('app', [
      './assets/app.js'
    ])

    .enableSingleRuntimeChunk()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning()
    .cleanupOutputBeforeBuild()
    .enableSassLoader()
    .enableBabelTypeScriptPreset()
    .addRule({
      test: /\.(ts|js)?$/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-typescript"],
        },
      },
    })
;

module.exports = Encore.getWebpackConfig();
module.exports["resolve"]["symlinks"] = false;
//module.exports["resolve"]["extensions"] = ['.tsx', '.ts', '.js'];