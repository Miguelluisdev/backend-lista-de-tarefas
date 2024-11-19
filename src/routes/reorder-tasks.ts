import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { CreationError, ValidationError } from "../logger/error/custom-error"
import { sendSuccess } from "../logger/success/sendSuccess"

export const reorderTasks = async (req: Request, res: Response) => {
  const prisma = new PrismaClient()
  const { reorderedTasks } = req.body

  try {
    if (!Array.isArray(reorderedTasks) || reorderedTasks.length === 0) {
      throw new ValidationError(
        "A lista de tarefas reordenadas é inválida ou vazia.",
      )
    }

    const taskIds = reorderedTasks.map((task: any) => task.id)
    const tasksInDb = await prisma.tasks.findMany({
      where: { id: { in: taskIds } },
    })

    if (tasksInDb.length !== reorderedTasks.length) {
      throw new ValidationError(
        "Algumas tarefas na lista fornecida não existem.",
      )
    }

    const uniqueOrders = new Set(reorderedTasks.map((task: any) => task.order))
    if (uniqueOrders.size !== reorderedTasks.length) {
      throw new ValidationError("A lista contém ordens duplicadas.")
    }

    const updates = reorderedTasks.map((task: any) =>
      prisma.tasks.update({
        where: { id: task.id },
        data: { order: task.order },
      }),
    )

    await prisma.$transaction(updates)

    sendSuccess(res, null, "As tarefas foram reordenadas com sucesso.")
  } catch (error: any) {
    if (error instanceof ValidationError) {
      res.status(400).json({ message: error.message })
    } else {
      console.error("Erro interno ao reordenar tarefas:", error)
      res.status(500).json({ message: "Erro interno ao reordenar tarefas." })
    }
  }
}
