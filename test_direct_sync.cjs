const https = require('https');
const options = {
  hostname: 'scholar.google.com',
  path: '/citations?view_op=list_works&hl=en&user=FFFjTA0AAAAJ&cstart=0&pagesize=100',
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
};
https.get(options, (res) => {
  let data = '';
  res.on('data', c => data+=c);
  res.on('end', () => {
    console.log(res.statusCode);
    const cheerio = require('cheerio');
    const $ = cheerio.load(data);
    console.log($('.gsc_a_tr').length);
  });
});
