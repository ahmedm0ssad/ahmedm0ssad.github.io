// Generates content/projects/<slug>/index.md files for all 56 projects
// from the master CV. Deterministic — re-runnable. Run: node tmp-gen/gen-projects.mjs
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SITE = dirname(HERE);
const CV_PATH = 'D:/CEO/Portfolio/CV/cvs/master/Ahmed_Mossad_Master_CV.md';
const OUT_DIR = join(SITE, 'content', 'projects');

const cv = readFileSync(CV_PATH, 'utf8').replace(/\r\n/g, '\n');

// ---------- extract the Projects region ----------
const projectsStart = cv.indexOf('## Projects');
const projectsEnd = cv.indexOf('## Certifications');
if (projectsStart < 0 || projectsEnd < 0) throw new Error('Could not locate Projects region in CV');
const region = cv.slice(projectsStart, projectsEnd);

// ---------- graduation project region (reference material for Smart Triangle) ----------
const gradStart = cv.indexOf('## Graduation Project');
const gradEnd = cv.indexOf('## Education');
const gradRegion = gradStart >= 0 && gradEnd > gradStart ? cv.slice(gradStart, gradEnd) : '';

// ---------- parse domains ----------
const domainRe = /^### ([A-L])\. (.+)$/gm;
let m;
const domains = []; // { letter, name, start, end }
while ((m = domainRe.exec(region)) !== null) {
  domains.push({ letter: m[1], name: m[2].trim(), start: m.index, end: -1 });
}
for (let i = 0; i < domains.length; i++) {
  domains[i].end = (i + 1 < domains.length) ? domains[i + 1].start : region.length;
}

const FEATURED_REPOS = new Set([
  'Smart-Triangle',
  'flyrank-backend',
  'RAG-Optimization-System',
  'End-To-End-MLOps-Pipeline',
  'Real-Time-Recommendation-System',
  'YOLO-SORT-Person-Tracker',
]);

// ---------- helpers ----------
const monthMap = { january: 1, february: 2, march: 3, april: 4, may: 5, june: 6, july: 7, august: 8, september: 9, october: 10, november: 11, december: 12 };
const seasonMap = { spring: 4, summer: 7, fall: 9, autumn: 9, winter: 1 };

function guessDate(dateText) {
  if (!dateText) return null;
  const t = dateText.replace(/[\u2013\u2014]/g, '-').toLowerCase().trim();
  // YYYY
  let mm = /^(\d{4})$/.exec(t); if (mm) return `${mm[1]}-06-15`;
  // YYYY-YYYY
  mm = /^(\d{4})-(\d{4})$/.exec(t); if (mm) return `${Number(mm[2]) - 1}-12-15`;
  // MM/YYYY
  mm = /^(\d{1,2})\/(\d{4})$/.exec(t); if (mm) return `${mm[2]}-${String(Number(mm[1])).padStart(2, '0')}-15`;
  // Month YYYY (or Month YYYY with range)
  mm = /^([a-z]+)(?:\s*-\s*[a-z]+)?\s+(\d{4})/.exec(t);
  if (mm && monthMap[mm[1]]) return `${mm[2]}-${String(monthMap[mm[1]]).padStart(2, '0')}-15`;
  // Season YYYY
  mm = /^([a-z]+)\s+(\d{4})/.exec(t);
  if (mm && seasonMap[mm[1]]) return `${mm[2]}-${String(seasonMap[mm[1]]).padStart(2, '0')}-15`;
  return null;
}

function yamlStr(s) {
  if (s == null) return "''";
  s = String(s);
  // keep plain unless special chars present
  return `'${s.replace(/\\/g, '\\\\').replace(/'/g, "''")}'`;
}

function firstLine(s) { return (s.split('\n')[0] || '').trim(); }

// clean a bullet into plain text-ish markdown (preserve [links](url))
function cleanBullet(line) {
  let b = line.replace(/^-+\s*/, '').trim();
  b = b.replace(/\s+/g, ' ');
  return b;
}

function truncate(s, n) {
  if (s.length <= n) return s;
  const cut = s.slice(0, n);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > n * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[,;:]$/, '') + '…';
}

// ---------- parse project entries ----------
const entries = [];
{
  const projRe = /^#### (\d+)\. (.+)$/gm;
  const matches = [];
  let pm;
  while ((pm = projRe.exec(region)) !== null) matches.push({ num: Number(pm[1]), title: pm[2].trim(), start: pm.index, end: -1 });
  if (!matches.length) throw new Error('No project entries found');
  for (let i = 0; i < matches.length; i++) {
    matches[i].end = (i + 1 < matches.length) ? matches[i + 1].start : region.length;
  }
  for (const mt of matches) {
    const dom = domains.find(d => mt.start >= d.start && mt.start < d.end);
    if (!dom) throw new Error(`No domain for project ${mt.num}`);
    const body = region.slice(mt.start, mt.end);
    const lines = body.split('\n');

    // GitHub repo link
    const gh = /\*\*GitHub:\*\* \[[^\]]+\]\((https:\/\/github\.com\/[^)\s]+)\)/.exec(body);
    let repoUrl = null, slug = null;
    if (gh) {
      repoUrl = gh[1].replace(/[).]+$/, '');
      slug = repoUrl.split('/').pop();
    }

    // bold metadata lines
    const dateLine = /\*\*Date:\*\*\s*(.+)$/m.exec(body);
    const langLine = /\*\*Languages?:\*\*\s*(.+)$/m.exec(body);
    const stackLine = /\*\*Stack(?:\s*\([^)]+\))?:\*\*\s*(.+)$/m.exec(body);
    const roleLine = /\*\*Role:\*\*\s*(.+)$/m.exec(body);

    // bullets
    const bullets = lines.filter(l => /^- /.test(l)).map(cleanBullet);

    entries.push({
      num: mt.num,
      title: mt.title,
      domain: dom.name,
      domainLetter: dom.letter,
      dateText: dateLine ? dateLine[1].trim() : '',
      langText: langLine ? langLine[1].trim() : '',
      stackText: stackLine ? stackLine[1].trim() : '',
      roleText: roleLine ? roleLine[1].trim() : '',
      bullets,
      repoUrl,
      slug: slug || null,
    });
  }
}

