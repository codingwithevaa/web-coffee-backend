const { Menu } = require("../models");

class Controller {
  static async addMenu(req, res) {
    const body = req.body;
    const { namaMenu, kategori, harga, image } = body;

    try {
      const Menus = await Menu.create({
        namaMenu,
        kategori,
        harga,
        image,
      });

      res.status(201).json(Menus);
    } catch (error) {
      console.log(`Error menambahkan Menu! ${error}`);
      res.status(500).json(error);
    }
  }

  static async getMenu(req, res) {
    try {
      const Menus = await Menu.findAll();
      res.status(200).json({ message: "Daftar Menu", data: Menus });
    } catch (error) {
      console.log(`Error menampilkan Menu! ${error}`);
      res.status(500).json(error);
    }
  }

  static async getMenuId(req, res) {
    const id = Number(req.params["id"]);
    let response;
    try {
      const Menus = await Menu.findOne({
        where: {
          id: id,
        },
      });

      response = Menus;
      if (!Menus) {
        return res.status(404).json({ message: "Menu tidak ditemukan" });
      }
    } catch (error) {
      console.log(`Error menampilkan Menu ID! ${error}`);
      response = JSON.stringify(error);
    }

    res.status(200).json(response);
  }

  static async updateMenuByID(req, res) {
    const menuID = Number(req.params["id"]);
    const body = req.body;
    const { namaMenu, kategori, harga, image } = body;

    let response;
    try {
      const Menus = await Menu.update(
        { namaMenu, kategori, harga, image },
        {
          where: {
            id: menuID,
          },
        }
      );

      const Result = await Menu.findOne({
        where: {
          id: menuID,
        },
      });

      response = Result;

      if (!Result) {
        return res.status(404).json({ message: "Menu tidak ditemukan" });
      }
      if (response) {
        res.status(200).json({ message: "Data berhasil diupdate!", response });
      } else {
        res.status(200).json({ message: "Data gagal diupdate!", response });
      }
    } catch (error) {
      //Output jika ID tidak diisi dan lainnya
      console.log(`Error mengupdate menu! ${error}`);
      res.status(500).json(error);
    }
  }

  static async deleteMenu(req, res) {
    const menuID = Number(req.params["id"]);

    let response;
    try {
      const Menus = await Menu.destroy({
        where: {
          id: menuID,
        },
      });

      response = `${Menus} Menu berhasil dihapus, dengan ID: ${menuID}`;
      if (!Menus) {
        return res.status(404).json({ message: "Menu tidak ditemukan" });
      }
    } catch (error) {
      console.log(`Error menghapus Menu! ${error}`);
      response = JSON.stringify(error);
    }

    res.status(200).json(response);
  }
}

module.exports = Controller;
