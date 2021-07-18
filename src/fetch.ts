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

  let result: any
  switch (mode) {
    case 'json':
      const bodyObj = JSON.parse(response.body)
      result = lodashAt(bodyObj, options?.json)
      return new Promise(resolve => resolve(result))
      break
    case 'regexp':
      const bodyText = response.body
      result = regexpExec(String(bodyText), options?.regexp)
      return new Promise(resolve => resolve(result))
      break
    case 'full':
      result = response.body
      return new Promise(resolve => resolve(String(result)))
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
  
  try {
    const response = await got(_url, options?.gotOptions)
    return new Promise(resolve => resolve(response))
  } catch (error) {
    return new Promise((resolve, reject) => resolve(error.response))
  }
}
