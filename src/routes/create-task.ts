import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { CreationError, ValidationError } from "../logger/error/custom-error"
import { sendSuccess } from "../logger/success/sendSuccess"

export const createTask = async (req: Request, res: Response) => {
  const prisma = new PrismaClient()
  const { name, cost, limitDate } = req.body

  try {
    const existingTask = await prisma.tasks.findUnique({
      where: { name },
    })

    if (existingTask) {
      throw new ValidationError(`A tarefa com o nome "${name}" já existe.`)
    }

    const lastTask = await prisma.tasks.findFirst({
      orderBy: { order: "desc" },
    })

    const newOrder = lastTask ? lastTask.order + 1 : 1

    const newTask = await prisma.tasks.create({
      data: {
        name,
        cost,
        limitDate: new Date(limitDate),
        order: newOrder,
      },
    })

    sendSuccess(res, newTask, "Tarefa criada com sucesso")
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Erro ao processar o arquivo: ${error.message}` })
  }
}
