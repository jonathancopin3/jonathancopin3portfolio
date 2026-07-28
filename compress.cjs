const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const DIRS = ['public/Images_Projets', 'public/projects'];
const SIZE_LIMIT = 2 * 1024 * 1024; // 2MB
const MAX_WIDTH = 1920;

const replacements = [];

async function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            await processDirectory(fullPath);
        } else if (stat.isFile() && (fullPath.toLowerCase().endsWith('.png') || fullPath.toLowerCase().endsWith('.jpg') || fullPath.toLowerCase().endsWith('.jpeg'))) {
            if (stat.size > SIZE_LIMIT) {
                console.log(`Processing ${fullPath} (${(stat.size / 1024 / 1024).toFixed(2)} MB)...`);
                
                const isPng = fullPath.toLowerCase().endsWith('.png');
                const newPath = isPng ? fullPath.replace(/\.png$/i, '.jpg') : fullPath + '.tmp.jpg';
                
                try {
                    const metadata = await sharp(fullPath).metadata();
                    let s = sharp(fullPath);
                    
                    if (metadata.width > MAX_WIDTH) {
                        s = s.resize(MAX_WIDTH);
                    }
                    
                    await s.jpeg({ quality: 80, progressive: true }).toFile(newPath);
                    
                    const newStat = fs.statSync(newPath);
                    console.log(` -> Reduced to ${(newStat.size / 1024 / 1024).toFixed(2)} MB`);
                    
                    if (isPng) {
                        fs.unlinkSync(fullPath);
                        // Record for constants.ts replacement
                        const oldWebPath = fullPath.replace(/^public[\\\/]/i, '/').replace(/\\/g, '/');
                        const newWebPath = newPath.replace(/^public[\\\/]/i, '/').replace(/\\/g, '/');
                        replacements.push({ old: oldWebPath, new: newWebPath });
                    } else {
                        fs.unlinkSync(fullPath);
                        fs.renameSync(newPath, fullPath);
                    }
                } catch (err) {
                    console.error(`Error processing ${fullPath}:`, err);
                }
            }
        }
    }
}

async function run() {
    for (const dir of DIRS) {
        if (fs.existsSync(dir)) {
            await processDirectory(dir);
        }
    }
    
    if (replacements.length > 0) {
        console.log(`Updating constants.ts with ${replacements.length} replacements...`);
        let constantsPath = 'src/constants.ts';
        let constantsContent = fs.readFileSync(constantsPath, 'utf8');
        for (const rep of replacements) {
            // Escape special chars just in case, or just string replace
            constantsContent = constantsContent.split(rep.old).join(rep.new);
        }
        fs.writeFileSync(constantsPath, constantsContent, 'utf8');
        console.log('constants.ts updated.');
    } else {
        console.log('No constants.ts updates needed.');
    }
}

run();
