// buffer.from მეთოდს გადაეცით ascii - ის ცხრილიდან რიცხვები, თქვენი დავალებაა რომ console - ში გამოიტანოთ ეს რიცხვები როგორც string - ი, გამოიყენეთ toString() მეთოდი


const asciiNumbers = [72, 101, 108, 108, 111];

const buf = Buffer.from(asciiNumbers);


console.log(buf.toString()); 