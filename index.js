import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import AuthRoute from "./Routes/AuthRoute.js";
import ProductRoute from "./Routes/ProductRoute.js";
import CartRoute from "./Routes/CartRoute.js";
import CategoryRoute from "./Routes/CategoryRoute.js";
import OrderRoute from './Routes/OrderRoute.js'
dotenv.config();

const { PORT, MONGO_URL } = process.env;

const app = express();

// connection to MongoDB
mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Mongo is connected!"))
    .catch((err) => console.log(err));

app.listen(PORT, () => console.log("Server is listening on port " + PORT));

app.use(
    cors({
        origin: ["http://localhost:4000", "http://localhost:3000", "http://localhost:3001"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(cookieParser());

app.use(
    express.json({
        verify: (req, res, buf) => {
            req.rawBody = buf.toString();
        },
        limit: "50mb",
    })
);
app.use(express.urlencoded({ extended: true, limit: "50mb" }));


app.use("/", AuthRoute);
app.use("/product", ProductRoute);
app.use("/category", CategoryRoute);
app.use("/cart", CartRoute);
app.use("/order", OrderRoute)
