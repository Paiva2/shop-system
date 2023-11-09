import { randomUUID } from "crypto"
import { StoreCoupon } from "../@types/types"
import StoreCouponRepository from "../repositories/StoreCouponRepository"

export default class InMemoryStoreCoupon implements StoreCouponRepository {
  private storeCoupons: StoreCoupon[] = []

  async insert({ storeId, discount, coupon_code, active, validation_date }) {
    const newCoupon = {
      id: randomUUID(),
      discount,
      coupon_code,
      fkcoupon_owner: storeId,
      active,
      created_At: new Date(),
      updated_at: new Date(),
      validation_date,
    }

    this.storeCoupons.push(newCoupon)

    return newCoupon
  }

  async findByCouponCode(storeId: string, couponCode: string) {
    const findStoreCoupon = this.storeCoupons.find(
      (coupon) =>
        coupon.fkcoupon_owner === storeId && coupon.coupon_code === couponCode
    )

    if (!findStoreCoupon) return null

    return findStoreCoupon
  }

  async findStoreCoupons(storeId: string) {
    const storeCoupons = this.storeCoupons.filter(
      (coupon) => coupon.fkcoupon_owner === storeId
    )

    return storeCoupons
  }
}