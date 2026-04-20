import https from 'https';

https.get('https://www.flightradar24.com/', (res) => {
  console.log('Headers:', res.headers);
}).on('error', (e) => {
  console.error(e);
});
