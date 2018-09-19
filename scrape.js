const cheerio = require('cheerio');
const request = require('request');

const URL =
	'https://classifieds.ksl.com/search/?keyword=futon&zip=84101&miles=25&priceFrom=%240&priceTo=%24150&hasPhotos%5B%5D=Has+Photos&marketType%5B%5D=Sale&postedTimeFQ%5B%5D=1DAY&city=&state=&sort=0';

request(URL, (error, response, body) => {
  console.log('error:', error);
  console.log('statusCode:', response && response.statusCode);
  // console.log('body:', body);

  const $ = cheerio.load(body);

	// from view-source page, the data we need consist in script tag inside 'window.renderSearchSection'
  const scripts = $('script').toArray();

  scripts.forEach(script => {
    if (script.children[0] !== undefined) {
      if (script.children[0].data !== undefined)
        if (script.children[0].data.includes('window.renderSearchSection')) {
					let searchResults = script.children[0].data
					// change the format to be json
          const startIndex = searchResults.indexOf('(')
          let results = eval(searchResults.substring(startIndex))
					console.log(results);
					
					let title = results.listings[0].title;
					console.log(title);
        }
    }
  });
});