import express from "express"
import { instrucoes,rotas } from "../controller/rotasController.js";

const routes = (app) => {
    app.use(express.json());
    app.get("/instrucoes/:id", instrucoes);
    app.get("/rotas/:id",rotas)

}

export default routes;