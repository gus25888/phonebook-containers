db.createUser({
  user: 'sup_user',
  pwd: 'sup_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'persons_database',
    },
  ],
});

db.createCollection('Person');