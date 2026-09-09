#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
let sharp;

try {
  sharp = require('sharp');
} catch (error) {
  console.error('Sharp no instalado');
  process.exit(1);
}

const distDir = path.join(__dirname, '..', 'dist');

const createSVG = (width, height, label) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <style>
      .bg { fill: #208AEF; }
      .text { font-size: ${Math.floor(Math.min(width, height) * 0.15)}px; font-weight: bold; fill: white; font-family: Arial, sans-serif; }
    </style>
  </defs>
  <rect class="bg" width="${width}" height="${height}"/>
  <text class="text" x="50%" y="50%" text-anchor="middle" dominant-baseline="central">${label}</text>
</svg>
`;

async function generateScreenshots() {
  try {
    const screenshots = [
      { name: 'screenshot-540x720.png', width: 540, height: 720 },
      { name: 'screenshot-1280x720.png', width: 1280, height: 720 }
    ];

    for (const screenshot of screenshots) {
      const svg = createSVG(screenshot.width, screenshot.height, 'Yanapakuy');
      const outputPath = path.join(distDir, screenshot.name);
      
      await sharp(Buffer.from(svg))
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Creado: ${screenshot.name} (${screenshot.width}x${screenshot.height})`);
    }

    console.log('\n✅ Screenshots generados correctamente');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

generateScreenshots();
