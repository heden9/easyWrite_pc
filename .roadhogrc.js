export default {
  entry : {
    app: "./src/index.js",
    common: "./src/vendor.js"
  },
  hash: true,
  multipage: true,
  less: true,
  disableCSSModules : true ,
  publicPath : "/" ,
  theme : "./theme.config.js" ,
  autoprefixer : {
    browsers : [
      "iOS >= 8" ,
      "Android >= 4"
    ]
  } ,
  proxy : {
    "/": {
      "target": "http://mgq.jblog.info",
      "changeOrigin": true,
      "pathRewrite": { "^/" : "" }
    }
  } ,
  // style 必须是 true
  extraBabelPlugins : [
    "transform-runtime" ,
    [
      "import" ,
      { libraryName : "antd" , "libraryDirectory" : "lib" , "style" : true }
    ]
  ] ,
  env : {
    development : {
      extraBabelPlugins : [
        "dva-hmr"
      ]
    }
  },
  xdllPlugin: {
    exclude: [
      "babel-runtime"
    ],
    include: [
      "dva/router",
      "dva/saga",
      "dva/fetch"
    ]
  }
};
