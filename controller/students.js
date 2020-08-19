let { db } = require("../data/db");

module.exports = {
  // TODO: get all students

  getStudents: (req, res) => {
    let students = db.get("students").value();
    res.status(200).json(students);
  },

  // TODO: get by name

  getStudentByName: (req, res) => {
    let foundStudent = db
      .get("students")
      .find({ name: req.params.name })
      .value();
    if (foundStudent) {
      return res.status(200).json(foundStudent);
    }
    res.status(404).json({ error: "Student Not Found" });
  },

  // TODO: update by name

  updateStudentByName: (req, res) => {
    let updatedStudent = db
      .get("students")
      .find({ name: req.params.name })
      .assign(req.body)
      .write();

    res.send(updatedStudent);
  },

  // TODO: remove by name

  removeStudentByName: (req, res) => {
    let removedStudent = db
      .get("students")
      .remove({ name: req.params.name })
      .write();

    res.send(removedStudent);
  },

  // TODO: add new student

  addStudent: (req, res) => {
    let addedStudent = db.get("students").push(req.body).write();
    if (addedStudent) {
      return res.status(200).json(addedStudent);
    }
    res.status(500).json({ error: "Invalid Student" });
  },
};
