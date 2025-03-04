import Bill from './bills.model.js'
import Product from '../products/product.model.js'
import Cart from '../cart/cart.model.js'

export const addPurchase = async (req, res) => {
    try {
        const {uid} = req.user
        const {nit} = req.body
        const cart = await Cart.findOne({user: uid}).populate('products.product')
        if (!cart || cart.products.length === 0) return res.status(404).send(
            {
                success: false,
                message: 'Cart is empty'
            }
        )
        for (const item of cart.products) {
            const product = await Product.findById(item.product._id)
        if (!product) return res.status(404).send(
                {
                    success: false,
                    message: `Product ${item.product._id} not found`
                }
            )
            if (product.stock < item.quantity) return res.status(400).send(
                {
                    success: false,
                    message: `Not enough stock for product ${product.name}`
                }
            )
        }
        const bill = new Bill({
                user: uid,
                products: cart.products.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            })),
            total: cart.total,
            nit: nit || null
        });
        await bill.save()
        for (const item of cart.products) {
            const product = await Product.findById(item.product._id)
            product.stock -= item.quantity
            await product.save()
        }
        cart.products = []
        cart.total = 0
        await cart.save()
        return res.status(201).send({success: true, message: 'Checkout completed successfully', invoice: bill})
    } catch (e) {
        console.error(e)
        return res.status(500).send({success: false, message: 'Internal server error', e})
    }
}

/* export const updateBill = async (req, res) => {
    try {
        const {billId} = req.params
        const {products} = req.body
        const bill = await Bill.findById(billId);
        if (!bill) return res.status(404).send(
            {
                success: false,
                message: 'Invoice not found'
            }
        )
        for (const item of products) {
            const product = await Product.findById(item.product);
            if (!product) return res.status(404).send(
                {
                    success: false,
                    message: `Product ${item.product} not found`
                }
            )
            if (product.stock < item.quantity) return res.status(400).send(
                {
                    success: false, 
                    message: `Not enough stock for product ${product.name}`
                }
            )
            product.stock -= item.quantity;
            await product.save();
        }
        bill.products = products
        bill.total = products.reduce((sum, item) => sum + item.price * item.quantity, 0)
        await bill.save();
        return res.status(200).send({success: true, message: 'Invoice updated successfully', invoice: bill})
    } catch (e) {
        console.error(e);
        return res.status(500).send({message: 'Internal server error', e})
    }
} */


export const purchaseHistorial = async (req, res) => {
    try {
        const {uid} = req.user
        const bills = await Bill.find({user: uid}).populate('products.product')
        return res.status(200).send({success: true, message: 'Bills:', bills})
    } catch (e) {
        console.error(e)
        return res.status(500).send({success: false, message: 'General error', e})
    }
}

