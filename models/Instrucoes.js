import { Model, DataTypes } from "sequelize";

class Instrucoes extends Model {
    static init(sequelize) {
        super.init({
            descricao: DataTypes.STRING,
        }, {
            sequelize,
            modelName: 'Instrucoes',
            tableName: 'Instrucoes',
            timestamps: false
        });
    }

    static associate(models) {
        this.hasMany(models.Rota_Instrucao, { foreignKey: 'instrucao_id', as: 'rota_instrucoes' });
    }
}

export default Instrucoes;
