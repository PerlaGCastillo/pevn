import pool from "../database/keys";

const authentication = {};

authentication.signUp = async (req, res) => {
  const { nombre, email, password, role } = req.body;
  if (role=='professor') {
    try {
      await pool.query(
        "INSERT INTO professor(p_nombre,p_email,p_password) VALUES ($1, $2, $3)",
        [nombre, email, password]
      );
      res.status(200).json({
        message: "Profesor registrado con éxito",
        professor: { nombre, email, password },
      });
    } catch (error) {
      if (error.constraint == "professor_p_email_key") {
        res.status(500).json({
          message:
            "Correo electrónico ya registrado, por favor, ingresa un correo válido",
          error,
        });
      } else {
        res.status(500).json({
          message: "ha ocurrido un error",
          error,
        });
      }
    }
  } else {
    try {
      await pool.query(
        "INSERT INTO student(s_nombre,s_email,s_password) VALUES($1, $2, $3)",
        [nombre, email, password]
      );
      res.status(200).json({
        message: "Estudiante registrado con éxito",
        student: { nombre, email, password },
      });
    } catch (error) {
      if (error.constraint == "student_s_email_key") {
        res.status(500).json({
          message:
            "Correo electrónico ya registrado, por favor, ingresa un correo válido",
          error,
        });
      } else {
        res.status(500).json({
          message: "ha ocurrido un error",
          error,
        });
      }
    }
  }
};

module.exports = authentication;
