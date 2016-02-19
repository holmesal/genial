'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPosts = exports.getPost = exports.Post = undefined;

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV === 'production') {
  var dbUrl = 'postgres://btyuwemjytpdjx:SnG3_aA7tmQkplL9LFygAdAQcL@ec2-54-225-199-245.compute-1.amazonaws.com:5432/d3ssevji1t6kb3';
  var dbOptions = {
    dialect: 'postgres',
    dialectOptions: {
      ssl: true
    }
  };
  var env = 'PROD';
} else {
  var dbUrl = 'postgres://postgres:postgres@localhost:5432/genial';
  var dbOptions = {};
  var env = 'DEV';
}
var sequelize = new _sequelize2.default(dbUrl, dbOptions);
sequelize.sync().then(function () {
  return console.info('[' + env + ' DB] connected and synced!');
});

// Model types
var Post = exports.Post = sequelize.define('post', {
  content: _sequelize2.default.TEXT
});

var getPost = exports.getPost = function getPost(id) {
  return Post.findById(id);
};
var getPosts = exports.getPosts = function getPosts() {
  return Post.findAll();
};