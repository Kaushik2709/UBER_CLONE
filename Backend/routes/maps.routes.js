import express from "express";
import { profileMiddleware } from "../middlewares/auth.middleware.js";
import { getCoordinates, getDistanceTimeController, getAutoCompleteSuggestionsController } from "../controllers/maps.controller.js";
import { query } from "express-validator";

const router = express.Router();

router.get("/get-coordinates",
    query("address").isString().isLength({ min: 3 }),
    profileMiddleware,
    getCoordinates
);

router.get("/get-distance-time",
    query("origin").isString().isLength({ min: 3 }),
    query("destination").isString().isLength({ min: 3 }),
    profileMiddleware,
    getDistanceTimeController
);

router.get("/get-suggestions",
    query("input").isString().isLength({ min: 3 }),
    profileMiddleware,
    getAutoCompleteSuggestionsController
);

export default router;
