import faker from 'faker';
import Sequelize from 'sequelize';
import _ from 'lodash';

var sequelize = new Sequelize('genial', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
});

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
  getPost: (id) => {
    console.info('getting post', id);
    return Post.findById(id);
  },
  getPosts: () => Post.findAll(),
  Post
};

