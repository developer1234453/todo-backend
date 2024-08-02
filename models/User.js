const { sequelize, DataTypes } = require('../database'); // Adjust the path as needed

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING, // Should be available if imported correctly
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING, // Should be available if imported correctly
    allowNull: false,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = User;
