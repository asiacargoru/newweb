// frontend/rename-lovable.js
const fs = require('fs');
const path = require('path');

function updateImports(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let updated = 0;
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      updated += updateImports(fullPath);
    } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const original = content;
      
      // Заменяем все импорты с lovable на sections
      content = content.replace(
        /@\/components\/lovable/g,
        '@/components/sectionssections'
      );
      
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`  ✅ Обновлен: ${fullPath}`);
        updated++;
      }
    }
  }
  
  return updated;
}

console.log('🔄 Переименование lovable → sections...\n');

// Обновляем импорты во всех файлах
const appUpdated = updateImports('./app');
const componentsUpdated = updateImports('./components');

console.log(`\n🎉 Готово! Обновлено файлов: ${appUpdated + componentsUpdated}`);
console.log('\n⚠️  Не забудьте переименовать папку:');
console.log('   move components\\lovable components\\sections');
