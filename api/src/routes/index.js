const { Router } = require("express");
const chargeDB = require("../../exampleDB.js");
const router = Router();
const { Order, Product, Media, Order_products } = require("../db.js");

router.get("/get-orders", async (req, res) => {
  try {
    const { status } = req.query;
    const validStatus = ["CARRITO", "CONFIRMADA", "ENTREGADA"];
    let response;
    if (status && validStatus.includes(status)) {
      response = await Order.findAll({
        where: {
          status,
        },
        include: { model: Product },
      });
    } else {
      response = await Order.findAll({ include: { model: Product } });
    }
    return res.status(200).json({ data: response });
  } catch (err) {
    const { message } = err;
    return res.status(400).json({ message });
  }
});

router.post("/order-add", async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const [[currentOrder, _created], currentProduct] = await Promise.all([
      Order.findOrCreate({
        where: { status: "CARRITO" },
      }),
      Product.findByPk(productId),
    ]);

    const total = currentProduct.price * quantity;
    await Promise.all([
      currentOrder.addProduct(productId, { through: { quantity } }),
      currentOrder.increment(["total"], { by: total }),
    ]);

    return res.status(200).json({ success: "Prenda agregada correctamente!" });
  } catch (err) {
    const { message } = err;
    return res.status(400).json({ message });
  }
});

router.put("/order-delete", async (req, res) => {
  try {
    const { productId, orderId } = req.body;
    const [currentProduct, currentOrder, currentOrderProduct] =
      await Promise.all([
        Product.findByPk(productId),
        Order.findByPk(orderId),
        Order_products.findOne({
          where: {
            productId,
            orderId,
          },
        }),
      ]);

    await Promise.all([
      currentOrder.decrement(["total"], {
        by: currentProduct.price * currentOrderProduct.quantity,
      }),
      currentOrderProduct.destroy(),
    ]);

    return res.status(200).json({ success: "Prenda removida correctamente!" });
  } catch (err) {
    const { message } = err;
    return res.status(400).json({ message });
  }
});

router.post("/charge-db", async (_req, res) => {
  try {
    const process = chargeDB.map(async (e) => {
      const { name, file, category, stock, price } = e;
      const currentProduct = await Product.create({
        name,
        category,
        stock,
        price,
      });
      const [currentFile, _created] = await Media.findOrCreate({
        where: {
          name: file,
        },
      });
      await currentProduct.addMedia(currentFile.id);
    });
    await Promise.all(process);
    return res
      .status(200)
      .json({ success: "Base de datos cargada correctamente!" });
  } catch (err) {
    const { message } = err;
    return res.status(400).json({ message });
  }
});

router.get("/all-products", async (req, res) => {
  try {
    const { category } = req.query;
    let response;
    if (category) {
      response = await Product.findAll({
        where: { category },
        include: { model: Media },
        through: { attributes: [] },
      });
    } else {
      response = await Product.findAll({
        include: {
          model: Media,
          attributes: ["name"],
          through: { attributes: [] },
        },
      });
    }
    return res.status(200).json({ data: response });
  } catch (err) {
    const { message } = err;
    return res.status(400).json({ message });
  }
});

router.get("/order-confirm", async (_req, res) => {
  try {
    const currentOrder = await Order.findOne({
      where: { status: "CARRITO" },
      include: { model: Product },
    });
    await Promise.all([
      currentOrder.products.map(async (e) => {
        const currentProduct = await Product.findByPk(e.id);
        const currentOrderProduct = await Order_products.findOne({
          where: { orderId: currentOrder.id, productId: currentProduct.id },
        });
        await currentProduct.decrement(["stock"], {
          by: currentOrderProduct.quantity,
        });
      }),
    ]);
    await currentOrder.destroy();
    return res.json({ success: "Orden confirmada!" });
  } catch (err) {
    const { message } = err;
    res.status(400).json({ message });
  }
});

module.exports = router;
