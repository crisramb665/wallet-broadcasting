/** npm imports */
import {
  ethers,
  Contract,
  ContractTransaction,
  JsonRpcProvider,
  Wallet,
  parseEther,
  parseUnits,
  formatEther
} from 'ethers'
import JSONBig from 'json-bigint'

/** local imports */
import { generalSettings, contractExecSettings } from './config/settings.js'
import { signAndExec } from './helper/signAndExec.js'

/** ABIs */
import ERC721_TOKEN_CONTRACT_ABI from './ABIs/ERC721_TOKEN_CONTRACT_ABI.js'
import ERC20_TOKEN_CONTRACT_ABI from './ABIs/ERC20_TOKEN_CONTRACT_ABI.js'
import WETH_ABI from './ABIs/WETH_ABI.js'
import CORE_ABI from './ABIs/CORE_ABI.js'
import { executeSwapOnLiFI } from './customExecutions/lifi.js'

const transferErc20 = async () => {
  const { senderWalletAddress, receiverWalletAddress, senderPk, rpcUrl, chainId } = generalSettings
  const { contractAddress, contractName, amount } = contractExecSettings
  console.log('General parameters: ', { senderWalletAddress, receiverWalletAddress, chainId })
  console.log('Contract parameters: ', { contractName, contractAddress })

  const provider = new JsonRpcProvider(rpcUrl)
  const signer = new Wallet(senderPk, provider)

  const baseErc20Contract = new Contract(contractAddress, ERC20_TOKEN_CONTRACT_ABI, provider)
  const balance = await baseErc20Contract.balanceOf(senderWalletAddress)
  console.log('current balance is: ', balance)
  const decimals = await baseErc20Contract.decimals()
  const amountToTransfer = parseUnits(amount, decimals)
  console.log('Amount to transfer: ', amountToTransfer)

  if (amountToTransfer > balance) throw new Error('Amount to transfer is greater than current balance on Sender')

  const txUnsigned = await baseErc20Contract.transfer.populateTransaction(receiverWalletAddress, amountToTransfer)
  console.log('data tx Unsigned matters: ', txUnsigned.data)
  txUnsigned.from = senderWalletAddress
  txUnsigned.chainId = BigInt(chainId)
  txUnsigned.gasPrice = (await provider.getFeeData()).gasPrice as bigint
  txUnsigned.nonce = await provider.getTransactionCount(senderWalletAddress)

  const estimatedGasLimit = await provider.estimateGas(txUnsigned)
  txUnsigned.gasLimit = estimatedGasLimit
  delete txUnsigned.from

  console.log(JSONBig.stringify({ txUnsigned }, null, 2))

  const txSigned = await signer.signTransaction(txUnsigned)

  console.log(JSONBig.stringify({ txSigned }, null, 2))
  const submittedTx = await provider.broadcastTransaction(txSigned)

  const receipt = await submittedTx.wait()
  const txHash = ethers.keccak256(txSigned)
  console.log(`The txHash is ${txHash} and the receipt is: ${JSONBig.stringify({ receipt }, null, 2)}`)
}

