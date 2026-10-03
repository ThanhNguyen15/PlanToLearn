// Sinh hình minh họa SVG cho PlanLop10/HinhMinhHoa
const fs = require('fs');
const path = require('path');
const OUT = __dirname; // chạy: node HinhMinhHoa/tao-hinh.js
fs.mkdirSync(OUT, { recursive: true });

const C = {
  ink: '#1f2937', soft: '#6b7280', circle: '#334155',
  red: '#e4572e', orange: '#f59e0b', blue: '#2563eb', green: '#059669', purple: '#7c3aed',
  fillRed: 'rgba(228,87,46,0.25)', fillBlue: 'rgba(37,99,235,0.22)', fillGreen: 'rgba(5,150,105,0.22)',
  fillOrange: 'rgba(245,158,11,0.30)', fillPurple: 'rgba(124,58,237,0.20)', panel: '#f8fafc',
};
const FONT = "font-family=\"Segoe UI, Arial, sans-serif\"";
const r2 = (x) => Math.round(x * 10) / 10;

// điểm trên đường tròn (góc độ, ngược chiều kim đồng hồ, trục y SVG hướng xuống)
const P = (cx, cy, R, deg) => ({ x: cx + R * Math.cos(deg * Math.PI / 180), y: cy - R * Math.sin(deg * Math.PI / 180) });
const pt = (p) => `${r2(p.x)},${r2(p.y)}`;
const line = (a, b, color = C.ink, w = 2, dash = '') =>
  `<line x1="${r2(a.x)}" y1="${r2(a.y)}" x2="${r2(b.x)}" y2="${r2(b.y)}" stroke="${color}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
const circle = (c, R, color = C.circle, w = 2, fill = 'none', dash = '') =>
  `<circle cx="${r2(c.x)}" cy="${r2(c.y)}" r="${r2(R)}" stroke="${color}" stroke-width="${w}" fill="${fill}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
const dot = (p, color = C.ink, r = 3.5) => `<circle cx="${r2(p.x)}" cy="${r2(p.y)}" r="${r}" fill="${color}"/>`;
const text = (s, p, opt = {}) => {
  const { size = 16, color = C.ink, anchor = 'middle', weight = 'normal', italic = false } = opt;
  const esc = String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<text x="${r2(p.x)}" y="${r2(p.y)}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}"${italic ? ' font-style="italic"' : ''} ${FONT}>${esc}</text>`;
};
// nhãn đặt lệch khỏi điểm theo hướng từ tâm ra
const label = (s, p, from, d = 16, opt = {}) => {
  const dx = p.x - from.x, dy = p.y - from.y, L = Math.hypot(dx, dy) || 1;
  return text(s, { x: p.x + dx / L * d, y: p.y + dy / L * d + 6 }, { weight: 'bold', ...opt });
};
// cung tròn từ a1 đến a2 (ngược chiều kim đồng hồ)
const arc = (c, R, a1, a2, color = C.red, w = 5) => {
  let sweep = ((a2 - a1) % 360 + 360) % 360;
  const s = P(c.x, c.y, R, a1), e = P(c.x, c.y, R, a2);
  return `<path d="M ${pt(s)} A ${R} ${R} 0 ${sweep > 180 ? 1 : 0} 0 ${pt(e)}" stroke="${color}" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;
};
const ang = (from, to) => Math.atan2(-(to.y - from.y), to.x - from.x) * 180 / Math.PI;
// đánh dấu góc tại V giữa tia VA và VB (góc nhỏ)
const angleMark = (V, A, B, r = 26, fill = C.fillOrange, stroke = C.orange) => {
  let a1 = ang(V, A), a2 = ang(V, B);
  let d = ((a2 - a1) % 360 + 360) % 360;
  if (d > 180) { [a1, a2] = [a2, a1]; d = 360 - d; }
  const s = P(V.x, V.y, r, a1), e = P(V.x, V.y, r, a2);
  return `<path d="M ${pt(V)} L ${pt(s)} A ${r} ${r} 0 0 0 ${pt(e)} Z" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`;
};
const rightMark = (V, A, B, s = 12, color = C.ink) => {
  const u = (p) => { const dx = p.x - V.x, dy = p.y - V.y, L = Math.hypot(dx, dy); return { x: dx / L, y: dy / L }; };
  const a = u(A), b = u(B);
  const p1 = { x: V.x + a.x * s, y: V.y + a.y * s }, p2 = { x: V.x + (a.x + b.x) * s, y: V.y + (a.y + b.y) * s }, p3 = { x: V.x + b.x * s, y: V.y + b.y * s };
  return `<polyline points="${pt(p1)} ${pt(p2)} ${pt(p3)}" fill="none" stroke="${color}" stroke-width="1.5"/>`;
};
const tick = (a, b, n = 1, color = C.ink) => { // vạch bằng nhau trên đoạn ab
  const m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy);
  const ux = dx / L, uy = dy / L, nx = -uy, ny = ux; let s = '';
  for (let i = 0; i < n; i++) {
    const o = (i - (n - 1) / 2) * 5;
    const c = { x: m.x + ux * o, y: m.y + uy * o };
    s += line({ x: c.x - nx * 6, y: c.y - ny * 6 }, { x: c.x + nx * 6, y: c.y + ny * 6 }, color, 2);
  }
  return s;
};
const panel = (x, y, w, h, title, color = C.blue) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${C.panel}" stroke="#cbd5e1"/>` +
  `<rect x="${x}" y="${y}" width="${w}" height="34" rx="14" fill="${color}"/><rect x="${x}" y="${y + 20}" width="${w}" height="14" fill="${color}"/>` +
  text(title, { x: x + w / 2, y: y + 23 }, { color: '#fff', weight: 'bold', size: 16 });
