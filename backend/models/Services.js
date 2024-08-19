module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define('Service', { 
      serviceName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'The service is already listed', 
        },
        validate: {
          notEmpty: true,
        },
      },
      serviceDescription: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      servicePrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    });
  
    Service.associate = (models) => {
      Service.hasOne(models.Appointments_Schedules, {
        onDelete: 'cascade',
      });
    };
  
    return Service; // Return "Service" here
  };
  