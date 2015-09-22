var sequelizeOrm = require('sequelize');

var sequelize = new sequelizeOrm('abelinos', 'root', '1234', {
  host: "localhost",
  port: 3328
});

var Token = sequelize.define ('Token', {
    value: {type: sequelizeOrm.STRING, allowNull: false, primaryKey: true},
    userID: {type: sequelizeOrm.STRING, allowNull: false},
    createdAt: false,
    updatedAt: false
});

module.exports = sequelize.model('Token', Token);