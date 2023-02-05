import Ficheiro from '../models/Ficheiro';

class FicheiroController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const ficheiro = await Ficheiro.create({
      name,
      path,
    });
    return res.status(201).json(ficheiro);
  }
}
export default new FicheiroController();
