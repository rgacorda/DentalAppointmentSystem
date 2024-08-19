module.exports = (sequelize, DataTypes) => {
    const Appointments_Statuses = sequelize.define('Appointments_Statuses', {
        appointmentStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            validation: {
                notEmpty: true,
            },
            isIn: [['Pending', 'Approved', 'Cancelled', 'Completed']],
        },
        appointmentClientDescription: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        appointmentDoctorDescription: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return Appointments_Statuses;
}