// build your `/api/projects` router here
const express = require("express");

const Project = require("./model");

const router = express.Router();

router.get("/", (req, res) => {
  Project.getProjects()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.post("/", (req, res) => {
  Project.createProject(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

module.exports = router;
