"use server";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import { revalidatePath } from "next/cache";
import Product from "@/lib/database/models/product.model";

type productPropSchema = {
    _id?: string;
    name: string;
    description: string;
    price: string;
    photo: string;
    colorFrom: string;
    colorTo: string;
    clarityFrom: string;
    clarityTo: string;
    cut: string;
    fluorescence: string;
    shape: string;
    certificate: string;
};


export const createProduct = async (product: productPropSchema) => {
    try {
        await connectToDatabase();
        const newProduct = await Product.create(product);

        return JSON.parse(JSON.stringify(newProduct));
    } catch (error) {
        handleError(error);
    }
};

export async function getProductById(productId: string) {
    try {
        await connectToDatabase();

        const product = await Product.findById(productId);

        if (!product) throw new Error("Product not found");
        return JSON.parse(JSON.stringify(product));
    } catch (error) {
        handleError(error);
    }
}

export async function updateProduct(productId: string, product: productPropSchema) {
    try {
        await connectToDatabase();

        const updatedProduct = await Product.findOneAndUpdate({ _id: productId }, product, { new: true });

        if (!updatedProduct) throw new Error("Product update failed");
        return JSON.parse(JSON.stringify(updatedProduct));
    } catch (error) {
        handleError(error);
    }
}

type DeleteProductParams = {
    productId: string
    path: string
}

export async function deleteProduct({ productId, path }: DeleteProductParams) {
    try {
        await connectToDatabase();

        // Find product to delete
        const deleteProduct = await Product.findByIdAndDelete(productId);

        if (deleteProduct) revalidatePath(path);

        /* // Delete product
        const deletedProduct = await Product.findByIdAndDelete(productToDelete._id);


        return deletedProduct ? JSON.parse(JSON.stringify(deletedProduct)) : null; */

    } catch (error) {
        handleError(error);
    }
}

/* export async function getAllProducts() {
    try {
        await connectToDatabase();
        const products = await Product.find();

        return JSON.parse(JSON.stringify(products));
    } catch (error) {
        handleError(error);
    }
} */

/* export async function getAllProducts(query = '') {
    try {
        await connectToDatabase();
        const products = await Product.find({
            name: { $regex: query, $options: 'i' } // Case-insensitive search by name
        }).exec();

        return JSON.parse(JSON.stringify(products));
    }
    catch (error) {
        handleError(error);
    }
} */


export async function getAllProducts() {
    try {
        await connectToDatabase();
        const products = await Product.find();

        return JSON.parse(JSON.stringify(products));
    } catch (error) {
        handleError(error);
    }
}

type GetAllProductsParams = {
    query: string
    limit: number
    page: number
}

export async function getAllProductsPag({ query, limit = 8, page }: GetAllProductsParams) {
    try {
        await connectToDatabase();

        const nameCondition = query ? { name: { $regex: query, $options: 'i' } } : {};
        const conditions = {
            $and: [nameCondition],
        };

        const skipAmount = (Number(page) - 1) * limit;
        const productsQuery = Product.find(conditions)
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(limit)
            .exec(); // Added exec to return a promise

        const productsCount = await Product.countDocuments(conditions);
        const products = await productsQuery;

        return {
            data: JSON.parse(JSON.stringify(products)),
            totalPages: Math.ceil(productsCount / limit),
        };
    } catch (error) {
        handleError(error);
    }
}





/* export async function getAllProductsPag({ query, limit = 6, page }: GetAllProductsParams) {
    try {
        await connectToDatabase()

        const titleCondition = query ? { title: { $regex: `.*${query}.*`, $options: 'i' } } : {};
        const conditions = {
            $and: [titleCondition],
        };

        // Understand why there is no await in the below statement
        const skipAmount = (Number(page) - 1) * limit
        const productsQuery = Product.find(conditions)
            .sort({ createdAt: 'desc' }) //change in a way because we dont have createdAt field in product model
            .skip(skipAmount)
            .limit(limit)
        // Event.find() method in Mongoose returns a Query object, not a promise. Therefore, you don't need to use await in this specific context. if we want to use await keyword, then we had to add .exec() method at the end, which returns promise.

        // const products = await populateEvent(productsQuery);
        // We need total no of events received, as from it we can implement pagination.
        const productsCount = await Product.countDocuments(conditions);

        return {
            // data: JSON.parse(JSON.stringify(products)),
            data: JSON.parse(JSON.stringify(productsQuery)),
            totalPages: Math.ceil(productsCount / limit),
        }
    } catch (error) {
        handleError(error);
    }
} */
