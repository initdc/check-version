import got from 'got'

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
    case 'json':
      break
    case 'regexp':
      break
    case 'text':
      break
    default:
      console.log('Wrong Mode set')
  }
}