import { revalidatePath } from "next/cache";


import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import { CreateUserParams, UpdateUserParams } from "@/types";
import User from "../database/models/userModel";


export async function createUser(user: CreateUserParams) {
    //** refer docs on serverless function (https://vercel.com/docs/functions/serverless-functions)
    try {
        await connectToDatabase(); //cached connection.
        const newUser = await User.create(user);

        return JSON.parse(JSON.stringify(newUser)); //we do this to return a general Javascript object of the user and not the mongodb document.
    } catch (error) {
        handleError(error);
    }
}

export async function getUserByClerkId(clerkId: string) {
    try {
        await connectToDatabase();

        const user = await User.findOne({ clerkId });

        if (!user) throw new Error("User not found");
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        handleError(`Errorr: ${error}`);
    }
}

export async function getUserById(userId: string) {
    try {
        await connectToDatabase();

        const user = await User.findById(userId);

        if (!user) throw new Error("User not found");
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        handleError(error);
    }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
    try {
        await connectToDatabase();

        const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true });

        if (!updatedUser) throw new Error("User update failed");
        return JSON.parse(JSON.stringify(updatedUser));
    } catch (error) {
        handleError(error);
    }
}

export async function deleteUser(clerkId: string) {
    try {
        await connectToDatabase();

        // Find user to delete
        const userToDelete = await User.findOne({ clerkId });

        if (!userToDelete) {
            throw new Error("User not found");
        }

        /*  // Unlink relationships
        await Promise.all([
            // Update the 'events' collection to remove references to the user
            Event.updateMany({ _id: { $in: userToDelete.events } }, { $pull: { organizer: userToDelete._id } }),

            // Update the 'orders' collection to remove references to the user
            Order.updateMany({ _id: { $in: userToDelete.orders } }, { $unset: { buyer: 1 } }),
        ]); */

        // Delete user
        const deletedUser = await User.findByIdAndDelete(userToDelete._id);
        revalidatePath("/");

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    } catch (error) {
        handleError(error);
    }
}
