module.exports = (sequelize, Sequelize) => {
  const Taxi = sequelize.define("taxi", {
    distance: {
      type: Sequelize.INTEGER
    },
    startTime: {
      type: Sequelize.STRING
    },
    duration: {
      type: Sequelize.INTEGER
    }
  });

  return Taxi;
};
