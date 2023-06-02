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

async function addUser(req, res) {
  const { user, products } = req.body;
  let userId = "";
  try {
    const checkUser = await pool.query(
      `select user_id from users where user_email='${user.email}';`
    );
    if (checkUser.rows.length === 0) {
      const createUser = await pool.query(
        `insert into users (user_name, user_email, user_phone, user_addres) values ($1, $2, $3, $4) returning user_id;`,
        [user.name, user.email, user.phone, user.address]
      );
      userId = createUser.rows[0].user_id;
    } else {
      userId = checkUser.rows[0].user_id;
    }

    await pool.query(
      `INSERT INTO orders (user_id, orders)
     VALUES ($1, $2)`,
      [userId, products]
    );
    res.status(200).json({
      code: 200,
      status: "success",
      message: "Order was creat",
      data: req.body,
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

export default addUser;
