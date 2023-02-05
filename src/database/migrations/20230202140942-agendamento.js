module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Agendamentos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      data: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      cliente_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: 'Usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      cancelado_em: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Agendamentos');
  },
};
