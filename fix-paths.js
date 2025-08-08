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

// Corregir archivos JavaScript
const jsFiles = fs.readdirSync(path.join(__dirname, 'dist', '_expo', 'static', 'js', 'web'));
jsFiles.forEach(file => {
  if (file.endsWith('.js')) {
    const jsPath = path.join(__dirname, 'dist', '_expo', 'static', 'js', 'web', file);
    let jsContent = fs.readFileSync(jsPath, 'utf8');
    
    // Reemplazar TODAS las referencias absolutas con relativas
    jsContent = jsContent.replace(/\/assets\//g, './assets/');
    jsContent = jsContent.replace(/\/_expo\//g, './_expo/');
    jsContent = jsContent.replace(/\/favicon\.ico/g, './favicon.ico');
    
    // Corregir referencias específicas a assets - usar rutas absolutas con el repositorio
    jsContent = jsContent.replace(/assets\/assets\//g, '/react-native-expo-features/assets/assets/');
    jsContent = jsContent.replace(/assets\/node_modules\//g, '/react-native-expo-features/assets/node_modules/');
    
    // También corregir URLs que empiecen con / pero no sean assets
    jsContent = jsContent.replace(/"\/([^"]*\.(ttf|woff|woff2|eot|png|jpg|jpeg|gif|svg|ico))"/g, '"./$1"');
    
    fs.writeFileSync(jsPath, jsContent);
  }
});

console.log('✅ Rutas corregidas en archivos JavaScript');

// Crear archivo .nojekyll si no existe
const nojekyllPath = path.join(__dirname, 'dist', '.nojekyll');
if (!fs.existsSync(nojekyllPath)) {
  fs.writeFileSync(nojekyllPath, '# This file tells GitHub Pages not to use Jekyll\n');
  console.log('✅ Archivo .nojekyll creado');
}
