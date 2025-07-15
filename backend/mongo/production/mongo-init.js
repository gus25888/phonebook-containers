db.createUser({
  user: 'new_username',
  pwd: 'new_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'persons_database',
    },
  ],
});

db.createCollection('persons');