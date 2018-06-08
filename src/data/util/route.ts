const route =
  < T extends {[key in K]: (...args: any[]) => any},
    K extends keyof T | 'default',
  >(
    promise : Promise<T>,
    key     : K = 'default' as K
  ) => (
    async (...args: any[]) => (await promise)[key](...args)
  ) as T[K]
export default route
