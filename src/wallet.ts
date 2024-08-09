/** npm imports */
import { ethers, Contract, JsonRpcProvider, Wallet, parseEther } from 'ethers'

/** local imports */
import { generalSettings, contractExecSettings } from './config/settings.js'
import { signAndExec } from './helper/signAndExec.js'

/** ABIs */
import ERC721_TOKEN_CONTRACT_ABI from './ABIs/ERC721_TOKEN_CONTRACT_ABI.js'
import ERC20_TOKEN_CONTRACT_ABI from './ABIs/ERC20_TOKEN_CONTRACT_ABI.js'
import WETH_ABI from './ABIs/WETH_ABI.js'
import CORE_ABI from './ABIs/CORE_ABI.js'

const transferErc20 = async () => {
  const { senderWalletAddress, receiverWalletAddress, senderPk, rpcUrl, chainId } = generalSettings
  const { contractAddress, contractName } = contractExecSettings
  console.log('General parameters: ', { senderWalletAddress, receiverWalletAddress, chainId })
  console.log('Contract parameters: ', { contractName, contractAddress })

  const provider = new JsonRpcProvider(rpcUrl)
  const signer = new Wallet(senderPk, provider)

  const baseErc20Contract = new Contract(contractAddress, ERC20_TOKEN_CONTRACT_ABI, provider)
  const balance = await baseErc20Contract.balanceOf(senderWalletAddress)
  console.log('current balance is: ', balance)

  const txUnsigned = await baseErc20Contract.transfer.populateTransaction(receiverWalletAddress, balance)
  txUnsigned.from = senderWalletAddress
  txUnsigned.chainId = BigInt(chainId)
  txUnsigned.gasPrice = (await provider.getFeeData()).gasPrice as bigint
  txUnsigned.nonce = await provider.getTransactionCount(senderWalletAddress)
  
  const estimatedGasLimit = await provider.estimateGas(txUnsigned)
  txUnsigned.gasLimit = estimatedGasLimit
  delete txUnsigned.from

  console.log(`tx unsigned: ${txUnsigned}`)

  const txSigned = await signer.signTransaction(txUnsigned)
  console.log(`tx signed: ${txSigned}`)
  const submittedTx = await provider.broadcastTransaction(txSigned)

  const receipt = await submittedTx.wait()
  const txHash = ethers.keccak256(txSigned)
  console.log(`The txHash is ${txHash} and the receipt is: ${receipt}`)
}

const transferNative = async () => {
  const { senderWalletAddress, receiverWalletAddress, senderPk, rpcUrl, chainId } = generalSettings
  const { contractAddress, contractName, amount } = contractExecSettings
  console.log('General parameters: ', { senderWalletAddress, receiverWalletAddress, chainId })
  console.log('Contract parameters: ', { contractName, contractAddress, amount })

  const processedAmount = parseEther(amount)

  const provider = new JsonRpcProvider(rpcUrl)
  const signer = new Wallet(senderPk, provider)

  const balance = await provider.getBalance(senderWalletAddress)
  console.log('current balance is: ', balance)

  const tx = await signer.sendTransaction({
    to: receiverWalletAddress,
    value: processedAmount
  })

  console.log('hash', tx.hash)
}

const nftBalance = async () => {
  const { senderWalletAddress, rpcUrl } = generalSettings
  const { contractName, contractAddress } = contractExecSettings
  console.log('General parameters: ', { senderWalletAddress })
  console.log('Contract parameters: ', { contractName, contractAddress })

  const provider = new JsonRpcProvider(rpcUrl)

  const nftContract = new Contract(contractAddress, ERC721_TOKEN_CONTRACT_ABI, provider)
  const balance = await nftContract.balanceOf(senderWalletAddress)
  console.log('nft balance', balance)
}

