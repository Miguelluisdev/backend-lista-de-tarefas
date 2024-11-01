import { PrismaClient } from "@prisma/client"
import cors from "cors"
import express, { Request, Response } from "express"
import { createTask } from "./routes/create-task"
import { deleteTaskById } from "./routes/delete-task-by-id"
import { getTasks } from "./routes/get-tasks"
import { updateTask } from "./routes/upload-task-by-id"

const prisma = new PrismaClient()
const app = express()

app.use(express.json())
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = ["https://lista-de-tarefas-nine-eosin.vercel.app"]
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(null, false)
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  }),
)

app.get("/", (req: Request, res: Response) => {
  res.send("API funcionando")
})

// rotas
app.get("/tasks", getTasks)
app.post("/create-tasks", createTask)
app.put("/upload/:id", updateTask)
app.delete("/delete/:id", deleteTaskById)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`)
})
