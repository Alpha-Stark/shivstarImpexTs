import { Schema, model, models } from "mongoose";

const JewellerySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    diamondDescription: { type: String },
    materialDescription: { type: String },
    price: { type: String, required: true },
    photo: { type: String, required: true },
    // height: { type: String },
    // width: { type: String },
    // carat: { type: String, required: true },
    // weight: { type: String },
    material: { type: String, required: true },
    certificate: { type: String, default: "None" },
});

const Jewellery = models.Jewellery || model("Jewellery", JewellerySchema);

export default Jewellery;