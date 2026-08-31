export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="staff" aria-hidden />

      <div>
        <div>
          <p className="wordmark">
            Orchestra <em>AI</em>
          </p>
          <p className="meta">Agent orchestration · Production AI</p>
        </div>

        <div>
          <p className="meta">Studio</p>
          <p>
            <a href="https://hyperdrift.io">Hyperdrift</a>
          </p>
        </div>

        <div>
          <p className="meta">Doctrine</p>
          <ul>
            <li>
              <a href="https://hyperdrift.io/blog/the-fleet-watches-itself-posthog-signals">
                The Fleet Watches Itself
              </a>
            </li>
            <li>
              <a href="https://hyperdrift.io/blog/agents-vs-automation">
                Agents vs Automation
              </a>
            </li>
            <li>
              <a href="https://hyperdrift.io/blog/the-cdn-you-already-own">
                Our 60-Line Trade Secret
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="meta">Contact</p>
          <p>
            <a href="#contact">Start a project</a>
          </p>
        </div>

        <div>
          <p className="meta">Now playing</p>
          <div className="equalizer" aria-hidden>
            <i /><i /><i /><i /><i />
          </div>
        </div>
      </div>

      <hr className="hair" />

      <div>
        <p className="meta">© {year} Orchestra AI · An offspring of Hyperdrift</p>
        <p className="meta">Op. 01 · MMXXVI</p>
      </div>
    </footer>
  );
}
