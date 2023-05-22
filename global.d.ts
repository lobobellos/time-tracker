import type  { EventEmitter } from "stream";

declare module 'lcd' {
  export default class Lcd extends EventEmitter{
    constructor(options: any);
    
  }
}