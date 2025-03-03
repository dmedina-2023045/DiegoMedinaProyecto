import Product from './product.model.js'
import Categorie from '../categories/categories.model.js'

export const addProduct = async (req, res) => {
    try {
        let { category, ...data } = req.body
        let categorie = await Categorie.findById(category)
        if (!categorie) return res.status(404).send(
            {
                success: false,
                message: 'Category not found'
            }
        )
        let product = new Product({ ...data, category: categorie._id })
        await product.save()
        return res.status(201).send({success: true, message: 'Product saved successfully', product})
    } catch (e) {
        console.error(e)
        return res.status(500).send({success: false, message: 'General error', e})
    }
};


export const getProducts = async (req, res) => {
    try {
        const { category, search, sort } = req.query
        let query = {}
        if (category) {
            query.category = category
        }
        if (search) {
            query.name = {$regex: search, $options: 'i'}
        }
        let sortQuery = {}
        if (sort === 'popular') {
            sortQuery = {sales: -1}
        } else {
            sortQuery = {name: 1}
        }
        const products = await Product.find(query).populate('category', 'name').sort(sortQuery)
        return res.status(200).send({success: true, message: 'Products found: ', products})
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'General Error'}, e)
    }
}

export const getProductById = async(req, res)=>{
    try {
        let {id} = req.params
        let product = await Product.findById(id).populate('category', 'name')
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
            let categorie = await User.findById(data.Categorie)
            if (!categorie) return res.status(400).send(
                    {
                        success: false, 
                        message: 'Product not found' 
                    }
                )
            }
        
        let updatedProduct= await Product.findByIdAndUpdate(id, data, {new:true})
        if(!updatedProduct) return res.status(404).send(
            {
                success: false,
                message:'Product not found'
            }
        )
        return res.send({success: true, message: 'Product updated successfully', updatedProduct})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General Error', e})
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