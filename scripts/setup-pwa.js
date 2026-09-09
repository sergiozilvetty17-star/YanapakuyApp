#!/usr/bin/env node

/**
 * Script para inyectar manifest.json y Service Worker en el HTML generado por Expo
 * Se ejecuta después de `expo export`
 */

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');

const headInjection = `<meta name="theme-color" content="#208AEF"/>
    <meta name="description" content="Aplicación de emergencias médicas - Primeros auxilios y simulador"/>
    <meta name="apple-mobile-web-app-capable" content="true"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
    <meta name="apple-mobile-web-app-title" content="Yanapakuy"/>
    <link rel="apple-touch-icon" href="/icon-192.png"/>
    <link rel="manifest" href="/manifest.json"/>
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png"/>`;

const bodyInjection = `<script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker
            .register('/sw.js')
            .then(registration => {
              console.log('[App] Service Worker registrado:', registration);
              registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    console.log('[App] Nueva versión disponible');
                  }
                });
              });
            })
            .catch(error => {
              console.error('[App] Error registrando Service Worker:', error);
            });
        });
      }
      if (window.navigator.standalone === true) {
        console.log('[App] Ejecutando como PWA instalada');
      }
    </script>`;

function copyFile(src, dest) {
  try {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      return true;
    }
    return false;
  } catch (error) {
    console.warn(`⚠️ No se pudo copiar ${path.basename(src)}`);
    return false;
  }
}

try {
  // Copiar archivos PWA de public/ a dist/
  const publicDir = path.join(__dirname, '..', 'public');
  const filesToCopy = [
    'manifest.json',
    'sw.js',
    'icon-192.png',
    'icon-512.png',
    'icon-maskable-192.png',
    'icon-maskable-512.png',
    'icon-96.png',
    'favicon.png'
  ];

  filesToCopy.forEach(file => {
    const src = path.join(publicDir, file);
    const dest = path.join(distDir, file);
    copyFile(src, dest);
  });

  // Si existe index.html, inyectar metadatos PWA
  if (fs.existsSync(indexPath)) {
    let html = fs.readFileSync(indexPath, 'utf-8');

    // Inyectar en <head>
    const headInjectionCompact = headInjection.replace(/\n\s+/g, '');
    if (html.includes('</head>')) {
      html = html.replace('</head>', `${headInjectionCompact}</head>`);
    }

    // Inyectar antes de </body>
    const bodyInjectionCompact = bodyInjection.replace(/\n\s+/g, '');
    if (html.includes('</body>')) {
      html = html.replace('</body>', `${bodyInjectionCompact}</body>`);
    }

    // Guardar archivo modificado
    fs.writeFileSync(indexPath, html, 'utf-8');
    console.log('✅ PWA configurada');
    console.log('   ✓ index.html inyectado');
  } else {
    console.log('⚠️  index.html no encontrado, pero archivos PWA copiados');
  }

  console.log('✅ PWA lista');
  console.log('   ✓ Manifest.json en dist/');
  console.log('   ✓ Service Worker en dist/');
  console.log('   ✓ Icons en dist/');

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
