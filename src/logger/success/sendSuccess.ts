import { Request, Response } from "express"

export const sendSuccess = (
  res: Response,
  data: any,
  message: string = "Sucesso",
  statusCode: number = 200,
) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date(),
  })
}
