import { ethers, ContractTransaction, JsonRpcProvider, Wallet } from 'ethers'

export const signAndExec = async (signer: Wallet, txUnsigned: ContractTransaction, provider: JsonRpcProvider) => {
  const txSigned = await signer.signTransaction(txUnsigned)
  console.log({ txSigned })
  const submittedTx = await provider.broadcastTransaction(txSigned)

  const receipt = await submittedTx.wait()
  const txHash = ethers.keccak256(txSigned)

  console.log({ txHash, receipt })

  return { txHash, receipt }
}
