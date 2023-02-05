import jwt from 'jsonwebtoken';
import * as yup from 'yup';
import Usuario from '../models/Usuario';
import authConfig from '../../config/auth';

class SignInController {
  async store(req, res) {
    const schema = yup.object().shape({
      email: yup.string().required(),
      senha: yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'porfavor! preencha os campos correctamente!' });
    }
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ error: 'email não registrado!' });
    }

    if (!(await usuario.checksenha(senha))) {
      return res.status(401).json({ error: 'senha incorrecta!' });
    }

    const { id, nome } = usuario;

    return res.json({
      usuario: {
        id,
        nome,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SignInController();
