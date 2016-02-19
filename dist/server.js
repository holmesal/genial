'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _schema = require('./schema');

var _webpackConfig = require('./../webpack.config.js');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var APP_PORT = process.env.PORT || 8080;

// Hacky - should separate webpac config into dev and production
if (true || process.env.NODE_ENV === 'production') {
  console.info('serving with static app');
  var app = (0, _express2.default)();
  app.use('/public', _express2.default.static(_path2.default.resolve(__dirname, '../public')));
} else {
  console.info('serving with webpack dev server');
  var app = new _webpackDevServer2.default((0, _webpack2.default)(_webpackConfig2.default), {
    contentBase: '../public/',
    //proxy: {'/graphql': `http://localhost:${GRAPHQL_PORT}`},
    publicPath: _webpackConfig2.default.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: 'errors-only'
  });
}
// Serve static resources
app.use('/', _express2.default.static(_path2.default.resolve(__dirname, '../public')));
// GraphQL endpoint
app.use('/graphql', (0, _expressGraphql2.default)({
  graphiql: true,
  pretty: true,
  schema: _schema.Schema
}));
app.listen(APP_PORT, function () {
  console.log('App is now running on http://localhost:' + APP_PORT);
  console.log('GraphQL endpoint is at http://localhost:' + APP_PORT + '/graphql');
});