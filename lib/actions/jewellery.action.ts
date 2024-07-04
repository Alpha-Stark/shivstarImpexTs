"use server"
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import { revalidatePath } from "next/cache";
import Jewellery from "../database/models/jewellery.model";
import exp from "constants";

type jewelleryPropSchema = {
    _id?: string;
    name: string;
    description: string;
    price: string;
    photo: string;
    height: string;
    width: string;
    carat: string;
    weight: string;
    material: string;
    certificate: string;
};

export const createJewellery = async (jewellery: jewelleryPropSchema) => {
    try {
        await connectToDatabase();
        const newJewellery = await Jewellery.create(jewellery);

        return JSON.parse(JSON.stringify(newJewellery));
    } catch (error) {
        handleError(error);
    }
}

export async function getJewelleryById(jewelleryId: string) {
    try {
        await connectToDatabase();

        const jewellery = await Jewellery.findById(jewelleryId);

        if (!jewellery) throw new Error("Jewellery not found");
        return JSON.parse(JSON.stringify(jewellery));
    } catch (error) {
        handleError(error);
    }
}

export async function updateJewellery(jewelleryId: string, jewellery: jewelleryPropSchema) {
    try {
        await connectToDatabase();

        const updatedJewellery = await Jewellery.findOneAndUpdate({ _id: jewelleryId }, jewellery, { new: true });

        if (!updatedJewellery) throw new Error("Jewellery update failed");

        return JSON.parse(JSON.stringify(updatedJewellery));
    }
    catch (error) {
        handleError(error);
    }
}

type DeleteJewelleryParams = {
    jewelleryId: string;
    path: string;
}

export async function deleteJewellery({ jewelleryId, path }: DeleteJewelleryParams) {
    try {
        await connectToDatabase();

        const deletedJewellery = await Jewellery.findByIdAndDelete(jewelleryId);
        if (deletedJewellery) revalidatePath(path)
        // return JSON.parse(JSON.stringify(deletedJewellery));
    }
    catch (error) {
        handleError(error);
    }
}

export async function getAllJewellery() {
    try {
        await connectToDatabase();

        const jewellery = await Jewellery.find();

        return JSON.parse(JSON.stringify(jewellery));
    }
    catch (error) {
        handleError(error);
    }
}

export async function getJewelleryByMaterial(material: string) {
    try {
        await connectToDatabase();

        const jewellery = await Jewellery.find({ material });

        return JSON.parse(JSON.stringify(jewellery));
    }
    catch (error) {
        handleError(error);
    }
}

export async function getJewelleryByCarat(carat: string) {
    try {
        await connectToDatabase();

        const jewellery = await Jewellery.find({ carat });

        return JSON.parse(JSON.stringify(jewellery));
    }
    catch (error) {
        handleError(error);
    }
}

export async function getJewelleryByWeight(weight: string) {
    try {
        await connectToDatabase();

        const jewellery = await Jewellery.find({ weight });

        return JSON.parse(JSON.stringify(jewellery));
    }
    catch (error) {
        handleError(error);
    }
}

export async function getJewelleryByPrice(price: string) {
    try {
        await connectToDatabase();

        const jewellery = await Jewellery.find({ price });

        return JSON.parse(JSON.stringify(jewellery));
    }
    catch (error) {
        handleError(error);
    }
}

export async function getJewelleryByCertificate(certificate: string) {
    try {
        await connectToDatabase();

        const jewellery = await Jewellery.find({ certificate });

        return JSON.parse(JSON.stringify(jewellery));
    }
    catch (error) {
        handleError(error);
    }
}

export async function getJewelleryByWidth(width: string) {
    try {
        await connectToDatabase();

        const jewellery = await Jewellery.find({ width });

        return JSON.parse(JSON.stringify(jewellery));
    }
    catch (error) {
        handleError(error);
    }
}

export async function getJewelleryByHeight(height: string) {
    try {
        await connectToDatabase();

        const jewellery = await Jewellery.find({ height });

        return JSON.parse(JSON.stringify(jewellery));
    }
    catch (error) {
        handleError(error);
    }
}

type GetAllJewelleryParams = {
    query: string
    limit: number
    page: number
}

export async function getAllJewelleryPag({ query, limit = 8, page }: GetAllJewelleryParams) {
    try {
        await connectToDatabase();

        const nameCondition = query ? { name: { $regex: query, $options: 'i' } } : {};
        const conditions = {
            $and: [nameCondition],
        };

        const skipAmount = (Number(page) - 1) * limit;
        const jewelleryQuery = Jewellery.find(conditions)
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(limit)
            .exec(); //exec() is used to return a promise

        const jewelleryCount = await Jewellery.countDocuments(conditions);
        const jewellery = await jewelleryQuery;

        return {
            data: JSON.parse(JSON.stringify(jewellery)),
            totalPages: Math.ceil(jewelleryCount / limit),
        };
        /* const jewellery = await Jewellery.find(conditions).limit(limit).skip(limit * page);
        return JSON.parse(JSON.stringify(jewellery)); */
    } catch (error) {
        handleError(error);
    }
}


