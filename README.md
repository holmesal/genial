# GraphQL starter

This kit includes an app server, a GraphQL server, and a transpiler that you can use to get started building an app with Relay. For a walkthrough, see the [Relay tutorial](https://facebook.github.io/relay/docs/tutorial.html).

## Endpoints

`/` - the webapp is served from the root
`/graphql` - graphql queries are processed on a special endpoint

## Example graphQL queries

Get all posts:
```
query {
  posts {
    id
    content
  }
}
```

Get a specific post:
```
query {
  node(id:"UG9zdDox") {
    id
    ...on Post {
        content
    }
  }
}
```

## Installation

```
npm install
```

## Running

Start a local server:

```
heroku local
```

## Developing

Any changes you make to files in the `js/` directory will cause the server to
automatically rebuild the app and refresh your browser.

If at any time you make changes to `data/schema.js`, stop the server,
regenerate `data/schema.json`, and restart the server:

```
npm run update-schema
npm start
```

## Deploying

```
git push heroku master
```

## Hacky dev things:

* No build process. `babel-node` is used to run, and the app is served from a webpack development server.

## License

Relay Starter Kit is [BSD licensed](./LICENSE). We also provide an additional [patent grant](./PATENTS).
