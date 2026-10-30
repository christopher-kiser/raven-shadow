/* Read-only browser smoke check of the published public prototype.
 * Requires an existing Playwright module and installed Edge/Chromium.
 * Does not deploy, install packages, contact the native engine or change hosting.
 */
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const ROOT = path.resolve(__dirname, '..');
const TARGET = 'https://christopher-kiser.github.io/raven-shadow/';
const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex');

function installedPlaywright() {
  if (process.env.PLAYWRIGHT_MODULE) return require(process.env.PLAYWRIGHT_MODULE);
  try { return require('playwright-core'); }
  catch {
    const bundled = path.resolve(path.dirname(process.execPath), '..', 'node_modules', 'playwright-core');
    if (fs.existsSync(bundled)) return require(bundled);
    throw new Error('Set PLAYWRIGHT_MODULE to an existing installation. No automatic installation is performed.');
  }
}

async function main() {
  const result = {suite: 'published-public-prototype-smoke', url: TARGET,
    started_at: new Date().toISOString(), checks: [], assets: [],
    proof_boundary: 'Published fictional browser demonstration only. No native engine, model call, customer investigation or approval is exercised.'};
  let browser, context, stage = 'browser_launch';
  const check = async (name, action) => {
    stage = name;
    const detail = await action();
    result.checks.push({name, status: 'PASS', ...(detail ? {detail} : {})});
  };
  try {
    const executable = process.env.BROWSER_EXECUTABLE || path.join(
      process.env['PROGRAMFILES(X86)'] || 'C:\\Program Files (x86)', 'Microsoft', 'Edge', 'Application', 'msedge.exe');
    browser = await installedPlaywright().chromium.launch({executablePath: executable,
      headless: true, args: ['--disable-background-networking', '--disable-component-update', '--disable-sync', '--no-first-run']});
    result.browser_version = browser.version();
    context = await browser.newContext({viewport: {width: 1440, height: 1000}, acceptDownloads: true});
    await check('hosted_assets_match_public_repository_bytes', async () => {
      for (const relative of ['index.html', 'demo/app.js', 'demo/acme.js', 'demo/styles.css', 'demo/mark.svg']) {
        const response = await context.request.get(new URL(relative, TARGET).href);
        assert.equal(response.status(), 200, relative + ' must load');
        const bytes = await response.body();
        const fingerprint = sha256(bytes);
        assert.equal(fingerprint, sha256(fs.readFileSync(path.join(ROOT, relative))), relative + ' must match reviewed source');
        result.assets.push({path: relative, status: response.status(), sha256: fingerprint});
      }
    });
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    const errors = [], external = [], writes = [], sockets = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('websocket', socket => sockets.push(socket.url()));
    page.on('request', request => {
      if (!['GET', 'HEAD'].includes(request.method())) writes.push(request.method());
      if (/^https?:/.test(request.url()) && !request.url().startsWith(TARGET)) external.push(request.url());
    });
    const action = name => page.locator('[data-action="' + name + '"]').first();
    await check('published_document_loads', async () => {
      const response = await page.goto(TARGET, {waitUntil: 'networkidle'});
      assert.equal(response.status(), 200);
      await page.waitForSelector('html[data-demo-ready="true"]');
      assert.equal(await page.locator('#app').getAttribute('data-loaded'), 'false');
      assert.match(await page.title(), /Raven \+ Shadow/);
    });
    await check('sample_intake_and_fictional_discrepancy_check', async () => {
      await action('open-scope').click();
      assert(await action('confirm-load').isDisabled());
      await page.locator('#sample-consent').check();
      await action('confirm-load').click();
      await page.waitForFunction(() => document.querySelector('#app').dataset.loaded === 'true');
      await page.waitForFunction(() => !document.querySelector('[data-action="verify"]').disabled);
      await action('verify').click();
      await page.waitForFunction(() => document.querySelector('#app').dataset.verdict === 'FAIL');
      assert.equal(await page.locator('#app').getAttribute('data-variant'), 'baseline');
      assert.match(await page.locator('body').innerText(), /SYNTHETIC EXAMPLE/);
      return {fictional_outcome: 'FAIL', real_model_calls: 0};
    });
    await check('downloaded_report_matches_visible_report_and_sha256', async () => {
      await page.locator('.nav-list a[href="#report"]').click();
      await page.waitForFunction(() => document.querySelector('#app').dataset.route === 'report');
      const markdown = await page.locator('#report-markdown').textContent();
      const expected = (await page.locator('[data-testid="report-sha"]').innerText()).trim();
      const pending = page.waitForEvent('download');
      await action('download-report').click();
      const download = await pending;
      const bytes = fs.readFileSync(await download.path());
      assert.equal(bytes.toString('utf8'), markdown);
      assert.equal(sha256(bytes), expected);
      assert.equal(download.suggestedFilename(), 'raven-shadow-acme-baseline.md');
      assert.match(markdown, /SYNTHETIC EXAMPLE · INTERNAL DRAFT · NO RELEASE APPROVAL/);
      assert.match(markdown, /Native Quality and Queen acceptance: not performed/);
      return {filename: download.suggestedFilename(), sha256: expected};
    });
    await check('published_citation_resolves_original_source_lines', async () => {
      const link = page.locator('a[data-citation]').first();
      const href = await link.getAttribute('href');
      const match = href.match(/^#evidence\/([^/]+)\/L(\d+)-L(\d+)$/);
      assert(match);
      await link.click();
      await page.waitForFunction(() => document.querySelector('#app').dataset.route === 'evidence');
      assert.equal(new URL(page.url()).hash, href);
      const lines = await page.locator('.source-line.cited').evaluateAll(nodes => nodes.map(node => Number(node.dataset.line)));
      assert.deepEqual(lines, Array.from({length: Number(match[3]) - Number(match[2]) + 1}, (_, index) => Number(match[2]) + index));
    });
    await check('published_mobile_navigation_and_layout', async () => {
      await page.setViewportSize({width: 390, height: 844});
      assert(await page.locator('.sidebar').evaluate(node => node.inert));
      await action('menu').click();
      assert.equal(await action('menu').getAttribute('aria-expanded'), 'true');
      await action('close-menu').click();
      assert(await action('menu').evaluate(node => document.activeElement === node));
      await action('menu').click();
      await page.locator('.nav-list a[href="#architecture"]').click();
      await page.waitForFunction(() => document.querySelector('#app').dataset.route === 'architecture');
      assert(await page.locator('.sidebar').evaluate(node => node.inert));
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      return {width: 390, height: 844};
    });
    await check('no_page_errors_external_app_requests_backend_writes_or_sockets', async () => {
      assert.deepEqual(errors, []); assert.deepEqual(external, []);
      assert.deepEqual(writes, []); assert.deepEqual(sockets, []);
      return {page_errors: 0, external_app_requests: 0, backend_writes: 0, websockets: 0};
    });
    result.status = 'PASS';
  } catch (error) {
    result.status = 'FAIL';
    result.checks.push({name: stage, status: 'FAIL', error: error.message.split('\n')[0].replaceAll(ROOT, '<public-repository>')});
    process.exitCode = 1;
  } finally {
    if (context) await context.close();
    if (browser) await browser.close();
    result.finished_at = new Date().toISOString();
    fs.writeFileSync(path.join(ROOT, 'tests', 'public-smoke-results.json'), JSON.stringify(result, null, 2) + '\n');
    console.log(JSON.stringify({status: result.status, checks: result.checks.length, url: TARGET, failed: result.checks.filter(check => check.status === 'FAIL')}, null, 2));
  }
}

main().catch(error => { console.error(error.message); process.exitCode = 1; });
