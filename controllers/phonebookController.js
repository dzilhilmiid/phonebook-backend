const pool = require("../db");

const getPhonebooks = async (
  req,
  res
) => {
  try {

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const keyword =
      req.query.keyword || "";

    const sort =
      req.query.sort || "asc";

    const offset =
      (page - 1) * limit;

    const totalResult =
      await pool.query(
        `
        SELECT COUNT(*)
        FROM phonebooks
        WHERE name ILIKE $1
        `,
        [`%${keyword}%`]
      );

    const total =
      Number(
        totalResult.rows[0].count
      );

    const result =
      await pool.query(
        `
        SELECT *
        FROM phonebooks
        WHERE name ILIKE $1
        ORDER BY name ${
          sort === "desc"
            ? "DESC"
            : "ASC"
        }
        LIMIT $2
        OFFSET $3
        `,
        [
          `%${keyword}%`,
          limit,
          offset,
        ]
      );

    res.json({
      phonebooks:
        result.rows,
      total,
    });

  }  catch (error) {
  console.error("GET PHONEBOOKS ERROR:");
  console.error(error);

  res.status(500).json({
    message: error.message,
  });
  }
};

const createPhonebook = async (
  req,
  res
) => {
  try {

    const {
      name,
      phone
    } = req.body;

    const result =
      await pool.query(
        `
        INSERT INTO phonebooks(
          name,
          phone
        )
        VALUES($1,$2)
        RETURNING *
        `,
        [name, phone]
      );

    res.status(201).json(
      result.rows[0]
    );

  }  catch (error) {
  console.error("GET PHONEBOOKS ERROR:");
  console.error(error);

  res.status(500).json({
    message: error.message,
  });

  }
};

const getPhonebook = async (
  req,
  res
) => {
  try {

    const { id } = req.params;

    const result =
      await pool.query(
        `
        SELECT *
        FROM phonebooks
        WHERE id = $1
        `,
        [id]
      );

    if (
      result.rows.length === 0
    ) {
      return res.status(404).json({
        message:
          "Contact Not Found",
      });
    }

    res.json(
      result.rows[0]
    );

  }  catch (error) {
  console.error("GET PHONEBOOKS ERROR:");
  console.error(error);

  res.status(500).json({
    message: error.message,
  });

  }
};

const updatePhonebook = async (
  req,
  res
) => {
  try {

    const { id } = req.params;

    const {
      name,
      phone
    } = req.body;

    const result =
      await pool.query(
        `
        UPDATE phonebooks
        SET
          name = $1,
          phone = $2,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
        RETURNING *
        `,
        [
          name,
          phone,
          id
        ]
      );

    if (
      result.rows.length === 0
    ) {
      return res.status(404).json({
        message:
          "Contact Not Found",
      });
    }

    res.json(
      result.rows[0]
    );

  }  catch (error) {
  console.error("GET PHONEBOOKS ERROR:");
  console.error(error);

  res.status(500).json({
    message: error.message,
  });

  }
};

const deletePhonebook = async (
  req,
  res
) => {
  try {

    const { id } = req.params;

    const result =
      await pool.query(
        `
        DELETE FROM phonebooks
        WHERE id = $1
        RETURNING *
        `,
        [id]
      );

    if (
      result.rows.length === 0
    ) {
      return res.status(404).json({
        message:
          "Contact Not Found",
      });
    }

    res.json({
      message:
        "Contact Deleted",
      data:
        result.rows[0],
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Internal Server Error",
    });

  }
};

const uploadAvatar = async (
  req,
  res
) => {
  try {

    const { id } = req.params;

    const result =
      await pool.query(
        `
        UPDATE phonebooks
        SET
          avatar = $1,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *
        `,
        [
          req.file.filename,
          id
        ]
      );

    if (
      result.rows.length === 0
    ) {
      return res.status(404).json({
        message:
          "Contact Not Found",
      });
    }

    res.json(
      result.rows[0]
    );

  } catch (error) {
    console.error("GET PHONEBOOKS ERROR:");
    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getPhonebooks,
  createPhonebook,
  getPhonebook,
  updatePhonebook,
  deletePhonebook,
  uploadAvatar,
};