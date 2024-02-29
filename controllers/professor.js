import pool from "../database/keys"

const professor = {}

professor.createCourse = async (req, res) => {
  const { id, c_name, c_description } = req.body
  try {
    await pool.query(
      "INSERT INTO course (id_p, c_name, c_description) VALUES($1, $2, $3)",
      [id, c_name, c_description]
    )
    res.status(200).json({
      message: "curso añadido con éxito",
      course: { id, c_name, c_description },
    })
  } catch (error) {
    res.status(500).json({
      message: "error",
      error,
    })
  }
}

module.exports = professor