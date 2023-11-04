require("dotenv").config();

const express = require("express");
const sequelize = require("./src/config/database");
const useAuth = require("./src/routes/auth");
const useRouterTugas = require("./src/routes/tugas");
const useRouterGroupTask = require("./src/routes/grup_task");
const useRouterUsers = require("./src/routes/users");
const useRouterTaskUsers = require("./src/routes/task_users");
const useRouterTaskSucces = require("./src/routes/task_succes");
const useRouterMatkul = require("./src/routes/mata_kuliah");
const useRouterGroup = require("./src/routes/grup");
const useRouterGroupMember = require("./src/routes/member_grup");

const Tugas = require("./src/models/tugas");
const Task_users = require("./src/models/task_users");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use("/", useAuth);
app.use("/", useRouterTugas);
app.use("/", useRouterGroupTask);
app.use("/", useRouterUsers);
app.use("/", useRouterTaskUsers);
app.use("/", useRouterTaskSucces);
app.use("/", useRouterMatkul);
app.use("/", useRouterGroup);
app.use("/", useRouterGroupMember);

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log(`Server sedang berjalan di http://localhost:${port}`);
  } catch (error) {
    console.log("Unable to connect to database:", error);
  }
});
