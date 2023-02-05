import Sequelize, { Model } from 'sequelize';

class Ficheiro extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3333/ficheiro/${this.path}`;
          },
        },
      },
      { sequelize },
    );
  }
}
export default Ficheiro;
