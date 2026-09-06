import Product from '../models/product.model.js';


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);
    } catch (error) {
        console.log("Error in getProducts controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getProductById = async (req, res) => {

    const product = req.params.id;

    try {

        const FoundProduct = await Product.findById(product);

        if (!FoundProduct) {
            return res.status(404).json({ message: "Product not found." });
        }



        res.status(200).json(FoundProduct);

    } catch (error) {
        console.log("Error in getProductById controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            image,
            category,
            available
        } = req.body;

        if (!name || !description || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newProduct = await Product.create({
            name,
            description,
            price,
            image,
            category,
            available
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.log("Error in createProduct: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateProduct = async (req, res) => {

    const productId = req.params.id;
     const {
            name,
            description,
            price,
            image,
            category, 
            available,
        } = req.body;

    try {

        const updatedProduct = await Product.findByIdAndUpdate(productId,
      {
        name,
        description,
        price,
        image,
        category,
        available
      },
      {
        new: true, // returns updated document
        runValidators: true,
      });

       if(!updatedProduct){
            return res.status(404).json({message: "Product not found."});
        }
        


        res.status(200).json(updatedProduct);

    } catch (error) {
        console.log("Error in updateProduct controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = req.params.id;

        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        await Product.findByIdAndDelete(product);

        res.status(200).json({ message: "Product deleted successfully!" })
    } catch (error) {
        console.log("Error in deleteProduct controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}