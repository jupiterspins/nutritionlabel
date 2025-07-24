const http = require('http');

http.get('http://localhost:3000', (res) => {
  console.log('Status:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Response length:', data.length);
    if (res.statusCode !== 200) {
      console.log('Response:', data.substring(0, 500));
    }
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});