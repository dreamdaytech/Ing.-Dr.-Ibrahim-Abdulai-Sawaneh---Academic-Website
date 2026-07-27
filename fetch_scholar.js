const https = require('https');
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
    console.log("Status Code:", res.statusCode);
    if (data.includes('Ibrahim Abdulai Sawaneh')) {
      console.log('Successfully found the name on the page');
    } else {
      console.log('Name not found, maybe CAPTCHA or different format');
      console.log(data.slice(0, 500));
    }
  });
}).on('error', (e) => {
  console.error(e);
});
