import { BigInt, Bytes, Address, store } from '@graphprotocol/graph-ts';

import {
  DepositTransferred as DepositTransferredEvent,
  ExcessRewardsRefunded as ExcessRewardsRefundedEvent,
  ExternalRewardCollected as ExternalRewardCollectedEvent,
  FeeCollected as FeeCollectedEvent,
  IncentiveCreated as IncentiveCreatedEvent,
  IncentiveExtended as IncentiveExtendedEvent,
  IncentiveUpdated as IncentiveUpdatedEvent,
  PeriodRewardIncreased as PeriodRewardIncreasedEvent,
  RewardCollected as RewardCollectedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  TokenStaked as TokenStakedEvent,
  TokenUnstaked as TokenUnstakedEvent
} from "../generated/UbeswapV3Farming/UbeswapV3Farming"
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
  TokenUnstaked,

  Incentive,
  IncentivePeriod,
  Position,
  Deposit,
  Stake,
} from "../generated/schema"

const ZERO_ADDRESS = Address.fromString("0x0000000000000000000000000000000000000000");

export function handleDepositTransferred(event: DepositTransferredEvent): void {
  let entity = new DepositTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenId = event.params.tokenId
  entity.oldOwner = event.params.oldOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let deposit = Deposit.load(Bytes.fromHexString(event.params.tokenId.toHexString()))
  if (deposit === null) {
    deposit = new Deposit(Bytes.fromHexString(event.params.tokenId.toHexString()))
    deposit.tokenId = event.params.tokenId
    deposit.firstOwner = event.params.newOwner
  }
  if (Address.fromBytes(event.params.newOwner).equals(ZERO_ADDRESS)) {
    store.remove('Deposit', deposit.id.toHexString())
  } else {
    deposit.owner = event.params.newOwner
    deposit.oldOwner = event.params.oldOwner
    deposit.save()

    let position = Position.load(Bytes.fromHexString(event.params.tokenId.toHexString()))
    if (position === null) {
      position = new Position(Bytes.fromHexString(event.params.tokenId.toHexString()))
      position.tokenId = event.params.tokenId
      position.liquidity = BigInt.fromU32(0)
      position.tickLower = 0
      position.tickUpper = 0
      position.deposit = deposit.id
      position.save()
    }
  }
}

