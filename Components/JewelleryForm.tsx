"use client"

import { createJewellery, updateJewellery } from "@/lib/actions/jewellery.action";
import { useUploadThing } from "@/lib/uploadthing";
import { jewelleryFormSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { FileUploader } from "./FileUploader"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"

type jewelleryPropSchema = {
    type: "Create" | "Update",
    jewellery?: {
        _id?: string; //remove this line if any error
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
    }
    jewelleryId?: string;
}


const JewelleryForm = ({ type, jewellery, jewelleryId }: jewelleryPropSchema) => {


    const initialValues =
        jewellery && type === "Update"
            ? { ...jewellery } : {
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
            }
    const [files, setFiles] = useState<File[]>([])
    const { startUpload } = useUploadThing('imageUploader') //And this comes from 'Upload Thing' so we have to properly import it specifically/manually
    const router = useRouter(); //This useRouter() must be from "next/navigation". And not "next/router"

    // 1. Define your form.
    const form = useForm<z.infer<typeof jewelleryFormSchema>>({
        resolver: zodResolver(jewelleryFormSchema),
        defaultValues: initialValues,
    })

    // 2. Define your submit function.
    async function onSubmit(values: z.infer<typeof jewelleryFormSchema>) {
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
                const newJewellery = await createJewellery({
                    ...values, photo: uploadedImageUrl,
                });
                const test = { ...values, photo: uploadedImageUrl }
                /* console.log(test) console.log(newProduct) */
                if (newJewellery) {
                    form.reset();
                    router.push(`/jewellery/${newJewellery._id}`);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (type === "Update") {
            if (!jewelleryId) {
                router.back();
                return;
            }
            try {
                const updatedJewellery = await updateJewellery(jewelleryId, {
                    ...values,
                    photo: uploadedImageUrl, _id: jewelleryId
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

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

                <div className="flex flex-col gap-5 md:flex-row">
                    <div className="w-full">
                        <FormLabel className="text-base">Jewellery Title</FormLabel>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input placeholder="Jewellery title" {...field} className="input-field" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* carat, material */}
                <div className="flex flex-col gap-5 md:flex-row">
                    <div className="w-full">
                        <FormLabel className="text-base">Height</FormLabel>
                        <FormField
                            control={form.control}
                            name="height"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input placeholder="Jewellery Height" {...field} className="input-field" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-full">
                        <FormLabel className="text-base">Width</FormLabel>
                        <FormField
                            control={form.control}
                            name="width"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input placeholder="Jewellery Width" {...field} className="input-field" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-full">
                        <FormLabel className="text-base">Weight</FormLabel>
                        <FormField
                            control={form.control}
                            name="weight"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input placeholder="Jewellery Weight" {...field} className="input-field" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5 md:flex-row">
                    <div className="w-full">
                        <FormLabel className="text-base">Carat</FormLabel>
                        <FormField
                            control={form.control}
                            name="carat"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input placeholder="Jewellery Carat" {...field} className="input-field" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-full">
                        <FormLabel className="text-base">Material</FormLabel>
                        <FormField
                            control={form.control}
                            name="material"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Material" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Material</SelectLabel>
                                                    <SelectItem value="Gold">Gold</SelectItem>
                                                    <SelectItem value="Silver">Silver</SelectItem>
                                                    <SelectItem value="Mix">Mix</SelectItem>
                                                    <SelectItem value="Platinum">Platinum</SelectItem>
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
                        <FormLabel className="text-base">Certificate</FormLabel>
                        <FormField
                            control={form.control}
                            name="certificate"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input placeholder="Enter Certificate name" {...field} className="input-field" />
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
                    <div className="w-full">
                        <FormLabel className="text-base">Description</FormLabel>
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
                    </div>
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

export default JewelleryForm