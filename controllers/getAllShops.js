import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;
const pool = new Pool({
  host: "localhost",
  database: "delivery",
  port: 5432,
  user: "root",
  password: "root",
});

async function getAllShops(req, res) {
  try {
    const allShops = await pool.query("select * from shops;");
    res.status(200).json({
      code: 200,
      status: "success",
      message: "Herous was loading",
      data: JSON.stringify(allShops.rows),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      status: "error",
      message: "Something went wrong",
      data: {
        error,
      },
    });
  }
}

export default getAllShops;
