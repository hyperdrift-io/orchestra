/** Recorded local rehearsal, not live telemetry or a production result. */
export function IntelUiLoop() {
  return <section data-visual="intel-ui" aria-label="Stack One local recovery test">
    <header><p>STACK ONE · LOCAL TEST · 24 OCTOBER 2026</p><h3>Previous release restored</h3></header>
    <ol data-intel-checks="">
      <li><span>CHECK 1</span><div><strong>Broken content detected</strong><p>The running release failed its content check.</p></div></li>
      <li><span>CHECK 2</span><div><strong>Still failing</strong><p>Thirty seconds later. One more failure triggers the rule.</p></div></li>
      <li><span>CHECK 3</span><div><strong>Rollback completed</strong><p>The retained release is serving. Nginx response verified.</p></div></li>
    </ol>
    <p data-intel-result="">The recovery policy performed the repair. No dashboard action or model call.</p>
    <footer>Recorded on a local test server, not in production. <a href="/articles/integrated-fleet/local-recovery.json" download>Read the test record ↓</a></footer>
  </section>;
}