// ---------- parse graduation project (for Smart Triangle ref) ----------
let grad = null;
if (gradRegion) {
  const gm = /### .+?Smart Triangle[^\n]*\n([\s\S]*?)(?=\n## )/.exec(gradRegion);
  if (gm) {
    const g = gm[0];
    const excerpt = g.split('\n').filter(l => /^- /.test(l));
    const gTitle = /^### (.+)$/m.exec(g);
    const gRole = /Role:([^*\n]+)/.exec(g);
    const gStack = /\*\*Stack:\*\*\s*(.+)$/m.exec(g);
    const gDates = /\*\*(\d{4}\s*–\s*\d{4})\*\*/.exec(g);
    grad = {
      title: gTitle ? gTitle[1].trim() : 'Smart Triangle',
      role: gRole ? gRole[1].trim() : '',
      stack: gStack ? gStack[1].trim() : '',
      dates: gDates ? gDates[1] : '2025 – 2026',
      bullets: excerpt.map(l => l.replace(/^-+\s*/, '').trim()),
    };
  }
}

// ---------- generate files ----------
// Smart Triangle project page content
const smartBullets = grad ? grad.bullets : [];

mkdirSync(OUT_DIR, { recursive: true });
for (const dir of ['untitled', 'example', 'pandas', 'pytorch', 'scikit']) {
  const p = join(OUT_DIR, dir);
  if (existsSync(p)) rmSync(p, { recursive: true, force: true });
}

let written = 0;
const manifest = [];

for (const e of entries) {
  const isSmart = e.num === 9 || /smart triangle/i.test(e.title);
  let title = e.title.replace(/\*+$/, '').replace(/\s*\(see graduation project\).*$/i, '').trim();
  let bullets = e.bullets;
  let stackText = e.stackText;
  let langText = e.langText;
  let dateText = e.dateText;
  let roleText = e.roleText;
  let repoUrl = e.repoUrl;
  let slug;

  if (isSmart) {
    title = 'Smart Triangle — Senior Graduation Project';
    bullets = smartBullets.map(cleanBullet);
    stackText = stackText || (grad ? grad.stack : '');
    if (grad && dateText === '') dateText = grad.dates;
    roleText = roleText || (grad ? grad.role : 'Lead Backend and AI Engine Engineer');
    repoUrl = null; // no public repo in CV
    slug = 'Smart-Triangle';
  } else {
    slug = e.slug || title.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  const dateIso = guessDate(dateText) || '2025-01-15';
  if (!dateIso) throw new Error(`No date for ${e.num}`);

  // summary: first bullet, cleaned (strip leading bold assignment markers)
  let climB = bullets[0] ? bullets[0].replace(/\*\*Assignment \d+:\*\*\s*/, '') : '';
  if (!climB) climB = title.split('—')[0].trim();
  const summary = truncate(climB, 160);

  const tags = [e.domain];

  const fm = [];
  fm.push('---');
  fm.push(`title: ${yamlStr(title)}`);
  if (isSmart) fm.push(`subtitle: ${yamlStr(roleText + ' · ' + (grad ? grad.dates : ''))}`);
  fm.push(`date: ${dateIso}`);
  fm.push(`date_note: ${yamlStr(dateText || 'Undated')}`);
  if (summary) fm.push(`summary: ${yamlStr(summary)}`);
  fm.push('links:');
  if (repoUrl) {
    fm.push('  - type: site');
    fm.push(`    url: ${repoUrl}`);
  }
  fm.push('tags:');
  for (const t of tags) fm.push(`  - ${t}`);
  if (FEATURED_REPOS.has(slug)) fm.push('featured: true');
  fm.push('---');

  const body = [];
  if (dateText) body.push(`**Completed:** ${dateText}`);
  if (langText) body.push(`**Language(s):** ${langText}`);
  if (stackText) body.push(`**Stack:** ${stackText}`);
  if (roleText && !isSmart) body.push(`**Role:** ${roleText}`);
  if (body.length) body.push('');

  for (const b of bullets) body.push(`- ${b}`);

  const out = fm.join('\n') + '\n\n' + body.join('\n').trim() + '\n';
  const dir = join(OUT_DIR, slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.md'), out, 'utf8');
  written++;
  manifest.push({ num: e.num, slug, title, domain: e.domain, repoUrl, dateIso, dateText });
}

// ---------- Smart Triangle also as graduation project page (homepage experience covers role) ----------
console.log(`Wrote ${written} project files.`);
writeFileSync(join(HERE, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
console.log('Manifest at tmp-gen/manifest.json');
