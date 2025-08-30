import { Router } from "express";
import { searchController } from "../controller/search.comtroller";

const router = Router();

router.get("/search", searchController)

export default router;