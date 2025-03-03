import Cart from './cart.model.js'
import Product from '../products/product.model.js'

export const addToCart = async (req, res) => {
    try {
        const {productId, quantity} = req.body
        const {uid} = req.user
        const product = await Product.findById(productId)
        if (!product) return res.status(404).send(
            {
                success: false,
                message: 'Product not found'
            }
        )
        let cart = await Cart.findOne({user: uid})
        if (!cart) cart = new Cart(
            {
                user: uid, 
                products: [],
                total: 0
            }
        )
        const productIndex = cart.products.findIndex(item => item.product.toString() === productId)
        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity
        } else {
            cart.products.push({ product: productId, quantity })
        }
        cart.total += product.price * quantity
        await cart.save()
        return res.status(200).send({success: true, message: 'Product added to cart successfully', cart})
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'General error', e})
    }
}

export const getCart = async (req, res) => {
    try {
        const {uid} = req.user
        const cart = await Cart.findOne({user: uid}).populate('products.product', 'name price')
        if (!cart) return res.status(404).send(
            {
                success: false,
                message: 'Cart not found'
            }
        )
        return res.status(200).send({success: true, message: 'Cart:', cart})
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'General error'}, e)
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const {productId} = req.body
        const {uid} = req.user
        const cart = await Cart.findOne({user: uid})
        if (!cart) return res.status(404).send(
            {
                success: false,
                message: 'Cart not found'
            }
        )
        const productIndex = cart.products.findIndex(item => item.product.toString() === productId)
        if (productIndex === -1) return res.status(404).send(
            {
                success: false,
                message: 'Product not found in cart'
            }
        )
        const product = await Product.findById(productId);
        if (!product) return res.status(404).send(
            {
                success: false,
                message: 'Product not found in database'
            }
        )
        if (product.stock < item.quantity) return res.status(400).send(
            {
                success: false,
                message: `Not enough stock for product ${product.name}`
            }
        )
        cart.total -= product.price * cart.products[productIndex].quantity;
        cart.products.splice(productIndex, 1)
        await cart.save()
        return res.status(200).send({success: true, message: 'Product removed from cart successfully', cart})
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'General error', e})
    }
}

