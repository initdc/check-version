import * as core from '@actions/core'
import {wait} from './wait'
import {fetchURL} from './fetch'
import {queryType,queryObjType} from './array'

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
    const query = [['data', ['server', ['version']]]]
    // @ts-ignore
    const entries = new Map(query);
    const obj = Object.fromEntries(entries);

    console.log(obj.data);
    console.log(queryType(obj.data))
    const url = 'https://api.kodcloud.com/?app%2Fversion'
    const result = await fetchURL(url, 'json')
    core.setOutput('result', result)
  } catch (error) {
    core.setFailed(error.message)
  }
}
run()
