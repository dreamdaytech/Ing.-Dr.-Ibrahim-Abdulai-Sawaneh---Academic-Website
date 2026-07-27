const https = require('https');
const cheerio = require('cheerio');

const url = 'https://scholar.google.com/citations?view_op=list_works&hl=en&hl=en&user=FFFjTA0AAAAJ';
const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
};
https.get(url, options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const $ = cheerio.load(data);
    const publications = [];
    $('.gsc_a_tr').each((i, el) => {
      const title = $(el).find('.gsc_a_t a').text();
      const link = 'https://scholar.google.com' + $(el).find('.gsc_a_t a').attr('href');
      const authors = $(el).find('.gsc_a_t .gs_gray').first().text();
      const journal = $(el).find('.gsc_a_t .gs_gray').last().text();
      const citations = $(el).find('.gsc_a_c a').text();
      const year = $(el).find('.gsc_a_y .gsc_a_h').text();
      
      publications.push({ title, authors, journal, citations, year, link });
    });
    console.log(JSON.stringify(publications.slice(0, 3), null, 2));
  });
}).on('error', (e) => {
  console.error(e);
});
