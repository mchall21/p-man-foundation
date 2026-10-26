import { escapeXML, formatDays, sunrisePositions } from './good-day-art';
import type { DayArtwork } from './good-day-art';

/** Print-only weekly treatment. It is deliberately not imported by the site. */
export function weeklyMarks(art: DayArtwork) {
  return sunrisePositions(Math.ceil(art.total / 7)).map((point, index) => {
    const members = art.dots.slice(index * 7, index * 7 + 7);
    return { ...point, id: `week-${index + 1}`, days: members.length, memberIds: members.map(dot => dot.id) };
  });
}

export function kidsArtworkSVG(art: DayArtwork): string {
  const marks = weeklyMarks(art);
  const fullWeeks = Math.floor(art.total / 7), remainder = art.total % 7;
  const caption = `${formatDays(fullWeeks)} good weeks${remainder ? ` + ${remainder} good ${remainder === 1 ? 'day' : 'days'}` : ''}.`;
  const shapes = marks.map(mark => {
    const title = `<title>${escapeXML(mark.id)}: ${mark.days} good days</title>`;
    const attrs = `id="${mark.id}" data-unit-days="${mark.days}"`;
    if (mark.days === 7) return `<circle ${attrs} cx="${mark.x}" cy="${mark.y}" r="${mark.radius}" fill="${mark.color}">${title}</circle>`;
    const angle = mark.days / 7 * Math.PI * 2 - Math.PI / 2;
    const endX = mark.x + mark.radius * Math.cos(angle), endY = mark.y + mark.radius * Math.sin(angle);
    return `<g ${attrs}>${title}<circle cx="${mark.x}" cy="${mark.y}" r="${mark.radius}" fill="none" stroke="${mark.color}" stroke-width="0.65"/><path fill="${mark.color}" d="M ${mark.x} ${mark.y} L ${mark.x} ${mark.y - mark.radius} A ${mark.radius} ${mark.radius} 0 ${mark.days > 3.5 ? 1 : 0} 1 ${endX} ${endY} Z"/></g>`;
  }).join('');
  const metadata = escapeXML(JSON.stringify({ totalGoodDays: art.total, fullWeeks, remainderDays: remainder, fetchedAt: art.fetchedAt,
    unit: 'One full dot represents seven estimated participant-days. The final partial dot represents the remaining days. These are cumulative good weeks, not calendar weeks or a continuous recovery streak.',
    source: 'https://www.pmanfoundation.org/api/grants', marks,
  }));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="8in" height="8in" viewBox="0 0 1000 1000" data-total-good-days="${art.total}" data-full-weeks="${fullWeeks}" data-remainder-days="${remainder}">
  <title>P-Man kids shirt: ${escapeXML(caption)}</title><metadata>${metadata}</metadata>
  <g id="good-week-dots">${shapes}</g>
  <g fill="#102f45" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif">
    <text x="500" y="660" font-size="76" font-weight="700" letter-spacing="-2">${formatDays(fullWeeks)} Good Weeks</text>
    <text x="500" y="750" font-size="58">And Counting</text>
  </g></svg>`;
}

export function frontMarkSVG(widthInches: number): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${widthInches}in" height="${widthInches}in" viewBox="0 0 500 500">
  <title>P-Man Foundation 2026 front bicycle mark</title>
  <g fill="none" stroke="#102f45" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="165" cy="220" r="54"/><circle cx="335" cy="220" r="54"/>
    <path d="M165 220 L218 135 L258 220 Z L309 135 H218 M258 220 L212 120 M193 120 H230 M335 220 L306 122 H332 Q352 122 348 142"/>
    <circle cx="258" cy="220" r="10"/><path d="M258 220 L270 236 H282"/>
  </g>
  <g fill="#102f45" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif">
    <text x="250" y="342" font-size="67" font-weight="700">P-MAN</text>
    <text x="250" y="382" font-size="25" letter-spacing="6">FOUNDATION</text>
    <text x="250" y="421" font-size="23" letter-spacing="5">2026</text>
  </g></svg>`;
}
