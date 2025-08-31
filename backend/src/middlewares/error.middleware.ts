import { NextFunction, Request, Response } from "express";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode: number = 500;
    let message: string = "internal server error";
    let errors: any[] | null = null;

    console.error(err)
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors,
    });
};
