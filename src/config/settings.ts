/** npm imports */
import dotenv from 'dotenv'

dotenv.config()

type ChainsSettingsType = Record<string, { rpcUrl: string; chainId: string }>

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

export const chainsSettings: ChainsSettingsType = {
  '8453': {
    rpcUrl: process.env.RPC_URL_BASE || '',
    chainId: process.env.CHAIN_ID || '8453'
  },
  '59144': {
    rpcUrl: process.env.RPC_URL_LINEA || '',
    chainId: process.env.CHAIN_ID || '59144'
  },
  '81457': {
    rpcUrl: process.env.RPC_URL_BLAST || '',
    chainId: process.env.CHAIN_ID || '81457'
  },
  '534352': {
    rpcUrl: process.env.RPC_URL_SCROLL || 'https://rpc.scroll.io',
    chainId: process.env.CHAIN_ID || '534352'
  },
  '137': {
    rpcUrl: process.env.RPC_URL_POLYGON || '',
    chainId: process.env.CHAIN_ID || '137'
  },
  '42161': {
    rpcUrl: process.env.RPC_URL_ARB || 'https://arbitrum.llamarpc.com',
    chainId: process.env.CHAIN_ID || '42161'
  }
}

export const generalSettings: GeneralSettingsType = {
  senderWalletAddress: process.env.SENDER_WALLET_ADDRESS || '',
  receiverWalletAddress: process.env.RECEIVER_WALLET_ADDRESS || '',
  senderPk: process.env.SENDER_PK || '',
  rpcUrl: chainsSettings[process.env.CHAIN_ID || ''].rpcUrl,
  chainId: chainsSettings[process.env.CHAIN_ID || ''].chainId,
  spenderAddress: process.env.SPENDER_ADDRESS
}

export const contractExecSettings: ContractExecSettings = {
  contractAddress: process.env.CONTRACT_ADDRESS || '',
  contractName: process.env.CONTRACT_NAME || '',
  amount: process.env.AMOUNT || '',
  methodName: process.env.METHOD_NAME || ''
}

export const signSettings = {
  walletSignerAddress: process.env.WALLET_SIGNER_ADDRESS || '',
  walletSignerPk: process.env.WALLET_SIGNER_PK || '',
  backendUrl: process.env.BACKEND_URL || ''
}
