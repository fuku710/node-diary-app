const express = require("express");
const db = require("../db/NeDB");
const router = express.Router();

/* トップページ */
router.get("/", function(req, res, next) {
  /* 投稿日昇順に日記を取得(最新5件) */
  db
    .find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .exec((err, doc) => {
      if (err) {
        res.render("index");
      } else {
        res.render("index", { diaries: doc });
      }
    });
});

module.exports = router;
