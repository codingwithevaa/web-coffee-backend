const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

class Controller {
  static async registerUser(req, res) {
    const body = req.body;
    const { username, email, password, nama, noTelepon, alamat, isSeller = false } = body;

    try {
      const newUser = await User.create({
        username,
        email,
        password,
        nama,
        noTelepon,
        alamat,
        isSeller,
      });

      res.status(201).json({ message: "Akun berhasil dibuat, silahkan login!", newUser });
    } catch (error) {
      console.log(`Error menambahkan User: ${error}`);
      res.status(500).json(error);
    }
  }

  static async loginUser(req, res) {
    const body = req.body;
    const { email, password } = body;
    const secret = "caffe-web";

    try {
      const loginUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!loginUser) {
        //Jika email yang diinput salah atau tidak valid
        return res.status(403).json("Salah Email/Password!");
      }

      //Jika email ada, lanjut membandingkan inputan dengan password yang telah dihash
      const validation = bcrypt.compareSync(password, loginUser.password);

      if (validation) {
        const token = jwt.sign(
          {
            id: loginUser.id,
            email: loginUser.email,
          },
          secret
        );

        res.status(200).json({ message: "Berhasil login!", data: { token, isSeller: loginUser.isSeller } });
      } else {
        //Jika password yang diinput salah atau tidak valid
        return res.status(403).json("Salah Email/Password!");
      }
    } catch (error) {
      console.error(`Error:`, error);
      res.status(500).json(error);
    }
  }

  static async getUserProfile(req, res) {
    const userId = req.userId; // Ambil ID pengguna

    try {
      const userProfile = await User.findByPk(userId, {
        attributes: { exclude: ["password"] }, // Jangan sertakan password
      });

      if (!userProfile) {
        return res.status(404).json({ message: "Profil pengguna tidak ditemukan" });
      }

      res.status(200).json({ userProfile });
    } catch (error) {
      console.error(`Error saat mengambil profil pengguna:`, error);
      res.status(500).json(error);
    }
  }

  static async updateUserProfile(req, res) {
    const userId = req.userId; // Ambil ID pengguna
    const updatedData = req.body; // Data yang akan diperbarui
    const { username, email, password, nama, noTelepon, alamat } = updatedData;

    let response;
    try {
      const updateProfile = await User.update(
        {
          username,
          email,
          password,
          nama,
          noTelepon,
          alamat,
        },
        {
          where: {
            id: userId,
          },
        }
      );

      const Result = await User.findOne({
        where: {
          id: userId,
        },
        attributes: { exclude: ["password"] },
      });

      response = Result;

      if (!Result) {
        return res.status(404).json({ message: "Profil pengguna tidak ditemukan" });
      }

      res.status(200).json({ message: "Profil pengguna berhasil diperbarui", Result });
    } catch (error) {
      console.error(`Error saat memperbarui profil pengguna:`, error);
      res.status(500).json(error);
    }
  }

  static async getUser(req, res) {
    try {
      const Users = await User.findAll();
      res.status(200).json({ message: "Daftar USer", data: Users });
    } catch (error) {
      console.log(`Error menampilkan Daftar User! ${error}`);
      res.status(500).json(error);
    }
  }

  static async deleteUser(req, res) {
    const userId = Number(req.params["id"]);

    let response;
    try {
      const Users = await User.destroy({
        where: {
          id: userId,
        },
      });

      response = `${Users} User berhasil dihapus, dengan ID: ${userId}`;
      if (!Users) {
        return res.status(404).json({ message: "User tidak ditemukan" });
      }
    } catch (error) {
      console.log(`Error menghapus User! ${error}`);
      response = JSON.stringify(error);
    }

    res.status(200).json(response);
  }
}

module.exports = Controller;
