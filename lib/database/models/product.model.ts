// Path: src/lib/database/models/product.model.js
import { Schema, model, models } from "mongoose";
// const { Schema, model, models } = require("mongoose");


/* 
const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: String, required: true },
    stock: { type: String, required: true },
    photo: { type: String, required: true },
    colorFrom: { type: String, required: true }, //D, E, F, G, H, I, J, K, L, M, N
    colorTo: { type: String }, //D, E, F, G, H, I, J, K, L, M, N
    clarityFrom: { type: String, required: true }, // IF, VVS1, VVS2, VS1, VS2, SI1, SI2, I1, I2, I3
    clarityTo: { type: String }, // IF, VVS1, VVS2, VS1, VS2, SI1, SI2, I1, I2, I3
    cut: { type: String, required: true }, // Excellent, Very Good, Good, Fair, Poor
    carat: { type: String, required: true }, // manual input number
    shape: { type: String, required: true }, // Round, Princess, Emerald, Asscher, Marquise, Oval, Radiant, Pear, Heart, Cushion
    certificate: { type: String, default: "None" }, // None, IGI, GIA, HRD, EGL, AGS
}); */

const ProductSchema = new Schema({
    name: { type: String },
    description: { type: String },
    price: { type: String },
    stock: { type: String },
    photo: { type: String },
    colorFrom: { type: String }, //D, E, F, G, H, I, J, K, L, M, N
    colorTo: { type: String }, //D, E, F, G, H, I, J, K, L, M, N
    clarityFrom: { type: String }, // IF, VVS1, VVS2, VS1, VS2, SI1, SI2, I1, I2, I3
    clarityTo: { type: String }, // IF, VVS1, VVS2, VS1, VS2, SI1, SI2, I1, I2, I3
    cut: { type: String }, // Excellent, Very Good, Good, Fair, Poor
    carat: { type: String }, // manual input number
    shape: { type: String }, // Round, Princess, Emerald, Asscher, Marquise, Oval, Radiant, Pear, Heart, Cushion
    certificate: { type: String, default: "None" }, // None, IGI, GIA, HRD, EGL, AGS
});


const Product = models.Product || model("Product", ProductSchema);

export default Product;
