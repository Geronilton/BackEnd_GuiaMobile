import { Model,DataTypes } from 'sequelize';
import bcrypt from 'bcrypt'

class User extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.VIRTUAL,
            senha: DataTypes.STRING,
        },{
            sequelize,
            modelName: 'Usuarios',
        })
        this.addHook('beforeSave', async (user) => {
            if (user.password) {
                user.senha = await bcrypt.hash(user.password, 8);
            }}
        );
    }
    static associate(models) {
        this.hasMany(models.Rotas, { foreignKey: 'usuario_id', as: 'rotas' });
    }
}

export default User;
