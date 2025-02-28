import Product from './product.model.js'
import Categorie from '../categories/'

export const addProduct = async (req, res) => {
    try {
        let { categories, ...data } = req.body;
        let categorie = await Categorie.findById(categories).populate('categorie', 'name')
        if (!categorie) {
            return res.status(404).send(
                { 
                    success: false,
                    message: 'Categorie not found' 
                }
            )
        }
        let product = new Product({ ...data, categorie:categorie._id });
        await product.save();
        return res.status(201).send({ message: 'Product saved successfully', product });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'General error', e});
    }
};

export const getProducts = async(req ,res)=>{
    try{
        const {limit = 20, skip = 0 } = req.query
        const products = await Product.find().skip(skip).limit(limit)
        if(products.length == 0) return res.status(404).send(
            {
                success: false,
                message:'Products not found'
            }
        )
        return res.send({success: true, message: 'Products found: ', products})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General error', e})
    }
}

export const getProductById = async(req, res)=>{
    try {
        let {id} = req.params
        let product = await Product.findById(id)
        if(!product) return res.status(404).send(
            {
                success: false, message: 'Product not found'
            }
        )
        return res.send({success: true, message: 'Product found: ', product})
    } catch (e) {
        console.error('General error', e)
        return res.status(500).send({message: 'General error', e})
    }
}

export const updateProduct = async(req,res)=>{
    try{
        let {id}= req.params
        let data= req.body
        if (data.Categorie) {
            let categorie = await User.findById(data.Categorie);
            if (!categorie) {
                return res.status(400).send(
                    {
                        success: false, 
                        message: 'Product not found' 
                    }
                )
            }
        }
        let updatedProduct= await Product.findByIdAndUpdate(id, data, {new:true})
        if(!updatedProduct) return res.status(404).send(
            {
                success: false,
                message:'Product not found'
            }
        )
            return res.send({success: true, message: 'Product updated successfully', updatedProduct});
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General Error', e});
    }
}

export const deleteProduct = async(req, res)=>{
    try {
        const {id} = req.params
        const deletedProduct= await Product.findByIdAndDelete(id)
        if (!deletedProduct)return res.status(404).send(
            {
                success: false,
                message: 'Product not found'
            }
        )
            return res.send({sucess: true, message: 'Product deleted succesfully'})
    } catch (e) {
        console.error(e);
        return res.status(500).send({message: 'General Error', e})
    }   
}