import * as core from '@actions/core'
import {wait} from './wait'
import {fetchURL} from './fetch'

async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds')
    core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }

  try {
    const query = ['data.server.version', 'data.mac.version']

    const url = 'https://api.kodcloud.com/?app%2Fversion'
    const result = await fetchURL(url, 'json', {json: query})
    core.setOutput('result', result)
  } catch (error) {
    core.setFailed(error.message)
  }

  try {
    const url = 'https://myip.biturl.top/'
    const result = await fetchURL(url, 'full')
    core.setOutput('result', result)
  } catch (error) {
    core.setFailed(error.message)
  }

  try {
    const query = /([0-9]+\.?){4}/g

    const url = 'https://myip.ipip.net/'
    const result = await fetchURL(url, 'regexp', {regexp: query})
    core.setOutput('result', result[0])
  } catch (error) {
    core.setFailed(error.message)
  }
}
run()
