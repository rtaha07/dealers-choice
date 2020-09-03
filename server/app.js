const express = require('express');
const bodyParser = require('body-parser');

//require morgan|volleyball, path packages
const morgan = require('morgan');
const path = require('path');
const { conn, User } = require('./db/index');
const faker = require('faker');

//initialize app
const app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/users', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name'],
      order: [['name', 'ASC']],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//app.use('/index', require('./routes/index'));
app.get('/api/users/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

app.put('/api/users/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.update(req.body);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/users/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(Error);
  }
});

app.post('/api/users', async (req, res, next) => {
  try {
    res.send(await User.create({ name: faker.name.findName() }));
  } catch (err) {
    next(err);
  }
});

// For all GET requests that aren't to an API route,
// we will send the index.html!
app.get('/', async (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

//404 handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//500 handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal Server Error.');
});

//set PORT
const PORT = process.env.PORT || 3000;

//listen
const init = async function startServer() {
  try {
    await conn.sync();
    console.log('The database is synced!');
    app.listen(PORT, () =>
      console.log(`
        Listening on port ${PORT}
      `)
    );
  } catch (err) {
    console.error(err);
  }
};
init();
