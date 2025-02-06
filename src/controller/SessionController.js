import User from "../../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import authConfig from "../../config/auth.js"

export default {
    async login (req, res) {
        const {email, senha} = req.body;

        const user = await User.findOne({where : {email} });

        if (!user){
            return res.status(400).send({error: 'User not found.'});
        };

        if (!await bcrypt.compare(senha, user.senha)) {
            return res.status(400).send({error: 'Invalid password.'})
        };

        const {id} = user;
        const {nome} = user;

        return res.status(200).json({
            user:{id,nome,email}, token: jwt.sign({id}, authConfig.secret,{
                expiresIn:authConfig.expiresIn,
            })
        });
    }
}