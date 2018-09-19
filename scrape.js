const cheerio = require('cheerio');
const request = require('request');

const URL =
	'https://classifieds.ksl.com/search/?keyword=futon&zip=84101&miles=10&priceFrom=%240&priceTo=%24100&hasPhotos%5B%5D=Has+Photos&marketType%5B%5D=Sale&postedTimeFQ%5B%5D=7DAYS&city=&state=&sort=0';

request(URL, (error, response, body) => {
  console.log('error:', error);
  console.log('statusCode:', response && response.statusCode);
  // console.log('body:', body);

  const $ = cheerio.load(body);

	// from view-source page, the data we need consist in script tag inside 'window.renderSearchSection'
  const scripts = $('script').toArray();

  scripts.find(script => {
    if (script.children[0] !== undefined) {
      if (script.children[0].data !== undefined)
        if (script.children[0].data.includes('window.renderSearchSection')) {
					let searchResults = script.children[0].data
					// change the format to be json
          const startIndex = searchResults.indexOf('(')
          let results = eval(searchResults.substring(startIndex))
					// console.log(results);
					
					// let itemName = results.listings[0].title;
					// let price = results.listings[0].price;
					// let location = results.listings[0].city;
					// let addedAt = results.listings[0].createTime;
					
					// console.log('Item Name:', itemName);
					// console.log('Price:', price);
					// console.log('Location:', location);
					// console.log('Added:', addedAt);
					
					let listItems = results.listings;
					// console.log(listItems);
					// for (let i = 0; i < listItems.length; i++) {
					// 	console.log('Item Name:', listItems[i].title);
					// 	console.log('Price:', listItems[i].price);
					// 	console.log('Location:', listItems[i].city);
					// 	console.log('Added:', listItems[i].createTime);
					// }

					let itemName = listItems.map(el => el.title);
					console.log(itemName);

					// let price = listItems.map(el => el.price);
					// console.log(price);
        }
    }
  });
});