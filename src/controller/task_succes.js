const Task_users = require("../models/task_users");
const Tugas = require("../models/tugas");

const getTaskSC = async (req, res) => {
    const username = req.query.username;
  
    try {
      Tugas.belongsTo(Task_users, { foreignKey: "UID", targetKey: "UID" });
      const data = await Tugas.findAll({
        attributes: ['UID', 'Judul', 'Mata_Kuliah', 'Deadline', 'Jam', 'People'],
        include: [
          {
            model: Task_users,
            where: { Username: username },
            attributes: [],
          },
        ],
        logging: false
      });
      res.json({
        message: "Get data succes",
        data: data,
      });
    } catch (error) {
      res.status(400).json({
        message: "Internal server error",
        serverMessage: error,
      });
    }
  };

const getCountTaskSC = async (req, res) => {
  const uid = req.query.uid

  try {
    const count = await Task_users.count({
      where: {
        UID: uid
      }, logging: false
    })
    res.json({
      message: "Get data succes",
      data: count
    })
  } catch (error) {
    res.status(400).json({
      message: "Internal server error",
      serverMessage: error
    })
  }
}

module.exports = {
    getTaskSC,
    getCountTaskSC
}