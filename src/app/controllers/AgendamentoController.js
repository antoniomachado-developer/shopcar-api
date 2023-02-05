import * as yup from 'yup';
import Usuario from '../models/Usuario';
import Agendamentos from '../models/Agendamento';

class AgendamentoController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const agendamentos = await Agendamentos.findAll({
      where: { cliente_id: req.usuarioId, cancelado_em: null },
      attributes: ['id', 'data_compra'],
      order: ['data_compra'],
      limit: 5,
      offset: (page - 1) * 5,
    });
    return res.json(agendamentos);
  }

  async store(req, res) {
    const schema = yup.object().shape({
      data_compra: yup.date().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'porfavor! preencha os campos correctamente!' });
    }

    const { produtos, data_compra } = req.body;

    const cliente_id = await req.usuarioId;
    const éUmCliente = await Usuario.findOne({
      where: { id: cliente_id, isAdmin: false },
    });
    if (!éUmCliente) {
      return res.status(401).json({
        error:
          'Somente usuarios com perfil de cliente podem fazer agendamento:',
        éUmCliente,
      });
    }
    const agendamento = await agendamentos.create({
      cliente_id: req.usuarioId,
      data_compra,
    });
    return res.status(201).json(agendamento);
  }
}

export default new AgendamentoController();
