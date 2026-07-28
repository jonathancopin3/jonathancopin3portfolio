const fs = require('fs');
const js = fs.readFileSync('vercel-chunk.js', 'utf8');

const startIndex = js.indexOf('projects:[{id:');
if (startIndex !== -1) {
    let endIndex = startIndex;
    let bracketCount = 0;
    let foundStart = false;
    // Start parsing from the '['
    const bracketIndex = js.indexOf('[', startIndex);
    if (bracketIndex !== -1) {
        for (let i = bracketIndex; i < js.length; i++) {
            if (js[i] === '[') {
                bracketCount++;
                foundStart = true;
            } else if (js[i] === ']') {
                bracketCount--;
            }
            
            if (foundStart && bracketCount === 0) {
                endIndex = i;
                break;
            }
        }
        fs.writeFileSync('vercel-projects-raw.txt', js.substring(startIndex, endIndex + 1));
        console.log('Saved projects array.');
    }
} else {
    console.log('Could not find projects:[{id:');
}
