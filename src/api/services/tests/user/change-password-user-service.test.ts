import { describe, it, expect, beforeEach } from "vitest"
import InMemoryUser from "../../../in-memory/InMemoryUser"
import RegisterNewUserServices from "../../user/registerNewUserService"
import ChangePasswordUserService from "../../user/changePasswordUserService"
import { compare } from "bcryptjs"
import InMemoryWallet from "../../../in-memory/inMemoryWallet"
import InMemoryUserWishList from "../../../in-memory/inMemoryUserWishList"

let inMemoryUser: InMemoryUser
let inMemoryWallet: InMemoryWallet
let inMemoryUserWishList: InMemoryUserWishList

let registerNewUserService: RegisterNewUserServices
let sut: ChangePasswordUserService

describe("Change user password service", () => {
  beforeEach(async () => {
    inMemoryUser = new InMemoryUser()
    inMemoryWallet = new InMemoryWallet()
    inMemoryUserWishList = new InMemoryUserWishList()

    registerNewUserService = new RegisterNewUserServices(
      inMemoryUser,
      inMemoryWallet,
      inMemoryUserWishList
    )
    sut = new ChangePasswordUserService(inMemoryUser)

    await registerNewUserService.execute({
      email: "test@email.com",
      username: "test user",
      password: "123456",
    })
  })

  it("should be possible to change an existing user password.", async () => {
    const { updatedUser } = await sut.execute({
      email: "test@email.com",
      newPassword: "newpass123",
    })

    const comparePasswords = await compare("newpass123", updatedUser.password)

    expect(comparePasswords).toBe(true)
    expect(updatedUser).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: "test@email.com",
        password: expect.any(String),
      })
    )
  })

  it("should not be possible to change an existing user password if email or new password are not provided.", async () => {
    await expect(() => {
      return sut.execute({
        email: "test@email.com",
        newPassword: "",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        error: "You must provide all informations. Email and password.",
      })
    )
  })

  it("should not be possible to change an existing user password if new password doesnt have 6 characters.", async () => {
    await expect(() => {
      return sut.execute({
        email: "test@email.com",
        newPassword: "12345",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        error: "Password must have at least 6 characters.",
      })
    )
  })

  it("should not be possible to change an existing user password if user doesnt exists.", async () => {
    await expect(() => {
      return sut.execute({
        email: "inexistentuser@email.com",
        newPassword: "123456",
      })
    }).rejects.toEqual(
      expect.objectContaining({
        error: "User not found.",
      })
    )
  })
})
