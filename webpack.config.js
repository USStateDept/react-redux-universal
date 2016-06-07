var path = require('path');
var webpack = require('webpack');
var merge = require('merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var webpackConfig = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
};

if (process.env.NODE_ENV === 'production') {

  webpackConfig = merge(webpackConfig,{
    devtool: "cheap-module-source-map",
    entry : [
      './app/client/index.js'
    ],
    module: {
      loaders: [
        { test: /\.js$/, include: __dirname + '/src', loader: 'babel'},
        { test: /\.(png|jpg|gif|jpeg)$/, include: __dirname + '/src', loader: 'url-loader?limit=8192'},
        { test: /\.css$/, include: __dirname + '/src', loader: ExtractTextPlugin.extract('style', 'css') },
        { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader : 'file-loader'}
      ]
    },
    plugins : [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new ExtractTextPlugin('app.css'),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { discardComments: {removeAll: true } },
        canPrint: true
      })
    ]  
  });

}else{

  webpackConfig = merge(webpackConfig,{
    devtool: 'inline-source-map',
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/,
          include: __dirname + '/app',
          query: {
            optional: ['runtime'],
            stage: 2,
            env: {
              development: {
                plugins: [
                  'react-transform'
                ],
                extra: {
                  'react-transform': {
                    transforms: [{
                      transform:  'react-transform-hmr',
                      imports: ['react'],
                      locals:  ['module']
                    },
                    {
                      transform: 'react-transform-catch-errors',
                      imports: ['react','redbox-react' ]
                    }
                ]}
                }
              }
            }
          }
        },
        { test: /\.(png|jpg|gif|jpeg)$/, loader: 'url-loader?limit=8192'},
        { test: /\.css$/, loader: 'style-loader!css-loader' },
        { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader : 'file-loader'}
      ]
    },
    entry : [
      'webpack-hot-middleware/client',
      './src/client/index.js'
    ],
    plugins : [
      new webpack.HotModuleReplacementPlugin()
    ]  
  });
  
}

module.exports = webpackConfig;