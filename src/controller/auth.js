const Users = require("../models/users");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  const { body } = req;
  const username = body.Username;
  const password = body.Pass;

  try {
    const user = await Users.findOne({
      where: {
        Username: username,
      },
      logging: false,
    });

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "Username tidak ditemukan",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.Pass);

    if (!passwordMatch) {
      return res.status(401).json({
        ok: false,
        message: "Password salah",
      });
    }

    res.json({
      ok: true,
      message: "Login berhasil",
      user: {
        username: user.Username,
        nama: user.Nama,
        role: user.Role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      serverMessage: error,
    });
  }
};

module.exports = { loginUser };
