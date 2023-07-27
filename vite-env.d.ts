declare module 'lcd' {
  export default class Lcd {
    constructor(options: {
      rs: number,
      e: number,
      data: number[],
      cols: number,
      rows: number,
    })
    on(event: string, callback: () => void): void
     clear(): Promise<void>;
    writeToLcd(col: number, row: number, data: string): void;
    setCursor(col: number, row: number): void;
    print(data: string, callback: (err: Error) => void): void;
    cursor(): void;
    noCursor(): void;
    blink(): void;
    noBlink(): void;
    scrollDisplayLeft(): void;
    scrollDisplayRight(): void;
    leftToRight(): void;
    rightToLeft(): void;
    autoscroll(): void;
    noAutoscroll(): void;
    close(): void;
  }
}