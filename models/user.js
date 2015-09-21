var sequelizeOrm = require('sequelize');

var sequelize = new sequelizeOrm('abelinos', 'root', '1234', {
  host: "localhost",
  port: 3328
});

var User = sequelize.define ('User', {
    username: {type: sequelizeOrm.STRING, allowNull: false, primaryKey: true},
    name: {type: sequelizeOrm.STRING, allowNull: false},
    lastname: {type: sequelizeOrm.STRING, allowNull: false},
    // password: {type: Sequelize.STRING, allowNull: false},
    // email: {type: Sequelize.STRING, allowNull: false},
    // isAdmin: Sequelize.BOOLEAN,
    // passwordReset: Sequelize.STRING
    createdAt: false,
    updatedAt: false
  }, {
    tableName: 'Users' // this will define the table's name
});

module.exports = sequelize.model('User', User);