import got from 'got'
import {buildSchema} from 'graphql'

export enum Mode {
  json = 'json',
  regexp = 'regexp',
  text = 'text'
}

export interface Options {
  json?: unknown
  regexp?: RegExp
  gotOptions?: object
}

export async function fetchURL(
  url: string,
  mode: string,
  options?: Options
): Promise<unknown> {
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
  } catch (error) {
    return new Promise((resolve, reject) => reject(error.response.body))
  }

  switch (mode) {
    case Mode.json:
      break
    case Mode.regexp:
      break
    case Mode.text:
      break
    default:
      console.log('Wrong Mode set')
  }
}
