import 'dotenv/config';

import express from 'express';
import { router } from './routes/routes';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';

const app = express();

const serverHttp = http.createServer(app);
const io = new Server(serverHttp, { cors: { origin: "*" } });

io.on("connection", socket => {
    console.log("Connected! ID: ", socket.id);
})

const whitelist = ["http://localhost:3000"]

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(router);

app.get("/github", (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
});

app.get("/signin/callback", (req, res) => {
    const { code } = req.query;

    return res.json(code);
});

export { serverHttp, io }
