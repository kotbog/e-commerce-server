import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import AuthRoute from './Routes/AuthRoute.js'
import ProductRoute from "./Routes/ProductRoute.js";
import ShoppingSessionRoute from "./Routes/ShoppingSessionRoute.js";
import CategoryRoute from "./Routes/CategoryRoute.js"

dotenv.config();

const {PORT, MONGO_URL} = process.env;

const app = express();

// connection to MongoDB
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Mongo is connected!"))
    .catch((err) => console.log(err));


app.listen(PORT, () => console.log("Server is listening on port " + PORT));

app.use(cors({
    origin: ["http://localhost:4000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true

}));

app.use(cookieParser());



app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", AuthRoute);
app.use("/product", ProductRoute);
app.use("/category", CategoryRoute)
app.use("/cart", ShoppingSessionRoute);
