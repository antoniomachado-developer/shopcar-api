import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        email: Sequelize.STRING,
        senha: Sequelize.VIRTUAL,
        senha_hash: Sequelize.STRING,
        isAdmin: Sequelize.BOOLEAN,
      },
      { sequelize },
    );
    this.addHook('beforeSave', async (usuario) => {
      if (usuario.senha) {
        usuario.senha_hash = await bcrypt.hash(usuario.senha, 8);
      }
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Ficheiro, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  checksenha(senha) {
    return bcrypt.compare(senha, this.senha_hash);
  }
}
export default Usuario;
