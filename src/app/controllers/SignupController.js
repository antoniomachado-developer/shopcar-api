import * as yup from 'yup';
import Usuario from '../models/Usuario';

class SignupController {
  async store(req, res) {
    const schema = yup.object().shape({
      nome: yup.string().required(),
      email: yup.string().email().required(),
      senha: yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'porfavor! preencha os campos correctamente!' });
    }

    const usuarioExiste = await Usuario.findOne({
      where: { email: req.body.email },
    });

    if (usuarioExiste) {
      return res.status(400).json({ error: 'email já cadastrado!' });
    }

    const { nome, email, senha } = await req.body;
    const { senha_hash, isAdmin } = await Usuario.create({
      nome,
      email,
      senha,
      isAdmin: false,
    });

    return res.status(201).json({ nome, email, senha_hash, isAdmin });
  }

  async update(req, res) {
    const schema = yup.object().shape({
      nome: yup.string(),
      email: yup.string().email(),
      SenhaAntiga: yup.string().min(6),
      senha: yup
        .string()
        .min(6)
        .when('senhaAntiga', (senhaAntiga, field) =>
          senhaAntiga ? field.required() : field,
        ),
      confirmSenha: yup
        .string()
        .when('senha', (senha, field) =>
          senha ? field.required().oneOf([yup.ref('senha')]) : field,
        ),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'porfavor! preencha correctamento os campos! ' });
    }

    const { email, senhaAntiga } = req.body;
    const usuario = await Usuario.findByPk(req.usuario);

    if (email !== undefined && email !== usuario.email) {
      const usuarioExiste = await Usuario.findOne({
        where: { email },
      });

      if (usuarioExiste) {
        return res.status(400).json({ error: 'email já cadastrado!' });
      }
    }
    if (senhaAntiga && !(await usuario.checksenha(senhaAntiga))) {
      return res.status(401).json({ error: 'As senhas devem ser iguais!' });
    }

    const { nome, senha, avatar_id } = await usuario.update(req.body);
    return res.status(201).json({ nome, email, senha, avatar_id });
  }
}
export default new SignupController();
