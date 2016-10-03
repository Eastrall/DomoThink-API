import fs from 'fs';

const dirs = p => fs.readdirSync(p).filter(f => fs.statSync(p + "/" + f).isDirectory());

export default dirs;
