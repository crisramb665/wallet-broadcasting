import { ChainId, createConfig, getQuote, QuoteRequest } from '@lifi/sdk'

createConfig({ integrator: 'wallet-test' })

type ExecSwapOnLiFiProps = {
  fromAddress: string
  toAddress: string
  fromChain: number
  toChain: number
  fromToken: string
  toToken: string
  fromAmount: string
}

export const executeSwapOnLiFI = async ({
  fromAddress,
  fromChain,
  toChain,
  fromToken,
  toToken,
  fromAmount,
  toAddress
}: ExecSwapOnLiFiProps) => {
  console.log({ fromAddress, fromChain, toChain, fromToken, toToken, fromAmount })

  const quoteRequest: QuoteRequest = {
    fromChain,
    fromAddress,
    toAddress,
    toChain,
    fromToken,
    toToken,
    fromAmount
  }

  const quote = await getQuote(quoteRequest)
  console.log({ quote })
}
