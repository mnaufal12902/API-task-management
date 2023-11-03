const Grup = require("../models/grup");

const getGrup = async (req, res) => {
  const id = req.query.id;
  try {
    const data = await Grup.findAll({
      where: {
        UID_Matkul: id,
      },
      order: [
        ['Name', 'ASC']
      ],
      logging: false,
    });
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

const createGrup = async (req, res) => {
  const { body } = req;

  if (!body.UID_Matkul || !body.Name) {
    return res.status(400).json({
      message: "Created Data Failed",
      serverMessage: !body.UID_Grup
        ? "ID Grup tidak boleh kosong"
        : !body.UID_Matkul
        ? "ID Mata Kuliah tidak boleh kosong"
        : !body.Name
        ? "Name tidak boleh kosong"
        : "",
    });
  }

  try {
    const data = await Grup.create(
      {
        UID_Grup: body.UID_Grup,
        UID_Matkul: body.UID_Matkul,
        Name: body.Name,
      },
      { logging: false }
    );
    res.status(201).json({
      message: "Create data succes",
      data: data,
    });
  } catch (error) {
    res.status(401).json({
      message: "Internal server error",
      serverMessage: error,
    });
  }
};

module.exports = {
  getGrup,
  createGrup,
};
