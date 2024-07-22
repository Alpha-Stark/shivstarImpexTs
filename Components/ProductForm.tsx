"use client";

import { useState, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FileUploader } from "./FileUploader";
import styles from "../style/ProductForm.module.css";
import { useUploadThing } from "@/lib/uploadthing";
import { productFormSchema } from "@/lib/validator";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "@/lib/actions/product.action";

type productFromProps = {
    type: "Create" | "Update";
    product?: {
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
    productId?: string;
};

const ProductForm = ({ type, product, productId }: productFromProps) => {
    const initialValues =
        product && type === "Update"
            ? { ...product }
            : {
                name: "",
                description: "",
                price: "",
                photo: "",
                fluorescence: "",
                colorFrom: "",
                colorTo: "",
                clarityFrom: "",
                clarityTo: "",
                cut: "",
                shape: "",
                certificate: "None",
            };

    const [files, setFiles] = useState<File[]>([]);
    const { startUpload } = useUploadThing("imageUploader");
    const router = useRouter();

    const form = useForm<z.infer<typeof productFormSchema>>({
        resolver: zodResolver(productFormSchema),
        defaultValues: initialValues,
    });

    async function onSubmit(values: z.infer<typeof productFormSchema>) {
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
                const newProduct = await createProduct({
                    ...values,
                    photo: uploadedImageUrl,
                });
                if (newProduct) {
                    form.reset();
                    router.push(`/products/${newProduct._id}`);
                }
            } catch (error) {
                console.log(error);
            }
        } else if (type === "Update") {
            if (!productId) {
                router.back();
                return;
            }
            try {
                const updatedProduct = await updateProduct(productId, {
                    ...values,
                    photo: uploadedImageUrl,
                    _id: productId,
                });
                if (updatedProduct) {
                    form.reset();
                    router.push(`/products/${updatedProduct._id}`);
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
                    <label className={styles.label}>Product Title</label>
                    <input
                        {...form.register("name")}
                        placeholder="Product title"
                        className={styles.inputField}
                    />
                    {form.formState.errors.name && (
                        <p className={styles.errorMessage}>{form.formState.errors.name.message}</p>
                    )}
                </div>
            </div>

            <div className={`${styles.formRow} ${styles.formRowMd}`}>
                <div className={styles.fullWidth}>
                    <label className={styles.label}>Clarity from</label>
                    <select
                        {...form.register("clarityFrom")}
                        className={styles.selectInput}
                    >
                        <option value="">Select Clarity</option>
                        <option value="IF">IF</option>
                        <option value="VVS">VVS</option>
                        <option value="VVS1">VVS1</option>
                        <option value="VVS2">VVS2</option>
                        <option value="VS">VS</option>
                        <option value="VS1">VS1</option>
                        <option value="VS2">VS2</option>
                        <option value="SI1">SI1</option>
                        <option value="SI2">SI2</option>
                        <option value="SI3">SI3</option>
                        <option value="I1">I1</option>
                        <option value="I2">I2</option>
                        <option value="I3">I3</option>
                    </select>
                    {form.formState.errors.clarityFrom && (
                        <p className={styles.errorMessage}>{form.formState.errors.clarityFrom.message}</p>
                    )}
                </div>

                <div className={styles.fullWidth}>
                    <label className={styles.label}>Clarity to</label>
                    <select
                        {...form.register("clarityTo")}
                        className={styles.selectInput}
                    >
                        <option value="">Select Clarity</option>
                        <option value="IF">IF</option>
                        <option value="VVS">VVS</option>
                        <option value="VVS1">VVS1</option>
                        <option value="VVS2">VVS2</option>
                        <option value="VS">VS</option>
                        <option value="VS1">VS1</option>
                        <option value="VS2">VS2</option>
                        <option value="SI1">SI1</option>
                        <option value="SI2">SI2</option>
                        <option value="SI3">SI3</option>
                        <option value="I1">I1</option>
                        <option value="I2">I2</option>
                        <option value="I3">I3</option>
                    </select>
                    {form.formState.errors.clarityTo && (
                        <p className={styles.errorMessage}>{form.formState.errors.clarityTo.message}</p>
                    )}
                </div>

                <div className={styles.fullWidth}>
                    <label className={styles.label}>Color from</label>
                    <select
                        {...form.register("colorFrom")}
                        className={styles.selectInput}
                    >
                        <option value="">Select Color</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                        <option value="G">G</option>
                        <option value="H">H</option>
                        <option value="I">I</option>
                        <option value="J">J</option>
                        <option value="K">K</option>
                        <option value="L">L</option>
                        <option value="M">M</option>
                        <option value="N">N</option>
                    </select>
                    {form.formState.errors.colorFrom && (
                        <p className={styles.errorMessage}>{form.formState.errors.colorFrom.message}</p>
                    )}
                </div>

                <div className={styles.fullWidth}>
                    <label className={styles.label}>Color to</label>
                    <select
                        {...form.register("colorTo")}
                        className={styles.selectInput}
                    >
                        <option value="">Select Color</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                        <option value="G">G</option>
                        <option value="H">H</option>
                        <option value="I">I</option>
                        <option value="J">J</option>
                        <option value="K">K</option>
                        <option value="L">L</option>
                        <option value="M">M</option>
                        <option value="N">N</option>
                    </select>
                    {form.formState.errors.colorTo && (
                        <p className={styles.errorMessage}>{form.formState.errors.colorTo.message}</p>
                    )}
                </div>
            </div>

            <div className={`${styles.formRow} ${styles.formRowMd}`}>
                <div className={styles.fullWidth}>
                    <label className={styles.label}>Fluorescence</label>
                    <select
                        {...form.register("fluorescence")}
                        className={styles.selectInput}
                    >
                        <option value="">Select Fluorescence</option>
                        <option value="None">None</option>
                        <option value="Faint">Faint</option>
                        <option value="Medium">Medium</option>
                        <option value="Strong">Strong</option>
                        <option value="Very Strong">Very Strong</option>
                    </select>
                    {form.formState.errors.fluorescence && (
                        <p className={styles.errorMessage}>{form.formState.errors.fluorescence.message}</p>
                    )}
                </div>

                <div className={styles.fullWidth}>
                    <label className={styles.label}>Cut</label>
                    <select
                        {...form.register("cut")}
                        className={styles.selectInput}
                    >
                        <option value="">Select Cut</option>
                        <option value="Excellent">Excellent</option>
                        <option value="Very Good">Very Good</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Poor">Poor</option>
                    </select>
                    {form.formState.errors.cut && (
                        <p className={styles.errorMessage}>{form.formState.errors.cut.message}</p>
                    )}
                </div>

                <div className={styles.fullWidth}>
                    <label className={styles.label}>Shape</label>
                    <select
                        {...form.register("shape")}
                        className={styles.selectInput}
                    >
                        <option value="">Select Shape</option>
                        <option value="Round">Round</option>
                        <option value="Princess">Princess</option>
                        <option value="Emerald">Emerald</option>
                        <option value="Asscher">Asscher</option>
                        <option value="Marquise">Marquise</option>
                        <option value="Radiant">Radiant</option>
                        <option value="Pear">Pear</option>
                        <option value="Heart">Heart</option>
                        <option value="Cushion">Cushion</option>
                    </select>
                    {form.formState.errors.shape && (
                        <p className={styles.errorMessage}>{form.formState.errors.shape.message}</p>
                    )}
                </div>

                <div className={styles.fullWidth}>
                    <label className={styles.label}>Certificate</label>
                    <select
                        {...form.register("certificate")}
                        className={styles.selectInput}
                    >
                        <option value="None">None</option>
                        <option value="IGI">IGI</option>
                        <option value="GIA">GIA</option>
                        <option value="HRD">HRD</option>
                        <option value="EGL">EGL</option>
                        <option value="AGS">AGS</option>
                    </select>
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

export default ProductForm;
