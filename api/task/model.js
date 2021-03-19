// build your `Task` model here
const db = require("../../data/dbConfig");

async function getTasks() {
  const tasks = await db("tasks as t")
    .join("projects as p", "p.project_id", "t.project_id")
    .select(
      "task_id",
      "task_description",
      "task_notes",
      "task_completed",
      "project_name",
      "project_description"
    );

  const output = tasks.map((task) => {
    const mapped = {
      task_id: task.task_id,
      task_description: task.task_description,
      task_notes: task.task_notes,
      task_completed: task.task_completed ? true : false,
      project_name: task.project_name,
      project_description: task.project_description,
    };
    return mapped;
  });

  return output;
}

async function createTask(task) {
  const [task_id] = await db("tasks").insert(task, [
    "task_id",
    "task_description",
    "task_notes",
    "task_completed",
    "project_id",
  ]);

  const output = await db("tasks").where({ task_id }).first();

  if (output.task_completed) {
    output.task_completed = true;
  } else {
    output.task_completed = false;
  }

  return output;
}

module.exports = { getTasks, createTask };
