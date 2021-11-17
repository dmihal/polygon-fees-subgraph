import { BigInt } from "@graphprotocol/graph-ts"
import { LogFeeTransfer } from "../generated/Contract/Contract"
import { Sync } from "../generated/UniV2Pool/UniV2Pool"
import { Fee } from "../generated/schema"

let baseUnit = BigInt.fromI32(10).pow(18).toBigDecimal()

let TWELVE_DECIMALS = BigInt.fromI32(10).pow(12)

export function handleLogFeeTransfer(event: LogFeeTransfer): void {
  let entity = Fee.load('1')

  if (entity == null) {
    entity = new Fee('1')

    entity.totalFees = BigInt.fromI32(0).toBigDecimal()
    entity.totalFeesUSD = BigInt.fromI32(0).toBigDecimal()
    entity.maticPrice = BigInt.fromI32(0).toBigDecimal()
  }

  entity.totalFees += event.params.amount.divDecimal(baseUnit)
  entity.totalFeesUSD += event.params.amount.divDecimal(baseUnit).times(entity.maticPrice)

  entity.save()
}

export function handleQuickswapSync(event: Sync): void {
  let entity = Fee.load('1')

  entity.maticPrice = event.params.reserve1
    .times(TWELVE_DECIMALS)
    .divDecimal(event.params.reserve0.toBigDecimal())

  entity.save()
}
