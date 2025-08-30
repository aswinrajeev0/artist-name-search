import { NextFunction, Request, Response } from "express";
import pool from "../config/db";

export const searchController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const q = ((req.query.q as string) || "").trim().slice(0, 255);
        const limit = parseInt(req.query.limit as string) || 10;

        const result = await pool.query(
            `
            SELECT artist_id, artist_name, artist_genre, artist_img, country,
            similarity(artist_name, $1) AS sim
            FROM artists
            WHERE artist_name ILIKE '%' || $1 || '%' OR similarity(artist_name, $1) > 0.3
            ORDER BY sim DESC, artist_name ASC
            LIMIT $2;
            `,
            [q, limit]
        );

        res.status(200).json(result.rows);
    } catch (error) {
        next(error);
    }
};
