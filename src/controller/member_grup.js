const Member_Grup = require("../models/member_grup");

const getGrupMember = async (req, res) => {
  const id = req.query.grup
  try {
    const data = await Member_Grup.findAll({where: {
      UID_Grup: id
    }, logging: false });
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

const createGrupMember = async (req, res) => {
  const { body } = req;

  if (!body.UID_Grup || !body.Nama) {
    return res.status(400).json({
      message: "Created Data Failed",
      serverMessage: !body.ID_Member
        ? "ID Member tidak boleh kosong"
        : !body.UID_Grup
        ? "ID Grup tidak boleh kosong"
        : !body.Nama
        ? "Nama tidak boleh kosong"
        : "",
    });
  }

  try {
    const data = await Member_Grup.create(
      {
        ID_Member: body.ID_Member,
        UID_Grup: body.UID_Grup,
        Nama: body.Nama,
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

const updateGrupMember = async (req, res) => {
  const { body } = req;
  const id = req.query.id;
  const searchUser = await Member_Grup.findByPk(id, { logging: false });

  if (searchUser === null) {
    res.status(401).json({
      message: "Data tidak ditemukan",
    });
  } else {
    if (!body.Nama) {
      return res.status(400).json({
        message: "Created Data Failed",
        serverMessage: !body.Nama
          ? "Nama tidak boleh kosong"
          : "",
      });
    } else {
      try {
        await Member_Grup.update(
          {
            Nama: body.Nama
          },
          {
            where: {
              ID_Member: id,
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

const deleteGrupMember = async (req, res) => {
  const ID_Member = req.query.id;
  const searchUser = await Member_Grup.findByPk(ID_Member, { logging: false });

  if (searchUser === null) {
    res.status(400).json({
      message: "Data tidak ditemukan",
    });
  } else {
    try {
      await Member_Grup.destroy({
        where: {
          ID_Member: ID_Member,
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
  getGrupMember,
  createGrupMember,
  updateGrupMember,
  deleteGrupMember
};
