import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { DeleteError, NotFoundError } from "../logger/error/custom-error"
import { sendSuccess } from "../logger/success/sendSuccess"

export const deleteTaskById = async (req: Request, res: Response) => {
  const prisma = new PrismaClient()
  const { id } = req.params

  try {
    const task = await prisma.tasks.findUnique({
      where: { id: parseInt(id, 10) },
    })

    if (!task) {
      throw new NotFoundError("Tarefa não encontrada")
    }

    await prisma.tasks.delete({
      where: { id: parseInt(id, 10) },
    })

    const remainingTasks = await prisma.tasks.findMany({
      orderBy: { order: "asc" },
    })

    for (let index = 0; index < remainingTasks.length; index++) {
      await prisma.tasks.update({
        where: { id: remainingTasks[index].id },
        data: { order: index + 1 },
      })
    }

    sendSuccess(res, task, "Tarefa excluída com sucesso")
  } catch (error) {
    throw new DeleteError("Erro ao excluir a tarefa")
  }
}
