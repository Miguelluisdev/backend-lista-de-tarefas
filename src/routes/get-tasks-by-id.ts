import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { NotFoundError, ValidationError } from "../logger/error/custom-error"

const prisma = new PrismaClient()

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (isNaN(parseInt(id))) {
      throw new ValidationError("ID inválido fornecido")
    }

    const task = await prisma.tasks.findUnique({
      where: { id: parseInt(id, 10) },
    })

    if (!task) {
      throw new NotFoundError("Tarefa não encontrada")
    }

    res.status(200).json({ message: "Tarefa requisitada com sucesso", task })
  } catch (error) {
    res.status(404).json({ message: error || "Erro ao buscar tarefa" })
  }
}
