import mongoose from "mongoose";

const repuestoSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    quality: {
        type: String,
        required: false
    },
    priceGremy:{
        type: Number,
        required: true,
        default: 0
    },
    priceUsd: {
        type: Number,
        required: false
    },
    category: {
        type: String,
        required: true
    }
});

export const Repuesto = mongoose.model('Repuesto', repuestoSchema);