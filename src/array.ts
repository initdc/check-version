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

export function queryObjType(obj: object): string {
  if (Array.isArray(obj)){
    return 'array'
  }
  return 'object'
}

export function queryObject(object: object, keys: Array<any>, current: number, next: number): any {
  // @ts-ignore
  if (typeof object[keys[current]] === "object") {
    // @ts-ignore
    return queryObject(object[keys[current]], keys, next, next + 1);
  }
  // @ts-ignore
  return object[keys[current]];
}

export function regexpExec(str: string, regexp: RegExp | undefined): any {
  if ( regexp === undefined) {
    return null
  }
  return regexp.exec(str)
}
