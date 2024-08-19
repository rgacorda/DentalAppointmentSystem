module.exports = (sequelize, DataTypes) => {
  const Policies = sequelize.define("Policies", {
    policyName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validation: {
        notEmpty: true,
      },
    },
    policyDescription: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        notEmpty: true,
      },
    },
  });

  return Policies;
};
