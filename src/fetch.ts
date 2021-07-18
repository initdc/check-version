import got from 'got'
import { lodashAt } from './lodash'
import { regexpExec } from './array'

export interface Options {
  json?: any
  regexp?: RegExp
  gotOptions?: any
}

export async function fetchURL(
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

  try {
    const response = await got(_url, options?.gotOptions)
    // console.log(response)

    switch (mode) {
      case 'json':
        const bodyObj = await response.body.json()
        const result = lodashAt(bodyObj, options?.json)
        return new Promise((resolve) => resolve(result))
        break
      case 'regexp':
        const bodyText = await response.body.text()
        const result = regexpExec(bodyText, options?.regexp)
        return new Promise((resolve) => resolve(result))
        break
      case 'full':
        const result = await response.body.text()
        return new Promise((resolve) => resolve(result))
        break
      default:
        return new Promise((resolve, reject) => reject(new Error('Wrong mode set')))
    }
  } catch (error) {
    return new Promise((resolve, reject) => reject(error.response.body))
  }
}
