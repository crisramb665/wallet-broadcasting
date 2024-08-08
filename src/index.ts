/** local imports */
import { contractExecSettings } from './config/settings.js'
import functionMap from './wallet.js'

const exec = async (methodName: string) => {
  const methodToExec = functionMap[methodName]

  if (!methodToExec) throw new Error(`Method ${methodName} not found or not created yet`)
  await methodToExec()
}

exec(contractExecSettings.methodName)
