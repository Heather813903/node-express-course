const {readFileSync, writeFileSync} = require('fs')

const first = readFileSync('./temporary/first.txt', 'utf8');
const second = readFileSync('./temporary/second.txt', 'utf8');

console.log(first, second)

writeFileSync("./temporary/fileA.txt", "This is line 1\n");
writeFileSync("./temporary/fileA.txt", "This is line 2\n", { flag: "a" });
writeFileSync("./temporary/fileA.txt", "This is line 3\n", { flag: "a" });

const result = readFileSync("./temporary/fileA.text", "utf8");

console.log(result);
