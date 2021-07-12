import {wait} from '../src/wait'
import {fetchURL} from '../src/fetch'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {test} from 'jest-circus'

test('throws invalid number', async () => {
  const input = parseInt('foo', 10)
  await expect(wait(input)).rejects.toThrow('milliseconds not a number')
})

test('wait 500 ms', async () => {
  const start = new Date()
  await wait(500)
  const end = new Date()
  var delta = Math.abs(end.getTime() - start.getTime())
  expect(delta).toBeGreaterThan(450)
})

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_MILLISECONDS'] = '500'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  console.log(cp.execFileSync(np, [ip], options).toString())
})

test('test kodbox', async () => {
  const url = 'https://api.kodcloud.com/?app%2Fversion'
  expect(await fetchURL(url, 'json')).toEqual('1.20')
})
