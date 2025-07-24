const fs = require('fs');
const path = require('path');

// Create a simple SVG icon
const svgIcon = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#2563eb" rx="64"/>
  <rect x="64" y="64" width="384" height="384" fill="#ffffff" rx="32"/>
  <text x="256" y="180" font-family="Arial, sans-serif" font-size="64" font-weight="bold" text-anchor="middle" fill="#2563eb">NUTRITION</text>
  <text x="256" y="250" font-family="Arial, sans-serif" font-size="48" text-anchor="middle" fill="#2563eb">FACTS</text>
  <rect x="96" y="280" width="320" height="4" fill="#2563eb"/>
  <rect x="96" y="300" width="320" height="2" fill="#94a3b8"/>
  <rect x="96" y="320" width="320" height="2" fill="#94a3b8"/>
  <rect x="96" y="340" width="320" height="2" fill="#94a3b8"/>
  <rect x="96" y="360" width="320" height="2" fill="#94a3b8"/>
</svg>`;

// Save SVG files
fs.writeFileSync(path.join(__dirname, '../public/icon-192.svg'), svgIcon.replace('width="512" height="512"', 'width="192" height="192"'));
fs.writeFileSync(path.join(__dirname, '../public/icon-512.svg'), svgIcon);

console.log('✓ Created placeholder icons');
console.log('Note: For production, replace these with proper PNG icons');