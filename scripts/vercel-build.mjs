// One repo, two Vercel projects. Both build `main`; this picks the site by project:
//  - Vercel project "by-lado" (deploy URL by-lado-…, production URL ladobridal-ripl / by-lado…) → builds ./by-lado (hair extensions)
//  - everything else (project "ladobridal", local builds) → Lado Bridal, as before.
// ./by-lado is a copy of branch `by-lado`; sync with: git rm -rq by-lado && git read-tree --prefix=by-lado/ -u origin/by-lado
import { execSync } from 'node:child_process';
import { rmSync, renameSync } from 'node:fs';
const url = process.env.VERCEL_URL ?? '', prod = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? '';
const byLado = process.env.SITE === 'by-lado' || /^by-lado-/.test(url) || /^(ladobridal-ripl|by-lado)[.-]/.test(prod);
console.log(`[vercel-build] VERCEL_URL=${url} PROD=${prod} → ${byLado ? 'By Lado' : 'Lado Bridal'}`);
const run = (cmd, cwd = '.') => execSync(cmd, { stdio: 'inherit', cwd });
if (!byLado) run('npm run build');
else {
  run('npm ci --no-audit --no-fund', 'by-lado');
  run('npm run build', 'by-lado');
  rmSync('dist', { recursive: true, force: true });
  renameSync('by-lado/dist', 'dist');
}
