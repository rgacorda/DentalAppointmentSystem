module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            validation: {
                notEmpty: true,
            },
        },
        middleinitial: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validation: {
                notEmpty: true,
            },
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },    
    });

    Users.associate = (models) => {
        Users.hasOne(models.Accounts, {
            onDelete: 'cascade',
        });

        Users.hasOne(models.Appointments_Schedules, {
            onDelete: 'cascade',
        });
    }

    return Users;
}