const Users = require("../models/users");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { body } = req;
  const username = body.Username;
  const password = body.Pass;

  if (!body.Username || !body.Nama || !body.Pass || !body.Role) {
    return res.status(400).json({
      message: "Created Data Failed",
      serverMessage: !body.Username
        ? "Username tidak boleh kosong"
        : !body.Nama
        ? "Nama tidak boleh kosong"
        : !body.Pass
        ? "Pass tidak boleh kosong"
        : !body.Role
        ? "Role tidak boleh kosong"
        : "",
    });
  }

  const existingUser = await Users.findOne({
    where: {
      Username: username,
    },
  });

  if (existingUser) {
    return res.status(401).json({
      ok: false,
      message: "username sudah ada",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const data = await Users.create(
      {
        Username: username.toLowerCase(),
        Nama: body.Nama,
        Pass: hashedPassword,
        Role: body.Role,
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

const updateUsers = async (req, res) => {
  const { body } = req;
  const username = req.query.username;
  const searchUser = await Users.findByPk(username, { logging: false });

  if (searchUser === null) {
    res.status(401).json({
      message: "Data tidak ditemukan",
    });
  } else {
    if (!body.Nama || !body.Pass || !body.Role) {
      return res.status(400).json({
        message: "Created Data Failed",
        serverMessage: !body.Nama
          ? "Nama tidak boleh kosong"
          : !body.Pass
          ? "Password tidak boleh kosong"
          : !body.Role
          ? "Role tidak boleh kosong"
          : "",
      });
    } else {
      try {
        await Users.update(
          {
            Nama: body.Nama,
            Pass: body.Pass,
            Role: body.Role,
          },
          {
            where: {
              Username: username,
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

const deleteUsers = async (req, res) => {
  const username = req.query.username;
  const searchUser = await Users.findByPk(username, { logging: false });

  if (searchUser === null) {
    res.status(400).json({
      message: "Data tidak ditemukan",
    });
  } else {
    try {
      await Users.destroy({
        where: {
          Username: username,
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
  createUser,
  updateUsers,
  deleteUsers,
};
