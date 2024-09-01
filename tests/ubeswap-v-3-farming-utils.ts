import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  DepositTransferred,
  ExcessRewardsRefunded,
  ExternalRewardCollected,
  FeeCollected,
  IncentiveCreated,
  IncentiveExtended,
  IncentiveUpdated,
  PeriodRewardIncreased,
  RewardCollected,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  TokenStaked,
  TokenUnstaked
} from "../generated/UbeswapV3Farming/UbeswapV3Farming"

export function createDepositTransferredEvent(
  tokenId: BigInt,
  oldOwner: Address,
  newOwner: Address
): DepositTransferred {
  let depositTransferredEvent = changetype<DepositTransferred>(newMockEvent())

  depositTransferredEvent.parameters = new Array()

  depositTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  depositTransferredEvent.parameters.push(
    new ethereum.EventParam("oldOwner", ethereum.Value.fromAddress(oldOwner))
  )
  depositTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return depositTransferredEvent
}

export function createExcessRewardsRefundedEvent(
  incentiveId: Bytes,
  refund: BigInt
): ExcessRewardsRefunded {
  let excessRewardsRefundedEvent = changetype<ExcessRewardsRefunded>(
    newMockEvent()
  )

  excessRewardsRefundedEvent.parameters = new Array()

  excessRewardsRefundedEvent.parameters.push(
    new ethereum.EventParam(
      "incentiveId",
      ethereum.Value.fromFixedBytes(incentiveId)
    )
  )
  excessRewardsRefundedEvent.parameters.push(
    new ethereum.EventParam("refund", ethereum.Value.fromUnsignedBigInt(refund))
  )

  return excessRewardsRefundedEvent
}

export function createExternalRewardCollectedEvent(
  incentiveId: Bytes,
  to: Address,
  reward: BigInt
): ExternalRewardCollected {
  let externalRewardCollectedEvent = changetype<ExternalRewardCollected>(
    newMockEvent()
  )

  externalRewardCollectedEvent.parameters = new Array()

  externalRewardCollectedEvent.parameters.push(
    new ethereum.EventParam(
      "incentiveId",
      ethereum.Value.fromFixedBytes(incentiveId)
    )
  )
  externalRewardCollectedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  externalRewardCollectedEvent.parameters.push(
    new ethereum.EventParam("reward", ethereum.Value.fromUnsignedBigInt(reward))
  )

  return externalRewardCollectedEvent
}

export function createFeeCollectedEvent(
  owner: Address,
  tokenId: BigInt,
  recipient: Address,
  amount0Max: BigInt,
  amount1Max: BigInt
): FeeCollected {
  let feeCollectedEvent = changetype<FeeCollected>(newMockEvent())

  feeCollectedEvent.parameters = new Array()

  feeCollectedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  feeCollectedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  feeCollectedEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  feeCollectedEvent.parameters.push(
    new ethereum.EventParam(
      "amount0Max",
      ethereum.Value.fromUnsignedBigInt(amount0Max)
    )
  )
  feeCollectedEvent.parameters.push(
    new ethereum.EventParam(
      "amount1Max",
      ethereum.Value.fromUnsignedBigInt(amount1Max)
    )
  )

  return feeCollectedEvent
}

export function createIncentiveCreatedEvent(
  incentiveId: Bytes,
  rewardToken: Address,
  pool: Address,
  startTime: BigInt,
  lockTime: BigInt,
  minimumTickRange: i32,
  maxTickLower: i32,
  minTickLower: i32,
  maxTickUpper: i32,
  minTickUpper: i32
): IncentiveCreated {
  let incentiveCreatedEvent = changetype<IncentiveCreated>(newMockEvent())

  incentiveCreatedEvent.parameters = new Array()

  incentiveCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "incentiveId",
      ethereum.Value.fromFixedBytes(incentiveId)
    )
  )
  incentiveCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "rewardToken",
      ethereum.Value.fromAddress(rewardToken)
    )
  )
  incentiveCreatedEvent.parameters.push(
    new ethereum.EventParam("pool", ethereum.Value.fromAddress(pool))
  )
  incentiveCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "startTime",
      ethereum.Value.fromUnsignedBigInt(startTime)
    )
  )
  incentiveCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "lockTime",
      ethereum.Value.fromUnsignedBigInt(lockTime)
    )
  )
  incentiveCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "minimumTickRange",
      ethereum.Value.fromI32(minimumTickRange)
    )
  )
  incentiveCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "maxTickLower",
      ethereum.Value.fromI32(maxTickLower)
    )
  )
  incentiveCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "minTickLower",
      ethereum.Value.fromI32(minTickLower)
    )
  )
  incentiveCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "maxTickUpper",
      ethereum.Value.fromI32(maxTickUpper)
    )
  )
  incentiveCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "minTickUpper",
      ethereum.Value.fromI32(minTickUpper)
    )
  )

  return incentiveCreatedEvent
}

