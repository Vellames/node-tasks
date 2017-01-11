import express from "express";
import consign from "consign";

const app = express();

// Routes

consign().
        include("libs/config.js").
        then("db.js").
        then("libs/middlewares.js").
        then("libs/auth.js").
        then("routes").
        then("libs/boot.js").
        into(app);