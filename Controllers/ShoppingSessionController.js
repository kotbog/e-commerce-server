import ShoppingSession from "../Models/ShoppingSession.js";
import CartItem from "../Models/CartItem.js";

export const getCartItems = async (req, res) => {
    try {
        const{id} = req.body;

        const session = ShoppingSession.findOne({user_id: id});

        if (!session) {
            res.status(200);
            return res.json({message: "Session not found"})
        }

        const cartItems = CartItem.find({session_id: session._id});
        res.status(201);
        return res.json({cartItems});

    }catch (e) {
        return res.json({message: e.message})
    }
}