import { Router } from "express";
import booksRoute from "./book/book.route";
import userRoute from "./user/user.route";
import { authorize } from "../middlewares/auth";

const router = Router();

router.use("/books", authorize(), booksRoute);

router.use("/users", userRoute);

export default router;
