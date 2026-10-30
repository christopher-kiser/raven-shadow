/* Real-browser acceptance for the public, fictional assurance prototype.
 * Uses an existing Playwright installation and browser; never downloads either.
 * The owned HTTP server serves this repository only and closes in finally.
 */
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const crypto = require('node:crypto');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT = path.resolve(ROOT, process.env.BROWSER_OUTPUT_DIR || 'tests');
const relativeOutput = path.relative(ROOT, OUTPUT);
if (relativeOutput.startsWith('..') || path.isAbsolute(relativeOutput)) throw new Error('Browser evidence must stay in the public repository.');
const SHOTS = path.join(OUTPUT, 'screenshots');
const MIME = {'.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.md': 'text/plain', '.ico': 'image/x-icon', '.woff2': 'font/woff2'};

function installedPlaywright() {
  if (process.env.PLAYWRIGHT_MODULE) return require(process.env.PLAYWRIGHT_MODULE);
  try { return require('playwright-core'); }
  catch (first) {
    const bundled = path.resolve(path.dirname(process.execPath), '..', 'node_modules', 'playwright-core');
    if (fs.existsSync(bundled)) return require(bundled);
    throw new Error('Use an already installed Playwright: set PLAYWRIGHT_MODULE to its module path. No automatic installation is performed.');
  }
}

function staticServer() {
  return http.createServer((request, response) => {
    try {
      const url = new URL(request.url, 'http://127.0.0.1');
      const requested = decodeURIComponent(url.pathname);
      const relative = requested === '/' ? 'index.html' : requested.replace(/^\/+/, '');
      const filename = path.resolve(ROOT, relative);
      const inside = path.relative(ROOT, filename);
      if (inside.startsWith('..') || path.isAbsolute(inside) || inside.split(path.sep).some(p => p.startsWith('.'))) {
        response.writeHead(403); response.end('Outside public demo scope'); return;
      }
      const type = MIME[path.extname(filename)];
      if (!type || !fs.existsSync(filename) || !fs.statSync(filename).isFile()) {
        response.writeHead(404); response.end('Not found'); return;
      }
      response.writeHead(200, {'Content-Type': type + (type.startsWith('text/') ? '; charset=utf-8' : ''),
        'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff'});
      fs.createReadStream(filename).pipe(response);
    } catch {
      response.writeHead(400); response.end('Invalid request');
    }
  });
}

function sha256(value) { return crypto.createHash('sha256').update(value).digest('hex'); }

