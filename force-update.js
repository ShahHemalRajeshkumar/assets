// Force cache busting for deployment
const fs = require('fs');
const path = require('path');

// Add timestamp to force cache invalidation
const timestamp = Date.now();
const buildId = `build-${timestamp}`;

// Update package.json version to force cache bust
const packagePath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
packageJson.version = `0.1.${timestamp}`;
fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));

console.log(`✅ Updated version to ${packageJson.version} for cache busting`);

// Create a build info file
const buildInfo = {
  buildId,
  timestamp,
  version: packageJson.version,
  date: new Date().toISOString()
};

fs.writeFileSync(
  path.join(__dirname, 'public', 'build-info.json'), 
  JSON.stringify(buildInfo, null, 2)
);

console.log(`✅ Created build info: ${buildId}`);