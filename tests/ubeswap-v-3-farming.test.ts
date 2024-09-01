import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { DepositTransferred } from "../generated/schema"
import { DepositTransferred as DepositTransferredEvent } from "../generated/UbeswapV3Farming/UbeswapV3Farming"
import { handleDepositTransferred } from "../src/ubeswap-v-3-farming"
import { createDepositTransferredEvent } from "./ubeswap-v-3-farming-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let tokenId = BigInt.fromI32(234)
    let oldOwner = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newOwner = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newDepositTransferredEvent = createDepositTransferredEvent(
      tokenId,
      oldOwner,
      newOwner
    )
    handleDepositTransferred(newDepositTransferredEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("DepositTransferred created and stored", () => {
    assert.entityCount("DepositTransferred", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "DepositTransferred",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenId",
      "234"
    )
    assert.fieldEquals(
      "DepositTransferred",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "oldOwner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "DepositTransferred",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "newOwner",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
