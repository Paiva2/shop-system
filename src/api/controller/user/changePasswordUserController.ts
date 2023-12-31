import { Request, Response } from "express"
import { ErrorService } from "../../@types/types"
import UserControllerFactory from "./factory"

export default class ChangePasswordUserController {
  static async handle(request: Request, response: Response) {
    const { email, newPassword } = request.body

    const { changePasswordUserService } = UserControllerFactory.handle()

    try {
      await changePasswordUserService.execute({
        email,
        newPassword,
      })

      return response.status(200).send()
    } catch (e) {
      const err = e as ErrorService

      return response.status(err.status).send({ message: err.error })
    }
  }
}
