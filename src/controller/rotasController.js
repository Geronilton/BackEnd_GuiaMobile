import Rota_Instrucao from '../../models/Rotas_Instrucao.js';
import Instrucoes  from '../../models/Instrucoes.js';
import Rotas from '../../models/Rotas.js';
import User from '../../models/User.js'


export async function instrucoes(req, res) {
    try {
        const { id } = req.params; // id da rota da URL

        const rotaInstrucoes = await Rota_Instrucao.findAll({
            where: { rota_id: id }, // Filtro pelo id da rota
            include: [
                {
                    model: Instrucoes, // Associa com a tabela Instrucoes
                    as: 'instrucao',
                    attributes: ['descricao'], // Apenas a descrição da instrução
                },
            ],
            order: [['ordem', 'ASC']], // Ordena as instruções conforme a ordem
        });

        if (!rotaInstrucoes || rotaInstrucoes.length === 0) {
            return res.status(404).json({ message: "Nenhuma instrução encontrada para esta rota" });
        }

        const instrucoesDescricoes = rotaInstrucoes.map(item => item.instrucao.dataValues.descricao);

        return res.status(200).json({ instrucoes: instrucoesDescricoes });

    } catch (error) {
        console.error("Erro ao processar a solicitação:", error);
        return res.status(400).json({ error: 'Erro ao processar a solicitação' });
    }
}

export async function rotas(req, res) {
    try {
        const { id } = req.params;
        const rotas = await Rotas.findAll({ 
            where : {usuario_id: id},
            attributes: ['id','origem', 'destino','tipo_de_rota'],
            include: [
                {
                    model: User, 
                    as: 'usuario',
                    attributes: ['nome'],
                },
            ],
        });

        if (!rotas || rotas.length === 0) {
            return res.status(404).json({ message: "Nenhuma rota encontrada para esse Usuario!!" });
        }
        
        const rotasFormatadas = rotas.map(rota => ({
            id: rota.id,
            origem: rota.origem,
            destino: rota.destino,
            usuario: rota.usuario.nome,
            tipo_de_rota: rota.tipo_de_rota
        }));

        return res.status(200).json({ rotas: rotasFormatadas });

    } catch (error) {
        console.error("Erro ao processar a solicitação:", error); 
        return res.status(400).json({ error: 'Erro ao processar a solicitação' });
    }
}