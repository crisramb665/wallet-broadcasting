import { Wallet } from 'ethers'
import { signSettings } from './config/settings.js'
import axios from 'axios'

const CHAIN_ID = 1 // Mainnet
const CHAIN_NAME = 'ethereum'

if (!signSettings.walletSignerAddress || !signSettings.walletSignerPk || !signSettings.backendUrl) {
  console.error(`Missing signature settings for ${CHAIN_NAME} (chainId: ${CHAIN_ID}). Please check your .env file.`)
  process.exit(1)
}

const wallet = new Wallet(signSettings.walletSignerPk)
const address = wallet.address

const postChallenge = async (address: string) => {
  const url = `${signSettings.backendUrl}/auth/challenge`
  const body = { address, chainId: CHAIN_ID, chainName: CHAIN_NAME }
  const response = await axios.post(url, body, { headers: { 'Content-Type': 'application/json' } })

  return response.data
}

const postVerify = async (message: string, signature: string) => {
  const url = `${signSettings.backendUrl}/auth/verify-and-login`
  const body = { message, signature }
  const response = await axios.post(url, body, { headers: { 'Content-Type': 'application/json' } })

  return response.data
}

const getMe = async (accessToken: string) => {
  const url = `${signSettings.backendUrl}/auth/me`
  const res = await axios.get(url, { headers: { Authorization: `Bearer ${accessToken}` } })
  return res.data
}

const postRefresh = async (refreshToken: string) => {
  const url = `${signSettings.backendUrl}/auth/refresh`
  const res = await axios.post(url, { refreshToken }, { headers: { 'Content-Type': 'application/json' } })
  return res.data
}

const postLogout = async (refreshToken: string) => {
  const url = `${signSettings.backendUrl}/auth/logout`
  const res = await axios.post(url, { refreshToken }, { headers: { 'Content-Type': 'application/json' } })
  return res.data
}

;(async () => {
  try {
    console.log('Address using PRIVATE_KEY:', address)
    console.log('Requesting challenge from', signSettings.backendUrl)

    const challenge = await postChallenge(address)
    if (!challenge || !challenge.message) {
      console.error('Unexpected response when requesting challenge:', challenge)
      process.exit(1)
    }

    const message = challenge.message
    console.log('SIWE message obtained:\n', message)

    console.log('Signing message with your private key (local, never send the key)...')
    const signature = await wallet.signMessage(message)
    console.log('Signature obtained:\n', signature)

    console.log('Sending signature back to backend for verification...')
    const verifyResp = await postVerify(message, signature)
    console.log('Verify response:', JSON.stringify(verifyResp, null, 2))

    const accessToken = verifyResp.access_token || verifyResp.accessToken || null
    const refreshToken = verifyResp.refresh_token || verifyResp.refreshToken || null
    console.log('Access Token:', accessToken)
    console.log('Refresh Token:', refreshToken)

    if (accessToken) {
      console.log('\nCalling /auth/me with access token...')
      const me = await getMe(accessToken)
      console.log('/auth/me response:', JSON.stringify(me, null, 2))
    } else {
      console.warn('No access_token received from /auth/verify.')
    }

    if (refreshToken) {
      console.log('\nTesting /auth/refresh with the received refresh token...')
      const refreshResp = await postRefresh(refreshToken)
      console.log('/auth/refresh response:', JSON.stringify(refreshResp, null, 2))

      // Optionally logout to revoke refresh token
      console.log('\nCalling /auth/logout to revoke refresh token...')
      const logoutResp = await postLogout(refreshToken)
      console.log('/auth/logout response:', JSON.stringify(logoutResp, null, 2))
    } else {
      console.warn('No refresh_token received from /auth/verify.')
    }
  } catch (err: any) {
    if (err.response) {
      console.error('HTTP error:', err.response.status, err.response.data)
    } else {
      console.error('Error:', err.message || err)
    }
    process.exit(1)
  }
})()
