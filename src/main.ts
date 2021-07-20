import * as core from '@actions/core'
import {wait} from './wait'
import {fetchOrigin, fetchTarget} from './fetch'
import {workFlow} from './file'

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
}

async function test(): Promise<void> {
  try {
    const query = 'data.server.version'

    const origin = 'https://api.kodcloud.com/?app%2Fversion'
    const version = await fetchOrigin(origin, 'json', {json: query})

    const target =
      'https://api.github.com/repos/pliplive/kodbox/git/refs/tags/' + version
    const response = await fetchTarget(target)

    let result: any
    if (response.statusCode === 200) {
      result = 'No new version'
    } else if (response.statusCode === 404) {
      result = 'Found new version, workFlow starting...\n'
      await workFlow(version)
      result += 'workFlow finished'
    } else {
      result = 'No operation for statusCode: ' + response.statusCode
    }
    core.setOutput('result', result)
  } catch (error) {
    core.setFailed(error.message)
  }

  try {
    const url = 'https://myip.biturl.top/'
    const result = await fetchOrigin(url, 'full')
    core.setOutput('result', result)
  } catch (error) {
    core.setFailed(error.message)
  }

  try {
    const query = /([0-9]+\.?){4}/g

    const url = 'https://myip.ipip.net/'
    const result = await fetchOrigin(url, 'regexp', {regexp: query})
    core.setOutput('result', result)
  } catch (error) {
    core.setFailed(error.message)
  }
}

test()
