import express from "express";
import mongoose from "mongoose";
import checkAuth from "./utils/checkAuth.js";
import { registerValidation, loginValidation, postCreateValidation } from "./Validations/validations.js"

import { register, login, getMe } from "./Controllers/UserController.js"
import { create, getAll, getOne, remove, update } from "./Controllers/PostController.js"

mongoose
.connect("mongodb+srv://azat:wwwww@cluster0.cmaxwrd.mongodb.net/post?retryWrites=true&w=majority")
.then(() => console.log("Data-Base_OK"))
.catch(err => console.log(err))

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json())


app.post("/auth/register", registerValidation, register)
app.post("/auth/login", loginValidation, login)
app.get("/auth/me", checkAuth, getMe)

app.get("/posts", getAll)
app.get("/posts/:id", getOne)
app.post("/posts", checkAuth, postCreateValidation, create)
app.delete("/posts/:id", checkAuth, remove)
app.patch("/posts/:id", checkAuth, update)



app.listen(PORT, () => console.log(`Запущен на порту ${PORT}`));
