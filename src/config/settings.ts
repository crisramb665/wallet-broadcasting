/** npm imports */
import dotenv from 'dotenv'

dotenv.config()

type GeneralSettingsType = {
  senderWalletAddress: string
  receiverWalletAddress: string
  senderPk: string
  rpcUrl: string
  chainId: string
  spenderAddress?: string
}

type ContractExecSettings = {
  contractAddress: string
  contractName: string
  amount: string
  methodName: string
}

export const generalSettings: GeneralSettingsType = {
  senderWalletAddress: process.env.SENDER_WALLET_ADDRESS || '',
  receiverWalletAddress: process.env.RECEIVER_WALLET_ADDRESS || '',
  senderPk: process.env.SENDER_PK || '',
  rpcUrl: process.env.RPC_URL || '',
  chainId: process.env.CHAIN_ID || '',
  spenderAddress: process.env.SPENDER_ADDRESS
}

export const contractExecSettings: ContractExecSettings = {
  contractAddress: process.env.CONTRACT_ADDRESS || '',
  contractName: process.env.CONTRACT_NAME || '',
  amount: process.env.AMOUNT || '',
  methodName: process.env.METHOD_NAME || ''
}
