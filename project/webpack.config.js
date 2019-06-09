const path = require('path');

const isDevBuild = () => {
  return (process.env.NODE_ENV === 'development');
}

var config = {
    mode: isDevBuild ? 'development' : 'production',
    entry: {
    main :'./src/main.js'
    },
  
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/',
      filename: '[name].js' //
    //  filename: 'bundle.js'  //use it to quick debug front
    },
  
    resolve: {		//must add this into cnofig otherwise cannot use vue
      alias: {
        vue: 'vue/dist/vue.js'
      }
    },
    
    module: {
          rules: [
            {

              test    : /\.(png|jpg|svg)$/,
              include : path.join(__dirname, '/dist/img'),
              loader  : 'url-loader?limit=30000&name=images/[name].[ext]'
          },
          // {
          // 	test: /\.js$/,
  
          // 	loader:'babel-loader',
  
          // 	exclude: /node_modules/
          // },
          {
              test: /\.vue$/,
  
              exclude: /(node_modules|bower_components)/,
              
              use:{
                  loader: 'vue-loader'
              }
          },
          {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]'
            }
          },
          {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader'
          },
          {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff'
          },
          {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
          }
          ]
      },
    devServer: {
        port: 3000,
        historyApiFallback: true,
        noInfo: true,
        disableHostCheck: true
    },
    devtool: 'eval-source-map'
  }

module.exports = config
// console.log("prcoess.env.NODE_ENV = " + process.env.NODE_ENV);