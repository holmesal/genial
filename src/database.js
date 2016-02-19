import faker from 'faker';
import Sequelize from 'sequelize';
import _ from 'lodash';

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
let sequelize = new Sequelize(dbUrl, dbOptions);
sequelize.sync().then(() => console.info(`[${env} DB] connected and synced!`));

// Model types
export const Post = sequelize.define('post', {
  content: Sequelize.TEXT
});

export const getPost = (id) => Post.findById(id);
export const getPosts = () => Post.findAll();
