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

async function getHistory(req, res) {
  const { email, phone } = req.query;

  try {
    const checkUserForGetHistory = await pool.query(
      `select user_id from users where user_email=$1 or user_phone=$2;`,
      [email, phone]
    );
    if (checkUserForGetHistory.rows.length > 0) {
      const getHistoryFromBD = await pool.query(
        `select orders, date from orders join users on orders.user_id=users.user_id where users.user_id=$1 order by orders.order_id DESC`,
        [checkUserForGetHistory.rows[0].user_id]
      );
      res.status(200).json({
        code: 200,
        status: "success",
        message: "History is",
        data: getHistoryFromBD.rows,
      });
      return;
    }
    res.status(200).json({
      code: 200,
      status: "success",
      message: "You don't have history yet",
      data: null,
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

export default getHistory;
