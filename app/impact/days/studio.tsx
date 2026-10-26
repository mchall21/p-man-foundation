'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { artworkSVG, buildDayArtwork, formatDays } from '@/lib/good-day-art';
import type { DayArtwork } from '@/lib/good-day-art';
import styles from './studio.module.css';

function download(name: string, body: string, type: string) {
  const url = URL.createObjectURL(new Blob([body], { type }));
  const link = document.createElement('a');
  link.href = url; link.download = name;
  document.body.appendChild(link); link.click(); link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function DayStudio() {
  const [art, setArt] = useState<DayArtwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [dotInput, setDotInput] = useState('');
  const [lookupError, setLookupError] = useState('');
  const controller = useRef<AbortController | null>(null);

  const load = useCallback(async (refresh = false) => {
    controller.current?.abort();
    const request = new AbortController();
    controller.current = request;
    setLoading(true); setError('');
    const timeout = window.setTimeout(() => request.abort(new Error('Request timed out. Please try again.')), 25000);
    try {
      const response = await fetch(`/api/grants${refresh ? '?refresh=1' : ''}`, { signal: request.signal, cache: 'no-store' });
      if (!response.ok) throw new Error('The grant data is unavailable. Please try again.');
      const next = buildDayArtwork(await response.json());
      if (controller.current !== request) return;
      setArt(next); setSelected(null); setDotInput(''); setLookupError('');
    } catch (cause) {
      if (controller.current !== request) return;
      setError(cause instanceof Error ? cause.message : 'Could not load the grant data.');
      // Retain the last successful snapshot, visibly marked; never fabricate zeros.
    } finally {
      window.clearTimeout(timeout);
      if (controller.current === request) setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    return () => { controller.current?.abort(); controller.current = null; };
  }, [load]);

  const svg = useMemo(() => art ? artworkSVG(art) : '', [art]);
  const svgContent = useMemo(() => ({ __html: svg }), [svg]);
  const dot = selected === null ? null : art?.dots[selected];
  const grant = dot ? art?.grants[dot.grantIndex] : null;

  function selectDot(index: number) {
    if (!art || !Number.isInteger(index) || index < 0 || index >= art.total) return;
    setSelected(index); setDotInput(String(index + 1)); setLookupError('');
  }

  return <div className={styles.studio}>
    <header className={styles.heading}>
      <div><p className="eyebrow">P-Man / Artwork studio</p><h1>One dot. One good day.</h1>
        <p>The same grant data. Every day accounted for.</p></div>
      <div className={styles.actions}>
        <button className="button-secondary" disabled={loading} onClick={() => void load(true)}>{loading ? 'Loading grants…' : 'Refresh data'}</button>
        <button className="button-primary" disabled={!art || loading || !!error || art.total === 0} onClick={() => {
          if (art) download(`pman-${art.total}-good-days.svg`, svg, 'image/svg+xml');
        }}>Download artwork</button>
      </div>
    </header>

    {error && <div role="alert" className={styles.error}>{error} {art ? 'Showing the last successful snapshot. Refresh before exporting.' : 'No artwork has been generated.'}</div>}
    {!art && loading && <p role="status" className={styles.loading}>Reading the grant records and counting the days…</p>}
    {art && <div className={styles.layout}>
      <section className={styles.preview} aria-label="Artwork preview">
        <div className={styles.toolbar}>
          <span>{formatDays(art.dots.length)} dots · {formatDays(art.total)} good days</span>
          <div className={styles.zoom}><label htmlFor="art-zoom">Zoom</label><select id="art-zoom" value={zoom} onChange={event => setZoom(Number(event.target.value))}>
            <option value={1}>Fit</option><option value={2}>2×</option><option value={4}>4×</option>
          </select></div>
        </div>
        <div className={styles.viewport}>
          {art.total ? <div className={styles.art} style={{ width: `${zoom * 100}%` }}
            onClick={event => {
              const target = (event.target as Element).closest('[data-dot-index]');
              if (target) selectDot(Number(target.getAttribute('data-dot-index')));
            }} dangerouslySetInnerHTML={svgContent} /> : <p className={styles.loading}>No good days are recorded yet. Grants without estimates are not drawn as dots.</p>}
        </div>
        {dot && <style>{`#good-day-dots [data-dot-index="${dot.index}"] { fill: #c45825; stroke: #c45825; stroke-width: 2; }`}</style>}
        <p className={styles.hint}>Every dot has a grant behind it. Tap one, or choose a day number.</p>
      </section>

      <aside className={styles.inspector} aria-label="Explore the dots">
        <p className="eyebrow">Behind the dots</p>
        <h2>{formatDays(art.total)} good days.</h2>
        <p>One dot for each day in the source. Gold and navy dots have the same value.</p>
        {art.total > 0 && <>
          <label className={styles.label} htmlFor="grant-picker">Explore a grant</label>
          <select id="grant-picker" className={styles.select} value={grant?.id ?? ''} onChange={event => {
            const next = art.grants.find(item => item.id === event.target.value);
            if (next) selectDot(next.firstDot); else { setSelected(null); setDotInput(''); }
          }}><option value="">Choose a grant</option>{art.grants.map(item => <option key={item.id} value={item.id}>{item.source.year ?? 'Undated'} · {item.source.grantee} · {formatDays(item.count)} days</option>)}</select>
          <form onSubmit={event => {
            event.preventDefault();
            const number = Number(dotInput);
            if (!Number.isInteger(number) || number < 1 || number > art.total) { setLookupError(`Enter a day from 1 to ${formatDays(art.total)}.`); return; }
            selectDot(number - 1);
          }}>
            <label className={styles.label} htmlFor="day-number">Or find a day</label>
            <div className={styles.lookup}><input id="day-number" inputMode="numeric" type="number" min={1} max={art.total} step={1} value={dotInput} onChange={event => setDotInput(event.target.value)} placeholder={`1 to ${formatDays(art.total)}`} /><button type="submit">Find</button></div>
            {lookupError && <p role="alert">{lookupError}</p>}
          </form>
        </>}
        <div className={styles.detail} aria-live="polite" aria-atomic="true">
          {dot && grant ? <>
            <p className="eyebrow">Good day {formatDays(dot.index + 1)}</p>
            <h3>{grant.source.grantee}</h3>
            <p>{grant.source.year ?? 'Year not recorded'} · Day {formatDays(dot.dayInGrant)} of {formatDays(grant.count)}</p>
            <p>{grant.source.description || 'No activity description recorded.'}</p>
            <small>This dot represents one unit of this grant&apos;s participation estimate.</small>
            <div className={styles.steps}><button disabled={dot.index === 0} onClick={() => selectDot(dot.index - 1)}>← Previous day</button><button disabled={dot.index === art.total - 1} onClick={() => selectDot(dot.index + 1)}>Next day →</button></div>
            <details><summary>Dot label</summary><code>{dot.id}</code></details>
          </> : <p>Select a dot to see its grant, activity and place in the count.</p>}
        </div>
        <details className={styles.method}><summary>How the count works</summary>
          <p>Each dot is one participant-day from the foundation&apos;s grant records. These are estimates of participation, not identified people, dated attendance records or clinical outcomes.</p>
          <p>{art.grants.length} grants contribute dots. {art.missingEstimates} {art.missingEstimates === 1 ? 'grant has' : 'grants have'} no day estimate and {art.missingEstimates === 1 ? 'is' : 'are'} excluded from the pattern.</p>
          <p>Data loads when you open this page. Refresh data reads the source again. The count and artwork update together. Exports freeze the displayed snapshot.</p>
          <p>Dot IDs combine the grant identity with a day number. They survive changes to the day count; corrections to a grant&apos;s name, year, date, amount or description change its identity.</p>
          <p>SVG exports retain every dot and label. Text remains editable; a printer should outline fonts and check the final dot size.</p>
          <Link href="/impact#grant-database">View the grant records →</Link>
        </details>
        <p className={styles.timestamp}>Source fetched {new Date(art.fetchedAt).toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'medium', timeStyle: 'short' })} ET</p>
        <button className={styles.textButton} disabled={loading || !!error || art.total === 0} onClick={() => download(`pman-${art.total}-dot-index.json`, JSON.stringify(art, null, 2), 'application/json')}>Download dot labels</button>
      </aside>
    </div>}
  </div>;
}
