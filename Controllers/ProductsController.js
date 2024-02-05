import ProductModel from '../Models/Product.js'
import {convertToBase64} from "../util/ConvertToBase64.js";
import * as multiparty from 'multiparty';




export const getProductByID = async (req, res) => {
    try {
        const id = req.params['id'];

        const product = await ProductModel.findById(id);

        if (!product) {
            return res.json({message: "There is no product with id: " + id}).status(200);
        }

        res.json(product).status(201);
    } catch (e) {
        console.error(e);
    }
}

export const addProduct = async (req, res) => {
    console.log('add')
    try {
        let form = new multiparty.Form();        
        form.parse(req, async (err, fields, files) => {
            const{name, SKU, price, desc, category} = fields;
            console.log(fields)
            const{imgs} = files;
            const base64Images = convertToBase64(imgs);     
            const product = await ProductModel.create({
                name: name[0],
                desc: desc[0],
                price: price[0],
                SKU: SKU[0],
                images: base64Images,
                category: category[0]
            });
            return res.status(201).json({message: "User successfully added", product});
        })
    } catch (e) {
        console.log('Error parsing JSON:', error, data);
    }
}

export const getProducts = async (req, res) => {
    try {
        const params = req.query;

        const products = await ProductModel.find(params, 'name price images _id');

        if(!products) {
            return res.status(201).json({message: 'Not found such product'});
        }
        return res.status(201).json({message: 'Products successfully found', products});
    } catch (e) {
        console.error(e);
    }
}

export const removeProduct = async (req, res) => {
    try {
        const id = req.params['id'];
        const productDel = await ProductModel.findOneAndDelete({ _id: id });
        if(!productDel) {
            return res.json({message: "There is no product with id: " + id}).status(200);
        }
        res.status(201);
        return res.json({message: 'Product successfully deleted'});
    } catch(e) {
        console.error(e);
    }
}

export const updateProduct = async (req, res) => {
    try {
        const id = req.params['id'];
        let form = new multiparty.Form();
        form.parse(req, async (err, fields, files) => {
            const{name, SKU, price, desc, category} = fields;
            const{imgs} = files;
            let updates = { // data to update
                name: name[0],
                desc: desc[0],
                price: price[0],
                SKU: SKU[0],
                category: category[0]
            };
            if(imgs) updates.images = convertToBase64(imgs);
                
            const product = await ProductModel.findByIdAndUpdate({_id: id}, updates);
            if(!product) {
                return res.json({message: "There is no product with id: " + id}).status(200);
            }
            return res.json({message: 'Product successfully updated'}).status(201); 
        });       
    } catch(e) {
        console.error(e);
    }
}


export const searchProduct = async (req, res) => {
    try {
        const reqName = req.query.name;
        const products = await ProductModel.find({name: new RegExp(reqName, 'i')});
        if(!products || !products.length) return res.status(400).json({error: true, message: "Products not found."})
        return res.status(200).json({error: false, message: "Products found successfully.", products})
    } catch (e) {
        console.error(e);
    }
}





