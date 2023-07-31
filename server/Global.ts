
export default class Global{
  static readonly prodUrl = process.env.PROD_URL ?? this.err("prod url is undefined")

  private static err(msg:string):never{
    throw new Error(msg)
  }
}


