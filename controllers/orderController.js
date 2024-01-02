const { OrderMenu, Order, Menu, User, sequelize } = require("../models");

class Controller {
  static async getHistoryOrder(req, res) {
    const t = await sequelize.transaction();
    try {
      const userId = req.userId;
      const user = await User.findByPk(userId);
      if (user.isSeller) {
        const orderGetted = await Order.findAll(
          {
            include: [
              {
                model: OrderMenu,
                include: {
                  model: Menu,
                },
              },
              {
                model: User,
                attributes: ["id", "nama", "alamat"],
              },
            ],
          },
          { transaction: t }
        );
        res.status(200).json(orderGetted);
      } else {
        // For users, retrieve their own orders
        const orderGetted = await Order.findAll(
          {
            where: { userId }, // Filter orders by user ID
            include: [
              {
                model: OrderMenu,
                include: {
                  model: Menu,
                },
              },
            ],
          },
          { transaction: t }
        );
        res.status(200).json(orderGetted);
      }

      //console.log(JSON.stringify(orderGetted, null, 2)); //Check data di Console
      await t.commit();
    } catch (error) {
      await t.rollback();
      console.log(`Error menampilkan History Order! ${error}`);
      res.status(500).json(error);
    }
  }
}

module.exports = Controller;
