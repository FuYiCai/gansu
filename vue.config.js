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
          target: 'http://test.iptvmall.cn/api/',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }

  }
  