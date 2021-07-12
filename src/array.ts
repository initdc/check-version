export function queryKey(obj: object, key: any): any {
  // @ts-ignore
  return obj[key]
}

export function queryKeys(obj: object, keys: Array<any>): Array<any> {
  const arr = new Array()
  for (let key in keys) {
    // @ts-ignore
    arr.push(obj[key])
  }
  return arr
}

export function queryType(o: any): string {
  return typeof o
}

export function queryObjType(obj: object): any {
  return Object.getPrototypeOf(obj)
}

export function queryObject(origin: object, query: object): any {
  if (queryObjType(query) === 'Array') {
  }
}

export function regexpExec(str: string, regexp: RegExp): any {
  return regexp.exec(str)
}
