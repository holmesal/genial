import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import {Schema} from './schema';
import webpackConfig from './../webpack.config.js';
import history from'connect-history-api-fallback';

const APP_PORT = process.env.PORT || 8080;

// Hacky - should separate webpac config into dev and production
if (process.env.NODE_ENV === 'production') {
  console.info('serving with static app');
  var app = express();
  app.use('/public', express.static(path.resolve(__dirname, '../public')));
  app.use(history());
} else {
  console.info('serving with webpack dev server');
  var app = new WebpackDevServer(webpack(webpackConfig), {
    contentBase: '../public/',
    //proxy: {'/graphql': `http://localhost:${GRAPHQL_PORT}`},
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: 'errors-only'
  });
}
// Serve static resources
app.use('/', express.static(path.resolve(__dirname, '../public')));
// GraphQL endpoint
app.use('/graphql', graphQLHTTP({
  graphiql: true,
  pretty: true,
  schema: Schema,
}));
app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
  console.log(`GraphQL endpoint is at http://localhost:${APP_PORT}/graphql`);
});
