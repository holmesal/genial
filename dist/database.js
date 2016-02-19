'use strict';

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dbUrl = process.env.NODE_ENV === 'production' ? 'postgres://btyuwemjytpdjx:SnG3_aA7tmQkplL9LFygAdAQcL@ec2-54-225-199-245.compute-1.amazonaws.com:5432/d3ssevji1t6kb3' : 'postgres://postgres:postgres@localhost:5432/genial';
var sequelize = new _sequelize2.default(dbUrl);

// Model types
var Post = sequelize.define('post', {
  content: _sequelize2.default.TEXT
});

sequelize.sync({ force: true }).then(function () {
  Post.create({
    content: _faker2.default.lorem.paragraph()
  }).then(function (post) {
    console.info(post.get());
  });
});

module.exports = {
  getPost: function getPost(id) {
    return Post.findById(id);
  },
  getPosts: function getPosts() {
    return Post.findAll();
  },
  Post: Post
};