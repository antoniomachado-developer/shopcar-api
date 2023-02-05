import Sequelize, { Model } from 'sequelize';

class Agendamento extends Model {
  static init(sequelize) {
    super.init(
      {
        data: Sequelize.DATE,
        cancelado_em: Sequelize.DATE,
      },
      {
        sequelize,
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'cliente_id', as: 'cliente' });
  }
}
export default Agendamento;
