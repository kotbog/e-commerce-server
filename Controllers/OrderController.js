import User from "../Models/User.js";
import OrderDetails from "../Models/OrderDetails.js";
import OrderItems from "../Models/OrderItems.js";
import product from "../Models/Product.js";
import {compileETag} from "express/lib/utils.js";
import {populate} from "dotenv";

export const checkoutOrder = async (req, res) => {
    try {
        console.log(req.body);
        const {user, items} = req.body;
        let sum = 0;
        items.map(item => {
            sum += Number(item.price) * Number(item.quantity);
        })
        const exUser = user._id
            ? await User.findOne({_id: user._id})
            : await User.create({...user, role: "Unauthorised"});
        const order_details = await OrderDetails.create({user: exUser._id, total: sum});
        items.map(async (item) => {
            await OrderItems.create({
                order: order_details._id,
                product: item._id,
                quantity: item.quantity
            });
        })
        return res.status(200).json({error: false, message: "Order sent"});
    } catch (e) {
        console.error(e);
        return res.status(500).json({error: true, message: "Internal sever error." });
    }
}



export const getOrderById  = async (req, res) => {
    try {
        const id = req.params.orderId;
        const order = await OrderItems
            .find({order: id})
            .populate({
                path: 'order',
                populate: {path: 'user'},
            })
            .populate('product')
        return res.json({order})
    } catch (e) {
        console.error(e);
        return res.status(500).json({error: true, message: "Internal sever error." });
    }
}


export const getOrders = async (req, res) => {
    try {
        const params = req.body.params;
        const orders = await OrderItems.find(params)
            .limit(30)
            .populate({
                path: 'order',
                populate: {path: 'user'}
            })
        return res.status(201).json({error: false, orders});
    } catch (e) {
        console.error(e);
        return res.status(500).json({error: true, message: "Internal sever error." });
    }
}
export const getOrderDetails = async (req, res) => {
    try {
        const orders = await OrderDetails.find().limit(30).populate('user');
        if(!orders) return res.status(400).json({error: true, message: "Orders not found." });
        return res.status(200).json({error: false, orders})
    } catch (e) {
        console.error(e);
        return res.status(500).json({error: true, message: "Internal sever error." });
    }
}


export const updateOrderStatus = async (req, res) => {
    try {
        console.log(req.body);
        const {id, status} = req.body;

        const updated = await OrderDetails.findByIdAndUpdate({_id: id}, {status});
        if(!updated) return res.status(400).json({error: true, message: "Status update failed." })
        return res.status(200).json({error: false, message: "Status updated successfully." })
    } catch (e) {
        console.error(e);
        return res.status(500).json({error: true, message: "Internal sever error." });
    }
}

export const updateOrders = async (req, res) => {
    try {
        const updates = req.body;
        await OrderDetails.updateMany(updates);
    } catch (e) {
        console.error(e);
        return res.status(500).json({error: true, message: "Internal sever error." });
    }
}