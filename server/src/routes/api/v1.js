const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const uuidValidate = require('uuid-validate');

const cassandra = require('cassandra-driver');
const client = new cassandra.Client({
  contactPoints: ['db'],
  keyspace: 'it',
});


// quick and dirty user
const _tmp_author_sov = {
  author_id: uuidv4(),
  author_name: 'sovanna',
  author_email: 'sovanna.hing@gmail.com',
};


// quick and dirty middleware for protecting resources
// HACK here for testing purpose
const _mdw_auth = (req, res, next) => {
  if (!req.user) {
    return res.sendStatus(401);
  }

  return next();
};


router.get('/articles', (req, res, next) => {
  const query = 'SELECT * FROM last_articles';

  client
    .execute(query)
    .then((result) => {
      return res.json({
        articles: result.rows,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
});


router.get('/articles/:id', (req, res, next) => {
  const query = 'SELECT * FROM article_by_id WHERE article_id = ?';

  const _uuid = req.params.id;

  if (!uuidValidate(_uuid, 4)) {
    return res.status(400).json({
      error: 'Invalid article ID',
    });
  }

  client
    .execute(query, [req.params.id])
    .then((result) => {
      return res.json({
        articles: result.rows,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
});


router.post('/articles', _mdw_auth, (req, res, next) => {
  const _now = new Date();
  const _article_id = uuidv4();

  const _body = req.body;

  // params should go into a schema for auto-validation
  if (!_body.article_content) {
    return res.status(400).json({
      error: 'Missing article_content value',
    });
  }

  if (!_body.article_title) {
    return res.status(400).json({
      error: 'Missing article_title value',
    });
  }

  // Should be in a model module, something like that
  // cause ScyllaDB can be more complicated,
  // thus, a lot lines can be written
  const queries = [{
    query: `INSERT INTO it.last_articles (
      article_id,
      date_added,
      author_id,
      author_name,
      author_email,
      article_content,
      article_title
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    params: [
      _article_id,
      _now,
      _tmp_author_sov.author_id,
      _tmp_author_sov.author_name,
      _tmp_author_sov.author_email,
      _body.article_content,
      _body.article_title,
    ],
  }, {
    query: `INSERT INTO it.article_by_id (
      article_id,
      date_added,
      article_content,
      article_title,
      author_id,
      author_name,
      author_email
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    params: [
      _article_id,
      _now,
      _body.article_content,
      _body.article_title,
      _tmp_author_sov.author_id,
      _tmp_author_sov.author_name,
      _tmp_author_sov.author_email,
    ],
  }];

  client
    .batch(queries, { prepare: true })
    .then((result) => {
      return res.json({
        articles: result.rows,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
});


module.exports = router;
