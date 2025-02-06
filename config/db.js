import { Sequelize } from 'sequelize';
import Usuarios from '../models/User.js';
import Rotas from '../models/Rotas.js';
import Instrucoes from '../models/Instrucoes.js';
import Rota_Instrucao from '../models/Rotas_Instrucao.js';

const sequelize = new Sequelize('RotasDB', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

Usuarios.init(sequelize);
Rotas.init(sequelize);
Instrucoes.init(sequelize);
Rota_Instrucao.init(sequelize);

// Configurando associações
Usuarios.associate({ Rotas });
Rotas.associate({ Usuarios, Rota_Instrucao });
Instrucoes.associate({ Rota_Instrucao });
Rota_Instrucao.associate({ Rotas, Instrucoes });

export { Usuarios, Rotas, Instrucoes, Rota_Instrucao };

export default sequelize;