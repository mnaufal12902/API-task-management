const Task_users = require("../models/task_users");

const getAllTaskUsers = async (req, res) => {
  try {
    const task = await Task_users.findAll({ logging: false });
    res.json({
      message: "Get Data Succes",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      serverMessage: error,
    });
  }
};

const createTaskUsers = async (req, res) => {
  const { body } = req;

  if (!body.Username || !body.UID) {
    return res.status(400).json({
      message: "Created Data Failed",
      serverMessage: !body.Username
        ? "Username tidak boleh kosong"
        : !body.UID
        ? "UID tidak boleh kosong"
        : "",
    });
  }

  try {
    const data = await Task_users.create(
      {
        Username: body.Username,
        UID: body.UID,
      },
      { logging: false }
    );
    res.status(201).json({
      message: "Create Data Succes",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Create Data Failed",
      serverMessage: error,
    });
  }
};

const deleteTaskUsers = async (req, res) => {
  const id = req.query.id;
  const searchTask = await Task_users.findByPk(id, { logging: false });

  if (searchTask === null) {
    res.status(400).json({
      message: "Data tidak ditemukan",
    });
  } else {
    try {
      await Task_users.destroy({
        where: {
          Id: id,
        },
        logging: false,
      });
      res.json({
        message: "Delete data succes",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        serverMessage: error,
      });
    }
  }
};


module.exports = {
  getAllTaskUsers,
  createTaskUsers,
  deleteTaskUsers,
};
