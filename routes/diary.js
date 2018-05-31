const express = require("express");
const db = require("../db/NeDB");
const router = express.Router();

/* 投稿一覧表示 */
router.get("/", (req, res, next) => {
  /* 投稿日時降順に日記を取得 */
  db
    .find({})
    .sort({ createdAt: -1 })
    .exec((err, docs) => {
      if (err) {
        res.render("diary/index");
      } else {
        res.render("diary/index", { diaries: docs });
      }
    });
});

/* 新規投稿 */
router.get("/new", (req, res, next) => {
  res.render("diary/new");
});

/* 投稿確認 */
router.get("/confirm", (req, res, next) => {
  res.render("diary/confirm", {
    title: req.query.title,
    content: req.query.content
  });
});

/* 投稿詳細 */
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  db.find({ _id: id }).exec((err, docs) => {
    res.render("diary/detail", { diary: docs[0] });
  });
});

/* 投稿編集 */
router.get("/:id/edit", (req, res, next) => {
  const id = req.params.id;
  db.find({ _id: id }).exec((err, docs) => {
    res.render("diary/edit", { diary: docs[0] });
  });
});

/* 編集確認 */
router.get("/:id/confirm", (req, res, next) => {
  res.render("diary/edit_confirm", {
    id: req.params.id,
    title: req.query.title,
    content: req.query.content
  });
});

/* DB登録 */
router.post("/", (req, res, next) => {
  db.insert({ title: req.body.title, content: req.body.content });
  res.redirect("/diary");
});

/* DB更新 */
router.put("/:id", (req, res, next) => {
  db.update(
    {
      _id: req.params.id
    },
    {
      title: req.body.title,
      content: req.body.content
    }
  );
  res.redirect("/diary");
});

/* DB削除 */
router.delete("/:id", (req, res, next) => {
  db.remove({ _id: req.params.id });
  res.redirect("/diary");
});

router.delete;

module.exports = router;
