const { DataStore } = require('notarealdb');

const store = new DataStore('./data');

module.exports = {
  companies: store.collection('companies'),
  games: store.collection('games'),
  users: store.collection('users')
};
