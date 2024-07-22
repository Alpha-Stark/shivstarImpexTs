"use client";

import { createJewellery, updateJewellery } from "@/lib/actions/jewellery.action";
import { useUploadThing } from "@/lib/uploadthing";
import { jewelleryFormSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FileUploader } from "./FileUploader";

type jewelleryPropSchema = {
    type: "Create" | "Update";
    jewellery?: {
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
    jewelleryId?: string;
};

const JewelleryForm = ({ type, jewellery, jewelleryId }: jewelleryPropSchema) => {
    const initialValues =
        jewellery && type === "Update"
            ? { ...jewellery }
            : {
                name: "",
                description: "",
                price: "",
                photo: "",
                height: "",
                width: "",
                carat: "",
                weight: "",
                material: "",
                certificate: "",
            };

    const [files, setFiles] = useState<File[]>([]);
    const { startUpload } = useUploadThing("imageUploader");
    const router = useRouter();

    const form = useForm<z.infer<typeof jewelleryFormSchema>>({
        resolver: zodResolver(jewelleryFormSchema),
        defaultValues: initialValues,
    });

    async function onSubmit(values: z.infer<typeof jewelleryFormSchema>) {
        let uploadedImageUrl = values.photo;

        if (files.length > 0) {
            const uploadedImages = await startUpload(files);
            if (!uploadedImages) {
                return;
            }
            uploadedImageUrl = uploadedImages[0].url;
        }

        if (type === "Create") {
            try {
                const newJewellery = await createJewellery({
                    ...values,
                    photo: uploadedImageUrl,
                });
                if (newJewellery) {
                    form.reset();
                    router.push(`/jewellery/${newJewellery._id}`);
                }
            } catch (error) {
                console.log(error);
            }
        } else if (type === "Update") {
            if (!jewelleryId) {
                router.back();
                return;
            }
            try {
                const updatedJewellery = await updateJewellery(jewelleryId, {
                    ...values,
                    photo: uploadedImageUrl,
                    _id: jewelleryId,
                });
                if (updatedJewellery) {
                    form.reset();
                    router.push(`/jewellery/${updatedJewellery._id}`);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleFileChange = useCallback(async (fileUrl: string) => {
        form.setValue("photo", fileUrl);
    }, [form]);

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 md:flex-row">
                <div className="w-full">
                    <label className="text-base">Jewellery Title</label>
                    <input
                        {...form.register("name")}
                        placeholder="Jewellery title"
                        className="input-field w-full"
                    />
                    {form.formState.errors.name && (
                        <p className="text-red-500">{form.formState.errors.name.message}</p>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
                <div className="w-full">
                    <label className="text-base">Height</label>
                    <input
                        {...form.register("height")}
                        placeholder="Jewellery Height"
                        className="input-field w-full"
                    />
                    {form.formState.errors.height && (
                        <p className="text-red-500">{form.formState.errors.height.message}</p>
                    )}
                </div>
                <div className="w-full">
                    <label className="text-base">Width</label>
                    <input
                        {...form.register("width")}
                        placeholder="Jewellery Width"
                        className="input-field w-full"
                    />
                    {form.formState.errors.width && (
                        <p className="text-red-500">{form.formState.errors.width.message}</p>
                    )}
                </div>
                <div className="w-full">
                    <label className="text-base">Weight</label>
                    <input
                        {...form.register("weight")}
                        placeholder="Jewellery Weight"
                        className="input-field w-full"
                    />
                    {form.formState.errors.weight && (
                        <p className="text-red-500">{form.formState.errors.weight.message}</p>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
                <div className="w-full">
                    <label className="text-base">Carat</label>
                    <input
                        {...form.register("carat")}
                        placeholder="Jewellery Carat"
                        className="input-field w-full"
                    />
                    {form.formState.errors.carat && (
                        <p className="text-red-500">{form.formState.errors.carat.message}</p>
                    )}
                </div>
                <div className="w-full">
                    <label className="text-base">Material</label>
                    <select
                        {...form.register("material")}
                        className="select-input w-full"
                    >
                        <option value="">Select Material</option>
                        <option value="Gold">Gold</option>
                        <option value="Silver">Silver</option>
                        <option value="Mix">Mix</option>
                        <option value="Platinum">Platinum</option>
                    </select>
                    {form.formState.errors.material && (
                        <p className="text-red-500">{form.formState.errors.material.message}</p>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
                <div className="w-full">
                    <label className="text-base">Certificate</label>
                    <input
                        {...form.register("certificate")}
                        placeholder="Enter Certificate name"
                        className="input-field w-full"
                    />
                    {form.formState.errors.certificate && (
                        <p className="text-red-500">{form.formState.errors.certificate.message}</p>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
                <div className="w-full">
                    <label className="text-base">Price</label>
                    <input
                        {...form.register("price")}
                        placeholder="Price"
                        className="input-field w-full"
                    />
                    {form.formState.errors.price && (
                        <p className="text-red-500">{form.formState.errors.price.message}</p>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
                <div className="w-full">
                    <label className="text-base">Description</label>
                    <textarea
                        {...form.register("description")}
                        placeholder="Description"
                        className="textarea rounded-2xl w-full"
                    ></textarea>
                    {form.formState.errors.description && (
                        <p className="text-red-500">{form.formState.errors.description.message}</p>
                    )}
                </div>
                <div className="flex justify-center items-center w-full h-full">
                    <div className="flex justify-center items-center h-72 w-full">
                        <FileUploader
                            onFieldChange={handleFileChange}  // Note: This change ensures the type matches
                            photo={form.watch("photo")}
                            setFiles={setFiles}
                        />
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="button col-span-2 w-full bg-blue-500 text-white p-2 rounded"
            >
                {form.formState.isSubmitting ? "Submitting..." : `${type} Product`}
            </button>
        </form>
    );
};

export default JewelleryForm;
