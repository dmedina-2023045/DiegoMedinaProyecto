import Cart from './cart.model.js'
import Product from '../products/product.model.js';

export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body
        let cart = await Cart.findOne({ user: userId })
        if (!cart) cart = new Cart(
            { 
                user: userId, 
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
        const product = await Product.findById(productId)
        cart.total += product.price * quantity
        await cart.save()
        return res.status(200).send({success: true,message: 'Product added to cart successfully', cart})
    } catch (e) {
        console.error(e)
        return res.status(500).send({success: false, message: 'Internal server error'})
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const {userId, productId} = req.body;
        const cart = await Cart.findOne({ user: userId })
        if (!cart) return res.status(404).send(
            {
                success: false,
                message: 'Cart not found'
            }
        )
        const productIndex = cart.products.findIndex(item => item.product.toString() === productId);
        if (productIndex === -1) return res.status(404).send(
            {
                success: false,
                message: 'Product not found in cart'
            }
        )
        const product = await Product.findById(productId);
        cart.total -= product.price * cart.products[productIndex].quantity
        cart.products.splice(productIndex, 1)
        await cart.save()
        return res.status(200).send({success: true, message: 'Product removed from cart successfully',cart})
    } catch (e) {
        console.error(e);
        return res.status(500).send({success: false, message: 'Internal server error'})
    }
}
