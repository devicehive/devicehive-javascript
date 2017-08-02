module.exports = {
  entry : `${__dirname}/index.js`,
  output : {
    path : `${__dirname}/dist`,
    filename : `bundle.js`,
    libraryTarget : "commonjs2"
  },
  target : `web`,
  resolve : {
    modules : ["node_modules"]
  }
};