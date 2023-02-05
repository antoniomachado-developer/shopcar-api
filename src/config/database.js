module.exports = {
  dialect: 'postgres',
  type: 'postgres',
  host: process.env.DB_HOST_DEV,
  username: 'postgres',
  port: process.env.DB_PORT_DEV,
  password: 'heneses',
  database: 'bd-shopcar-dev',
  define: {
    timestamps: true,
    undercored: true,
    undercoredAll: true,
  },
};
