
import fs from 'fs';

const css = fs.readFileSync('LiveStyles.css', 'utf8');

// Helper to extract rule (simple regex)
function extractRule(selector) {
    const escapedSelector = selector.replace(/\./g, '\\.');
    const regex = new RegExp(`${escapedSelector}\\{([^}]+)\\}`, 'g');
    let match;
    let found = false;
    while ((match = regex.exec(css)) !== null) {
        console.log(`/* Rule for ${selector} */`);
        console.log(`${selector} { ${match[1]} }`);
        found = true;
    }
    if (!found) console.log(`/* No rule found for ${selector} */`);
}

console.log('--- EXTRACTED CSS ---');
extractRule('.slide-progress-line');
extractRule('.slide-nav-item.active');
// Note: .slide-nav-item.active .slide-progress-line might be nested or separate. 
// Searching for the combined selector:
extractRule('.slide-nav-item.active .slide-progress-line');
extractRule('.slide-content');
extractRule('.slide-title');
extractRule('.slide-description');
extractRule('.slide-view-projects');

// Extract media query block manually logic
const mediaStart = css.indexOf('@media(max-width:768px){');
if (mediaStart !== -1) {
    console.log('\n--- MEDIA QUERY (max-width: 768px) ---');
    let depth = 0;
    let end = -1;
    // Start inside the media query block
    // @media(max-width:768px){ ... }
    //                        ^ start counting from here
    for (let i = mediaStart; i < css.length; i++) {
        if (css[i] === '{') depth++;
        else if (css[i] === '}') {
            depth--;
            if (depth === 0) {
                end = i + 1;
                break;
            }
        }
    }
    if (end !== -1) {
        let block = css.substring(mediaStart, end);
        // formatting a bit
        block = block.replace(/\{/g, ' {\n  ').replace(/\}/g, ' }\n').replace(/;/g, ';\n  ');
        console.log(block);
    }
} else {
    console.log('/* No media query found for max-width: 768px */');
}
