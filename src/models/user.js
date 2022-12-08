const users = (sequelize, DataTypes) =>
  sequelize.define(
    "users",
    {
      server_DateTime: { type: DataTypes.DATE },
      dateTime_UTC: { type: DataTypes.DATE },
      update_DateTime_UTC: { type: DataTypes.DATE },
      first_Name: { type: DataTypes.STRING },
      last_Name: { type: DataTypes.STRING },
      status: { type: DataTypes.STRING },
      gender: { type: DataTypes.ENUM("male", "female") },
      date_Of_Birth: { type: DataTypes.DATE },
      img: { 
        type: DataTypes.TEXT('long'),
      },
      
    },
    { timestamps: false }
  );

module.exports = users;
