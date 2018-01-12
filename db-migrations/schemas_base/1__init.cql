CREATE TABLE last_articles (
  article_id UUID,
  date_added TIMESTAMP,
  author_id UUID,
  author_name TEXT,
  author_email TEXT,
  article_content TEXT,
  article_title TEXT,
  PRIMARY KEY (
    (
      article_id
    ),
    date_added
  )
) WITH CLUSTERING ORDER BY (
  date_added DESC
);
---
CREATE TABLE article_by_id (
  article_id UUID,
  date_added TIMESTAMP,
  article_content TEXT,
  article_title TEXT,
  author_id UUID,
  author_name TEXT,
  author_email TEXT,
  PRIMARY KEY (
    (
      article_id
    )
  )
);
---
CREATE TABLE comments_by_article (
  article_id UUID,
  comment_id UUID,
  date_added TIMESTAMP,
  content TEXT,
  pseudo TEXT,
  PRIMARY KEY (
    (
      article_id
    ),
    comment_id
  )
);