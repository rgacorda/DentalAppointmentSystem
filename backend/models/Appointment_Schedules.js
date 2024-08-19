module.exports = (sequelize, DataTypes) => {
    const Appointments_Schedules = sequelize.define('Appointments_Schedules', {
        appointmentDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validation: {
                notEmpty: true,
            },
        },
        appointmentTime: {
            type: DataTypes.STRING,
            allowNull: false,
            validation: {
                notEmpty: true,
            },
        },
    });

    Appointments_Schedules.associate = (models) => {
        Appointments_Schedules.hasOne(models.Appointments_Statuses, {
            onDelete: 'cascade',
        });
    }

    return Appointments_Schedules;
}