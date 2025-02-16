import categorySchema from './categories.model.js'

export const test = (req, res)=>{
    console.log('Categories is running')
    res.send({message: 'Categories is running'})
}

export const addCategorie = async(req, res)=>{
    try {
        let data = req.body
        let category = new categorySchema(data)
        await category.save()
        return res.send({message: 'Categorie saved successfully'})
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'General error', e})
    }
}

export const getCategories = async(req, res)=>{
    try {
        let category = await categorySchema.find()
        return res.send(category)
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'General Error'}, e)
    }
}

export const getCategorieById = async(req,res)=>{
    try {
        const {id} = req.params
        const category = await categorySchema.findById(id)
        if (!category) return res.status(404).send(
            {success:false, message: 'Categorie not found'}
        )
        return res.send(
            {success: true,message: 'Categorie found: ',category}
        )
    } catch (e) {
        console.error(e)
        return res.status(500).send(
            {success: false, message: 'General error', error: e}
        )
    }
}

export const updateCategorie = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        if (!id) return res.status(400).send(
            {message:'Your id is incorrect'}
        )
        const updatedCategory = await categorySchema.findByIdAndUpdate(id, data, {new: true})
        if (!updatedCategory) return res.status(404).send(
            {message:'Categorie not found'}
        )
        return res.send({message:'Categorie updated successfully',updatedCategory})
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'General Error', e});
    }
}

export const deleteCategorie = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).send(
            { message: 'Your id is incorrect' }
        )
        const deletedCategory = await categorySchema.findByIdAndDelete(id);
        if (!deletedCategory) return res.status(404).send(
            { message: 'Categorie not found' }
        )
        return res.send({message:'Categorie deleted successfully'})
    } catch (e) {
        console.error(e);
        return res.status(500).send({message:'General Error', e});
    }
}
