const { fetchTopics } = require("../models/topics.models");

exports.getTopics = async (req, res) => {
  const results = await fetchTopics();
  res.status(200).send({ topics: results });
};