const svg = (w, h, body, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">\n<title>${title}</title>\n<rect width="100%" height="100%" fill="#ffffff"/>\n${body}\n</svg>\n`;
const save = (name, content) => { fs.writeFileSync(path.join(OUT, name), content, 'utf8'); console.log('wrote', name); };
const lineCircle = (M, D, O, R) => { // giao điểm thứ hai của đường MD với đường tròn (O,R), khác D
  const dx = D.x - M.x, dy = D.y - M.y;
  const a = dx * dx + dy * dy, b = 2 * (dx * (M.x - O.x) + dy * (M.y - O.y)), c = (M.x - O.x) ** 2 + (M.y - O.y) ** 2 - R * R;
  const disc = Math.sqrt(b * b - 4 * a * c), t1 = (-b - disc) / (2 * a), t2 = (-b + disc) / (2 * a);
  return [{ x: M.x + dx * t1, y: M.y + dy * t1 }, { x: M.x + dx * t2, y: M.y + dy * t2 }];
};
const foot = (P0, A, B) => { // chân đường vuông góc từ P0 xuống AB
  const dx = B.x - A.x, dy = B.y - A.y, t = ((P0.x - A.x) * dx + (P0.y - A.y) * dy) / (dx * dx + dy * dy);
  return { x: A.x + t * dx, y: A.y + t * dy };
};
const ext = (A, B, k) => ({ x: A.x + (B.x - A.x) * k, y: A.y + (B.y - A.y) * k });
const mid = (A, B) => ({ x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 });

// ============ 1. Góc với đường tròn ============
{
  let b = '';
  const W = 300, H = 330, R = 95;
  const titles = ['Góc ở tâm', 'Góc nội tiếp', 'Chắn nửa đường tròn', 'Tiếp tuyến và dây'];
  const colors = [C.blue, C.red, C.green, C.purple];
  const caps = [
    ['∠AOB = sđ cung AB', 'Đỉnh ở TÂM → bằng cả cung'],
    ['∠ACB = ∠ADB = ½ sđ cung AB', 'Cùng chắn 1 cung → bằng nhau'],
    ['∠ACB = 90°', 'AB là đường kính'],
    ['∠xAB = ∠ACB = ½ sđ cung AB', 'Ax là tiếp tuyến tại A'],
  ];
  for (let i = 0; i < 4; i++) {
    const x0 = 15 + i * (W + 15), y0 = 15;
    b += panel(x0, y0, W, H, `${i + 1}. ${titles[i]}`, colors[i]);
    const O = { x: x0 + W / 2, y: y0 + 160 };
    b += circle(O, R);
    if (i === 0) {
      const A = P(O.x, O.y, R, 210), B = P(O.x, O.y, R, 330);
      b += arc(O, R, 210, 330) + angleMark(O, A, B, 30) + line(O, A) + line(O, B);
      b += dot(O) + dot(A) + dot(B) + label('O', O, { x: O.x, y: O.y + 10 }, 14) + label('A', A, O) + label('B', B, O);
    } else if (i === 1) {
      const A = P(O.x, O.y, R, 210), B = P(O.x, O.y, R, 330), Cc = P(O.x, O.y, R, 105), D = P(O.x, O.y, R, 50);
      b += arc(O, R, 210, 330) + angleMark(Cc, A, B, 30) + angleMark(D, A, B, 30, C.fillBlue, C.blue);
      b += line(Cc, A) + line(Cc, B) + line(D, A, C.blue) + line(D, B, C.blue);
      b += dot(O, C.soft) + dot(A) + dot(B) + dot(Cc) + dot(D) + label('A', A, O) + label('B', B, O) + label('C', Cc, O) + label('D', D, O);
    } else if (i === 2) {
      const A = P(O.x, O.y, R, 180), B = P(O.x, O.y, R, 0), Cc = P(O.x, O.y, R, 62);
      b += arc(O, R, 180, 360, C.green) + line(A, B) + line(Cc, A) + line(Cc, B) + rightMark(Cc, A, B, 14, C.red);
      b += dot(O) + dot(A) + dot(B) + dot(Cc) + label('O', O, { x: O.x, y: O.y - 10 }, 14) + label('A', A, O) + label('B', B, O) + label('C', Cc, O);
    } else {
      const A = P(O.x, O.y, R, 270), B = P(O.x, O.y, R, 25), Cc = P(O.x, O.y, R, 150);
      const x = { x: A.x + 135, y: A.y }, xl = { x: A.x - 120, y: A.y };
      b += arc(O, R, 270, 385, C.purple) + line(xl, x, C.purple, 2.5) + angleMark(A, x, B, 34, C.fillPurple, C.purple) + angleMark(Cc, A, B, 30);
      b += line(A, B) + line(Cc, A) + line(Cc, B) + line(O, A, C.soft, 1.5, '4 4') + rightMark(A, O, x, 10, C.soft);
      b += dot(O, C.soft) + dot(A) + dot(B) + dot(Cc) + label('A', A, O) + label('B', B, O) + label('C', Cc, O) + text('x', { x: x.x - 6, y: x.y - 8 }, { weight: 'bold', color: C.purple });
    }
    b += text(caps[i][0], { x: x0 + W / 2, y: y0 + 295 }, { weight: 'bold', size: 15, color: colors[i] });
    b += text(caps[i][1], { x: x0 + W / 2, y: y0 + 318 }, { size: 13, color: C.soft });
  }
  save('goc-voi-duong-tron.svg', svg(4 * W + 75, H + 30, b, 'Các loại góc với đường tròn'));
}

// ============ 2. Bốn dấu hiệu tứ giác nội tiếp ============
{
  let b = '';
  const W = 300, H = 330, R = 95;
  const colors = [C.blue, C.red, C.green, C.purple];
  const titles = ['Hai góc đối bù nhau', 'Góc ngoài = góc trong đối', 'Hai đỉnh nhìn 1 cạnh', 'Bốn đỉnh cách đều 1 điểm'];
  const caps = [
    ['∠A + ∠C = 180°', 'Dấu hiệu dùng nhiều nhất'],
    ['∠CBx = ∠ADC', 'x nằm trên tia đối của tia BA'],
    ['∠BEC = ∠BFC = 90°', '⇒ B, C, E, F ∈ đường tròn đường kính BC'],
    ['OA = OB = OC = OD', 'O chính là tâm đường tròn'],
  ];
  for (let i = 0; i < 4; i++) {
    const x0 = 15 + i * (W + 15), y0 = 15;
    b += panel(x0, y0, W, H, `Dấu hiệu ${i + 1}: ${titles[i]}`, colors[i]);
    const O = { x: x0 + W / 2, y: y0 + 160 };
    if (i === 0 || i === 1 || i === 3) {
      b += circle(O, R, C.circle, 2, 'none', i === 3 ? '' : '');
      const A = P(O.x, O.y, R, 140), B = P(O.x, O.y, R, 35), Cc = P(O.x, O.y, R, 300), D = P(O.x, O.y, R, 215);
      b += `<polygon points="${pt(A)} ${pt(B)} ${pt(Cc)} ${pt(D)}" fill="rgba(37,99,235,0.06)" stroke="${C.ink}" stroke-width="2"/>`;
      if (i === 0) { b += angleMark(A, B, D, 28, C.fillBlue, C.blue) + angleMark(Cc, B, D, 28, C.fillRed, C.red); }
      if (i === 1) {
        const x = ext(A, B, 1.25);
        b += line(B, x, C.red, 2, '6 4') + angleMark(B, x, Cc, 26, C.fillRed, C.red) + angleMark(D, A, Cc, 28, C.fillRed, C.red);
        b += text('x', { x: x.x + 4, y: x.y - 6 }, { weight: 'bold', color: C.red });
      }
      if (i === 3) {
        for (const p of [A, B, Cc, D]) b += line(O, p, C.purple, 2, '5 4') + tick(O, p, 1, C.purple);
        b += dot(O) + label('O', O, { x: O.x - 10, y: O.y - 10 }, 12);
      }
      b += dot(A) + dot(B) + dot(Cc) + dot(D) + label('A', A, O) + label('B', B, O) + label('C', Cc, O) + label('D', D, O);
    } else {
      // B, C đường kính; E, F nhìn BC dưới góc vuông
      const B = P(O.x, O.y, R, 180), Cc = P(O.x, O.y, R, 0), E = P(O.x, O.y, R, 50), F = P(O.x, O.y, R, 125);
      b += circle(O, R, C.green, 2, 'none', '7 5') + line(B, Cc);
      b += line(B, E) + line(Cc, E) + line(B, F) + line(Cc, F) + rightMark(E, B, Cc, 12, C.red) + rightMark(F, B, Cc, 12, C.red);
      b += dot(O, C.soft) + dot(B) + dot(Cc) + dot(E) + dot(F) + label('B', B, O) + label('C', Cc, O) + label('E', E, O) + label('F', F, O);
    }
    b += text(caps[i][0], { x: x0 + W / 2, y: y0 + 295 }, { weight: 'bold', size: 15, color: colors[i] });
    b += text(caps[i][1], { x: x0 + W / 2, y: y0 + 318 }, { size: 13, color: C.soft });
  }
  save('tu-giac-noi-tiep-4-dau-hieu.svg', svg(4 * W + 75, H + 30, b, 'Bốn dấu hiệu tứ giác nội tiếp'));
}

// ============ 3. Hệ thức tích trong đường tròn ============
{
  let b = '';
  const W = 380, H = 330, R = 90;
  const caps = [['MA² = MC · MD', '△MAC ∽ △MDA (g.g)'], ['MC · MD = ME · MF', '△MFC ∽ △MDE (g.g)'], ['IA · IB = IC · ID', '△IAC ∽ △IDB (g.g)']];
  const titles = ['Tiếp tuyến + cát tuyến', 'Hai cát tuyến', 'Hai dây cắt nhau bên trong'];
  const colors = [C.blue, C.red, C.green];
  for (let i = 0; i < 3; i++) {
    const x0 = 15 + i * (W + 15), y0 = 15;
    b += panel(x0, y0, W, H, titles[i], colors[i]);
    const O = { x: x0 + (i < 2 ? 130 : W / 2), y: y0 + 160 };
    b += circle(O, R) + dot(O, C.soft);
    if (i < 2) {
      const M = { x: x0 + 345, y: O.y };
      const d = Math.hypot(M.x - O.x, M.y - O.y), th = Math.acos(R / d) * 180 / Math.PI;
      const D = P(O.x, O.y, R, 208), [Cc] = lineCircle(M, D, O, R).sort((p, q) => Math.hypot(p.x - M.x, p.y - M.y) - Math.hypot(q.x - M.x, q.y - M.y));
      b += line(M, D, C.blue, 2.5) + dot(M) + dot(Cc) + dot(D) + label('M', M, O) + label('C', Cc, { x: Cc.x, y: Cc.y - 20 }, 12) + label('D', D, O);
      if (i === 0) {
        const A = P(O.x, O.y, R, th);
        b += line(M, A, C.red, 2.5) + rightMark(A, O, M, 10, C.soft) + line(O, A, C.soft, 1.5, '4 4') + dot(A) + label('A', A, O);
      } else {
        const F = P(O.x, O.y, R, 150), [E] = lineCircle(M, F, O, R).sort((p, q) => Math.hypot(p.x - M.x, p.y - M.y) - Math.hypot(q.x - M.x, q.y - M.y));
        b += line(M, F, C.red, 2.5) + dot(E) + dot(F) + label('E', E, { x: E.x, y: E.y - 20 }, 12) + label('F', F, O);
      }
    } else {
      const A = P(O.x, O.y, R, 150), B = P(O.x, O.y, R, 345), Cc = P(O.x, O.y, R, 60), D = P(O.x, O.y, R, 240);
      // giao điểm 2 dây AB, CD
      const den = (A.x - B.x) * (Cc.y - D.y) - (A.y - B.y) * (Cc.x - D.x);
      const t = ((A.x - Cc.x) * (Cc.y - D.y) - (A.y - Cc.y) * (Cc.x - D.x)) / den;
      const I = { x: A.x + t * (B.x - A.x), y: A.y + t * (B.y - A.y) };
      b += line(A, B, C.blue, 2.5) + line(Cc, D, C.red, 2.5) + dot(I) + dot(A) + dot(B) + dot(Cc) + dot(D);
      b += label('A', A, O) + label('B', B, O) + label('C', Cc, O) + label('D', D, O) + text('I', { x: I.x + 12, y: I.y + 18 }, { weight: 'bold' });
    }
    b += text(caps[i][0], { x: x0 + W / 2, y: y0 + 295 }, { weight: 'bold', size: 17, color: colors[i] });
    b += text(caps[i][1], { x: x0 + W / 2, y: y0 + 318 }, { size: 13, color: C.soft });
  }
  save('he-thuc-tich-duong-tron.svg', svg(3 * W + 60, H + 30, b, 'Hệ thức tích trong đường tròn'));
}

// ============ 4. Bài gốc 1: hai tiếp tuyến + cát tuyến ============
{
  let b = '';
  const R = 130, O = { x: 200, y: 230 }, M = { x: 560, y: 230 };
  const d = M.x - O.x, th = Math.acos(R / d) * 180 / Math.PI;
  const A = P(O.x, O.y, R, th), B = P(O.x, O.y, R, -th), H = { x: O.x + R * R / d, y: O.y };
  const D = P(O.x, O.y, R, 200);
  const [Cc] = lineCircle(M, D, O, R).sort((p, q) => Math.hypot(p.x - M.x, p.y - M.y) - Math.hypot(q.x - M.x, q.y - M.y));
  b += text('Bài gốc 1: Hai tiếp tuyến MA, MB và cát tuyến MCD', { x: 330, y: 32 }, { weight: 'bold', size: 18 });
  b += `<polygon points="${pt(M)} ${pt(A)} ${pt(O)} ${pt(B)}" fill="${C.fillBlue}" stroke="none"/>`;
  b += `<polygon points="${pt(Cc)} ${pt(H)} ${pt(O)} ${pt(D)}" fill="${C.fillOrange}" stroke="${C.orange}" stroke-width="2" stroke-dasharray="6 4"/>`;
  b += circle(O, R) + line(M, A, C.blue, 2.5) + line(M, B, C.blue, 2.5) + line(M, O) + line(A, B, C.green, 2.5) + line(M, D, C.red, 2.5);
  b += line(O, A, C.soft, 1.5) + line(O, B, C.soft, 1.5) + line(H, Cc, C.orange, 1.5) + line(O, D, C.orange, 1.5);
  b += rightMark(A, O, M, 11) + rightMark(B, O, M, 11) + rightMark(H, A, M, 10, C.green);
  for (const [n, p] of [['O', O], ['M', M], ['A', A], ['B', B], ['D', D]]) b += dot(p) + label(n, p, n === 'M' ? O : n === 'O' ? M : O, 16);
  b += dot(Cc) + text('C', { x: Cc.x + 2, y: Cc.y + 26 }, { weight: 'bold' }) + dot(H) + text('H', { x: H.x + 14, y: H.y - 8 }, { weight: 'bold' });
  const notes = [
    [C.blue, 'a) MAOB nội tiếp: ∠MAO + ∠MBO = 90° + 90° = 180°'],
    [C.red, 'b) △MAC ∽ △MDA ⇒ MA² = MC · MD'],
    [C.green, 'c) OM ⊥ AB tại H ⇒ MA² = MH · MO (hệ thức lượng)'],
    [C.orange, '    ⇒ MH · MO = MC · MD ⇒ CHOD nội tiếp (vùng cam)'],
  ];
  notes.forEach(([col, s], k) => { b += `<rect x="40" y="${392 + k * 26}" width="14" height="14" fill="${col}" rx="3"/>` + text(s, { x: 64, y: 404 + k * 26 }, { anchor: 'start', size: 15 }); });
  save('bai-goc-1-hai-tiep-tuyen.svg', svg(660, 500, b, 'Bài gốc 1: hai tiếp tuyến và cát tuyến'));
}

// ============ 5. Bài gốc 2: trực tâm ============
{
  let b = '';
  const R = 150, O = { x: 260, y: 230 };
  const A = P(O.x, O.y, R, 105), B = P(O.x, O.y, R, 215), Cc = P(O.x, O.y, R, 325);
  const H = { x: A.x + B.x + Cc.x - 2 * O.x, y: A.y + B.y + Cc.y - 2 * O.y };
  const K = { x: 2 * O.x - A.x, y: 2 * O.y - A.y };
  const D = foot(A, B, Cc), E = foot(B, A, Cc), F = foot(Cc, A, B), M = mid(B, Cc);
  b += text('Bài gốc 2: Ba đường cao và đường kính AK', { x: 260, y: 32 }, { weight: 'bold', size: 18 });
  b += `<polygon points="${pt(B)} ${pt(H)} ${pt(Cc)} ${pt(K)}" fill="${C.fillPurple}" stroke="${C.purple}" stroke-width="2"/>`;
  b += `<polygon points="${pt(B)} ${pt(Cc)} ${pt(E)} ${pt(F)}" fill="none" stroke="${C.green}" stroke-width="2" stroke-dasharray="6 4"/>`;
  b += circle(O, R) + `<polygon points="${pt(A)} ${pt(B)} ${pt(Cc)}" fill="none" stroke="${C.ink}" stroke-width="2.5"/>`;
  b += line(A, D, C.blue) + line(B, E, C.blue) + line(Cc, F, C.blue) + line(A, K, C.red, 2, '7 5') + line(O, M, C.orange, 3);
  b += rightMark(D, A, Cc, 10) + rightMark(E, B, Cc, 10) + rightMark(F, Cc, B, 10);
  const pts = [['A', A], ['B', B], ['C', Cc], ['K', K]];
  for (const [n, p] of pts) b += dot(p) + label(n, p, O);
  b += dot(O) + text('O', { x: O.x - 14, y: O.y - 6 }, { weight: 'bold' });
  b += dot(H, C.red) + text('H', { x: H.x - 16, y: H.y + 4 }, { weight: 'bold', color: C.red });
  b += dot(D) + text('D', { x: D.x - 4, y: D.y + 22 }, { weight: 'bold' }) + dot(M) + text('M', { x: M.x + 10, y: M.y + 22 }, { weight: 'bold', color: C.orange });
  b += dot(E) + text('E', { x: E.x + 14, y: E.y }, { weight: 'bold' }) + dot(F) + text('F', { x: F.x - 16, y: F.y }, { weight: 'bold' });
  const notes = [
    [C.green, 'a) BCEF nội tiếp (E, F nhìn BC dưới góc vuông)'],
    [C.blue, 'b) △AEB ∽ △AFC ⇒ AE · AC = AF · AB'],
    [C.purple, 'c) BH ∥ KC, CH ∥ KB ⇒ BHCK là hình bình hành'],
    [C.orange, 'd) M là trung điểm HK, O trung điểm AK ⇒ AH = 2·OM'],
  ];
  notes.forEach(([col, s], k) => { b += `<rect x="40" y="${408 + k * 26}" width="14" height="14" fill="${col}" rx="3"/>` + text(s, { x: 64, y: 420 + k * 26 }, { anchor: 'start', size: 15 }); });
  save('bai-goc-2-truc-tam.svg', svg(560, 520, b, 'Bài gốc 2: tam giác và trực tâm'));
}

// ============ 6. Hình trụ, nón, cầu ============
{
  let b = '';
  const W = 300, H = 380;
  const titles = ['Hình trụ', 'Hình nón', 'Hình cầu'];
  const colors = [C.blue, C.red, C.green];
  for (let i = 0; i < 3; i++) {
    const x0 = 15 + i * (W + 15), y0 = 15, cx = x0 + W / 2;
    b += panel(x0, y0, W, H, titles[i], colors[i]);
    if (i === 0) {
      const top = y0 + 80, bot = y0 + 230, rx = 70, ry = 20;
      b += `<path d="M ${cx - rx} ${top} L ${cx - rx} ${bot} A ${rx} ${ry} 0 0 0 ${cx + rx} ${bot} L ${cx + rx} ${top}" fill="${C.fillBlue}" stroke="${C.ink}" stroke-width="2"/>`;
      b += `<ellipse cx="${cx}" cy="${top}" rx="${rx}" ry="${ry}" fill="rgba(37,99,235,0.35)" stroke="${C.ink}" stroke-width="2"/>`;
      b += `<path d="M ${cx - rx} ${bot} A ${rx} ${ry} 0 0 1 ${cx + rx} ${bot}" fill="none" stroke="${C.ink}" stroke-width="1.5" stroke-dasharray="5 4"/>`;
      b += line({ x: cx, y: bot }, { x: cx + rx, y: bot }, C.red, 2) + text('r', { x: cx + rx / 2, y: bot - 6 }, { color: C.red, weight: 'bold' });
      b += line({ x: cx, y: top }, { x: cx, y: bot }, C.orange, 2, '5 4') + text('h', { x: cx - 12, y: (top + bot) / 2 }, { color: C.orange, weight: 'bold' });
      b += dot({ x: cx, y: bot }) + dot({ x: cx, y: top });
      b += text('S_xq = 2πrh', { x: cx, y: y0 + 290 }, { weight: 'bold' }) + text('S_tp = 2πrh + 2πr²', { x: cx, y: y0 + 316 }) + text('V = πr²h', { x: cx, y: y0 + 348 }, { weight: 'bold', color: C.blue, size: 18 });
    } else if (i === 1) {
      const apex = { x: cx, y: y0 + 65 }, bot = y0 + 230, rx = 80, ry = 22;
      b += `<path d="M ${cx - rx} ${bot} L ${apex.x} ${apex.y} L ${cx + rx} ${bot} A ${rx} ${ry} 0 0 1 ${cx - rx} ${bot}" fill="${C.fillRed}" stroke="${C.ink}" stroke-width="2"/>`;
      b += `<path d="M ${cx - rx} ${bot} A ${rx} ${ry} 0 0 1 ${cx + rx} ${bot}" fill="none" stroke="${C.ink}" stroke-width="1.5" stroke-dasharray="5 4"/>`;
      b += line({ x: cx, y: bot }, { x: cx + rx, y: bot }, C.blue, 2) + text('r', { x: cx + rx / 2, y: bot - 6 }, { color: C.blue, weight: 'bold' });
      b += line(apex, { x: cx, y: bot }, C.orange, 2, '5 4') + text('h', { x: cx - 12, y: (apex.y + bot) / 2 + 10 }, { color: C.orange, weight: 'bold' });
      b += rightMark({ x: cx, y: bot }, apex, { x: cx + rx, y: bot }, 10);
      b += text('l', { x: cx + rx / 2 + 16, y: (apex.y + bot) / 2 }, { color: C.purple, weight: 'bold', italic: true, size: 18 });
      b += text('S_xq = πrl  ( l² = r² + h² )', { x: cx, y: y0 + 290 }, { weight: 'bold' }) + text('S_tp = πrl + πr²', { x: cx, y: y0 + 316 }) + text('V = ⅓πr²h', { x: cx, y: y0 + 348 }, { weight: 'bold', color: C.red, size: 18 });
    } else {
      const O = { x: cx, y: y0 + 150 }, Rr = 85;
      b += `<circle cx="${O.x}" cy="${O.y}" r="${Rr}" fill="${C.fillGreen}" stroke="${C.ink}" stroke-width="2"/>`;
      b += `<path d="M ${O.x - Rr} ${O.y} A ${Rr} 24 0 0 0 ${O.x + Rr} ${O.y}" fill="none" stroke="${C.ink}" stroke-width="1.5"/>`;
      b += `<path d="M ${O.x - Rr} ${O.y} A ${Rr} 24 0 0 1 ${O.x + Rr} ${O.y}" fill="none" stroke="${C.ink}" stroke-width="1.5" stroke-dasharray="5 4"/>`;
      b += line(O, { x: O.x + Rr, y: O.y }, C.red, 2) + dot(O) + text('R', { x: O.x + Rr / 2, y: O.y - 8 }, { color: C.red, weight: 'bold' });
      b += text('S = 4πR²', { x: cx, y: y0 + 290 }, { weight: 'bold' }) + text('(= 4 lần diện tích hình tròn lớn)', { x: cx, y: y0 + 316 }, { size: 13, color: C.soft }) + text('V = ⁴⁄₃πR³', { x: cx, y: y0 + 348 }, { weight: 'bold', color: C.green, size: 18 });
    }
  }
  save('hinh-khoi-tru-non-cau.svg', svg(3 * W + 60, H + 30, b, 'Hình trụ, hình nón, hình cầu'));
}

// ============ 7. Vật thể ghép (đề 2025, 2026) ============
{
  let b = '';
  const W = 440, H = 400;
  // bình: trụ + nửa cầu
  {
    const x0 = 15, y0 = 15, cx = x0 + 150; b += panel(x0, y0, W, H, 'Bình = trụ + nắp nửa hình cầu', C.blue);
    const rx = 60, ry = 16, top = y0 + 140, bot = y0 + 300;
    b += `<path d="M ${cx - rx} ${top} A ${rx} ${rx} 0 0 1 ${cx + rx} ${top}" fill="rgba(245,158,11,0.35)" stroke="${C.ink}" stroke-width="2"/>`;
    b += `<path d="M ${cx - rx} ${top} L ${cx - rx} ${bot} A ${rx} ${ry} 0 0 0 ${cx + rx} ${bot} L ${cx + rx} ${top}" fill="${C.fillBlue}" stroke="${C.ink}" stroke-width="2"/>`;
    b += `<ellipse cx="${cx}" cy="${top}" rx="${rx}" ry="${ry}" fill="none" stroke="${C.ink}" stroke-width="1.5" stroke-dasharray="5 4"/>`;
    b += line({ x: cx, y: top }, { x: cx + rx, y: top }, C.red, 2) + text('r', { x: cx + rx / 2, y: top - 8 }, { color: C.red, weight: 'bold' });
    b += line({ x: cx + rx + 18, y: top }, { x: cx + rx + 18, y: bot }, C.orange, 2) + text('h', { x: cx + rx + 32, y: (top + bot) / 2 }, { color: C.orange, weight: 'bold' });
    const tx = x0 + 250;
    b += text('V = V_trụ + V_nửa cầu', { x: tx, y: y0 + 120 }, { anchor: 'start', weight: 'bold', size: 15 });
    b += text('  = πr²h + ⅔πr³', { x: tx, y: y0 + 145 }, { anchor: 'start', size: 15, color: C.blue });
    b += text('Sơn mặt ngoài:', { x: tx, y: y0 + 190 }, { anchor: 'start', weight: 'bold', size: 15 });
    b += text('S = 2πrh (thân)', { x: tx, y: y0 + 214 }, { anchor: 'start', size: 14 });
    b += text('  + πr² (đáy)', { x: tx, y: y0 + 236 }, { anchor: 'start', size: 14 });
    b += text('  + 2πr² (nửa cầu)', { x: tx, y: y0 + 258 }, { anchor: 'start', size: 14 });
    b += text('⚠ Mặt tiếp giáp trụ–nắp', { x: tx, y: y0 + 300 }, { anchor: 'start', size: 13, color: C.red });
    b += text('KHÔNG tính vào mặt ngoài', { x: tx, y: y0 + 318 }, { anchor: 'start', size: 13, color: C.red });
    b += text('Đổi đơn vị: 1 m² = 10 000 cm²', { x: x0 + W / 2, y: y0 + 375 }, { size: 14, color: C.soft, weight: 'bold' });
  }
  // hộp tennis
  {
    const x0 = 30 + W, y0 = 15, cx = x0 + 110; b += panel(x0, y0, W, H, 'Hộp trụ chứa vừa khít 4 quả bóng', C.green);
    const r = 34, rx = r + 2, ry = 10, top = y0 + 60, bot = top + 8 * r;
    b += `<path d="M ${cx - rx} ${top} L ${cx - rx} ${bot} A ${rx} ${ry} 0 0 0 ${cx + rx} ${bot} L ${cx + rx} ${top}" fill="rgba(5,150,105,0.10)" stroke="${C.ink}" stroke-width="2"/>`;
    b += `<ellipse cx="${cx}" cy="${top}" rx="${rx}" ry="${ry}" fill="rgba(5,150,105,0.25)" stroke="${C.ink}" stroke-width="2"/>`;
    for (let k = 0; k < 4; k++) b += `<circle cx="${cx}" cy="${top + r + 2 * r * k}" r="${r}" fill="#d9f99d" stroke="#65a30d" stroke-width="2"/>` + `<path d="M ${cx - r + 6} ${top + r + 2 * r * k - 12} Q ${cx} ${top + r + 2 * r * k + 8} ${cx + r - 6} ${top + r + 2 * r * k - 12}" fill="none" stroke="#fff" stroke-width="2.5"/>`;
    b += line({ x: cx - rx - 16, y: top }, { x: cx - rx - 16, y: bot }, C.orange, 2) + text('h = 8r', { x: cx - rx - 22, y: (top + bot) / 2 }, { color: C.orange, weight: 'bold', anchor: 'end' });
    const tx = x0 + 200;
    b += text('V_hộp = πr² · 8r = 8πr³', { x: tx, y: y0 + 120 }, { anchor: 'start', size: 15, weight: 'bold' });
    b += text('V_bóng = 4 · ⁴⁄₃πr³ = ¹⁶⁄₃πr³', { x: tx, y: y0 + 150 }, { anchor: 'start', size: 15 });
    b += text('V_bóng : V_hộp = 2 : 3', { x: tx, y: y0 + 195 }, { anchor: 'start', size: 16, weight: 'bold', color: C.green });
    b += text('⇒ phần trống = ⅓ hộp', { x: tx, y: y0 + 222 }, { anchor: 'start', size: 15, color: C.green });
    b += text('Mấu chốt: "vừa khít"', { x: tx, y: y0 + 275 }, { anchor: 'start', size: 14, weight: 'bold', color: C.red });
    b += text('⇒ r_đáy = r_bóng', { x: tx, y: y0 + 298 }, { anchor: 'start', size: 14 });
    b += text('⇒ h = số bóng × 2r', { x: tx, y: y0 + 320 }, { anchor: 'start', size: 14 });
  }
  save('vat-the-ghep-thuc-te.svg', svg(2 * W + 45, H + 30, b, 'Vật thể ghép trong đề thực tế'));
}

// ============ 8. Cung, quạt, viên phân, vành khăn ============
{
  let b = '';
  const W = 280, H = 300, R = 90;
  const titles = ['Độ dài cung n°', 'Hình quạt n°', 'Hình viên phân', 'Hình vành khăn'];
  const colors = [C.blue, C.orange, C.red, C.green];
  const caps = [['l = πRn / 180', 'Bánh xe lăn 1 vòng: 2πR'], ['S = πR²n / 360 = lR / 2', 'Miếng bánh pizza'], ['S = S_quạt − S_tam giác', 'Phần "mặt trăng" bị cắt'], ['S = π(R² − r²)', 'Lối đi quanh bồn hoa']];
  for (let i = 0; i < 4; i++) {
    const x0 = 15 + i * (W + 15), y0 = 15, O = { x: x0 + W / 2, y: y0 + 150 };
    b += panel(x0, y0, W, H, titles[i], colors[i]);
    const A = P(O.x, O.y, R, 20), B = P(O.x, O.y, R, 120);
    if (i === 0) { b += circle(O, R, C.soft, 1.5) + arc(O, R, 20, 120, C.blue, 6) + line(O, A, C.soft, 1.5, '4 4') + line(O, B, C.soft, 1.5, '4 4') + angleMark(O, A, B, 22) + text('n°', { x: O.x + 4, y: O.y - 28 }, { size: 13, weight: 'bold' }); }
    if (i === 1) { b += circle(O, R, C.soft, 1.5) + `<path d="M ${pt(O)} L ${pt(A)} A ${R} ${R} 0 0 0 ${pt(B)} Z" fill="${C.fillOrange}" stroke="${C.orange}" stroke-width="2.5"/>` + text('n°', { x: O.x + 4, y: O.y - 22 }, { size: 13, weight: 'bold' }); }
    if (i === 2) { b += circle(O, R, C.soft, 1.5) + `<path d="M ${pt(A)} A ${R} ${R} 0 0 0 ${pt(B)} Z" fill="${C.fillRed}" stroke="${C.red}" stroke-width="2.5"/>` + `<polygon points="${pt(O)} ${pt(A)} ${pt(B)}" fill="rgba(100,116,139,0.15)" stroke="${C.soft}" stroke-width="1.5" stroke-dasharray="4 4"/>`; }
    if (i === 3) { b += `<path d="M ${O.x - R} ${O.y} A ${R} ${R} 0 1 0 ${O.x + R} ${O.y} A ${R} ${R} 0 1 0 ${O.x - R} ${O.y} Z M ${O.x - 50} ${O.y} A 50 50 0 1 1 ${O.x + 50} ${O.y} A 50 50 0 1 1 ${O.x - 50} ${O.y} Z" fill="${C.fillGreen}" fill-rule="evenodd" stroke="${C.green}" stroke-width="2.5"/>` + line(O, P(O.x, O.y, R, 30), C.red, 2) + line(O, P(O.x, O.y, 50, 200), C.blue, 2) + text('R', { x: O.x + 50, y: O.y - 32 }, { color: C.red, weight: 'bold' }) + text('r', { x: O.x - 22, y: O.y + 2 }, { color: C.blue, weight: 'bold' }); }
    if (i < 3) b += dot(O) + text('O', { x: O.x - 6, y: O.y + 20 }, { weight: 'bold' }) + (i > 0 ? '' : '') + text('R', { x: (O.x + A.x) / 2 + 4, y: (O.y + A.y) / 2 + 18 }, { size: 13, color: C.soft });
    else b += dot(O);
    b += text(caps[i][0], { x: x0 + W / 2, y: y0 + 268 }, { weight: 'bold', size: 15, color: colors[i] });
    b += text(caps[i][1], { x: x0 + W / 2, y: y0 + 290 }, { size: 13, color: C.soft });
  }
  save('cung-quat-vien-phan-vanh-khan.svg', svg(4 * W + 75, H + 30, b, 'Cung, hình quạt, viên phân, vành khăn'));
}

// ============ 9. Lượng giác đo chiều cao ============
{
  let b = '';
  b += text('Đo chiều cao bằng tỉ số lượng giác', { x: 330, y: 32 }, { weight: 'bold', size: 18 });
  const g = 330; // mặt đất
  b += line({ x: 30, y: g }, { x: 630, y: g }, C.soft, 2);
  // tòa nhà
  b += `<rect x="470" y="70" width="90" height="${g - 70}" fill="rgba(37,99,235,0.15)" stroke="${C.blue}" stroke-width="2"/>`;
  for (let r = 0; r < 6; r++) for (let c = 0; c < 3; c++) b += `<rect x="${482 + c * 26}" y="${88 + r * 38}" width="14" height="20" fill="rgba(37,99,235,0.35)"/>`;
  // người
  const E = { x: 120, y: g - 60 };
  b += `<circle cx="112" cy="${g - 72}" r="10" fill="none" stroke="${C.ink}" stroke-width="2"/>` + line({ x: 112, y: g - 62 }, { x: 112, y: g - 25 }) + line({ x: 112, y: g - 25 }, { x: 100, y: g }) + line({ x: 112, y: g - 25 }, { x: 124, y: g }) + line({ x: 112, y: g - 50 }, { x: 128, y: g - 60 });
  const T = { x: 470, y: 70 }, Fp = { x: 470, y: E.y };
  b += line(E, T, C.red, 2.5) + line(E, Fp, C.orange, 2, '6 4') + rightMark(Fp, E, T, 12) + angleMark(E, Fp, T, 50, C.fillRed, C.red);
  b += text('α', { x: E.x + 62, y: E.y - 8 }, { color: C.red, weight: 'bold', size: 18 });
  b += text('d (khoảng cách đến tòa nhà)', { x: (E.x + Fp.x) / 2, y: E.y + 22 }, { color: C.orange, size: 14 });
  b += line({ x: 455, y: E.y }, { x: 455, y: 70 }, C.green, 3) + text('x', { x: 442, y: (E.y + 70) / 2 }, { color: C.green, weight: 'bold', size: 18 });
  b += line({ x: 150, y: E.y }, { x: 150, y: g }, C.purple, 2) + text('h₀', { x: 166, y: g - 24 }, { color: C.purple, weight: 'bold' });
  b += text('tan α = x / d  ⇒  x = d · tan α', { x: 330, y: 375 }, { weight: 'bold', size: 17, color: C.green });
  b += text('Chiều cao tòa nhà = d · tan α + h₀ (chiều cao tầm mắt)', { x: 330, y: 402 }, { size: 15 });
  b += text('Nhớ: SIN = Đối/Huyền · COS = Kề/Huyền · TAN = Đối/Kề  (“Sin đi học, Cos không hư, Tan đoàn kết”)', { x: 330, y: 432 }, { size: 13, color: C.soft });
  save('luong-giac-do-chieu-cao.svg', svg(660, 450, b, 'Đo chiều cao bằng lượng giác'));
}

// ============ 10. Đa giác đều và phép quay ============
{
  let b = '';
  b += text('Đa giác đều và phép quay (GDPT 2018 – lớp 9)', { x: 330, y: 32 }, { weight: 'bold', size: 18 });
  const O = { x: 190, y: 220 }, R = 130;
  const V = [0, 1, 2, 3, 4, 5].map((k) => P(O.x, O.y, R, 90 + 60 * k));
  b += circle(O, R, C.soft, 1.5, 'none', '5 5');
  b += `<polygon points="${V.map(pt).join(' ')}" fill="${C.fillBlue}" stroke="${C.blue}" stroke-width="2.5"/>`;
  for (const p of V) b += line(O, p, C.soft, 1, '3 4');
  const names = ['A', 'B', 'C', 'D', 'E', 'F'];
  V.forEach((p, k) => { b += dot(p) + label(names[k], p, O, 18); });
  b += dot(O) + text('O', { x: O.x + 14, y: O.y + 6 }, { weight: 'bold' });
  // mũi tên quay A -> B
  b += `<defs><marker id="ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="${C.red}"/></marker></defs>`;
  const s = P(O.x, O.y, 60, 95), e = P(O.x, O.y, 60, 145);
  b += `<path d="M ${pt(s)} A 60 60 0 0 0 ${pt(e)}" fill="none" stroke="${C.red}" stroke-width="3" marker-end="url(#ar)"/>` + text('60°', { x: O.x - 32, y: O.y - 58 }, { color: C.red, weight: 'bold' });
  const tx = 360;
  const lines = [
    ['Phép quay tâm O góc 60° (ngược chiều kim đồng hồ):', true, C.ink],
    ['A → B, B → C, …, F → A', false, C.red],
    ['⇒ lục giác đều “trùng lại chính nó”', false, C.ink],
    ['', false, C.ink],
    ['n-giác đều: các phép quay giữ nguyên hình', true, C.ink],
    ['có góc  α = k · 360°/n  (k = 1, 2, …, n)', false, C.blue],
    ['', false, C.ink],
    ['Mỗi góc trong:  (n − 2) · 180° / n', true, C.ink],
    ['Lục giác đều cạnh a:  R = a,  S = 6 · (a²√3 / 4)', false, C.green],
    ['Tam giác đều cạnh a:  R = a√3 / 3,  r = a√3 / 6', false, C.green],
    ['Hình vuông cạnh a:  R = a√2 / 2,  r = a / 2', false, C.green],
  ];
  lines.forEach(([s2, bold, col], k) => { b += text(s2, { x: tx, y: 100 + k * 26 }, { anchor: 'start', size: 15, weight: bold ? 'bold' : 'normal', color: col }); });
  save('da-giac-deu-phep-quay.svg', svg(760, 400, b, 'Đa giác đều và phép quay'));
}

// ============ 11. Thống kê: biểu đồ cột + quạt ============
{
  let b = '';
  b += text('Khảo sát 40 học sinh: số giờ dùng điện thoại mỗi ngày (số liệu minh họa)', { x: 420, y: 30 }, { weight: 'bold', size: 17 });
  const data = [['1 giờ', 8], ['2 giờ', 12], ['3 giờ', 10], ['4 giờ', 6], ['5 giờ', 4]];
  const cols = [C.green, C.blue, C.orange, C.red, C.purple];
  // biểu đồ cột
  const x0 = 70, y0 = 330, unit = 20;
  b += line({ x: x0, y: y0 }, { x: x0 + 360, y: y0 }) + line({ x: x0, y: y0 }, { x: x0, y: 60 });
  for (let v = 0; v <= 12; v += 2) b += line({ x: x0 - 5, y: y0 - v * unit }, { x: x0 + 360, y: y0 - v * unit }, '#e5e7eb', 1) + text(String(v), { x: x0 - 14, y: y0 - v * unit + 5 }, { size: 12, color: C.soft });
  data.forEach(([n, v], k) => {
    const x = x0 + 20 + k * 68;
    b += `<rect x="${x}" y="${y0 - v * unit}" width="44" height="${v * unit}" fill="${cols[k]}" rx="3"/>` + text(String(v), { x: x + 22, y: y0 - v * unit - 6 }, { weight: 'bold', size: 14 }) + text(n, { x: x + 22, y: y0 + 20 }, { size: 13 });
  });
  b += text('Biểu đồ cột: TẦN SỐ', { x: x0 + 180, y: y0 + 48 }, { weight: 'bold', size: 15, color: C.blue });
  // biểu đồ quạt
  const O = { x: 640, y: 200 }, R = 120; let a0 = 90;
  data.forEach(([n, v], k) => {
    const sweep = v / 40 * 360, a1 = a0 - sweep;
    const s = P(O.x, O.y, R, a0), e = P(O.x, O.y, R, a1);
    b += `<path d="M ${pt(O)} L ${pt(s)} A ${R} ${R} 0 ${sweep > 180 ? 1 : 0} 1 ${pt(e)} Z" fill="${cols[k]}" stroke="#fff" stroke-width="2"/>`;
    const m = P(O.x, O.y, R * 0.64, (a0 + a1) / 2);
    b += text(`${String(v / 40 * 100).replace('.', ',')}%`, { x: m.x, y: m.y + 5 }, { color: '#fff', weight: 'bold', size: 14 });
    a0 = a1;
  });
  b += text('Biểu đồ quạt: TẦN SỐ TƯƠNG ĐỐI', { x: O.x, y: y0 + 48 }, { weight: 'bold', size: 15, color: C.orange });
  data.forEach(([n], k) => { b += `<rect x="${545 + k * 40}" y="${y0 + 2}" width="12" height="12" fill="${cols[k]}"/>` + text(n.replace(' giờ', 'h'), { x: 568 + k * 40, y: y0 + 13 }, { size: 12, anchor: 'start' }); });
  b += `<rect x="40" y="400" width="760" height="70" rx="10" fill="#fff7ed" stroke="${C.orange}"/>`;
  b += text('Chọn ngẫu nhiên 1 bạn.  P(“dùng đúng 3 giờ”) = 10/40 = 0,25', { x: 420, y: 428 }, { weight: 'bold', size: 15 });
  b += text('P(“dùng không quá 3 giờ”) = (8 + 12 + 10)/40 = 30/40 = 0,75    ·    tần số tương đối = tần số / tổng × 100%', { x: 420, y: 455 }, { size: 14, color: C.soft });
  save('thong-ke-bieu-do.svg', svg(840, 490, b, 'Biểu đồ tần số và tần số tương đối'));
}

// ============ 12. Ghép nhóm (histogram) ============
{
  let b = '';
  b += text('Mẫu số liệu ghép nhóm: chiều cao 40 học sinh (cm) – số liệu minh họa', { x: 380, y: 30 }, { weight: 'bold', size: 17 });
  const groups = [['[150;155)', 5], ['[155;160)', 9], ['[160;165)', 14], ['[165;170)', 8], ['[170;175)', 4]];
  const x0 = 80, y0 = 320, unit = 16, bw = 100;
  b += line({ x: x0, y: y0 }, { x: x0 + 5 * bw + 20, y: y0 }) + line({ x: x0, y: y0 }, { x: x0, y: 70 });
  for (let v = 0; v <= 14; v += 2) b += line({ x: x0 - 5, y: y0 - v * unit }, { x: x0 + 5 * bw, y: y0 - v * unit }, '#e5e7eb', 1) + text(String(v), { x: x0 - 16, y: y0 - v * unit + 5 }, { size: 12, color: C.soft });
  groups.forEach(([n, v], k) => {
    const x = x0 + k * bw;
    b += `<rect x="${x}" y="${y0 - v * unit}" width="${bw}" height="${v * unit}" fill="rgba(37,99,235,${0.25 + v / 30})" stroke="#fff" stroke-width="2"/>`;
    b += text(String(v), { x: x + bw / 2, y: y0 - v * unit - 6 }, { weight: 'bold' }) + text(n, { x: x + bw / 2, y: y0 + 20 }, { size: 13 });
    b += text(`${String(v / 40 * 100).replace('.', ',')}%`, { x: x + bw / 2, y: y0 - v * unit / 2 + 5 }, { color: '#fff', weight: 'bold', size: 13 });
  });
  b += text('Các cột SÁT NHAU (khác biểu đồ cột thường)', { x: x0 + 250, y: y0 + 46 }, { weight: 'bold', color: C.red, size: 14 });
  const tx = 620;
  const notes = [['Nhóm [a; b): gồm a, KHÔNG gồm b', true], ['Độ dài nhóm = b − a = 5', false], ['Giá trị đại diện = (a + b)/2', false], ['', false], ['Tần số tương đối nhóm', true], ['= tần số / tổng số × 100%', false], ['Ví dụ [160;165): 14/40 = 35%', false], ['', false], ['P(“cao từ 160 cm trở lên”)', true], ['= (14 + 8 + 4)/40 = 0,65', false]];
  notes.forEach(([s, bold], k) => { b += text(s, { x: tx, y: 90 + k * 24 }, { anchor: 'start', size: 14, weight: bold ? 'bold' : 'normal', color: bold ? C.ink : C.blue }); });
  save('bieu-do-ghep-nhom.svg', svg(900, 380, b, 'Biểu đồ tần số ghép nhóm'));
}

// ============ 13. Sơ đồ cây + bảng không gian mẫu ============
{
  let b = '';
  b += text('Liệt kê không gian mẫu: sơ đồ cây và bảng', { x: 450, y: 30 }, { weight: 'bold', size: 18 });
  // cây: gieo đồng xu 2 lần
  b += text('Gieo 1 đồng xu 2 lần', { x: 200, y: 56 }, { weight: 'bold', color: C.blue });
  const root = { x: 50, y: 210 };
  const L1 = [{ n: 'S', p: { x: 170, y: 130 } }, { n: 'N', p: { x: 170, y: 290 } }];
  const L2 = [];
  L1.forEach((a) => ['S', 'N'].forEach((n2, j) => L2.push({ par: a, n: n2, p: { x: 300, y: a.p.y - 40 + j * 80 } })));
  L1.forEach((a) => { b += line(root, a.p, C.blue, 2); });
  L2.forEach((q) => { b += line(q.par.p, q.p, C.orange, 2); });
  b += dot(root);
  L1.forEach((a) => { b += `<circle cx="${a.p.x}" cy="${a.p.y}" r="16" fill="${C.blue}"/>` + text(a.n, { x: a.p.x, y: a.p.y + 5 }, { color: '#fff', weight: 'bold' }); });
  L2.forEach((q) => { b += `<circle cx="${q.p.x}" cy="${q.p.y}" r="16" fill="${C.orange}"/>` + text(q.n, { x: q.p.x, y: q.p.y + 5 }, { color: '#fff', weight: 'bold' }) + text(`→  ${q.par.n}${q.n}`, { x: 330, y: q.p.y + 5 }, { anchor: 'start', weight: 'bold', size: 15 }); });
  b += text('Lần 1', { x: 170, y: 92 }, { size: 13, color: C.soft }) + text('Lần 2', { x: 300, y: 72 }, { size: 13, color: C.soft });
  b += text('Ω = {SS; SN; NS; NN} → 4 kết quả', { x: 200, y: 372 }, { weight: 'bold', color: C.blue, size: 15 });
  b += text('P(“đúng 1 lần sấp”) = 2/4 = 1/2', { x: 200, y: 398 }, { size: 15 });
  // bảng 2 xúc xắc
  const tx = 470, ty = 70, cs = 52;
  b += text('Gieo 2 xúc xắc: 6 × 6 = 36 kết quả', { x: tx + 3.5 * cs, y: 64 }, { weight: 'bold', color: C.green });
  for (let i = 0; i <= 6; i++) for (let j = 0; j <= 6; j++) {
    const x = tx + j * cs, y = ty + i * (cs - 10);
    let fill = '#fff', s = '', col = C.ink, wt = 'normal';
    if (i === 0 && j === 0) { fill = '#e2e8f0'; s = '+'; }
    else if (i === 0) { fill = '#dbeafe'; s = String(j); wt = 'bold'; }
    else if (j === 0) { fill = '#dcfce7'; s = String(i); wt = 'bold'; }
    else { s = String(i + j); if (i + j === 7) { fill = '#fde68a'; wt = 'bold'; col = C.red; } }
    b += `<rect x="${x}" y="${y}" width="${cs}" height="${cs - 10}" fill="${fill}" stroke="#94a3b8"/>` + text(s, { x: x + cs / 2, y: y + (cs - 10) / 2 + 6 }, { color: col, weight: wt });
  }
  b += text('Ô vàng: tổng = 7 → 6 ô  ⇒  P = 6/36 = 1/6', { x: tx + 3.5 * cs, y: ty + 7 * (cs - 10) + 26 }, { weight: 'bold', color: C.red, size: 15 });
  save('so-do-cay-khong-gian-mau.svg', svg(860, 420, b, 'Sơ đồ cây và bảng không gian mẫu'));
}

// ============ 14. Bản đồ phương pháp chứng minh hình ============
{
  let b = '';
  b += text('Bản đồ “muốn chứng minh X → đi qua Y”', { x: 510, y: 32 }, { weight: 'bold', size: 19 });
  const rows = [
    ['Tứ giác nội tiếp', C.blue, ['2 góc đối bù', 'Góc ngoài = góc trong đối', '2 đỉnh kề nhìn 1 cạnh góc bằng nhau']],
    ['Đẳng thức tích AB·CD = EF·GH', C.red, ['Đổi thành tỉ lệ AB/EF = GH/CD', 'Tìm 2 tam giác đồng dạng', 'Hệ thức lượng · MA² = MC·MD']],
    ['Hai góc bằng nhau', C.green, ['Cùng chắn 1 cung', 'Tam giác đồng dạng', 'Cùng phụ / cùng bù 1 góc']],
    ['Song song', C.orange, ['Đồng vị / so le trong bằng nhau', 'Cùng ⊥ một đường', 'Đường trung bình']],
    ['Vuông góc', C.purple, ['Góc nội tiếp chắn nửa đường tròn', 'Tiếp tuyến ⊥ bán kính', 'Đường cao thứ 3 (trực tâm)']],
  ];
  rows.forEach(([goal, col, ways], k) => {
    const y = 60 + k * 82;
    b += line({ x: 270, y: y + 31 }, { x: 320 + 2 * 235, y: y + 31 }, col, 2, '4 4');
    b += `<rect x="20" y="${y}" width="250" height="62" rx="12" fill="${col}"/>` + text(goal, { x: 145, y: y + 37 }, { color: '#fff', weight: 'bold', size: 15 });
    ways.forEach((w, j) => {
      const x = 300 + j * 235;
      b += `<rect x="${x}" y="${y + 8}" width="220" height="46" rx="10" fill="#fff" stroke="${col}" stroke-width="2"/>` + text(w, { x: x + 110, y: y + 36 }, { size: 13 });
    });
  });
  b += text('Mẹo: đọc ngược từ KẾT LUẬN → hỏi “cần gì để có điều này?” → nối với GIẢ THIẾT hoặc câu trước.', { x: 510, y: 485 }, { size: 14, color: C.soft, weight: 'bold' });
  save('ban-do-phuong-phap-hinh.svg', svg(1020, 505, b, 'Bản đồ phương pháp chứng minh hình học'));
}

// ============ 15. Sơ đồ NLXH: Con người và AI ============
{
  let b = '';
  b += text('Sơ đồ tư duy: Con người trong thời đại AI', { x: 480, y: 32 }, { weight: 'bold', size: 19 });
  const Cn = { x: 480, y: 280 };
  const br = [
    { t: '1. Giải thích', c: C.blue, p: { x: 150, y: 110 }, it: ['AI: máy học từ dữ liệu', 'Là công cụ, không phải', 'chủ thể có cảm xúc'] },
    { t: '2. AI giúp gì?', c: C.green, p: { x: 480, y: 95 }, it: ['Học nhanh, tra cứu', 'Y tế, giao thông, dịch thuật', 'Giải phóng việc lặp lại'] },
    { t: '3. Mặt trái', c: C.red, p: { x: 810, y: 110 }, it: ['Lười nghĩ, chép bài', 'Deepfake, tin giả', 'Ít kết nối người thật'] },
    { t: '4. AI không thay được', c: C.purple, p: { x: 150, y: 450 }, it: ['Thấu cảm, yêu thương', 'Trách nhiệm đạo đức', 'Trải nghiệm sống thật'] },
    { t: '5. Phản biện', c: C.orange, p: { x: 480, y: 470 }, it: ['“AI sẽ thay con người”?', '→ thay VIỆC, không thay', 'phẩm chất NGƯỜI'] },
    { t: '6. Hành động', c: '#0891b2', p: { x: 810, y: 450 }, it: ['Dùng AI để hỏi, không để chép', 'Kiểm chứng thông tin', 'Nuôi dưỡng cảm xúc thật'] },
  ];
  br.forEach((x) => { b += line(Cn, x.p, x.c, 3); });
  b += `<ellipse cx="${Cn.x}" cy="${Cn.y}" rx="130" ry="50" fill="#111827"/>` + text('CON NGƯỜI & AI', { x: Cn.x, y: Cn.y - 4 }, { color: '#fff', weight: 'bold', size: 18 }) + text('vấn đề nghị luận', { x: Cn.x, y: Cn.y + 20 }, { color: '#cbd5e1', size: 13 });
  br.forEach((x) => {
    b += `<rect x="${x.p.x - 135}" y="${x.p.y - 50}" width="270" height="100" rx="14" fill="#fff" stroke="${x.c}" stroke-width="2.5"/>`;
    b += `<rect x="${x.p.x - 135}" y="${x.p.y - 50}" width="270" height="28" rx="14" fill="${x.c}"/><rect x="${x.p.x - 135}" y="${x.p.y - 36}" width="270" height="14" fill="${x.c}"/>`;
    b += text(x.t, { x: x.p.x, y: x.p.y - 30 }, { color: '#fff', weight: 'bold', size: 15 });
    x.it.forEach((s, k) => { b += text(s, { x: x.p.x, y: x.p.y - 2 + k * 20 }, { size: 13 }); });
  });
  save('so-do-nlxh-con-nguoi-va-ai.svg', svg(960, 540, b, 'Sơ đồ tư duy: con người và AI'));
}
