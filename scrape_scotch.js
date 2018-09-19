const cheerio = require('cheerio');
const request = require('request');
const router = require("express").Router();

const URL = require('./urlModel');


const URL = 'https://classifieds.ksl.com/search/?keyword=futon&zip=84101&miles=10&priceFrom=%240&priceTo=%24100&hasPhotos%5B%5D=Has+Photos&marketType%5B%5D=Sale&postedTimeFQ%5B%5D=7DAYS&city=&state=&sort=0';

// middleware - web scraping function
const scrapeData = (URL) => {
  request(URL, (error, response, body) => {
    console.log('statusCode:', response && response.statusCode)
      if (error) {
        console.log('error:', error);
      } 
      if (!error) {
        // Utilize cheerio library to return html
				const $ = cheerio.load(body);

				// from view-source page, the data we need consist in script tag inside 'window.renderSearchSection'
				const scripts = $('script').toArray();
				
				scripts.find(script => {
					if (script.children[0] != undefined) {
						if (script.children[0].data !== undefined) {
							if (script.children[0].data.includes('window.renderSearchSection')) {
								let searchResults = script.children[0].data
								// change the format to be json
          			const startIndex = searchResults.indexOf('(')
          			let results = eval(searchResults.substring(startIndex))
								// console.log(results);
								let listItems = results.listings;

								// TODO: need to get title, price, location and time
								let itemName = listItems.map(el => el.title);
								// console.log(itemName);
								return itemName;
							}
						}
					}
				})
      }
  })
}

// endpoint
const getAllAlert = (req, res) => {
	URL
		.find()
		.then(result => {
			res.status
		})
}

	
	
	

// // route for web scraping
// router.route('/alert').get(scrapeData, getAllAlert);

module.exports = router;


