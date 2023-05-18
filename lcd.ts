import Lcd from 'lcd';

const lcd = new Lcd({ rs: 26, e: 19, data: [13, 6, 5, 11], cols: 16, rows: 2 });

export async function writeToLcd(col, row, data) {
  console.log("LCD written "+data)
  lcd.setCursor(col, row);
  lcd.print(data, (err) => {
    if (err) {
      throw err;
    }
  })
  return
}