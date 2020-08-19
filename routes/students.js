const express = require("express");
const router = express.Router();

const validation = require("../middleware/validation");
const {
  getStudents,
  getStudentByName,
  updateStudentByName,
  removeStudentByName,
  addStudent
} = require("../controller/students");

// - GET (all, individual)

router.get("/", getStudents);

router.get("/:name", getStudentByName);

// - PUT (individual)
router.put("/:name", validation, updateStudentByName);
// // - DELETE (individual)
router.delete("/:name", removeStudentByName);
// - POST (individual)
router.post("/", validation, addStudent);

module.exports = router;
