var express = require('express');
var request = require('request');
var fs = require('fs');
var _ = require('underscore');
var csv2jsonfile = require('csv2jsonfile');
const jsonexport = require('jsonexport');
var app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//fetching of country codes from CSV
csv2jsonfile.inline('currcodes.csv', { header: false })
  .then((obj) => {
    var codes = _.flatten(obj);
    codes = codes.join();
    console.log(codes);

    
  var API = "8f16600142fcd433e45b009f9ce8810e";
    var Currency = "EUR";
    var RequestCurrencies = codes;
    const url = "http://data.fixer.io/api/latest?access_key=" + API + "&base=" + Currency + "&symbols=" + RequestCurrencies;

    request({url: url, json: true}, function (error, response) {
      var data = response.body.rates;
      console.log(data);

      //sorting the data according to rates.
      const sortedCountry = Object.keys(data).sort((a,b) => data[a] - data[b]);
      let finalOutput = [];
      sortedCountry.map((key) => {
        const tmp = {};
        tmp[key] = data[key];
        finalOutput.push(tmp);
      });
        console.log(finalOutput);
       // Export the final sorted output to a CSV file

          jsonexport(finalOutput,function(err, csv){
            if(err) return console.log(err);
            console.log(csv);
              fs.writeFile('SortedRatzzz.csv',csv,(err,csvres) => {
                if (err) return;
                });
              });
      });
  });
