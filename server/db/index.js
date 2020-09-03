const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/dealer_db'
);
//const faker = require('faker');

const User = conn.define('users', {
  name: {
    type: STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
});

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  // const randomName = faker.name.findName();
  // const randomImageUrl = faker.image.imageUrl();
  let users = await Promise.all(
    ['Khalid', 'Sarah', 'Joe'].map((name) => User.create({ name }))
  );
};

module.exports = {
  syncAndSeed,
  conn,
  User,
};
