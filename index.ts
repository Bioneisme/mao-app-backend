import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute";
import medRoute from "./routes/medRoute";
import postRoute from "./routes/postRoute";
import {CLIENT_URL, SERVER_PORT} from "./config/settings";
import {config} from "./config/mikro-orm";
import logger from "./config/logger";
import express, {Application} from "express";
import {EntityManager, MikroORM} from "@mikro-orm/core";
import logging from "./middleware/loggingMiddleware";

const app: Application = express();

export const DI = {} as {
    orm: MikroORM,
    em: EntityManager
};

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "*"
}));
app.use(cookieParser());

app.use(logging);
app.use("/api/users", userRoute);
app.use("/api/med", medRoute);
app.use("/api/posts", postRoute);

app.listen(SERVER_PORT, async () => {
    DI.orm = await MikroORM.init(config);
    DI.em = DI.orm.em.fork();

    logger.info(`Server Started on port ${SERVER_PORT}`);
});
