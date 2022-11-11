import express from "express";
import mongoose from "mongoose";
import checkAuth from "./utils/checkAuth.js";
import { registerValidation } from "./Validations/auth.js"

import { register, login, getMe } from "./Controllers/UserController.js"

mongoose
.connect("mongodb+srv://azat:www@cluster0.u365ra4.mongodb.net/blog?retryWrites=true&w=majority")
.then(() => console.log("BD_OK"))
.catch(err => console.log(err))

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json())


app.post("/auth/register", registerValidation, register)
app.post("/auth/login", login)
app.get("/auth/me", checkAuth, getMe)

app.listen(PORT, () => console.log(`Запущен на порту ${PORT}`));
