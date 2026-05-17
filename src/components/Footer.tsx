export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        position: 'relative',
        paddingBlock: 'var(--sp-l) var(--sp-m)',
        borderBlockStart: '1px solid var(--line-hair)',
      }}
    >
      <div className="staff" style={{ insetBlockStart: 0, transform: 'translateY(-50%)', background: 'var(--ink)' }} aria-hidden />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'var(--sp-m)',
          alignItems: 'start',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--fs-h3)',
              color: 'var(--cream)',
              letterSpacing: '-0.018em',
            }}
          >
            Orchestra <em style={{ color: 'var(--vermillion)', fontStyle: 'italic' }}>AI</em>
          </p>
          <p className="meta" style={{ marginBlockStart: 'var(--sp-xs)', color: 'var(--cream-3)' }}>
            Agent orchestration · Production AI
          </p>
        </div>

        <div>
          <p className="meta" style={{ color: 'var(--cream-3)' }}>Studio</p>
          <p style={{ marginBlockStart: 'var(--sp-2xs)' }}>
            <a href="https://hyperdrift.io">Hyperdrift</a>
          </p>
        </div>

        <div>
          <p className="meta" style={{ color: 'var(--cream-3)' }}>Contact</p>
          <p style={{ marginBlockStart: 'var(--sp-2xs)' }}>
            <a href="#contact">Start a project</a>
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--sp-xs)' }}>
          <p className="meta" style={{ color: 'var(--cream-3)' }}>Now playing</p>
          <div className="equalizer" aria-hidden>
            <i /><i /><i /><i /><i />
          </div>
        </div>
      </div>

      <hr className="hair" style={{ marginBlock: 'var(--sp-l) var(--sp-s)' }} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 'var(--sp-s)',
          flexWrap: 'wrap',
        }}
      >
        <p className="meta" style={{ color: 'var(--cream-3)' }}>
          © {year} Orchestra AI · An offspring of Hyperdrift
        </p>
        <p className="meta" style={{ color: 'var(--cream-3)' }}>
          Op. 01 · MMXXVI
        </p>
      </div>
    </footer>
  );
}
