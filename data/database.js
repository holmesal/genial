import faker from 'faker';
import Sequelize from 'sequelize';
import _ from 'lodash';

var sequelize = new Sequelize('postgres://btyuwemjytpdjx:SnG3_aA7tmQkplL9LFygAdAQcL@ec2-54-225-199-245.compute-1.amazonaws.com:5432/d3ssevji1t6kb3');

// Model types
var Post = sequelize.define('post', {
  content: Sequelize.STRING
});

sequelize.sync({force: true}).then(() => {
  Post.create({
    content: faker.lorem.paragraph()
  }).then((post) => {
    console.info(post.get())
  });
});

module.exports = {
  getPost: (id) => Post.findById(id),
  getPosts: () => Post.findAll(),
  Post
};

