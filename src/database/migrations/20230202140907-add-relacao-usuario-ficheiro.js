module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Usuarios', 'avatar_id', {
      type: Sequelize.INTEGER,
      references: { model: 'Ficheiros', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Usuarios', 'avatar_id');
  },
};
