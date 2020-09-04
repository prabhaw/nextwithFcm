const express = require("express");
const next = require("next");
const cors = require("cors");
require("./db");
const User = require("./server/modal");
// const sendMsg = require("./server/fcm");
const sendMsg = require("./server2/fmcdash");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(cors());

  server.use(
    express.urlencoded({
      extended: true,
    })
  );
  server.use(express.json());
  server.get("/service-worker.js", (req, res) => {
    app.serveStatic(req, res, "./.next/service-worker.js");
  });

  const serviceWorkers = [
    {
      filename: "service-worker.js",
      path: "./.next/service-worker.js",
    },
    {
      filename: "firebase-messaging-sw.js",
      path: "./public/firebase-messaging-sw.js",
    },
  ];

  serviceWorkers.forEach(({ filename, path }) => {
    server.get(`/${filename}`, (req, res) => {
      app.serveStatic(req, res, path);
    });
  });

  server.post("/api/adduser", function (req, res) {
    const data = req.body;
    const user = new User(data);

    console.log(">>>>>", user);
    user.save(function (err, done) {
      if (err) {
        res.status(400).json({ msg: "Error while addign user." });
      }
      return res.status(200).json(done);
    });
  });
  server.post("/api/sendmsg", function (req, res) {
    User.find({}, (err, done) => {
      sendMsg(done[0]);
    });
    res.status(200).json({ msg: "Send success" });
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
