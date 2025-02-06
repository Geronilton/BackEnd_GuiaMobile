import jwt from "jsonwebtoken"
import authconfig from "../../config/auth.js"

module.exports = (req,res,next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader){
        return res.json({error: 'token not previed'});
    };

    const parts = authHeader.split(' ')
    
    if (!parts.length === 2){
        return res.json({error: 'token error'});
    }

    const [sheme,token] = parts;

    if (!/^Bearer/.test(sheme)){
        return res.json({error: 'token malformated '})
    }

    jwt.verify(token, authconfig.secret, (err, decode) =>{
        if(err){
            return res.json({error:'token invalid'})
        }

        req.userId = decode.id

        return next()
    })
}