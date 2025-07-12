db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'the_database',
    },
  ],
});

db.createCollection('Person');

db.Person.insert({ name: 'Perico Palotes', number: '123-456456' });
db.Person.insert({ name: 'Pedro Pereira', number: '456-123123' });