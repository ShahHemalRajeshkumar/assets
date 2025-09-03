const fs = require('fs');
const path = require('path');

// Debug script to check if CSS files are being generated correctly
function checkBuildFiles() {
  const buildDir = path.join(__dirname, '.next');
  
  if (!fs.existsSync(buildDir)) {
    console.log('❌ .next directory not found. Run "yarn build" first.');
    return;
  }
  
  // Check for CSS files
  const staticDir = path.join(buildDir, 'static');
  if (fs.existsSync(staticDir)) {
    const cssFiles = [];
    
    function findCSSFiles(dir) {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          findCSSFiles(filePath);
        } else if (file.endsWith('.css')) {
          cssFiles.push(filePath);
        }
      });
    }
    
    findCSSFiles(staticDir);
    
    console.log('📁 Found CSS files:');
    cssFiles.forEach(file => {
      const relativePath = path.relative(__dirname, file);
      const size = fs.statSync(file).size;
      console.log(`  - ${relativePath} (${size} bytes)`);
      
      // Check if navigation styles are present
      const content = fs.readFileSync(file, 'utf8');
      const hasNavStyles = content.includes('ms-nav') || 
                          content.includes('search-header') || 
                          content.includes('sticky') ||
                          content.includes('navigation');
      
      if (hasNavStyles) {
        console.log(`    ✅ Contains navigation styles`);
      } else {
        console.log(`    ⚠️  No navigation styles found`);
      }
    });
  }
  
  // Check server files
  const serverDir = path.join(buildDir, 'server');
  if (fs.existsSync(serverDir)) {
    console.log('\n📁 Server directory exists');
  }
  
  console.log('\n🔍 Build analysis complete');
}

checkBuildFiles();