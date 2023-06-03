import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;
const { POSTGRES_URL } = process.env;
const pool = new Pool({
  connectionString: POSTGRES_URL + "?sslmode=require",
});

async function getAllShops(req, res) {
  try {
    const allShops = await pool.query("select * from shops;");
    res.status(200).json({
      code: 200,
      status: "success",
      message: "Shops was loading",
      data: JSON.stringify(allShops.rows),
    });
  } catch (error) {
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