export function handleExcessRewardsRefunded(
  event: ExcessRewardsRefundedEvent
): void {
  let entity = new ExcessRewardsRefunded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.incentiveId = event.params.incentiveId
  entity.refund = event.params.refund

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleExternalRewardCollected(
  event: ExternalRewardCollectedEvent
): void {
  let entity = new ExternalRewardCollected(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.incentiveId = event.params.incentiveId
  entity.to = event.params.to
  entity.reward = event.params.reward

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFeeCollected(event: FeeCollectedEvent): void {
  let entity = new FeeCollected(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.tokenId = event.params.tokenId
  entity.recipient = event.params.recipient
  entity.amount0Max = event.params.amount0Max
  entity.amount1Max = event.params.amount1Max

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleIncentiveCreated(event: IncentiveCreatedEvent): void {
  let entity = new IncentiveCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.incentiveId = event.params.incentiveId
  entity.rewardToken = event.params.rewardToken
  entity.pool = event.params.pool
  entity.startTime = event.params.startTime
  entity.lockTime = event.params.lockTime
  entity.minimumTickRange = event.params.minimumTickRange
  entity.maxTickLower = event.params.maxTickLower
  entity.minTickLower = event.params.minTickLower
  entity.maxTickUpper = event.params.maxTickUpper
  entity.minTickUpper = event.params.minTickUpper

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let incentive = Incentive.load(event.params.incentiveId)
  if (incentive === null) {
    incentive = new Incentive(event.params.incentiveId) 
  }
  incentive.rewardToken = event.params.rewardToken
  incentive.pool = event.params.pool
  incentive.startTime = event.params.startTime
  incentive.lockTime = event.params.lockTime
  incentive.minimumTickRange = event.params.minimumTickRange
  incentive.maxTickLower = event.params.maxTickLower
  incentive.minTickLower = event.params.minTickLower
  incentive.maxTickUpper = event.params.maxTickUpper
  incentive.minTickUpper = event.params.minTickUpper
  incentive.endTime = BigInt.fromI32(0)
  incentive.merkleRoot = Bytes.empty();
  incentive.ipfsHash = Bytes.empty();
  incentive.currentPeriodId = BigInt.fromI32(0)
  incentive.currentPeriod = event.params.incentiveId.concatI32(0)
  incentive.save()
}

export function handleIncentiveExtended(event: IncentiveExtendedEvent): void {
  let entity = new IncentiveExtended(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.incentiveId = event.params.incentiveId
  entity.newPeriodId = event.params.newPeriodId
  entity.duration = event.params.duration
  entity.reward = event.params.reward

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let incentive = Incentive.load(event.params.incentiveId)
  if (incentive === null) {
    throw new Error('incentive is null on handleIncentiveExtended')
  }
  let incentivePeriod = new IncentivePeriod(event.params.incentiveId.concatI32(event.params.newPeriodId.toI32()))
  incentivePeriod.incentiveId = event.params.incentiveId
  incentivePeriod.periodId = event.params.newPeriodId
  incentivePeriod.reward = event.params.reward
  if (event.params.newPeriodId.gt(BigInt.fromU32(0))) {
    const previousPeriod = IncentivePeriod.load(event.params.incentiveId.concatI32(event.params.newPeriodId.minus(BigInt.fromI32(1)).toI32()))
    if (previousPeriod === null) {
      throw new Error('previousPeriod is null on handleIncentiveExtended')
    }
    incentivePeriod.startTime = previousPeriod.startTime
  } else {
    incentivePeriod.startTime = incentive.startTime
  }
  incentivePeriod.endTime = incentivePeriod.startTime.plus(event.params.duration)
  incentivePeriod.save()
  incentive.endTime = incentivePeriod.endTime;
  incentive.save();
}

export function handleIncentiveUpdated(event: IncentiveUpdatedEvent): void {
  let entity = new IncentiveUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.incentiveId = event.params.incentiveId
  entity.timestamp = event.params.timestamp
  entity.newPeriodId = event.params.newPeriodId
  entity.merkleRoot = event.params.merkleRoot
  entity.ipfsHash = event.params.ipfsHash
  entity.distributedRewardsSinceLastUpdate =
    event.params.distributedRewardsSinceLastUpdate
  entity.activeTvlNative = event.params.activeTvlNative
  entity.externalTvlNative = event.params.externalTvlNative

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let incentive = Incentive.load(event.params.incentiveId)
  if (incentive === null) {
    throw new Error('incentive is null on handleIncentiveUpdated')
  }
  if (incentive.currentPeriodId.notEqual(event.params.newPeriodId)) {
    incentive.currentPeriodId = event.params.newPeriodId
    const newPeriod = IncentivePeriod.load(event.params.incentiveId.concatI32(event.params.newPeriodId.toI32()))
    if (newPeriod === null) {
      throw new Error('newPeriod is null on handleIncentiveUpdated')
    }
    incentive.endTime = newPeriod.endTime
    incentive.currentPeriod = newPeriod.id
    incentive.merkleRoot = event.params.merkleRoot
    incentive.ipfsHash = event.params.ipfsHash
  }
}

export function handlePeriodRewardIncreased(
  event: PeriodRewardIncreasedEvent
): void {
  let entity = new PeriodRewardIncreased(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.incentiveId = event.params.incentiveId
  entity.periodId = event.params.periodId
  entity.reward = event.params.reward

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  // update incentive period
}

export function handleRewardCollected(event: RewardCollectedEvent): void {
  let entity = new RewardCollected(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenId = event.params.tokenId
  entity.incentiveId = event.params.incentiveId
  entity.to = event.params.to
  entity.reward = event.params.reward

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenStaked(event: TokenStakedEvent): void {
  let entity = new TokenStaked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenId = event.params.tokenId
  entity.incentiveId = event.params.incentiveId
  entity.liquidity = event.params.liquidity
  entity.initialSecondsInside = event.params.initialSecondsInside

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let stake = new Stake(event.params.incentiveId.concat(Bytes.fromHexString(event.params.tokenId.toHexString())))
  stake.incentiveId = event.params.incentiveId
  stake.tokenId = event.params.tokenId
  stake.deposit = Bytes.fromHexString(event.params.tokenId.toHexString())
  stake.incentive = event.params.incentiveId
  stake.position = Bytes.fromHexString(event.params.tokenId.toHexString())
  stake.save()
}

export function handleTokenUnstaked(event: TokenUnstakedEvent): void {
  let entity = new TokenUnstaked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenId = event.params.tokenId
  entity.incentiveId = event.params.incentiveId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  store.remove('Stake', event.params.incentiveId.concat(Bytes.fromHexString(event.params.tokenId.toHexString())).toHexString())
}
