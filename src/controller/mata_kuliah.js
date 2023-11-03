const Mata_Kuliah = require("../models/mata_kuliah");

const getMatkul = async (req, res) => {
  try {
    const data = await Mata_Kuliah.findAll({ logging: false });
    res.json({
      message: "Get data succes",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      serverMessage: error,
    });
  }
};

const createMatkul = async (req, res) => {
    const {body} = req;

    if (!body.Mata_Kuliah) {
        return res.status(400).json({
          message: "Created Data Failed",
          serverMessage: !body.Mata_Kuliah
            ? "Matab Kuliah tidak boleh kosong"
            : !body.UID_Matkul
            ? "UID Matkul tidak boleh kosong"
            :  "",
        });
      }

    try {
        const data = await Mata_Kuliah.create(
            { 
                UID_Matkul: body.UID_Matkul,
                Mata_Kuliah: body.Mata_Kuliah
            },
            { logging: false }
          );
          res.status(201).json({
            message: "Create data succes",
            data: data
          })
    } catch (error) {
        res.status(401).json({
            message: "Internal server error",
            serverMessage: error
        })
    }
}

module.exports = {
  getMatkul,
  createMatkul,

};
