const names = require("./04-names");
const sayHi = require("./05-utils");
const alt =   require("./06-alternative-flavor");

require("./07-mind-grenade");

console.log("names export:", names);
sayHi(names.kelly);
sayHi(names.heather);
sayHi(names.kyle);

console.log("alt export:", alt);
console.log("alt.items:", alt.items);
console.log("alt.answer:", alt.answer);
console.log("alt.person:", alt.person);


