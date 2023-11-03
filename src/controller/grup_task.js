const Grup_Task = require("../models/grup_task");

const getAllTugas = async (req, res) => {
  try {
    const task = await Grup_Task.findAll({ logging: false });
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

const createTugas = async (req, res) => {
  const { body } = req;

  if (!body.Judul || !body.Mata_Kuliah || !body.Deadline || !body.Jam) {
    return res.status(400).json({
      message: "Created Data Failed",
      serverMessage: !body.Judul
        ? "Judul tidak boleh kosong"
        : !body.Mata_Kuliah
        ? "Mata Kuliah tidak boleh kosong"
        : !body.Deadline
        ? "Deadline tidak boleh kosong"
        : !body.Jam 
        ? "Jam tidak boleh kosong"
        : ""
    });
  }

  try {
    const data = await Grup_Task.create(
      {
        Judul: body.Judul,
        Mata_Kuliah: body.Mata_Kuliah,
        Deadline: body.Deadline,
        Jam : body.Jam,
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

const updateTugas = async (req, res) => {
  const { body } = req;
  const uid = req.query.uid;
  const searchTask = await Grup_Task.findByPk(uid, { logging: false });

  if (searchTask === null) {
    res.status(401).json({
      message: "Data tidak ditemukan",
    });
  } else {
    if (!body.Judul || !body.Mata_Kuliah) {
      return res.status(400).json({
        message: "Created Data Failed",
        serverMessage: !body.Judul
          ? "Judul can't be null"
          : !body.Mata_Kuliah
          ? "Mata Kuliah can't be null"
          : ""
      });
    } else {
      try {
        await Grup_Task.update(
          {
            Judul: body.Judul,
            Mata_Kuliah: body.Mata_Kuliah,
            Deadline: body.Deadline,
            Jam: body.Jam,
          },
          {
            where: {
              UID: uid,
            },
            logging: false,
          }
        );
        res.status(201).json({
          message: "Update data succes",
          data: body,
        });
      } catch (error) {
        res.status(500).json({
          message: "Internal server error",
          serverMessage: error,
        });
      }
    }
  }
};

const deleteTugas = async (req, res) => {
  const uid = req.query.uid;
  const searchTask = await Grup_Task.findByPk(uid, { logging: false });

  if (searchTask === null) {
    res.status(400).json({
      message: "Data tidak ditemukan",
    });
  } else {
    try {
      await Tugas.destroy({
        where: {
          UID: uid,
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
  getAllTugas,
  createTugas,
  deleteTugas,
  updateTugas,
};
