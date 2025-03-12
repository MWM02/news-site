const db = require("../db/connection");

exports.fetchArticleById = async (article_id) => {
  const { rows } = await db.query(
    `SELECT * FROM articles WHERE article_id = $1`,
    [article_id]
  );
  if (rows.length === 0) {
    return Promise.reject({
      error: { message: "Resource not found", status: 404 },
    });
  }
  return rows[0];
};

exports.fetchArticles = async () => {
  const { rows } = await db.query(
    `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(articles.article_id) ::INT as comment_count  FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY created_at DESC`
  );
  return rows;
};

exports.updateArticleById = async (article_id, inc_votes) => {
  const { rows } = await db.query(
    `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`,
    [inc_votes, article_id]
  );
  return rows[0];
};