export function createIncentiveExtendedEvent(
  incentiveId: Bytes,
  newPeriodId: BigInt,
  duration: BigInt,
  reward: BigInt
): IncentiveExtended {
  let incentiveExtendedEvent = changetype<IncentiveExtended>(newMockEvent())

  incentiveExtendedEvent.parameters = new Array()

  incentiveExtendedEvent.parameters.push(
    new ethereum.EventParam(
      "incentiveId",
      ethereum.Value.fromFixedBytes(incentiveId)
    )
  )
  incentiveExtendedEvent.parameters.push(
    new ethereum.EventParam(
      "newPeriodId",
      ethereum.Value.fromUnsignedBigInt(newPeriodId)
    )
  )
  incentiveExtendedEvent.parameters.push(
    new ethereum.EventParam(
      "duration",
      ethereum.Value.fromUnsignedBigInt(duration)
    )
  )
  incentiveExtendedEvent.parameters.push(
    new ethereum.EventParam("reward", ethereum.Value.fromUnsignedBigInt(reward))
  )

  return incentiveExtendedEvent
}

export function createIncentiveUpdatedEvent(
  incentiveId: Bytes,
  timestamp: BigInt,
  newPeriodId: BigInt,
  merkleRoot: Bytes,
  ipfsHash: Bytes,
  distributedRewardsSinceLastUpdate: BigInt,
  activeTvlNative: BigInt,
  externalTvlNative: BigInt
): IncentiveUpdated {
  let incentiveUpdatedEvent = changetype<IncentiveUpdated>(newMockEvent())

  incentiveUpdatedEvent.parameters = new Array()

  incentiveUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "incentiveId",
      ethereum.Value.fromFixedBytes(incentiveId)
    )
  )
  incentiveUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )
  incentiveUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newPeriodId",
      ethereum.Value.fromUnsignedBigInt(newPeriodId)
    )
  )
  incentiveUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "merkleRoot",
      ethereum.Value.fromFixedBytes(merkleRoot)
    )
  )
  incentiveUpdatedEvent.parameters.push(
    new ethereum.EventParam("ipfsHash", ethereum.Value.fromFixedBytes(ipfsHash))
  )
  incentiveUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "distributedRewardsSinceLastUpdate",
      ethereum.Value.fromUnsignedBigInt(distributedRewardsSinceLastUpdate)
    )
  )
  incentiveUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "activeTvlNative",
      ethereum.Value.fromUnsignedBigInt(activeTvlNative)
    )
  )
  incentiveUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "externalTvlNative",
      ethereum.Value.fromUnsignedBigInt(externalTvlNative)
    )
  )

  return incentiveUpdatedEvent
}

export function createPeriodRewardIncreasedEvent(
  incentiveId: Bytes,
  periodId: BigInt,
  reward: BigInt
): PeriodRewardIncreased {
  let periodRewardIncreasedEvent = changetype<PeriodRewardIncreased>(
    newMockEvent()
  )

  periodRewardIncreasedEvent.parameters = new Array()

  periodRewardIncreasedEvent.parameters.push(
    new ethereum.EventParam(
      "incentiveId",
      ethereum.Value.fromFixedBytes(incentiveId)
    )
  )
  periodRewardIncreasedEvent.parameters.push(
    new ethereum.EventParam(
      "periodId",
      ethereum.Value.fromUnsignedBigInt(periodId)
    )
  )
  periodRewardIncreasedEvent.parameters.push(
    new ethereum.EventParam("reward", ethereum.Value.fromUnsignedBigInt(reward))
  )

  return periodRewardIncreasedEvent
}

export function createRewardCollectedEvent(
  tokenId: BigInt,
  incentiveId: Bytes,
  to: Address,
  reward: BigInt
): RewardCollected {
  let rewardCollectedEvent = changetype<RewardCollected>(newMockEvent())

  rewardCollectedEvent.parameters = new Array()

  rewardCollectedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  rewardCollectedEvent.parameters.push(
    new ethereum.EventParam(
      "incentiveId",
      ethereum.Value.fromFixedBytes(incentiveId)
    )
  )
  rewardCollectedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  rewardCollectedEvent.parameters.push(
    new ethereum.EventParam("reward", ethereum.Value.fromUnsignedBigInt(reward))
  )

  return rewardCollectedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createTokenStakedEvent(
  tokenId: BigInt,
  incentiveId: Bytes,
  liquidity: BigInt,
  initialSecondsInside: BigInt
): TokenStaked {
  let tokenStakedEvent = changetype<TokenStaked>(newMockEvent())

  tokenStakedEvent.parameters = new Array()

  tokenStakedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  tokenStakedEvent.parameters.push(
    new ethereum.EventParam(
      "incentiveId",
      ethereum.Value.fromFixedBytes(incentiveId)
    )
  )
  tokenStakedEvent.parameters.push(
    new ethereum.EventParam(
      "liquidity",
      ethereum.Value.fromUnsignedBigInt(liquidity)
    )
  )
  tokenStakedEvent.parameters.push(
    new ethereum.EventParam(
      "initialSecondsInside",
      ethereum.Value.fromUnsignedBigInt(initialSecondsInside)
    )
  )

  return tokenStakedEvent
}

export function createTokenUnstakedEvent(
  tokenId: BigInt,
  incentiveId: Bytes
): TokenUnstaked {
  let tokenUnstakedEvent = changetype<TokenUnstaked>(newMockEvent())

  tokenUnstakedEvent.parameters = new Array()

  tokenUnstakedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  tokenUnstakedEvent.parameters.push(
    new ethereum.EventParam(
      "incentiveId",
      ethereum.Value.fromFixedBytes(incentiveId)
    )
  )

  return tokenUnstakedEvent
}
