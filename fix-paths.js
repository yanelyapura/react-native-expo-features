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

// También necesitamos verificar si hay archivos JavaScript que referencien assets
const jsFiles = fs.readdirSync(path.join(__dirname, 'dist', '_expo', 'static', 'js', 'web'));
jsFiles.forEach(file => {
  if (file.endsWith('.js')) {
    const jsPath = path.join(__dirname, 'dist', '_expo', 'static', 'js', 'web', file);
    let jsContent = fs.readFileSync(jsPath, 'utf8');
    
    // Reemplazar referencias a assets absolutas con relativas
    jsContent = jsContent.replace(/\/assets\//g, './assets/');
    
    fs.writeFileSync(jsPath, jsContent);
  }
});

console.log('✅ Rutas corregidas en archivos JavaScript');
