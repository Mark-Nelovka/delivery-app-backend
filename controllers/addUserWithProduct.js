import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;
const { POSTGRES_URL } = process.env;
const pool = new Pool({
  connectionString: POSTGRES_URL + "?sslmode=require",
});

async function addUser(req, res) {
  const { user, products, date } = req.body;
  let userId = "";
  try {
    const checkUser = await pool.query(
      `select user_id from users where user_email='${user.email}';`
    );
    if (checkUser.rows.length === 0) {
      const createUser = await pool.query(
        `insert into users (user_name, user_email, user_phone, user_address) values ($1, $2, $3, $4) returning user_id;`,
        [user.name, user.email, user.phone, user.address]
      );
      userId = createUser.rows[0].user_id;
    } else {
      userId = checkUser.rows[0].user_id;
    }
    await pool.query(
      `INSERT INTO orders (user_id, orders, date)
     VALUES ($1, $2, $3)`,
      [userId, products, date]
    );
    res.status(200).json({
      code: 200,
      status: "success",
      message: "Order was creat",
      data: req.body,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      status: "error",
      message: "Ooops, something went wrong. Please, try again leter",
      data: {
        error,
      },
    });
  }
}

export default addUser;
