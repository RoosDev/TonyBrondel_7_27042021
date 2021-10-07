let users = sequelize.define('users', {
    firstName: {
      type: Sequelize.STRING(50),
      field: 'firstname' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    lastName: { type: Sequelize.STRING(50) },
    email_H : { type: Sequelize.STRING },
    email_Crypt : { type: Sequelize.STRING },
    password_H : { type: Sequelize.STRING(50) },
    job : { type: Sequelize.STRING(50) },
    photo_URL : { type: Sequelize.STRING },
    division : { type: Sequelize.STRING(75) },
    role_id : { type: Sequelize.BOOLEAN },
    active : { type: Sequelize.BOOLEAN },
    last_Connexion : { type: Sequelize.DATE }
  }, {
    freezeTableName: true // Model tableName will be the same as the model name
  });
  
  users.sync({force: true}).then(function () {
    // Table created
    return users.create({
      firstName: 'John',
      lastName: 'Hancock'
    });
  });