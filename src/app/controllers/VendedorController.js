import User from '../models/Usuario';
import File from '../models/Ficheiro';

class VendedorController {
  async index(req, res) {
    const Vendedors = await User.findAll({
      where: { Vendedor: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          attributes: ['name', 'path', 'url'],
          as: 'avatar',
        },
      ],
    });
    return res.status(200).json(Vendedors);
  }
}
export default new VendedorController();
