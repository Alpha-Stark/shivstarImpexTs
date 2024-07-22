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
import styles from "../style/JewelleryForm.module.css";

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
        <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
            <div className={`${styles.formRow} ${styles.formRowMd}`}>
                <div className={styles.fullWidth}>
                    <label className={styles.label}>Jewellery Title</label>
                    <input
                        {...form.register("name")}
                        placeholder="Jewellery title"
                        className={styles.inputField}
                    />
                    {form.formState.errors.name && (
                        <p className={styles.errorMessage}>{form.formState.errors.name.message}</p>
                    )}
                </div>
            </div>

            <div className={`${styles.formRow} ${styles.formRowMd}`}>
                <div className={styles.fullWidth}>
                    <label className={styles.label}>Height</label>
                    <input
                        {...form.register("height")}
                        placeholder="Jewellery Height"
                        className={styles.inputField}
                    />
                    {form.formState.errors.height && (
                        <p className={styles.errorMessage}>{form.formState.errors.height.message}</p>
                    )}
                </div>
                <div className={styles.fullWidth}>
                    <label className={styles.label}>Width</label>
                    <input
                        {...form.register("width")}
                        placeholder="Jewellery Width"
                        className={styles.inputField}
                    />
                    {form.formState.errors.width && (
                        <p className={styles.errorMessage}>{form.formState.errors.width.message}</p>
                    )}
                </div>
                <div className={styles.fullWidth}>
                    <label className={styles.label}>Weight</label>
                    <input
                        {...form.register("weight")}
                        placeholder="Jewellery Weight"
                        className={styles.inputField}
                    />
                    {form.formState.errors.weight && (
                        <p className={styles.errorMessage}>{form.formState.errors.weight.message}</p>
                    )}
                </div>
            </div>

            <div className={`${styles.formRow} ${styles.formRowMd}`}>
                <div className={styles.fullWidth}>
                    <label className={styles.label}>Carat</label>
                    <input
                        {...form.register("carat")}
                        placeholder="Jewellery Carat"
                        className={styles.inputField}
                    />
                    {form.formState.errors.carat && (
                        <p className={styles.errorMessage}>{form.formState.errors.carat.message}</p>
                    )}
                </div>
                <div className={styles.fullWidth}>
                    <label className={styles.label}>Material</label>
                    <select
                        {...form.register("material")}
                        className={styles.selectInput}
                    >
                        <option value="">Select Material</option>
                        <option value="Gold">Gold</option>
                        <option value="Silver">Silver</option>
                        <option value="Mix">Mix</option>
                        <option value="Platinum">Platinum</option>
                    </select>
                    {form.formState.errors.material && (
                        <p className={styles.errorMessage}>{form.formState.errors.material.message}</p>
                    )}
                </div>
            </div>

            <div className={`${styles.formRow} ${styles.formRowMd}`}>
                <div className={styles.fullWidth}>
                    <label className={styles.label}>Certificate</label>
                    <input
                        {...form.register("certificate")}
                        placeholder="Enter Certificate name"
                        className={styles.inputField}
                    />
                    {form.formState.errors.certificate && (
                        <p className={styles.errorMessage}>{form.formState.errors.certificate.message}</p>
                    )}
                </div>
            </div>

            <div className={`${styles.formRow} ${styles.formRowMd}`}>
                <div className={styles.fullWidth}>
                    <label className={styles.label}>Price</label>
                    <input
                        {...form.register("price")}
                        placeholder="Price"
                        className={styles.inputField}
                    />
                    {form.formState.errors.price && (
                        <p className={styles.errorMessage}>{form.formState.errors.price.message}</p>
                    )}
                </div>
            </div>

            <div className={`${styles.formRow} ${styles.formRowMd}`}>
                <div className={styles.fullWidth}>
                    <label className={styles.label}>Description</label>
                    <textarea
                        {...form.register("description")}
                        placeholder="Description"
                        className={styles.textarea}
                    ></textarea>
                    {form.formState.errors.description && (
                        <p className={styles.errorMessage}>{form.formState.errors.description.message}</p>
                    )}
                </div>
                <div className={styles.fullWidth}>
                    <FileUploader
                        onFieldChange={handleFileChange}
                        photo={form.watch("photo")}
                        setFiles={setFiles}
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={form.formState.isSubmitting}
                className={styles.button}
            >
                {form.formState.isSubmitting ? "Submitting..." : `${type} Product`}
            </button>
        </form>
    );
};

export default JewelleryForm;