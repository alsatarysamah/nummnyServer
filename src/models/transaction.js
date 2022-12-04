const transaction = (sequelize, DataTypes) =>
  sequelize.define(
    "transactions",
    {
      server_DateTime: { type: DataTypes.DATE },
      dateTime_UTC: { type: DataTypes.DATE },
      update_DateTime_UTC: { type: DataTypes.DATE },
      amount: { type: DataTypes.DOUBLE },
      status: { type: DataTypes.STRING },
      Is_Credit: { type: DataTypes.BOOLEAN },
      currency: { type: DataTypes.STRING },
    },
    { timestamps: false }
  );

module.exports = transaction;
