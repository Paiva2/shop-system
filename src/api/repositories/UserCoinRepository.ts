import { UserCoin } from "../@types/types"

export default interface UserCoinRepository {
  insert(quantity: number, coinName: string, coinOwner: string): Promise<UserCoin>

  addition(quantity: number, coinName: string, coinOwner: string): Promise<UserCoin>

  findUserCoins(walletId: string): Promise<UserCoin[]>

  updateFullValue(
    newValue: number,
    walletId: string,
    storeCoinName: string
  ): Promise<UserCoin>

  findUserCoinByCoinName(
    walletId: string,
    coinName: string
  ): Promise<UserCoin | null>

  updateUserCoinsToStoreItemPurchase(
    walletId: string,
    coinId: string,
    valueToSubtract: number
  ): Promise<UserCoin>
}
