// build your `/api/tasks` router here
const express = require("express");

const Task = require("./model");

const router = express.Router();

router.get("/", (req, res) => {
  Task.getTasks()
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.post("/", (req, res) => {
  Task.createTask(req.body)
    .then((task) => {
      res.status(201).json(task);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

module.exports = router;
