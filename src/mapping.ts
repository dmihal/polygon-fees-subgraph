import { BigInt } from "@graphprotocol/graph-ts"
import { LogFeeTransfer } from "../generated/Contract/Contract"
import { Fee } from "../generated/schema"

let baseUnit = BigInt.fromI32(10).pow(18).toBigDecimal()

export function handleLogFeeTransfer(event: LogFeeTransfer): void {
  let entity = Fee.load('1')

  if (entity == null) {
    entity = new Fee('1')

    entity.totalFees = BigInt.fromI32(0).toBigDecimal()
  }

  entity.totalFees = entity.totalFees + event.params.amount.divDecimal(baseUnit)

  entity.save()
}
