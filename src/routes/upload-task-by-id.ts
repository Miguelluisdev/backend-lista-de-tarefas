
import { Request, Response } from "express";
import { sendSuccess } from "../logger/success/sendSuccess";
import { ValidationError } from "../logger/error/custom-error";
import { PrismaClient } from "@prisma/client";

export const updateTask = async (req: Request, res: Response) => {
    const prisma = new PrismaClient()
    const { id } = req.params;
    const { name, cost, limitDate } = req.body;

    try {

        const task = await prisma.tasks.findUnique({
            where: { id: parseInt(id, 10) },
        });

        if (!task) {
            throw new ValidationError("Tarefa não encontrada",);
        }


        const existingTask = await prisma.tasks.findUnique({
            where: { name },
        });

        if (existingTask && existingTask.id !== parseInt(id, 10)) {
            throw new ValidationError("Uma tarefa com esse nome já existe.");
        }

        const updatedTask = await prisma.tasks.update({
            where: { id: parseInt(id, 10) },
            data: {
                name,
                cost,
                limitDate: new Date(limitDate),
            },
        });

        sendSuccess(res, updatedTask, "Tarefa atualizada com sucesso");
    } catch (error) {
      
    }
};
