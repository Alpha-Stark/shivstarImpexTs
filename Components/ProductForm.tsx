"use client"
// used shadcn form, input, textarea, 
// Date picker component from (https://www.npmjs.com/package/react-datepicker), there are many different such types, so be cautious
import * as React from "react"
import { useState } from "react"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

// import { Button } from "./ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { FileUploader } from "./FileUploader"


import { useUploadThing } from "@/lib/uploadthing"

import { productFormSchema } from "@/lib/validator"
import { useRouter } from "next/navigation"
import { createProduct, updateProduct } from "@/lib/actions/product.action"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { Checkbox } from "./ui/checkbox"


type productFromProps = {
    type: "Create" | "Update",
    product?: {
        name: string,
        description: string,
        price: string,
        photo: string,
        colorFrom: string,
        colorTo: string,
        clarityFrom: string,
        clarityTo: string,
        cut: string,
        fluorescence: string,
        shape: string,
        certificate: string,
    }
    productId?: string,
    // The above both are optional because at the time of event creation, it won't exist and won't be needed.
}


const ProductForm = ({ type, product, productId }: productFromProps) => {

    const initialValues =
        product && type === "Update"
            ? { ...product }
            : {
                name: "",
                description: "",
                price: "", //price: 0 , to remove error below
                photo: "",
                fluorescence: "",
                colorFrom: "",
                colorTo: "",
                clarityFrom: "",
                clarityTo: "",
                cut: "",
                shape: "",
                certificate: "None",
            }

    const [files, setFiles] = useState<File[]>([])
    const { startUpload } = useUploadThing('imageUploader') //And this comes from 'Upload Thing' so we have to properly import it specifically/manually
    const router = useRouter(); //This useRouter() must be from "next/navigation". And not "next/router"

    // 1. Define your form.
    const form = useForm<z.infer<typeof productFormSchema>>({
        resolver: zodResolver(productFormSchema),
        defaultValues: initialValues,
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof productFormSchema>) {
        /* console.log(values) */

        let uploadedImageUrl = values.photo;

        if (files.length > 0) {
            const uploadedImages = await startUpload(files); // And this startUpload() has to be defined above that where does it come from (i.e., upload thing).

            if (!uploadedImages) {
                return;
            }

            uploadedImageUrl = uploadedImages[0].url;
        }

        if (type === "Create") {
            try {
                const newProduct = await createProduct({
                    ...values, photo: uploadedImageUrl,
                });
                /* const newProduct = await createProduct({
                    product: { ...values, photo: uploadedImageUrl }
                }); */
                const test = { ...values, photo: uploadedImageUrl }
                /* console.log(test) console.log(newProduct) */
                if (newProduct) {
                    form.reset();
                    router.push(`/products/${newProduct._id}`);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (type === "Update") {
            if (!productId) {
                router.back();
                return;
            }
            try {
                const updatedProduct = await updateProduct(productId, {
                    ...values,
                    photo: uploadedImageUrl, _id: productId
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

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

                <div className="flex flex-col gap-5 md:flex-row">
                    <div className="w-full">
                        <FormLabel className="text-base">Product Title</FormLabel>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input placeholder="Product title" {...field} className="input-field" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5 md:flex-row">
                    <div className="w-full">
                        <FormLabel className="text-base">Clarity from</FormLabel>
                        <FormField
                            control={form.control}
                            name="clarityFrom"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            {/* <SelectTrigger className="w-[200px]"> */}
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Clarity" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Clarity</SelectLabel><SelectItem value="IF">IF</SelectItem><SelectItem value="VVS1">VVS1</SelectItem>
                                                    <SelectItem value="VVS2">VVS2</SelectItem><SelectItem value="VS1">VS1</SelectItem><SelectItem value="VS2">VS2</SelectItem>
                                                    <SelectItem value="SI1">SI1</SelectItem><SelectItem value="SI2">SI2</SelectItem><SelectItem value="I1">I1</SelectItem>
                                                    <SelectItem value="I2">I2</SelectItem><SelectItem value="I3">I3</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="w-full">
                        <FormLabel className="text-base">Clarity to</FormLabel>
                        <FormField
                            control={form.control}
                            name="clarityTo"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            {/* <SelectTrigger className="w-[200px]"> */}
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Clarity" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Clarity</SelectLabel><SelectItem value="IF">IF</SelectItem><SelectItem value="VVS1">VVS1</SelectItem>
                                                    <SelectItem value="VVS2">VVS2</SelectItem><SelectItem value="VS1">VS1</SelectItem><SelectItem value="VS2">VS2</SelectItem>
                                                    <SelectItem value="SI1">SI1</SelectItem><SelectItem value="SI2">SI2</SelectItem><SelectItem value="I1">I1</SelectItem>
                                                    <SelectItem value="I2">I2</SelectItem><SelectItem value="I3">I3</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-full">
                        <FormLabel className="text-base">Color from</FormLabel>
                        <FormField
                            control={form.control}
                            name="colorFrom"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            {/* <SelectTrigger className="w-[200px]"> */}
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Color" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Color</SelectLabel>
                                                    <SelectItem value="D">D</SelectItem><SelectItem value="E">E</SelectItem><SelectItem value="F">F</SelectItem>
                                                    <SelectItem value="G">G</SelectItem><SelectItem value="H">H</SelectItem><SelectItem value="I">I</SelectItem>
                                                    <SelectItem value="J">J</SelectItem><SelectItem value="K">K</SelectItem><SelectItem value="L">L</SelectItem>
                                                    <SelectItem value="M">M</SelectItem><SelectItem value="N">N</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="w-full">
                        <FormLabel className="text-base">Color to</FormLabel>
                        <FormField
                            control={form.control}
                            name="colorTo"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} >
                                            {/* <SelectTrigger className="w-[200px]"> */}
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Color" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Color</SelectLabel>
                                                    <SelectItem value="D">D</SelectItem><SelectItem value="E">E</SelectItem><SelectItem value="F">F</SelectItem>
                                                    <SelectItem value="G">G</SelectItem><SelectItem value="H">H</SelectItem><SelectItem value="I">I</SelectItem>
                                                    <SelectItem value="J">J</SelectItem><SelectItem value="K">K</SelectItem><SelectItem value="L">L</SelectItem>
                                                    <SelectItem value="M">M</SelectItem><SelectItem value="N">N</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* There is something wrong in the above code, lets write the correct one which actually takes value as input */}
                    </div>

                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <div className="w-full">
                        <FormLabel className="text-base">Fluorescence</FormLabel>
                        <FormField
                            control={form.control}
                            name="fluorescence"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            {/* <SelectTrigger className="w-[200px]"> */}
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Fluorescence" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Fluorescence</SelectLabel><SelectItem value="None">None</SelectItem>
                                                    <SelectItem value="Faint">Faint</SelectItem><SelectItem value="Medium">Medium</SelectItem>
                                                    <SelectItem value="Strong">Strong</SelectItem><SelectItem value="Very Strong">Very Strong</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-full">
                        <FormLabel className="text-base">Cut</FormLabel>
                        <FormField
                            control={form.control}
                            name="cut"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            {/* <SelectTrigger className="w-[200px]"> */}
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Cut" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Cut</SelectLabel>
                                                    <SelectItem value="Excellent">Excellent</SelectItem><SelectItem value="Very Good">Very Good</SelectItem>
                                                    <SelectItem value="Good">Good</SelectItem><SelectItem value="Fair">Fair</SelectItem><SelectItem value="Poor">Poor</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="w-full">
                        <FormLabel className="text-base">Shape</FormLabel>
                        <FormField
                            control={form.control}
                            name="shape"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            {/* <SelectTrigger className="w-[200px]"> */}
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Shape" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Shape</SelectLabel>
                                                    <SelectItem value="Round">Round</SelectItem><SelectItem value="Princess">Princess</SelectItem><SelectItem value="Emerald">Emerald</SelectItem><SelectItem value="Asscher">Asscher</SelectItem><SelectItem value="Marquise">Marquise</SelectItem>
                                                    <SelectItem value="Radiant">Radiant</SelectItem><SelectItem value="Pear">Pear</SelectItem><SelectItem value="Heart">Heart</SelectItem><SelectItem value="Cushion">Cushion</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="w-full">
                        <FormLabel className="text-base">Certificate</FormLabel>
                        <FormField
                            control={form.control}
                            name="certificate"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Certiciate" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Certificate</SelectLabel>
                                                    <SelectItem value="None">None</SelectItem><SelectItem value="IGI">IGI</SelectItem><SelectItem value="GIA">GIA</SelectItem>
                                                    <SelectItem value="HRD">HRD</SelectItem><SelectItem value="EGL">EGL</SelectItem><SelectItem value="AGS">AGS</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <div className="w-full">
                        <FormLabel className="text-base">Price</FormLabel>
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input placeholder="Price" {...field} className="input-field" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl className="h-75">
                                    <Textarea placeholder="Description" {...field} className="textarea rounded-2xl" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="photo"
                        render={({ field }) => (
                            // <FormItem className="w-full">
                            <FormItem className="flex justify-center items-center w-full h-full">
                                <FormControl className="flex justify-center items-center h-72 w-full">
                                    {/* <FileUploader onFieldChange={field.onChange} imageUrl={field.value} setFiles={setFiles} /> */}
                                    <FileUploader onFieldChange={field.onChange} photo={field.value} setFiles={setFiles} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    size="lg"
                    disabled={form.formState.isSubmitting}
                    className="button col-span-2 w-full"
                >
                    {form.formState.isSubmitting ? "Submitting..." : `${type} Product`}
                </Button>
            </form>
        </Form>
    )
}

export default ProductForm