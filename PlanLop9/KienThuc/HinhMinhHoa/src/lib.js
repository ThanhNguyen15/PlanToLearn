// Thư viện vẽ SVG dùng chung cho PlanLop9/KienThuc/HinhMinhHoa
const C = {
  ink: '#1f2937', soft: '#6b7280', line: '#334155', grid: '#e5e7eb', bg: '#ffffff', panel: '#f8fafc',
  red: '#e4572e', orange: '#f59e0b', blue: '#2563eb', green: '#059669', purple: '#7c3aed', teal: '#0d9488', pink: '#db2777', brown: '#92400e',
  fRed: '#fde2da', fOrange: '#fef3c7', fBlue: '#dbeafe', fGreen: '#d1fae5', fPurple: '#ede9fe', fTeal: '#ccfbf1', fPink: '#fce7f3', fGray: '#f1f5f9', fBrown: '#fde68a',
};
const FONT = 'Segoe UI, Arial, sans-serif';
const r1 = (x) => Math.round(x * 10) / 10;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const ARROW_COLORS = ['ink', 'red', 'blue', 'green', 'orange', 'purple', 'soft', 'teal', 'pink', 'brown'];

function svg(w, h, title, body, opts = {}) {
  const defs = ARROW_COLORS.map((k) =>
    `<marker id="ah-${k}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C[k]}"/></marker>`).join('');
  const top = title ? 44 : 0;
  const H = h + top;
  const head = title
    ? `<text x="${w / 2}" y="28" text-anchor="middle" font-size="18" font-weight="700" fill="${C.ink}">${esc(title)}</text>`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${H}" width="${w}" height="${H}" font-family="${FONT}">
<defs>${defs}</defs>
<rect x="0" y="0" width="${w}" height="${H}" rx="12" fill="${opts.bg || C.bg}" stroke="${C.grid}"/>
${head}
<g transform="translate(0,${top})">
${body}
</g>
</svg>
`;
}

const col = (c) => C[c] || c;
function line(x1, y1, x2, y2, o = {}) {
  const c = col(o.c || 'ink');
  const ah = o.arrow ? ` marker-end="url(#ah-${o.c || 'ink'})"` : '';
  const as = o.arrowStart ? ` marker-start="url(#ah-${o.c || 'ink'})"` : '';
  return `<line x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2)}" y2="${r1(y2)}" stroke="${c}" stroke-width="${o.w || 2}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}${ah}${as} stroke-linecap="round"/>`;
}
const arrow = (x1, y1, x2, y2, o = {}) => line(x1, y1, x2, y2, { ...o, arrow: true });
function text(x, y, s, o = {}) {
  const lines = String(s).split('\n');
  const size = o.size || 14;
  const anchor = o.anchor || 'middle';
  const tsp = lines.map((ln, i) => `<tspan x="${r1(x)}" dy="${i === 0 ? 0 : size * 1.25}">${esc(ln) || ' '}</tspan>`).join('');
  return `<text x="${r1(x)}" y="${r1(y)}" text-anchor="${anchor}" font-size="${size}" fill="${col(o.c || 'ink')}"${o.bold ? ' font-weight="700"' : ''}${o.italic ? ' font-style="italic"' : ''}>${tsp}</text>`;
}
function rect(x, y, w, h, o = {}) {
  return `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" rx="${o.rx ?? 8}" fill="${col(o.fill || 'none')}" stroke="${col(o.c || 'line')}" stroke-width="${o.w ?? 1.5}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}/>`;
}
// hộp có chữ ở giữa
function box(x, y, w, h, s, o = {}) {
  const n = String(s).split('\n').length;
  const size = o.size || 14;
  const left = o.align ? o.align === 'start' : n >= 4; // khung nhiều dòng: căn trái cho dễ đọc
  const tx = left ? x + 16 : x + w / 2;
  return rect(x, y, w, h, o) + text(tx, y + h / 2 - ((n - 1) * size * 1.25) / 2 + size * 0.35, s, { size, c: o.tc || 'ink', bold: o.bold, anchor: left ? 'start' : 'middle' });
}
function circle(cx, cy, r, o = {}) {
  return `<circle cx="${r1(cx)}" cy="${r1(cy)}" r="${r1(r)}" fill="${col(o.fill || 'none')}" stroke="${col(o.c || 'line')}" stroke-width="${o.w ?? 2}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}/>`;
}
const dot = (x, y, c = 'ink', r = 3.5) => `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r}" fill="${col(c)}"/>`;
function poly(pts, o = {}) {
  const p = pts.map((q) => `${r1(q[0])},${r1(q[1])}`).join(' ');
  return `<polygon points="${p}" fill="${col(o.fill || 'none')}" stroke="${col(o.c || 'ink')}" stroke-width="${o.w ?? 2}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''} stroke-linejoin="round"/>`;
}
function polyline(pts, o = {}) {
  const p = pts.map((q) => `${r1(q[0])},${r1(q[1])}`).join(' ');
  const ah = o.arrow ? ` marker-end="url(#ah-${o.c || 'ink'})"` : '';
  return `<polyline points="${p}" fill="none" stroke="${col(o.c || 'ink')}" stroke-width="${o.w ?? 2}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''} stroke-linejoin="round" stroke-linecap="round"${ah}/>`;
}
const path = (d, o = {}) => `<path d="${d}" fill="${col(o.fill || 'none')}" stroke="${col(o.c || 'ink')}" stroke-width="${o.w ?? 2}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}${o.arrow ? ` marker-end="url(#ah-${o.c || 'ink'})"` : ''} stroke-linejoin="round" stroke-linecap="round"/>`;

