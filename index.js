import express from "express"
import cors from "cors"
import userRoutes from "./src/routes/userRoutes.js"
import rotasRoutes from "./src/routes/rotasRoutes.js"
import sequelize from "./config/db.js"

const conexao = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexão com o banco de dados estabelecida com sucesso!");
    } catch (error) {
        console.log("Erro ao conectar com o banco de dados:", error);
        throw error;  
    }
};

conexao(); 

const app = express();
app.use(cors())
app.use(express.json());
userRoutes(app)
rotasRoutes(app)

app.listen(3001, '0.0.0.0',() => {
    console.log('Server is running on port 3001');
});


app.get('/', async (req, res) => {
    res.send("Servidor funcionando !!")
})
