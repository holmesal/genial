'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Schema = undefined;

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _database = require('./database');

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */

var _nodeDefinitions = (0, _graphqlRelay.nodeDefinitions)(function (globalId) {
  var _fromGlobalId = (0, _graphqlRelay.fromGlobalId)(globalId);

  var type = _fromGlobalId.type;
  var id = _fromGlobalId.id;

  if (type === 'Post') {
    return (0, _database.getPost)(id);
  } else {
    throw new Error('Could not resolve type for id ' + globalId + ' - are you sure this is a global id?');
    return null;
  }
}, function (obj) {
  if (obj.Model === _database.Post) {
    return postType;
  } else {
    console.info(obj, typeof obj === 'undefined' ? 'undefined' : _typeof(obj), obj.Model);
    throw new Error('Internal error - could not map postgres type to graphQL schema');
    return null;
  }
});

var nodeInterface = _nodeDefinitions.nodeInterface;
var nodeField = _nodeDefinitions.nodeField;

/**
 * Define your own types here
 */

var postType = new _graphql.GraphQLObjectType({
  name: 'Post',
  description: 'A post from our app',
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('Post'),
      content: {
        type: _graphql.GraphQLString,
        description: 'The post content'
      }
    };
  },
  interfaces: [nodeInterface]
});

/**
 * Define your own connection types here
 */

var _connectionDefinition = (0, _graphqlRelay.connectionDefinitions)({ name: 'Post', nodeType: postType });

var postConnection = _connectionDefinition.connectionType;

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */

var queryType = new _graphql.GraphQLObjectType({
  name: 'Query',
  fields: function fields() {
    return {
      node: nodeField,
      posts: {
        type: new _graphql.GraphQLList(postType),
        resolve: function resolve() {
          return (0, _database.getPosts)();
        }
      }
      // Add your own root fields here
      //viewer: {
      //  type: userType,
      //  resolve: () => getViewer(),
      //},
    };
  }
});

var newPostMutation = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'NewPost',
  description: 'Creates a new post',
  inputFields: {
    content: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
    }
  },
  outputFields: {
    post: {
      type: postType,
      resolve: function resolve(payload) {
        return payload.post;
      }
    }
  },
  mutateAndGetPayload: function mutateAndGetPayload(_ref) {
    var content = _ref.content;

    return _database.Post.create({ content: content }).then(function (post) {
      console.info('created!', post);
      return {
        post: post.get()
      };
    });
  }
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
var mutationType = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: function fields() {
    return {
      newPost: newPostMutation
    };
  }
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
var Schema = exports.Schema = new _graphql.GraphQLSchema({
  query: queryType,
  mutation: mutationType
});