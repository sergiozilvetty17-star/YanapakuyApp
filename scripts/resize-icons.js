#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
let sharp;

try {
  sharp = require('sharp');
} catch (error) {
  console.error('Sharp no está instalado');
  process.exit(1);
}

const sourceIcon = path.join(__dirname, '..', 'assets', 'images', 'icon-original.png');
const publicDir = path.join(__dirname, '..', 'public');

if (!fs.existsSync(sourceIcon)) {
  console.error(`❌ No se encontró: ${sourceIcon}`);
  process.exit(1);
}

const sizes = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'icon-maskable-192.png', size: 192 },
  { name: 'icon-maskable-512.png', size: 512 },
  { name: 'icon-96.png', size: 96 },
  { name: 'favicon.png', size: 32 }
];

async function resizeIcons() {
  try {
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    for (const icon of sizes) {
      const outputPath = path.join(publicDir, icon.name);
      
      await sharp(sourceIcon)
        .resize(icon.size, icon.size, {
          fit: 'cover',
          position: 'center'
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Creado: ${icon.name} (${icon.size}x${icon.size})`);
    }

    console.log('\n✅ Todos los icons redimensionados correctamente');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

resizeIcons();
