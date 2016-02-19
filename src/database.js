import faker from 'faker';
import Sequelize from 'sequelize';
import _ from 'lodash';

let dbUrl = process.env.NODE_ENV === 'production' ? 'postgres://btyuwemjytpdjx:SnG3_aA7tmQkplL9LFygAdAQcL@ec2-54-225-199-245.compute-1.amazonaws.com:5432/d3ssevji1t6kb3' : 'postgres://postgres:postgres@localhost:5432/genial';
var sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
});

// Model types
export const Post = sequelize.define('post', {
  content: Sequelize.TEXT
});

export const getPost = (id) => Post.findById(id);
export const getPosts = () => Post.findAll();

// Sync
if (process.env.NODE_ENV === 'production' || true) {
  sequelize.sync().then(() => console.info('connected and synced!'));
} else {
  sequelize.sync().then(() => console.info('[DEV DB] connected and synced!'));
  //sequelize.sync({force: true}).then(() => {
  //  //bootstrap(User, Podcast)
  //});
}
