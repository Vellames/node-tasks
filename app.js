import express from "express";
import consign from "consign";

const APPLICATION_PORT = 3000;
const app = express();

// Routes

consign().
	include("models").
	then("libs/middlewares.js").
	then("routes").
	then("libs/boot.js").
	into(app);