export interface IAppError {
  statusCode: number
  isOperational: boolean
  message: string
  timestamp?: Date
  stack?: string
  context?: string
}

export interface IErrorLogger {
  logError(error: IAppError): void
  logInfo(message: string): void
  logWarn(message: string): void
}

export class AppError extends Error implements IAppError {
  public readonly statusCode: number
  public readonly isOperational: boolean
  public readonly timestamp: Date
  public readonly stack?: string
  public readonly context?: string

  constructor(
    message: string,
    statusCode: number,
    isOperational: boolean,
    context?: string,
  ) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    this.timestamp = new Date()
    this.context = context

    if (isOperational) {
      this.stack = new Error().stack
    }

    Error.captureStackTrace(this, this.constructor)
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found", context?: string) {
    super(message, 404, true, context)
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = "Internal server error", context?: string) {
    super(message, 500, false, context)
  }
}

export class CreationError extends AppError {
  constructor(message: string = "Erro ao criar o usuario", context?: string) {
    super(message, 400, true, context)
  }
}

export class UpdateError extends AppError {
  constructor(
    message: string = "Erro ao atualizar o usuario",
    context?: string,
  ) {
    super(message, 400, true, context)
  }
}

export class DeleteError extends AppError {
  constructor(message: string = "Erro ao deletar usuario", context?: string) {
    super(message, 400, true, context)
  }
}

export class ValidationError extends AppError {
  constructor(message: string = "Dados invalido verifique a validação") {
    super(message, 404, true)
  }
}
