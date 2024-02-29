import express from "express"
import professor from "../controllers/professor"

const router = express.Router()

router.post("/course", professor.createCourse)

module.exports = router
