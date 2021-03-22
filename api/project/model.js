// build your `Project` model here
const db = require("../../data/dbConfig");

async function getProjects() {
  const projects = await db("projects");

  const output = projects.map((project) => {
    const mapped = {
      project_id: project.project_id,
      project_name: project.project_name,
      project_description: project.project_description,
      project_completed: project.project_completed ? true : false,
    };
    return mapped;
  });

  return output;
}

async function createProject(project) {
  const [project_id] = await db("projects").insert(project, [
    "project_id",
    "project_name",
    "project_description",
    "project_completed",
  ]);

  const output = await db("projects").where({ project_id }).first();

  if (output.project_completed) {
    output.project_completed = true;
  } else {
    output.project_completed = false;
  }

  return output;
}

module.exports = { getProjects, createProject };
