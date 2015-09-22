var sequelizeOrm = require('sequelize');

var sequelize = new sequelizeOrm('abelinos', 'root', '1234', {
  host: "localhost",
  port: 3328
});

var Client = sequelize.define ('Client', {
    name: {type: sequelizeOrm.STRING, allowNull: false, unique: true, require: true},
    id: {type: sequelizeOrm.STRING, allowNull: false},
    secret: {type: sequelizeOrm.STRING, require: true},
    userID: {type: type: sequelizeOrm.STRING, require: true},
    createdAt: false,
    updatedAt: false
});

module.exports = sequelize.model('Client', Client);