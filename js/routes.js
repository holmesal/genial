import React from 'react';
import { RelayRouter } from 'react-router-relay';
import { Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Landing from './components/Landing';
import NewPost from './components/NewPost';
import Post from './components/Post';
import PostNotFound from './components/PostNotFound';

const postQueries = {
    post: () => Relay.QL`query { node(id:$postId) }`
};

export default (
    <RelayRouter history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute
                component={Landing}
            />

            <Route
                path="new"
                component={NewPost}
            />

            <Route
                path=":postId"
                component={Post}
                queries={postQueries}
                renderFailure={(error) => <PostNotFound error={error} />}
            />

        </Route>
    </RelayRouter>
);