import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Agendamento from '../models/Agendamento';
import Usuario from '../models/Usuario';

class AgendaController {
  async index(req, res) {
    const checkUsuarioProvider = await Usuario.findOne({
      where: { id: req.usuarioId, isAdmin: true },
    });
    if (!checkUsuarioProvider) {
      return res.status(401).json({ error: 'área restrita para clientes!' });
    }

    const { data } = req.query;
    const parsedDate = parseISO(data);

    const agendamento = await Agendamento.findAll({
      where: {
        cancelado_em: null,
        data: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
    });
    return res.status(200).json({ agendamento });
  }
}
export default new AgendaController();
