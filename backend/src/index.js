const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
dotenv.config();
const PORT = process.env.PORT;
require("./db/db");
const userRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth")
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const initialData = require("./routes/admin/initialData");
app.use((req, res, next) =>{
    res.header("Access-Control-Allow-origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD,OPTIONS, PUT, PATCH, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin",
    "X-Requested-With", "Content-Type", "Accept")
    next()
    })
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use("/public/",express.static(path.join(__dirname,"uploads")));
app.use("/api", userRoutes);
app.use('/api/admin',adminRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product",productRoutes);
app.use("/api/user", cartRoutes);
app.use("/api",initialData);
app.listen(PORT,"0.0.0.0", ()  => {
    console.log(`listening port to ${PORT}`);
})