export const tokens = {
  ETH: 'ETH',
  WETH: 'WETH',
  USDC: 'USDC',
  USDT: 'USDT',
  DAI: 'DAI',
  USDbc: 'USDbc',
  MNT: 'MNT',
  WMNT: 'WMNT',
  USDB: 'USDB',
  WBERA: 'WBERA',
  HONEY: 'HONEY',
  BERA: 'BERA',
  WBTC: 'WBTC'
}

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

type TokenProps = {
  contract_address: string
  symbol: string
  decimals: number
}

export type TokenConfig = {
  [token: string]: TokenProps
}

const ConfiguredTokens: { [chainId: string]: TokenConfig } = {
  '59144': {
    // LINEA
    ETH: {
      contract_address: ZERO_ADDRESS,
      decimals: 18,
      symbol: tokens.ETH
    },
    WETH: {
      contract_address: '0xe5d7c2a44ffddf6b295a15c148167daaaf5cf34f',
      decimals: 18,
      symbol: tokens.WETH
    },
    USDC: {
      contract_address: '0x176211869ca2b568f2a7d4ee941e073a821ee1ff',
      decimals: 6,
      symbol: tokens.USDC
    },
    DAI: {
      contract_address: '0x4af15ec2a0bd43db75dd04e62faa3b8ef36b00d5',
      decimals: 18,
      symbol: tokens.DAI
    },
    USDT: {
      contract_address: '0xa219439258ca9da29e9cc4ce5596924745e12b93',
      decimals: 6,
      symbol: tokens.USDT
    }
  },
  '534352': {
    // SCROLL
    ETH: {
      contract_address: ZERO_ADDRESS,
      decimals: 18,
      symbol: tokens.ETH
    },
    WETH: {
      contract_address: '0x5300000000000000000000000000000000000004',
      decimals: 18,
      symbol: tokens.WETH
    },
    USDC: {
      contract_address: '0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4',
      decimals: 6,
      symbol: tokens.USDC
    },
    DAI: {
      contract_address: '0xca77eb3fefe3725dc33bccb54edefc3d9f764f97',
      decimals: 18,
      symbol: tokens.DAI
    },
    USDT: {
      contract_address: '0xf55bec9cafdbe8730f096aa55dad6d22d44099df',
      decimals: 6,
      symbol: tokens.USDT
    },
    WBTC: {
      contract_address: '0x3C1BCa5a656e69edCD0D4E36BEbb3FcDAcA60Cf1',
      decimals: 8,
      symbol: tokens.WBTC
    }
  },
  '324': {
    // ZKSYNC
    ETH: {
      contract_address: ZERO_ADDRESS,
      decimals: 18,
      symbol: tokens.ETH
    },
    WETH: {
      contract_address: '0x5aea5775959fbc2557cc8789bc1bf90a239d9a91',
      decimals: 18,
      symbol: tokens.WETH
    },
    USDC: {
      contract_address: '0x1d17CBcF0D6D143135aE902365D2E5e2A16538D4',
      decimals: 6,
      symbol: tokens.USDC
    },
    USDT: {
      contract_address: '0x493257fd37edb34451f62edf8d2a0c418852ba4c',
      decimals: 6,
      symbol: tokens.USDT
    }
  },
  '8453': {
    // BASE
    ETH: {
      contract_address: ZERO_ADDRESS,
      decimals: 18,
      symbol: tokens.ETH
    },
    WETH: {
      contract_address: '0x4200000000000000000000000000000000000006',
      decimals: 18,
      symbol: tokens.WETH
    },
    USDC: {
      contract_address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      decimals: 6,
      symbol: tokens.USDC
    },
    DAI: {
      contract_address: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
      decimals: 18,
      symbol: tokens.DAI
    },
    USDbc: {
      contract_address: '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA',
      decimals: 6,
      symbol: tokens.USDbc
    }
  },
  '5000': {
    // Mantle
    MNT: {
      contract_address: '0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8',
      decimals: 18,
      symbol: tokens.MNT
    },
    USDC: {
      contract_address: '0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9',
      decimals: 6,
      symbol: tokens.USDC
    },
    WMNT: {
      contract_address: '0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8',
      decimals: 18,
      symbol: tokens.WMNT
    },
    USDT: {
      contract_address: '0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE',
      decimals: 6,
      symbol: tokens.USDT
    },
    WETH: {
      contract_address: '0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111',
      decimals: 18,
      symbol: tokens.WETH
    }
  },
  '81457': {
    // Blast
    ETH: {
      contract_address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', //TODO check again
      decimals: 18,
      symbol: tokens.ETH
    },
    USDB: {
      contract_address: '0x4300000000000000000000000000000000000003',
      decimals: 6,
      symbol: tokens.USDB
    },
    WETH: {
      contract_address: '0x4300000000000000000000000000000000000004',
      decimals: 18,
      symbol: tokens.WETH
    }
  },
  '137': {
    // Polygon
    WETH: {
      contract_address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
      decimals: 18,
      symbol: tokens.WETH
    },
    USDC: {
      contract_address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
      decimals: 6,
      symbol: tokens.USDC
    },
    DAI: {
      contract_address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      decimals: 18,
      symbol: tokens.DAI
    }
  },
  '56': {
    // BSC
    WETH: {
      contract_address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
      decimals: 18,
      symbol: tokens.WETH
    },
    USDC: {
      contract_address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
      decimals: 18,
      symbol: tokens.USDC
    },
    DAI: {
      contract_address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
      decimals: 18,
      symbol: tokens.DAI
    }
  },
  '42161': {
    // Arbitrum
    ETH: {
      contract_address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
      symbol: tokens.ETH
    },
    USDC: {
      contract_address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      decimals: 6,
      symbol: tokens.USDC
    },
    DAI: {
      contract_address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
      decimals: 18,
      symbol: tokens.DAI
    }
  },
  '10': {
    // Optimism
    ETH: {
      contract_address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
      symbol: tokens.ETH
    },
    USDC: {
      contract_address: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
      decimals: 6,
      symbol: tokens.USDC
    },
    DAI: {
      contract_address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
      decimals: 18,
      symbol: tokens.DAI
    }
  },
  //& TESTNET
  '280': {
    // Zksync
    ETH: {
      contract_address: '0x20b28b1e4665fff290650586ad76e977eab90c5d',
      decimals: 18,
      symbol: tokens.ETH
    },
    WETH: {
      contract_address: '0x20b28b1e4665fff290650586ad76e977eab90c5d',
      decimals: 18,
      symbol: tokens.WETH
    },
    USDC: {
      contract_address: '0x0faf6df7054946141266420b43783387a78d82a9',
      decimals: 6,
      symbol: tokens.USDC
    },
    USDT: {
      contract_address: '0xfced12debc831d3a84931c63687c395837d42c2b',
      decimals: 6,
      symbol: tokens.USDT
    }
  },
  '1': {
    // Mainnet
    ETH: {
      contract_address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
      symbol: tokens.ETH
    },
    WETH: {
      contract_address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      decimals: 18,
      symbol: tokens.WETH
    },
    USDC: {
      contract_address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      decimals: 6,
      symbol: tokens.USDC
    },
    DAI: {
      contract_address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      decimals: 18,
      symbol: tokens.DAI
    },
    USDT: {
      contract_address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      decimals: 18,
      symbol: tokens.USDT
    }
  },
  '11155111': {
    // Sepolia
    ETH: {
      contract_address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
      symbol: tokens.ETH
    },
    WETH: {
      contract_address: '0xfff9976782d46cc05630d1f6ebab18b2324d6b14',
      decimals: 18,
      symbol: tokens.WETH
    },
    USDC: {
      contract_address: '0x5da066443180476e8f113546a0d112517d0d4915',
      decimals: 6,
      symbol: tokens.USDC
    },
    BERA: {
      contract_address: '0xa01afff94b800267368db6710311559ef0d70248',
      decimals: 18,
      symbol: tokens.DAI
    },
    USDT: {
      contract_address: '0x42c7013dfe01a9a431903fe36523690cbe571b7e',
      decimals: 18,
      symbol: tokens.USDT
    }
  },
  '80085': {
    // Berachain Testnet Artio
    BERA: {
      contract_address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
      symbol: tokens.BERA
    },
    WBERA: {
      contract_address: '0x5806E416dA447b267cEA759358cF22Cc41FAE80F',
      decimals: 18,
      symbol: tokens.WBERA
    },
    WETH: {
      contract_address: '0x8239FBb3e3D0C2cDFd7888D8aF7701240Ac4DcA4',
      decimals: 18,
      symbol: tokens.WETH
    },
    USDC: {
      contract_address: '0x6581e59A1C8dA66eD0D313a0d4029DcE2F746Cc5',
      decimals: 18,
      symbol: tokens.USDC
    },
    HONEY: {
      contract_address: '0x7EeCA4205fF31f947EdBd49195a7A88E6A91161B',
      decimals: 18,
      symbol: tokens.HONEY
    }
  },
  '80084': {
    // Berachain Testnet bArtio
    BERA: {
      contract_address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
      symbol: tokens.BERA
    },
    WBERA: {
      contract_address: '0x7507c1dc16935B82698e4C63f2746A2fCf994dF8',
      decimals: 18,
      symbol: tokens.WBERA
    },
    WETH: {
      contract_address: '0x6E1E9896e93F7A71ECB33d4386b49DeeD67a231A',
      decimals: 18,
      symbol: tokens.WETH
    },
    WBTC: {
      contract_address: '0x286F1C3f0323dB9c91D1E8f45c8DF2d065AB5fae',
      decimals: 18,
      symbol: tokens.WBTC
    },
    USDC: {
      contract_address: '0xd6D83aF58a19Cd14eF3CF6fe848C9A4d21e5727c',
      decimals: 18,
      symbol: tokens.USDC
    },
    HONEY: {
      contract_address: '0x0E4aaF1351de4c0264C5c7056Ef3777b41BD8e03',
      decimals: 18,
      symbol: tokens.HONEY
    }
  },
  '59140': {
    // Linea Sepolia Testnet
    ETH: {
      contract_address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
      symbol: tokens.ETH
    },
    USDC: {
      contract_address: '0x45a27ea11d159a86aace1ec24d3ba3d103642d9f',
      decimals: 6,
      symbol: tokens.USDC
    },
    USDT: {
      contract_address: '0x83240e55e35147b095e8958103a4fd4b32700a3c',
      decimals: 6,
      symbol: tokens.USDT
    }
  },
  '534354': {
    // Scroll Sepolia Testnet
    ETH: {
      contract_address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
      symbol: tokens.ETH
    },
    USDC: {
      contract_address: '0x5da066443180476e8f113546a0d112517d0d4915',
      decimals: 6,
      symbol: tokens.USDC
    },
    USDT: {
      contract_address: '0x42c7013dfe01a9a431903fe36523690cbe571b7e',
      decimals: 6,
      symbol: tokens.USDT
    }
  },
  '300': {
    // zkSync Testnet
    ETH: {
      contract_address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
      symbol: tokens.ETH
    }
  },
  '84532': {
    // Base Sepolia Testnet
    ETH: {
      contract_address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
      symbol: tokens.ETH
    }
  }
}

export default ConfiguredTokens
