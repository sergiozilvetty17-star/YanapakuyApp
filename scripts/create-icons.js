#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// SVG simple como placeholder
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect fill="#208AEF" width="512" height="512"/>
  <text x="256" y="256" font-size="200" fill="white" text-anchor="middle" dy=".3em">Y</text>
</svg>`;

const publicDir = path.join(__dirname, '..', 'public');

// Crear carpeta si no existe
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const files = [
  'icon-192.png',
  'icon-512.png',
  'icon-maskable-192.png',
  'icon-maskable-512.png',
  'icon-96.png',
  'favicon.png'
];

files.forEach(file => {
  fs.writeFileSync(path.join(publicDir, file), svgIcon);
});

console.log('✅ Icons placeholder creados en public/');
