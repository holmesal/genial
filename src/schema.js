import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  getPost,
  getPosts,
  Post
} from './database';

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'Post') {
      return getPost(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj.Model === Post) {
      return postType;
    } else {
      return null;
    }
  }
);

/**
 * Define your own types here
 */

var postType = new GraphQLObjectType({
  name: 'Post',
  description: 'A post from our app',
  fields: () => ({
    id: globalIdField('Post'),
    content: {
      type: GraphQLString,
      description: 'The post content'
    }
  }),
  interfaces: [nodeInterface],
});

/**
 * Define your own connection types here
 */
var {connectionType: postConnection} =
  connectionDefinitions({name: 'Post', nodeType: postType});

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    posts: {
      type: new GraphQLList(postType),
      resolve: () => getPosts()
    }
    // Add your own root fields here
    //viewer: {
    //  type: userType,
    //  resolve: () => getViewer(),
    //},
  }),
});

var newPostMutation = mutationWithClientMutationId({
  name: 'NewPost',
  description: 'Creates a new post',
  inputFields: {
    content: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    post: {
      type: postType,
      resolve: (payload) => payload.post
    }
  },
  mutateAndGetPayload: ({content}) => {
    return Post.create({content}).then(post => {
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
var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    newPost: newPostMutation
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export var Schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
