const vercel = require('./vercel-data.cjs');
const local = require('./src/constants.cjs').content;

let differencesFound = 0;

function compareObjects(v, l, path = 'projects') {
    if (v === l) return;
    if (v == null || l == null) {
        console.log(`Difference at ${path}: Vercel has ${v}, Local has ${l}`);
        differencesFound++;
        return;
    }
    if (typeof v !== typeof l) {
        console.log(`Difference in type at ${path}: Vercel is ${typeof v}, Local is ${typeof l}`);
        differencesFound++;
        return;
    }
    if (Array.isArray(v)) {
        if (!Array.isArray(l)) {
            console.log(`Difference at ${path}: Vercel is array, Local is not`);
            differencesFound++;
            return;
        }
        if (v.length !== l.length) {
            console.log(`Difference in array length at ${path}: Vercel has ${v.length}, Local has ${l.length}`);
            differencesFound++;
            return;
        }
        for (let i = 0; i < v.length; i++) {
            compareObjects(v[i], l[i], `${path}[${i}]`);
        }
    } else if (typeof v === 'object') {
        const vKeys = Object.keys(v).sort();
        const lKeys = Object.keys(l).sort();
        for (const k of vKeys) {
            if (!(k in l)) {
                console.log(`Local missing key at ${path}.${k}. Vercel has:`, v[k]);
                differencesFound++;
            } else {
                compareObjects(v[k], l[k], `${path}.${k}`);
            }
        }
        for (const k of lKeys) {
            if (!(k in v)) {
                console.log(`Vercel missing key at ${path}.${k}. Local has:`, l[k]);
                differencesFound++;
            }
        }
    } else {
        if (v !== l) {
            // Trim and normalize strings (line breaks might differ)
            if (typeof v === 'string' && typeof l === 'string') {
                if (v.replace(/\s+/g, '') === l.replace(/\s+/g, '')) return; // ignore whitespace
            }
            console.log(`Difference at ${path}:`);
            console.log(`  Vercel: ${v}`);
            console.log(`  Local:  ${l}`);
            differencesFound++;
        }
    }
}

compareObjects(vercel.projects, local.projects);

if (differencesFound === 0) {
    console.log("SUCCESS: 0 differences found between Vercel and Local projects!");
} else {
    console.log(`Total differences: ${differencesFound}`);
}
