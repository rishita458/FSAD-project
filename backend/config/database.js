import { Sequelize } from 'sequelize';

let sequelize;

const connectDB = async () => {
  try {
    sequelize = new Sequelize(
      process.env.DB_NAME || 'service_connect',
      process.env.DB_USER || 'root',
      process.env.DB_PASSWORD || '',
      {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: false,
      }
    );

    await sequelize.authenticate();
    console.log('MySQL connected successfully');

    // ✅ FIXED (creates tables)
    await sequelize.sync({ alter: true });

    console.log('Database models synced');

  } catch (error) {
    console.error('MySQL connection error:', error.message);
    process.exit(1);
  }
};

export { sequelize, connectDB };
export default connectDB;