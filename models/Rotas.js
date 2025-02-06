import { Model, DataTypes } from "sequelize";

class Rotas extends Model {
    static init(sequelize) {
        super.init({
            origem: DataTypes.STRING,
            destino: DataTypes.STRING,
            distancia: DataTypes.FLOAT,
            tipo_de_rota: DataTypes.STRING,
        },{
            sequelize,
            modelName: 'Rotas',
            tableName: 'Rotas',
            timestamps: false
        })
    }
    static associate(models) {
        this.belongsTo(models.Usuarios, { foreignKey: 'usuario_id', as: 'usuario' });
    }
}

export default Rotas;