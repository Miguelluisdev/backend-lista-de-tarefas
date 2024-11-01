import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { InternalServerError } from "../logger/error/custom-error"
import { sendSuccess } from "../logger/success/sendSuccess"

export const getTasks = async (req: Request, res: Response) => {
  const prisma = new PrismaClient()
  try {
    const tasks = await prisma.tasks.findMany({
      orderBy: {
        order: "asc",
      },
    })

    sendSuccess(res, tasks, "Tarefas obtidas com sucesso")
  } catch (error) {
    throw new InternalServerError()
  }
}
