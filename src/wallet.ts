import { ethers, Contract, JsonRpcProvider, Wallet } from 'ethers'

import ERC721_TOKEN_CONTRACT_ABI from './ABIs/ERC721_TOKEN_CONTRACT_ABI.js'
import ERC20_TOKEN_CONTRACT_ABI from './ABIs/ERC20_TOKEN_CONTRACT_ABI.js'
import WETH_ABI from './ABIs/WETH_ABI.js'
import CORE_ABI from './ABIs/CORE_ABI.js'
import { signAndExec } from './helper/signAndExec.js'

const transferErc20 = async () => {
  const workWallet = '0xf44fD92282fF41Ef29D85d7259A4378B8c482ED8'
  const myWallet = '0x458C8008E2415d9b012165d951fD1C80855d2233'
  const pk = ''
  // const rpcUrl = ''
  const rpcUrl = 'https://linea.decubate.com'
  // const chainId = 8453
  const chainId = 59144

  const provider = new JsonRpcProvider(rpcUrl)
  const signer = new Wallet(pk, provider)

  const baseErc20 = '0x4200000000000000000000000000000000000006'

  const baseErc20Contract = new Contract(baseErc20, WETH_ABI, provider)
  const balance = await baseErc20Contract.balanceOf(workWallet)
  console.log('current balance is: ', balance)

  const estimatedGasLimit = await baseErc20Contract.transfer.estimateGas(myWallet, balance)
  const txUnsigned = await baseErc20Contract.transfer.populateTransaction(myWallet, balance)
  txUnsigned.chainId = BigInt(chainId)
  txUnsigned.gasLimit = estimatedGasLimit
  txUnsigned.gasPrice = (await provider.getFeeData()).gasPrice as bigint
  txUnsigned.nonce = await provider.getTransactionCount(workWallet)
  console.log(`tx unsigned: ${txUnsigned}`)

  const txSigned = await signer.signTransaction(txUnsigned)
  console.log(`tx signed: ${txSigned}`)
  const submittedTx = await provider.broadcastTransaction(txSigned)

  const receipt = await submittedTx.wait()
  const txHash = ethers.keccak256(txSigned)
  console.log(`The txHash is ${txHash} and the receipt is: ${receipt}`)
}

const transferNative = async () => {
  const workWallet = '0xf44fD92282fF41Ef29D85d7259A4378B8c482ED8'
  const myWallet = '0x458C8008E2415d9b012165d951fD1C80855d2233'
  const pk = ''
  // const rpcUrl = ''
  // const rpcUrl = 'https://linea.decubate.com'
  // const rpcUrl = 'https://rpc.envelop.is/blast'
  const rpcUrl = ''

  const provider = new JsonRpcProvider(rpcUrl)
  const signer = new Wallet(pk, provider)

  const balance = await provider.getBalance(workWallet)
  console.log('current balance is: ', balance)

  const tx = await signer.sendTransaction({
    to: myWallet,
    value: BigInt(1966905000000000)
  })

  console.log('hash', tx.hash)
}

const nftBalance = async () => {
  const workWallet = '0xf44fD92282fF41Ef29D85d7259A4378B8c482ED8'
  const myWallet = '0x458C8008E2415d9b012165d951fD1C80855d2233'
  const rpcUrl = ''
  const provider = new JsonRpcProvider(rpcUrl)

  const nftContract = new Contract('0x7daC480d20f322D2ef108A59A465CCb5749371c4', ERC721_TOKEN_CONTRACT_ABI, provider)
  const balance = await nftContract.balanceOf(workWallet)
  console.log('nft balance', balance)
}

const approveERC20 = async () => {
  const myWallet = '0x458C8008E2415d9b012165d951fD1C80855d2233'
  const workWallet = '0xf44fD92282fF41Ef29D85d7259A4378B8c482ED8'
  const pkWorkWallet = ''

  const rpcUrl = 'https://artio.rpc.berachain.com/'
  const provider = new JsonRpcProvider(rpcUrl)
  const signer = new Wallet(pkWorkWallet, provider)

  const tokenBerachain = new Contract(
    '0x6581e59A1C8dA66eD0D313a0d4029DcE2F746Cc5', // usdc
    ERC20_TOKEN_CONTRACT_ABI,
    provider
  )
  const balance = await tokenBerachain.balanceOf(workWallet)

  console.log({ balance })

  const berachainBex = '0x0D5862FDBDD12490F9B4DE54C236CFF63B038074'

  const allowance1 = await tokenBerachain.allowance(workWallet, berachainBex)
  console.log({ allowance1 })

  //   const estimatedGasLimit = await tokenBerachain.approve.estimateGas(myWallet, balance);
  const txUnsigned = await tokenBerachain.approve.populateTransaction(berachainBex, balance)
  txUnsigned.chainId = BigInt(80085)
  txUnsigned.gasLimit = BigInt(30000)
  txUnsigned.gasPrice = (await provider.getFeeData()).gasPrice as bigint
  txUnsigned.nonce = await provider.getTransactionCount(workWallet)
  console.log({ txUnsigned })

  const txSigned = await signer.signTransaction(txUnsigned)
  console.log({ txSigned })
  const submittedTx = await provider.broadcastTransaction(txSigned)

  const receipt = await submittedTx.wait()
  const txHash = ethers.keccak256(txSigned)

  const allowance2 = await tokenBerachain.allowance(workWallet, berachainBex)
  console.log({ txHash, receipt, allowance2 })
}

const contractInteraction = async () => {
  const myWallet = '0x458C8008E2415d9b012165d951fD1C80855d2233'
  const pkMyWallet = ''
  const contractAddr = '0x43Eac5BFEa14531B8DE0B334E123eA98325de866'

  const rpcUrl = 'https://1rpc.io/linea'
  const provider = new JsonRpcProvider(rpcUrl)
  const signer = new Wallet(pkMyWallet, provider)

  const contract = new Contract(contractAddr, CORE_ABI, provider)
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
  txUnsigned2.nonce = await provider.getTransactionCount(myWallet)
  // txUnsigned2.value = BigInt(112000027292497)
  console.log({ txUnsigned2 })

  await signAndExec(signer, txUnsigned2, provider)
}

// approveERC20()
// transferErc20()
transferNative()
// contractInteraction()
