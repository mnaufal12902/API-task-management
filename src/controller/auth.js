const Users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { body } = req;
  const username = body.Username;
  const password = body.Pass;

  let generatedToken;

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

    generatedToken = jwt.sign(
      { user: { Username: user.Username, Nama: user.Nama, Role: user.Role } },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({
      ok: true,
      message: "Login berhasil",
      user: {
        username: user.Username,
        nama: user.Nama,
        role: user.Role,
        token: generatedToken || null,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      serverMessage: error,
    });
  }
};

const updatePasswordUser = async (req, res) => {
  const { body, headers } = req;
  const token = headers.authorization;
  const username = req.query.username;
  const searchUser = await Users.findByPk(username, { logging: false });

  let role;

  if (!token) {
    res.status(401).json({
      message: "Token tidak tersedia",
    });
    return;
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    role = decoded.user.Role;
    if (err) {
       res.status(401).json({
        message: "Token tidak valid",
      });
      return;
    }
  });

  console.log(role)

  if (role !== "Ketua Kelas") {
    res.status(401).json({
      message: "Akses ditolak"
    });
    return;
  }

  if (body.Pass === undefined) {
    res.status(401).json({
      message: "Internal server error",
      serverMessage: "Password cannot be null",
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(body.Pass, 10);

  if (searchUser === null) {
    res.status(401).json({
      message: "Data tidak ditemukan",
    });
    return;
  } else {
    try {
      await Users.update(
        {
          Pass: hashedPassword,
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
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        serverMessage: error,
      });
    }
  }
};

module.exports = { loginUser, updatePasswordUser };