const transferNative = async () => {
  const { senderWalletAddress, receiverWalletAddress, senderPk, rpcUrl, chainId } = generalSettings
  const { amount } = contractExecSettings
  console.log('General parameters: ', { senderWalletAddress, receiverWalletAddress, chainId })
  console.log('Contract parameters: ', { amount })

  const processedAmount = parseEther(amount)

  const provider = new JsonRpcProvider(rpcUrl)
  const signer = new Wallet(senderPk, provider)

  const balance = await provider.getBalance(senderWalletAddress)
  console.log('current balance is: ', balance)

  if (processedAmount > balance) throw new Error('Not enough native balance on Sender')

  const tx = await signer.sendTransaction({
    to: receiverWalletAddress,
    value: processedAmount
  })

  const receipt = await tx.wait(2)

  console.log('hash', tx.hash)
  console.log(JSONBig.stringify({ receipt }, null, 2))
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
  const { senderWalletAddress, senderPk, rpcUrl, chainId, spenderAddress } = generalSettings
  if (!spenderAddress) throw new Error('No spender address provided')

  const { contractAddress, contractName } = contractExecSettings
  // console.log('General parameters: ', { senderWalletAddress, receiverWalletAddress, chainId })
  // console.log('Contract parameters: ', { contractName, contractAddress })

  const provider = new JsonRpcProvider(rpcUrl)
  const signer = new Wallet(senderPk, provider)

  const token = new Contract(contractAddress, ERC20_TOKEN_CONTRACT_ABI, provider)
  const balance = await token.balanceOf(senderWalletAddress)
  console.log({ balance })

  const allowance1 = await token.allowance(senderWalletAddress, spenderAddress)
  console.log({ allowance1 })

  const txUnsigned = await token.approve.populateTransaction(spenderAddress, balance)
  txUnsigned.chainId = BigInt(chainId)
  txUnsigned.gasLimit = BigInt(120000)
  txUnsigned.gasPrice = (await provider.getFeeData()).maxFeePerGas as bigint
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

  // const contract = new Contract(contractAddress, CORE_ABI, provider)
  // const uAmount = BigInt(156000000000)

  const wrappedTokenGatewayContract = new Contract(
    '0x5d50bE703836C330Fc2d147a631CDd7bb8D7171c',
    [
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address'
          }
        ],
        name: 'withdrawETH',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      }
    ],
    provider
  )

  // unsignedTx = await wrappedTokenGatewayContract.withdrawETH.populateTransaction(pool, amount, walletAddress)

  // await executeSwapOnLiFI({
  //   fromAddress: signer.address,
  //   toAddress: signer.address,
  //   fromAmount: uAmount.toString(),
  //   fromChain: Number(chainId),
  //   toChain: 137,
  //   fromToken: contractAddress,
  //   toToken: '0x0000000000000000000000000000000000000000'
  // })

  // const txUnsigned = await contract.supply.populateTransaction('0x9E9aec6a296f94C8530e2dD01FF3E9c61555D39a', uAmount)
  const callStaticTest = await wrappedTokenGatewayContract.withdrawETH.staticCall(
    '0x2f9bB73a8e98793e26Cb2F6C4ad037BDf1C6B269',
    115792089237316195423570985008687907853269984665640564039457584007913129639935n,
    senderWalletAddress
  )
  console.log({ callStaticTest })

  const txUnsigned = await wrappedTokenGatewayContract.withdrawETH.populateTransaction(
    '0x2f9bB73a8e98793e26Cb2F6C4ad037BDf1C6B269',
    115792089237316195423570985008687907853269984665640564039457584007913129639935n,
    senderWalletAddress
  )
  txUnsigned.chainId = BigInt(59144)
  txUnsigned.gasLimit = BigInt(100000)
  txUnsigned.gasPrice = (await provider.getFeeData()).gasPrice as bigint
  txUnsigned.nonce = await provider.getTransactionCount(senderWalletAddress)
  // txUnsigned.value = parseEther('0.00002854871499936')
  console.log({ txUnsigned }, txUnsigned.data)

  // await signAndExec(signer, txUnsigned, provider)

  // const txUnsigned2 = await contract.redeemUnderlying.populateTransaction(
  //   '0x9E9aec6a296f94C8530e2dD01FF3E9c61555D39a',
  //   BigInt(136880429037865)
  // )
  // txUnsigned2.chainId = BigInt(59144)
  // txUnsigned2.gasLimit = BigInt(246156)
  // txUnsigned2.gasPrice = (await provider.getFeeData()).gasPrice as bigint
  // // txUnsigned2.nonce = await provider.getTransactionCount(myWallet)
  // // txUnsigned2.value = BigInt(112000027292497)
  // console.log({ txUnsigned2 })

  // await signAndExec(signer, txUnsigned2, provider)

  const txSigned = await signer.signTransaction(txUnsigned)
  console.log({ txSigned })
  const submittedTx = await provider.broadcastTransaction(txSigned)

  const receipt = await submittedTx.wait()
  const txHash = ethers.keccak256(txSigned)

  console.log({ txHash, receipt })

  // return { txHash, receipt }
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
