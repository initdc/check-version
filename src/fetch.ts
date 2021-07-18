import got from 'got'
import {lodashAt} from './lodash'
import {regexpExec} from './array'

export interface Options {
  json?: any
  regexp?: RegExp
  gotOptions?: any
}

export async function fetchOrigin(
  url: string,
  mode: 'json' | 'regexp' | 'full',
  options?: Options
): Promise<any> {
  if (!url) {
    return new Promise((resolve, reject) => reject(new Error('url not set')))
  }

  const _url = new URL(url)
  if (!_url) {
    return new Promise((resolve, reject) =>
      reject(new Error('Wrong url input'))
    )
  }

  if (!mode) {
    return new Promise((resolve, reject) => reject(new Error('mode not set')))
  }

  const response = await got(_url, options?.gotOptions)
  // console.log(response)

  switch (mode) {
    case 'json':
      const bodyObj = JSON.parse(response.body)
      const result1 = lodashAt(bodyObj, options?.json)
      return new Promise(resolve => resolve(result1))
      break
    case 'regexp':
      const bodyText = response.body
      const result2 = regexpExec(String(bodyText), options?.regexp)
      return new Promise(resolve => resolve(result2))
      break
    case 'full':
      const result3 = response.body
      return new Promise(resolve => resolve(String(result3)))
      break
    default:
      return new Promise((resolve, reject) =>
        reject(new Error('Wrong mode set'))
      )
  }
}

export async function fetchTarget(
  url: string,
  options?: Options
): Promise<any> {
  if (!url) {
    return new Promise((resolve, reject) => reject(new Error('url not set')))
  }

  const _url = new URL(url)
  if (!_url) {
    return new Promise((resolve, reject) =>
      reject(new Error('Wrong url input'))
    )
  }
  const response = await got(_url, options?.gotOptions)
  return new Promise(resolve => resolve(response.statusCode))
}
