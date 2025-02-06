import { Model, DataTypes } from "sequelize";

class Rota_Instrucao extends Model {
    static init(sequelize) {
        super.init({
            rota_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Rotas',
                    key: 'id'
                }
            },
            instrucao_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Instrucoes',
                    key: 'id'
                }
            },
            ordem: DataTypes.INTEGER
        }, {
            sequelize,
            modelName: 'Rota_Instrucao',
            tableName: 'Rota_Instrucao',
            timestamps: false
        });
    }

    static associate(models) {
        this.belongsTo(models.Rotas, { foreignKey: 'rota_id', as: 'rota' });
        this.belongsTo(models.Instrucoes, { foreignKey: 'instrucao_id', as: 'instrucao' });
    }
}

export default Rota_Instrucao;
