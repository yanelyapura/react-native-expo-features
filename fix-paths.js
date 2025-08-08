const fs = require('fs');
const path = require('path');

// Leer el archivo index.html
const indexPath = path.join(__dirname, 'dist', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Reemplazar las rutas absolutas con rutas relativas
html = html.replace(/src="\/_expo\//g, 'src="./_expo/');
html = html.replace(/href="\/favicon\.ico"/g, 'href="./favicon.ico"');

// Escribir el archivo corregido
fs.writeFileSync(indexPath, html);

console.log('✅ Rutas corregidas en index.html');