async function main() {
  fs.mkdirSync(SHOTS, {recursive: true});
  const server = staticServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const executable = process.env.BROWSER_EXECUTABLE || path.join(
    process.env['PROGRAMFILES(X86)'] || 'C:\\Program Files (x86)', 'Microsoft', 'Edge', 'Application', 'msedge.exe');
  const report = {suite: 'public-assurance-prototype-browser', started_at: new Date().toISOString(),
    proof_boundary: 'Actual browser behavior over fictional, client-side demonstration data. No model, native runtime, real worker, customer observation or approval is exercised.',
    browser_executable: path.basename(executable), non_read_requests: [], websockets: [], checks: [], screenshots: [], page_errors: [], external_requests: []};
  let browser, context, page;
  const check = async (name, action, fatal = false) => {
    const started = Date.now();
    try { const detail = await action(); report.checks.push({name, status: 'PASS', elapsed_ms: Date.now() - started, ...(detail ? {detail} : {})}); }
    catch (error) { report.checks.push({name, status: 'FAIL', error: error.message}); if (fatal) throw error; }
  };
  const screenshot = async name => {
    const file = path.join(SHOTS, name + '.png');
    await page.locator('#toast').waitFor({state: 'hidden', timeout: 7000});
    await page.screenshot({path: file, fullPage: true, animations: 'disabled'});
    report.screenshots.push({path: path.relative(ROOT, file).split(path.sep).join('/'), sha256: sha256(fs.readFileSync(file))});
  };
  try {
    assert(fs.existsSync(executable), 'Point BROWSER_EXECUTABLE at an installed browser.');
    browser = await installedPlaywright().chromium.launch({executablePath: executable, headless: true,
      args: ['--disable-background-networking', '--disable-component-update', '--disable-sync', '--no-first-run']});
    report.browser_version = browser.version();
    context = await browser.newContext({viewport: {width: 1440, height: 1000}, acceptDownloads: true});
    page = await context.newPage();
    page.setDefaultTimeout(6000);
    page.on('pageerror', error => report.page_errors.push(error.message));
    page.on('websocket', socket => report.websockets.push(socket.url()));
    page.on('request', request => {
      if (!['GET', 'HEAD'].includes(request.method())) report.non_read_requests.push({method: request.method(), url: request.url().replace(origin, '<owned-loopback-origin>')});
      if (/^https?:/.test(request.url()) && !request.url().startsWith(origin + '/'))
        report.external_requests.push({method: request.method(), url: request.url()});
    });
    await page.goto(origin, {waitUntil: 'networkidle'});
    const action = name => page.locator('[data-action="' + name + '"]').first();
    const route = async name => {
      if (await page.locator('.sidebar').evaluate(node => node.inert)) await action('menu').click();
      await page.locator('.nav-list a[href="#' + name + '"]').click();
      await page.waitForFunction(value => document.querySelector('#app').dataset.route === value, name);
    };
    const verdict = async value => page.waitForFunction(expected => document.querySelector('#app').dataset.verdict === expected, value);
    const readyCheck = async () => page.waitForFunction(() => !document.querySelector('[data-action="verify"]')?.disabled);
    const load = async () => {
      await action('open-scope').click(); await page.locator('#sample-consent').check();
      await action('confirm-load').click();
      await page.waitForFunction(() => document.querySelector('#app').dataset.loaded === 'true');
      await readyCheck();
    };
    const change = async id => {
      await route('dashboard'); await page.locator('#observation-variant').selectOption(id);
      await page.waitForFunction(value => document.querySelector('#app').dataset.variant === value, id);
      await readyCheck();
    };
    const download = async button => {
      const pending = page.waitForEvent('download'); await button.click();
      const item = await pending; const raw = fs.readFileSync(await item.path());
      return {name: item.suggestedFilename(), text: raw.toString('utf8'), sha256: sha256(raw)};
    };
    const noOverflow = async () => {
      const sizes = await page.evaluate(() => ({viewport: innerWidth, document: document.documentElement.scrollWidth}));
      assert(sizes.document <= sizes.viewport + 1, JSON.stringify(sizes)); return sizes;
    };
    const reportDownload = async (variant, status) => {
      await route('report');
      assert.equal((await page.locator('[data-testid="report-verdict"]').innerText()).trim(), status);
      const expected = (await page.locator('[data-testid="report-sha"]').innerText()).trim();
      assert.match(expected, /^[a-f0-9]{64}$/);
      const complete = await page.locator('#report-markdown').textContent();
      assert.equal(sha256(complete), expected);
      const file = await download(action('download-report'));
      assert.equal(file.name, 'raven-shadow-acme-' + variant + '.md');
      assert.equal(file.sha256, expected); assert.equal(file.text, complete);
      assert.match(file.text, /SYNTHETIC EXAMPLE · INTERNAL DRAFT · NO RELEASE APPROVAL/);
      assert.match(file.text, /Native Quality and Queen acceptance: not performed/);
      assert.match(file.text, /## Unknowns/); assert.match(file.text, new RegExp('\\(' + variant + '\\)'));
      return {filename: file.name, sha256: file.sha256, text: complete};
    };
    await check('prototype_document_loads_with_honest_empty_state', async () => {
      await page.waitForSelector('html[data-demo-ready="true"]');
      assert.match(await page.title(), /Raven \+ Shadow/);
      assert.equal(await page.locator('#app').getAttribute('data-loaded'), 'false');
      assert.equal(await page.locator('#app').getAttribute('data-verdict'), 'NOT RUN');
      assert(await action('verify').isDisabled());
      assert.match(await page.locator('body').innerText(), /PUBLIC PROTOTYPE/);
      assert.match(await page.locator('body').innerText(), /No model calls/);
    }, true);
    await check('skip_link_is_keyboard_operable', async () => {
      await page.keyboard.press('Tab');
      assert.equal(await page.evaluate(() => document.activeElement.className), 'skip-link');
      await page.keyboard.press('Enter');
      assert(await page.evaluate(() => document.activeElement.id === 'main' || document.activeElement.tagName === 'H1'));
    });
    await check('empty_evidence_and_report_do_not_fabricate_results', async () => {
      for (const name of ['evidence', 'report']) { await route(name); assert.match(await page.locator('main').innerText(), /Load the fictional Acme source set/); }
      await route('dashboard');
    });
    await check('scope_dialog_requires_deliberate_fictional_selection', async () => {
      await action('open-scope').click(); assert(await page.locator('#scope-dialog').isVisible());
      assert(await action('confirm-load').isDisabled());
      assert.match(await page.locator('#scope-dialog').innerText(), /not production authentication or a real approval/);
      await page.locator('#sample-consent').check(); assert(await action('confirm-load').isEnabled());
      await page.locator('#sample-consent').uncheck(); assert(await action('confirm-load').isDisabled());
      await page.keyboard.press('Escape'); assert(!(await page.locator('#scope-dialog').isVisible()));
      assert.equal(await page.evaluate(() => document.activeElement.dataset.action), 'open-scope');
    });
    await check('dialog_cancel_close_and_backdrop_controls', async () => {
      await action('open-scope').click(); await page.getByRole('button', {name: 'Cancel', exact: true}).click();
      assert(!(await page.locator('#scope-dialog').isVisible()));
      await action('open-scope').click(); await page.getByRole('button', {name: 'Close sample intake'}).click();
      assert(!(await page.locator('#scope-dialog').isVisible()));
      await action('open-scope').click(); await page.mouse.click(3, 3);
      assert(!(await page.locator('#scope-dialog').isVisible()));
    });
    await check('sample_intake_loads_only_fictional_records', async () => {
      await load(); assert.equal(await page.locator('.source-row').count(), 3);
      assert.equal(await page.locator('#app').getAttribute('data-verdict'), 'NOT RUN');
      assert.match(await page.locator('#toast').innerText(), /No access grant or model call occurred/);
    }, true);
    await check('baseline_real_client_check_detects_false_completion', async () => {
      await action('verify').click(); await verdict('FAIL');
      assert.equal((await page.locator('[data-testid="outcome"]').innerText()).trim(), 'FAIL');
      assert.match(await page.locator('main').innerText(), /Completion not supported/);
      assert.match(await page.locator('main').innerText(), /presentation checker, not the native Shadow engine/);
    }, true);
    await screenshot('dashboard-desktop');
    console.log('SCREENSHOT_READY ' + path.relative(ROOT, path.join(SHOTS, 'dashboard-desktop.png')).split(path.sep).join('/'));
    await check('desktop_dashboard_has_no_document_overflow', noOverflow);
    await check('desktop_hides_mobile_navigation_toggle', async () => assert(!(await action('menu').isVisible())));
    let baselineReport;
    await check('baseline_report_download_is_hash_bound_and_unapproved', async () => {
      baselineReport = await reportDownload('baseline', 'FAIL');
      assert.match(baselineReport.text, /REQUIRED_STATE_NOT_OBSERVED_AT_DEADLINE/);
      await page.getByText('Inspect the complete downloadable Markdown', {exact: true}).click();
      assert(await page.locator('#report-markdown').isVisible());
      await page.getByText('Inspect the complete downloadable Markdown', {exact: true}).click();
      return {filename: baselineReport.filename, sha256: baselineReport.sha256};
    });
    await check('skip_link_preserves_the_active_report_route', async () => {
      await page.locator('.skip-link').focus(); await page.keyboard.press('Enter');
      assert.equal(await page.locator('#app').getAttribute('data-route'), 'report');
      assert.equal(await page.evaluate(() => document.activeElement.id), 'main');
    });
    await screenshot('report-desktop');
    await check('all_report_citations_resolve_exact_original_lines', async () => {
      await route('report');
      const links = await page.locator('a[data-citation]').evaluateAll(nodes => nodes.map(n => n.getAttribute('href')));
      assert.equal(links.length, 3);
      for (const href of links) {
        await page.locator('a[href="' + href + '"]').click();
        const [, source, lines] = href.slice(1).split('/');
        const [, start, end] = /^L(\d+)-L(\d+)$/.exec(lines);
        await page.waitForFunction(id => document.querySelector('[data-source="' + id + '"]')?.getAttribute('aria-pressed') === 'true', source);
        const cited = page.locator('.source-line.cited .line-text');
        assert.equal(await cited.count(), Number(end) - Number(start) + 1);
        assert(baselineReport.text.includes((await cited.allTextContents()).join('\n')));
        await route('report');
      }
      return {resolved_citations: links.length};
    });
    await check('all_source_downloads_preserve_exact_text_and_sha256', async () => {
      await route('evidence');
      const ids = await page.locator('[data-source]').evaluateAll(nodes => nodes.map(n => n.dataset.source));
      for (const id of ids) {
        await page.locator('[data-source="' + id + '"]').click();
        await page.waitForFunction(value => document.querySelector('[data-source="' + value + '"]').getAttribute('aria-pressed') === 'true', id);
        await page.locator('.fingerprint summary').click();
        const expected = (await page.locator('[data-testid="source-sha"]').innerText()).trim();
        const content = (await page.locator('.source-line .line-text').allTextContents()).join('\n');
        const file = await download(action('download-source'));
        assert.equal(file.sha256, expected); assert.equal(file.text, content);
        assert.equal(file.name, (await page.locator('.document-head h2').innerText()).trim());
        assert(baselineReport.text.includes(expected));
      }
      return {source_count: ids.length};
    });
    await check('source_search_is_live_keyboard_usable_and_preserves_originals', async () => {
      const original = (await page.locator('.source-line .line-text').allTextContents()).join('\n');
      await page.locator('#source-search').fill('req-101');
      assert((await page.locator('.source-lines mark').count()) > 0);
      assert.equal(await page.evaluate(() => document.activeElement.id), 'source-search');
      await page.locator('#source-search').fill('no-such-fixture-token');
      assert.equal(await page.locator('.source-lines mark').count(), 0);
      assert.match(await page.locator('#search-count').innerText(), /0 matching lines/);
      await page.locator('#source-search').fill('');
      assert.equal((await page.locator('.source-line .line-text').allTextContents()).join('\n'), original);
    });
    await route('report');
    await page.locator('a[data-citation="2"]').click();
    await page.locator('.fingerprint summary').click();
    await screenshot('evidence-desktop');
    for (const [id, expected] of [['satisfied', 'PASS'], ['missing', 'NOT ASSESSED'], ['stale', 'NOT ASSESSED']]) {
      await check(id + '_observation_invalidates_prior_report', async () => {
        await change(id); assert.equal(await page.locator('#app').getAttribute('data-verdict'), 'NOT RUN');
        await route('report'); assert.match(await page.locator('main').innerText(), /No check, no report/);
        assert.equal(await page.locator('[data-action="download-report"]').count(), 0);
      });
      await check(id + '_observation_produces_honest_verdict_and_report', async () => {
        await route('dashboard'); await action('verify').click(); await verdict(expected);
        assert.match(await page.locator('.variant-note').innerText(), /does not repair or replace the original/);
        const file = await reportDownload(id, expected);
        return {filename: file.filename, sha256: file.sha256, verdict: expected};
      });
    }
    await check('controlled_async_race_discards_stale_report', async () => {
      await change('baseline');
      await page.evaluate(() => {
        const original = crypto.subtle.digest.bind(crypto.subtle);
        window.restoreDemoDigest = () => Object.defineProperty(crypto.subtle, 'digest', {value: original, configurable: true});
        Object.defineProperty(crypto.subtle, 'digest', {configurable: true, value: async (...args) => {
          await new Promise(resolve => setTimeout(resolve, 100)); return original(...args);
        }});
      });
      try {
        await action('verify').click(); await page.locator('#observation-variant').selectOption('satisfied');
        await page.waitForTimeout(450); await readyCheck();
        assert.equal(await page.locator('#app').getAttribute('data-variant'), 'satisfied');
        assert.equal(await page.locator('#app').getAttribute('data-verdict'), 'NOT RUN');
      } finally { await page.evaluate(() => { window.restoreDemoDigest(); delete window.restoreDemoDigest; }); }
      await action('verify').click(); await verdict('PASS');
      return 'Actual SHA-256 operations delayed by 100 ms to exercise the presentation generation fence; no digest or outcome fabricated.';
    });
    await check('reloading_sample_resets_results_and_original_observation', async () => {
      await load(); assert.equal(await page.locator('#app').getAttribute('data-variant'), 'baseline');
      assert.equal(await page.locator('#app').getAttribute('data-verdict'), 'NOT RUN');
      await action('verify').click(); await verdict('FAIL');
    });
    await check('timeline_labels_separate_synthetic_history_from_verified_replay', async () => {
      await route('timeline');
      assert.match(await page.locator('.notice').innerText(), /Synthetic example/);
      assert.match(await page.locator('.notice').innerText(), /Verified event replay is unavailable/);
      assert.match(await page.locator('.notice').innerText(), /no workers, model calls or verification/);
      assert.equal(await page.locator('[data-step]').count(), 5);
    });
    await check('every_timeline_step_reveals_its_labeled_content', async () => {
      for (let i = 0; i < 5; i++) {
        await page.locator('[data-step="' + i + '"]').click();
        assert.match(await page.locator('.progress-label').innerText(), new RegExp('^' + (i + 1) + ' / 5'));
        assert.equal(await page.locator('.timeline-item.revealed').count(), i + 1);
      }
      await action('reset-replay').click(); await action('step').click();
      assert.match(await page.locator('.progress-label').innerText(), /^1 \/ 5/);
    });
    await check('replay_play_pause_resume_complete_reset_are_real_controls', async () => {
      await action('reset-replay').click(); await action('play').click();
      await action('pause').click(); const held = await page.locator('.progress-label').innerText();
      await page.waitForTimeout(1650); assert.equal(await page.locator('.progress-label').innerText(), held);
      await action('play').click();
      await page.waitForFunction(() => document.querySelector('.progress-label')?.textContent.startsWith('5 / 5'), null, {timeout: 8000});
      assert(await action('play').isDisabled()); assert(await action('step').isDisabled());
      await action('reset-replay').click(); assert.match(await page.locator('.progress-label').innerText(), /^0 \/ 5/);
      assert.equal(await page.locator('#app').getAttribute('data-verdict'), 'FAIL');
    });
    await check('leaving_timeline_stops_the_owned_replay_timer', async () => {
      await action('play').click(); const held = await page.locator('.progress-label').innerText();
      await route('dashboard'); await page.waitForTimeout(1650); await route('timeline');
      assert.equal(await page.locator('.progress-label').innerText(), held);
      assert.equal(await page.locator('[data-action="pause"]').count(), 0);
    });
    await check('all_colony_nodes_are_inspectable_without_fake_activity', async () => {
      await route('colony'); assert.match(await page.locator('.notice').innerText(), /no live workers/);
      const nodes = await page.locator('[data-node]').evaluateAll(nodes => nodes.map(n => ({id: n.dataset.node, name: n.querySelector('strong').textContent})));
      assert(nodes.length >= 6);
      for (const node of nodes) {
        await page.locator('[data-node="' + node.id + '"]').click();
        assert.equal(await page.locator('.node-detail h2').innerText(), node.name);
        assert.equal(await page.locator('[data-node="' + node.id + '"]').getAttribute('aria-pressed'), 'true');
      }
      await page.locator('[data-node="shadow"]').focus(); await page.keyboard.press('Enter');
      assert.equal(await page.locator('.node-detail h2').innerText(), 'Shadow');
      assert.equal(await page.evaluate(() => document.activeElement.dataset.node), 'shadow');
      return {node_count: nodes.length};
    });
    await screenshot('colony-desktop');
    await check('colony_links_to_the_selected_illustrative_stage', async () => {
      await action('node-timeline').click();
      await page.waitForFunction(() => document.querySelector('#app').dataset.route === 'timeline');
      assert.match(await page.locator('.progress-label').innerText(), /^3 \/ 5/);
    });
    await check('architecture_and_roadmap_preserve_canonical_and_future_boundaries', async () => {
      await route('architecture'); const architecture = await page.locator('main').innerText();
      assert.match(architecture, /One brain\. Separate assurance/); assert.match(architecture, /No backend, agent orchestration or second Store/);
      assert.match(architecture, /Archive protects originals/); assert.match(architecture, /Recursive workers/);
      await route('roadmap'); const roadmap = await page.locator('main').innerText();
      for (const label of ['Verified event replay', 'Synthetic example', 'Unverified AI claim', 'Independently checked outcome', 'Future functionality']) assert(roadmap.includes(label));
      assert.match(roadmap, /UNAVAILABLE/); assert.match(roadmap, /NOT IMPLEMENTED HERE/);
      for (const href of ['docs/PRODUCT_BLUEPRINT.md', 'docs/REQUIREMENTS.md']) {
        const response = await context.request.get(origin + '/' + href); assert.equal(response.status(), 200); assert.match(await response.text(), /^# /);
      }
    });
    await check('all_desktop_routes_have_accessible_names_and_current_navigation', async () => {
      for (const name of ['dashboard', 'evidence', 'timeline', 'colony', 'report', 'architecture', 'roadmap']) {
        await route(name); assert.equal(await page.locator('main h1').count(), 1);
        assert.equal(await page.locator('.nav-list a[aria-current="page"]').getAttribute('href'), '#' + name);
        const unnamed = await page.locator('button:not([disabled]),input,select').evaluateAll(nodes => nodes.filter(n => n.getClientRects().length && !n.closest('[inert]') && !(n.getAttribute('aria-label') || n.textContent.trim() || [...(n.labels || [])].some(l => l.textContent.trim()))).map(n => n.outerHTML));
        assert.deepEqual(unnamed, []); await noOverflow();
      }
    });
    await check('tablet_layout_and_navigation', async () => {
      await page.setViewportSize({width: 768, height: 1024}); await route('architecture'); await noOverflow();
      assert.equal(await page.locator('.architecture-level').count(), 5);
    });
    await screenshot('architecture-tablet');
    await check('mobile_navigation_excludes_hidden_sidebar_and_every_page_fits', async () => {
      await page.setViewportSize({width: 390, height: 844});
      await page.waitForFunction(() => document.querySelector('.sidebar').hasAttribute('inert'));
      assert.equal(await action('menu').getAttribute('aria-expanded'), 'false');
      await action('menu').focus(); await page.keyboard.press('Enter');
      assert.equal(await action('menu').getAttribute('aria-expanded'), 'true');
      assert.equal(await page.locator('.sidebar').getAttribute('inert'), null);
      assert(await page.evaluate(() => !!document.activeElement.closest('.sidebar')));
      await page.keyboard.press('Escape');
      assert.equal(await action('menu').getAttribute('aria-expanded'), 'false');
      assert.equal(await page.evaluate(() => document.activeElement.dataset.action), 'menu');
      await page.keyboard.press('Enter'); await action('close-menu').click();
      assert.equal(await action('menu').getAttribute('aria-expanded'), 'false');
      for (const name of ['dashboard', 'evidence', 'timeline', 'colony', 'report', 'architecture', 'roadmap']) {
        await route(name); await noOverflow();
        assert.equal(await action('menu').getAttribute('aria-expanded'), 'false');
        assert(await page.locator('.sidebar').evaluate(n => n.inert));
      }
      await route('dashboard');
    });
    await screenshot('dashboard-mobile');
    await check('reduced_motion_disables_decorative_motion', async () => {
      await page.emulateMedia({reducedMotion: 'reduce'}); await route('colony');
      const moving = await page.locator('body *').evaluateAll(nodes => nodes.filter(n => {
        const s = getComputedStyle(n); return s.animationName !== 'none' || s.transitionDuration.split(',').some(value => parseFloat(value) > 0);
      }).map(n => n.className));
      assert.deepEqual(moving, []);
    });
    await check('deep_links_and_refresh_do_not_invent_persisted_evidence', async () => {
      await page.goto(origin + '/#evidence/observation/L3-L5', {waitUntil: 'networkidle'});
      await page.reload({waitUntil: 'networkidle'});
      await page.waitForSelector('html[data-demo-ready="true"]');
      assert.equal(await page.locator('#app').getAttribute('data-loaded'), 'false');
      assert.equal(await page.locator('#app').getAttribute('data-verdict'), 'NOT RUN');
      assert.match(await page.locator('main').innerText(), /Load the fictional Acme source set/);
    });
    await check('no_uncaught_browser_errors', async () => assert.deepEqual(report.page_errors, []));
    await check('no_external_app_requests', async () => assert.deepEqual(report.external_requests, []));
    await check('no_backend_writes_or_websockets', async () => { assert.deepEqual(report.non_read_requests, []); assert.deepEqual(report.websockets, []); });
    report.status = report.checks.some(c => c.status === 'FAIL') ? 'FAIL' : 'PASS';
    if (report.status === 'FAIL') process.exitCode = 1;
  } catch (error) {
    report.status = 'FAIL'; report.error = String(error.message).split(ROOT).join('<public-repository>');
    if (page) await screenshot('failure').catch(() => {});
    process.exitCode = 1;
  } finally {
    if (context) await context.close();
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
    report.finished_at = new Date().toISOString();
    fs.writeFileSync(path.join(OUTPUT, 'browser-results.json'), JSON.stringify(report, null, 2) + '\n');
    console.log(JSON.stringify({status: report.status, checks: report.checks.length, failed: report.checks.filter(c => c.status === 'FAIL'), screenshots: report.screenshots.length}, null, 2));
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
