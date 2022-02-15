import at from 'lodash.at'

export function lodashAt(obj: object, keys: any): any {
  return at(obj, keys)
}
