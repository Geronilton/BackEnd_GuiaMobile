import express from "express"
import {deletUser,listUser,updateUser,userRegister} from "../controller/userController.js"
import SessionController from "../controller/SessionController.js"

const routes = (app) => {
    app.use(express.json());
    app.post("/session", SessionController.login);
    app.post('/register',userRegister)
    app.put("/update-user/:id", updateUser);
    app.get("/list-users", listUser);
    app.delete("/delete-user/:id",deletUser)
}

export default routes;