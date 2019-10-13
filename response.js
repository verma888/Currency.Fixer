var sortJsonArray = require('sort-json-array');
var result = { "success": true,
    "timestamp": 1568528646,
    "base": "EUR",
    "date": "2019-09-15",
    "rates":
     { "AUD": 1.622268, "AFN": 87.426052, "INR": 79.245232, "CNY": 7.898232 } 
}

var result1 = (result.rates);
console.log(result1);
var res2 = sortJsonArray(result1, 'asc');
console.log(res2);

