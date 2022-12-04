const accounts = (sequelize, DataTypes) =>
  sequelize.define(
    "accounts",
    {
      server_DateTime: { type: DataTypes.DATE },
      dateTime_UTC: { type: DataTypes.DATE },
      update_DateTime_UTC: { type: DataTypes.DATE },
      account_Number: { type: DataTypes.INTEGER },
      balance: { type: DataTypes.DOUBLE },
      status: { type: DataTypes.STRING },
      available_Balance: { type: DataTypes.DOUBLE },
      currency: { type: DataTypes.STRING },
    },
    { timestamps: false }
  );

module.exports = accounts;
