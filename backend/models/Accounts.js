module.exports = (sequelize, DataTypes) => {
    const Accounts = sequelize.define('Accounts', {
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validation: {
                notEmpty: true,
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validation: {
                notEmpty: true,
            },
        },
        cpnumber: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validation: {
                notEmpty: true,
                isIn: ['admin', 'user'],
            },
        },
    });

    return Accounts;
}