import categorieSchema from './categories.model.js'

export const test = (req, res)=>{
    console.log('Categories is running')
    res.send({message: 'Categories is running'})
}

export const addCategorie = async(req, res)=>{
    try {
        let data = req.body
        let categorie = new categorieSchema(data)
        await categorie.save()
        return res.send({message: 'Categorie saved successfully'})
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'General error', e})
    }
}

export const getCategories = async(req, res)=>{
    try {
        let categorie = await categorieSchema.find()
        return res.send(categorie)
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'General Error'}, e)
    }
}

export const getCategorieById = async(req,res)=>{
    try {
        const {id} = req.params
        const category = await categorieSchema.findById(id)
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
        const updatedCategory = await categorieSchema.findByIdAndUpdate(id, data, {new: true})
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
        const deletedCategory = await categorieSchema.findByIdAndDelete(id);
        if (!deletedCategory) return res.status(404).send(
            { message: 'Categorie not found' }
        )
        return res.send({message:'Categorie deleted successfully'})
    } catch (e) {
        console.error(e);
        return res.status(500).send({message:'General Error', e});
    }
}
