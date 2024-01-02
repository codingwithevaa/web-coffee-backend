
const { OrderMenu, Order, Menu, User, sequelize } = require("../models"); //Import Sequelize to apply create, update, findAll, findOne, delete method
// const menu = require("../models/menu");

class Controller {
    static async createOrder(req, res) {
        /*  INPUTAN POSTMAN
            {
            "order": [
                    {
                        "menuID": 2,
                        "quantity": 2
                    },
                    {
                        "menuID": 1,
                        "quantity": 1
                    }
            ]
            }
        */
        const { order } = req.body;
        const userId = req.userId;

        const t = await sequelize.transaction();

        try {
            const saved_order = await Order.create(
                { userID: userId, totalHarga: 1, status: "waiting" },
                { transaction: t }
            );

            let total_harga = 0;

            for await (const ord of order) {
                const menu = await Menu.findByPk(ord.menuID, { transaction: t });
                const subtotal = menu.harga * ord.quantity;

                await OrderMenu.create(
                    {
                        orderID: saved_order.id,
                        menuID: ord.menuID,
                        quantity: ord.quantity,
                        harga: subtotal,
                    },
                    { transaction: t }
                );

                total_harga = total_harga + subtotal;
            }

            await Order.update(
                { totalHarga: total_harga, status: "done" },
                { where: { id: saved_order.id }, transaction: t }
            );



            //   await t.rollback();
            await t.commit();
            res.status(201).json({
                message: `order dengan total harga Rp ${total_harga} berhasil dibuat`,
                // data: null,
            });
        } catch (error) {
            await t.rollback();
            console.log(`Error menambahkan Menu ke dalam Keranjang! ${error}`);
            res.status(500).json(error);
        }
    }
}

module.exports = Controller;