const approveERC20 = async () => {
  const { senderWalletAddress, receiverWalletAddress, senderPk, rpcUrl, chainId, spenderAddress } = generalSettings
  if (!spenderAddress) throw new Error('No spender address provided')

  const { contractAddress, contractName } = contractExecSettings
  console.log('General parameters: ', { senderWalletAddress, receiverWalletAddress, chainId })
  console.log('Contract parameters: ', { contractName, contractAddress })

  const provider = new JsonRpcProvider(rpcUrl)
  const signer = new Wallet(senderPk, provider)

  const token = new Contract(contractAddress, ERC20_TOKEN_CONTRACT_ABI, provider)
  const balance = await token.balanceOf(senderWalletAddress)
  console.log({ balance })

  const allowance1 = await token.allowance(senderWalletAddress, spenderAddress)
  console.log({ allowance1 })

  const txUnsigned = await token.approve.populateTransaction(spenderAddress, balance)
  txUnsigned.chainId = BigInt(chainId)
  txUnsigned.gasLimit = BigInt(30000)
  txUnsigned.gasPrice = (await provider.getFeeData()).gasPrice as bigint
  txUnsigned.nonce = await provider.getTransactionCount(senderWalletAddress)
  console.log({ txUnsigned })

  const txSigned = await signer.signTransaction(txUnsigned)
  console.log({ txSigned })
  const submittedTx = await provider.broadcastTransaction(txSigned)

  const receipt = await submittedTx.wait()
  const txHash = ethers.keccak256(txSigned)

  const allowance2 = await token.allowance(senderWalletAddress, spenderAddress)
  console.log({ txHash, receipt, allowance2 })
}

//! NEED TO WORK IN DEEP OVER THIS METHOD
const contractInteraction = async () => {
  //! --------------------------------------------------------------------

  // const myWallet = '0x458C8008E2415d9b012165d951fD1C80855d2233'
  // const pkMyWallet = ''
  // const contractAddr = '0x43Eac5BFEa14531B8DE0B334E123eA98325de866'

  // const rpcUrl = 'https://1rpc.io/linea'

  const { senderWalletAddress, receiverWalletAddress, senderPk, rpcUrl, chainId } = generalSettings
  const { contractAddress, contractName } = contractExecSettings
  // console.log('General parameters: ', { senderWalletAddress, receiverWalletAddress, chainId })
  // console.log('Contract parameters: ', { contractName, contractAddress })

  const provider = new JsonRpcProvider(rpcUrl)
  const signer = new Wallet(senderPk, provider)

  const contract = new Contract(contractAddress, CORE_ABI, provider)
  const uAmount = BigInt(156000000000000)

  // const txUnsigned = await contract.supply.populateTransaction('0x9E9aec6a296f94C8530e2dD01FF3E9c61555D39a', uAmount)
  // txUnsigned.chainId = BigInt(59144)
  // txUnsigned.gasLimit = BigInt(246156)
  // txUnsigned.gasPrice = (await provider.getFeeData()).gasPrice as bigint
  // txUnsigned.nonce = await provider.getTransactionCount(myWallet)
  // txUnsigned.value = uAmount
  // console.log({ txUnsigned })

  // await signAndExec(signer, txUnsigned, provider)

  const txUnsigned2 = await contract.redeemUnderlying.populateTransaction(
    '0x9E9aec6a296f94C8530e2dD01FF3E9c61555D39a',
    BigInt(136880429037865)
  )
  txUnsigned2.chainId = BigInt(59144)
  txUnsigned2.gasLimit = BigInt(246156)
  txUnsigned2.gasPrice = (await provider.getFeeData()).gasPrice as bigint
  // txUnsigned2.nonce = await provider.getTransactionCount(myWallet)
  // txUnsigned2.value = BigInt(112000027292497)
  console.log({ txUnsigned2 })

  await signAndExec(signer, txUnsigned2, provider)

  //! --------------------------------------------------------------------
}

const functionMap: { [functionName: string]: () => Promise<void> } = {
  transferErc20,
  transferNative,
  nftBalance,
  approveERC20,
  contractInteraction
}

export default functionMap
