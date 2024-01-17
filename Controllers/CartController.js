import CartItem from "../Models/CartItem.js";
import Product from "../Models/Product.js";
import PaymentDetails from "../Models/PaymentDetails.js";
import User from "../Models/User.js";
import paymentDetails from "../Models/PaymentDetails.js";
import OrderDetails from "../Models/OrderDetails.js";
import OrderItems from "../Models/OrderItems.js";

export const getCartItems = async (req, res) => {
    try {
        const userId = req.query.id;
        const items = await CartItem.find({ user_id: userId });
        if (!items) return res.status(400).json({ message: "Cart not found." });

        const resItems = await Promise.all(
            items.map(async (item) => {
                const product = await Product.findOne(
                    { _id: item.product_id },
                    "name price images"
                );
                if(product) return {
                    _id: item._id,
                    quantity: item.quantity,
                    name: product.name,
                    price: product.price,
                    images: product.images[0],
                    SKU: product.SKU
                };
            })
        );
        return res
            .status(200)
            .json({ message: "Cart successfully found", resItems });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal sever error." });
    }
};

export const addCartItem = async (req, res) => {
    try {

        const { userId, productData } = req.body;
        const {id, quantity} = productData;

        const params = { user_id: userId, product_id: id };

        const item = await CartItem.findOne(params);
        if (!item) {
            await CartItem.create({
                ...params,
                quantity,
            });
            return res
                .status(200)
                .json({ message: "Item added successfully." });
        }
        await CartItem.findOneAndUpdate(params, {
            quantity: String(Number(item.quantity) + Number(quantity)),
        });
        return res.status(200).json({ message: "Item added successfully." });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal sever error." });
    }
};

