import { Sequelize } from "sequelize";

const sequelize = new Sequelize("buoi2cnpmm", "root", "Minhnhi123", {
    host: "localhost",
    dialect: "mysql",
    logging: false, // Disable logging for cleaner output
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection to the database has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

export default connectDB;