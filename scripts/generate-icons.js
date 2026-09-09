#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Usar sharp para generar PNGs válidos
let sharp;
try {
  sharp = require('sharp');
} catch (error) {
  console.error('❌ Sharp no está instalado. Ejecuta: npm install sharp');
  process.exit(1);
}

const publicDir = path.join(__dirname, '..', 'public');

// SVG simple como template
const createSVG = (size, label) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <style>
      .bg { fill: #208AEF; }
      .text { font-size: ${Math.floor(size * 0.5)}px; font-weight: bold; fill: white; font-family: Arial, sans-serif; }
    </style>
  </defs>
  <rect class="bg" width="${size}" height="${size}"/>
  <text class="text" x="50%" y="50%" text-anchor="middle" dominant-baseline="central">${label}</text>
</svg>
`;

const icons = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'icon-maskable-192.png', size: 192 },
  { name: 'icon-maskable-512.png', size: 512 },
  { name: 'icon-96.png', size: 96 },
  { name: 'favicon.png', size: 32 }
];

async function generateIcons() {
  try {
    // Crear carpeta si no existe
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    for (const icon of icons) {
      const svg = createSVG(icon.size, 'Y');
      const outputPath = path.join(publicDir, icon.name);
      
      await sharp(Buffer.from(svg))
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Creado: ${icon.name} (${icon.size}x${icon.size})`);
    }

    console.log('\n✅ Todos los icons PNG generados correctamente');
  } catch (error) {
    console.error('❌ Error generando icons:', error.message);
    process.exit(1);
  }
}

generateIcons();
