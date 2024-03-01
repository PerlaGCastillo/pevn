import pool from "../database/keys"

const authentication = {}

authentication.signUp = async (req, res) => {
  const { nombre, email, password, role } = req.body
  if (role == "professor") {
    try {
      await pool.query(
        "INSERT INTO professor(p_nombre, p_email, p_password) VALUES ($1, $2, $3)",
        [nombre, email, password]
      )
      res.status(200).json({
        message: "Profesor registrado con éxito",
        professor: { nombre, email, password },
      }) 
    } catch (error) {
      if (error.constraint == "professor_p_email_key") {
        res.status(500).json({
          message:
            "Correo electrónico ya registrado",
          error
        })
      } else {
        res.status(500).json({
          message: "ha ocurrido un error",
          error
        })
      }
    }
  } else {
    try {
      await pool.query(
        "INSERT INTO student(s_nombre,s_email,s_password) VALUES($1, $2, $3)",
        [nombre, email, password]
      )
      res.status(200).json({
        message: "Estudiante registrado con éxito",
        student: { nombre, email, password },
      })
    } catch (error) {
      if (error.constraint == "student_s_email_key") {
        res.status(500).json({
          message:
            "Correo electrónico ya registrado",
          error
        })
      } else {
        res.status(500).json({
          message: "ha ocurrido un error",
          error
        })
      }
    }
  }
}

authentication.signIn = async (req, res) =>{
  const{email, password, role} = req.body
  if(role=="professor"){
    try {
      const professor = await (await pool.query('SELECT * FROM professor WHERE p_email=$1 AND p_password=$2', [email,password])).rows
      if (professor.length>0) {
        res.status(200).json({
          id: professor[0].id_p,
          name: professor[0].p_nombre,
          email: professor[0].p_email,
          role: 'professor'
        })
      } else {
        res.status(200).json({
          message:'Profesor no existe',
          NotFound: true
        })
      }
    } catch (error) {
      res.status(500).json({
        message:'Error',
        error
      })
      
    }

  }else{
    try {
      const student = await (await pool.query('SELECT * FROM student WHERE s_email=$1 AND s_password=$2', [email,password])).rows
      if (student.length>0) {
        res.status(200).json({
          id: student[0].id_s,
          name: student[0].s_nombre,
          email: student[0].s_email,
          role: 'student'
        })
      } else {
        res.status(200).json({
          message:'Estudiante no existe',
          NotFound: true
        })
      }
    } catch (error) {
      res.status(500).json({
        message:'Error',
        error
      })
    }
  }
}

module.exports = authentication