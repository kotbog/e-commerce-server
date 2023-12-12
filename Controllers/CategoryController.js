import ProductCategoryModel from "../Models/ProductCategory.js";

export const addCategory = async (req, res) => {
    try {
        const{name, desc} = req.body;
        const existingCategory = await ProductCategoryModel.findOne({name});

        if(existingCategory) {
            res.status(200);
            return res.json({message: 'There is already name with category: ' + name});
        }

        const newCategory = await ProductCategoryModel.create({
            name,
            desc
        })
        res.status(201);
        return res.json({message: 'Category successfully added', newCategory})
    } catch (e) {
        console.error(e);
    }
}

export const getCategory = async (req, res) => {
    try {
        const {params} = req.body;
        const categories = await ProductCategoryModel.find(params, 'name');
        if(!categories) {
            res.status(200);
            return res.json({message: 'There is no categories with such params.'});
        }
        return res.json(categories).status(201);
    } catch(e) {console.error(e);}
}