// điểm theo góc (độ, ngược chiều kim đồng hồ, trục y hướng xuống)
const P = (cx, cy, R, deg) => [cx + R * Math.cos((deg * Math.PI) / 180), cy - R * Math.sin((deg * Math.PI) / 180)];
// cung đánh dấu góc tại đỉnh (x,y) từ hướng a1 đến a2 (độ)
function angleArc(x, y, a1, a2, r = 22, o = {}) {
  const [x1, y1] = P(x, y, r, a1);
  const [x2, y2] = P(x, y, r, a2);
  let d = a2 - a1; while (d < 0) d += 360;
  const large = d > 180 ? 1 : 0;
  const fill = o.fill ? `M${r1(x)},${r1(y)} L${r1(x1)},${r1(y1)} ` : `M${r1(x1)},${r1(y1)} `;
  const dd = `${fill}${o.fill ? '' : ''}A${r},${r} 0 ${large} 0 ${r1(x2)},${r1(y2)}${o.fill ? ' Z' : ''}`;
  return `<path d="${dd}" fill="${col(o.fill || 'none')}" stroke="${col(o.c || 'red')}" stroke-width="${o.w ?? 2}"/>`;
}
// góc vuông
function rightAngle(x, y, aDeg, s = 12, c = 'ink') {
  const [ax, ay] = P(x, y, s, aDeg);
  const [bx, by] = P(x, y, s, aDeg + 90);
  const [qx, qy] = [ax + bx - x, ay + by - y];
  return polyline([[ax, ay], [qx, qy], [bx, by]], { c, w: 1.5 });
}
// vạch đánh dấu đoạn bằng nhau ở giữa đoạn
function tick(x1, y1, x2, y2, n = 1, c = 'red') {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const L = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / L, uy = (y2 - y1) / L;
  const nx = -uy, ny = ux;
  let s = '';
  for (let i = 0; i < n; i++) {
    const off = (i - (n - 1) / 2) * 5;
    const cx = mx + ux * off, cy = my + uy * off;
    s += line(cx - nx * 6, cy - ny * 6, cx + nx * 6, cy + ny * 6, { c, w: 2 });
  }
  return s;
}
const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const ang = (a, b) => (Math.atan2(-(b[1] - a[1]), b[0] - a[0]) * 180) / Math.PI;
// chú thích dạng ghi chú nhỏ
const note = (x, y, s, c = 'soft', size = 12, anchor = 'middle') => text(x, y, s, { c, size, anchor });
// bảng đơn giản: rows = [[..],[..]], widths
function table(x, y, widths, rowH, rows, o = {}) {
  let s = '';
  let yy = y;
  rows.forEach((r, i) => {
    let xx = x;
    r.forEach((cell, j) => {
      const head = i === 0 && o.head !== false;
      s += rect(xx, yy, widths[j], rowH, { rx: 0, fill: head ? (o.headFill || 'fBlue') : (o.fill || 'bg'), c: 'line', w: 1 });
      s += text(xx + widths[j] / 2, yy + rowH / 2 + 5, cell, { size: o.size || 13, bold: head });
      xx += widths[j];
    });
    yy += rowH;
  });
  return s;
}

module.exports = { C, svg, line, arrow, text, rect, box, circle, dot, poly, polyline, path, P, angleArc, rightAngle, tick, mid, lerp, ang, note, table, r1, esc };
