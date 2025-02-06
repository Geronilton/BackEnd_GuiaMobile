import User from "../../models/User.js";

export async function userRegister(req, res) {
    try {
        const { nome, email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (user) {
            return res.status(401).json({ message: "Email já cadastrado!!" });
        }

        const newUser = await User.create({ nome, email, password });
        return res.status(200).json({ newUser });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { nome, email } = req.body;
        const user = await User.findOne({ where: { id } });

        if (!user) {
            return res.status(401).json({ message: "Nenhum usuario encontrado" });
        }

        const upUser = await User.update({ nome, email }, { where: { id } });
        return res.status(200).json({ upUser });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

export async function listUser(req, res) {
    try {
        const users = await User.findAll();

        if (!users || users.length === 0) {
            return res.status(401).json({ message: "Nenhum usuario encontrado" });
        }

        return res.status(200).json({ users });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

export async function deletUser(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findOne({ where: { id } });

        if (!user) {
            return res.status(401).json({ message: "Nenhum usuario encontrado" });
        }

        await User.destroy({ where: { id } });
        return res.status(200).json({ ok: true });
    } catch (error) {
        return res.status(400).json({ error });
    }
}