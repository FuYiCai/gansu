module.exports = {
    css: {
        loaderOptions: {
            less: {
              lessOptions:{
                javascriptEnabled: true,
              }
            }
        }
    },
    devServer:{
      proxy: {
        '/api': {
          target: 'http://172.17.103.105:12223/',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }

  }
  