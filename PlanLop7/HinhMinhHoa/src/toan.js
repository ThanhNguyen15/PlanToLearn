// Hình minh họa môn Toán
const L = require('./lib');
const { C, svg, line, arrow, text, rect, box, circle, dot, poly, polyline, path, P, angleArc, rightAngle, tick, mid, lerp, ang, note, table } = L;

const F = {};

// ---------- Góc tạo bởi cát tuyến và hai đường thẳng song song ----------
F['goc-song-song'] = () => {
  const panel = (ox, title, hl, formula) => {
    const A = [ox + 175, 85], B = [ox + 120, 205];
    const dirUp = ang(B, A); // ~65°
    let s = rect(ox + 8, 0, 284, 300, { fill: 'panel', c: 'grid' });
    s += text(ox + 150, 22, title, { bold: true, size: 15 });
    s += line(ox + 20, A[1], ox + 280, A[1], { w: 2.2 }) + text(ox + 272, A[1] - 8, 'a', { italic: true });
    s += line(ox + 20, B[1], ox + 280, B[1], { w: 2.2 }) + text(ox + 272, B[1] - 8, 'b', { italic: true });
    const t1 = P(A[0], A[1], 40, dirUp), t2 = P(B[0], B[1], 40, dirUp + 180);
    s += line(t1[0], t1[1], t2[0], t2[1], { w: 2.2 }) + text(t1[0] + 10, t1[1] + 4, 'c', { italic: true });
    // 4 vùng góc tại mỗi giao điểm: 1 trên-phải, 2 trên-trái, 3 dưới-trái, 4 dưới-phải
    const regions = [[0, dirUp], [dirUp, 180], [180, dirUp + 180], [dirUp + 180, 360]];
    const draw = (Pt, name) => {
      regions.forEach(([a1, a2], i) => {
        const key = name + (i + 1);
        const h = hl[key];
        if (h) s += angleArc(Pt[0], Pt[1], a1, a2, 24, { fill: h === 'red' ? 'fRed' : h === 'blue' ? 'fBlue' : 'fGreen', c: h });
        const [lx, ly] = P(Pt[0], Pt[1], 38, (a1 + a2) / 2);
        s += text(lx, ly + 5, String(i + 1), { size: 13, c: h || 'soft', bold: !!h });
      });
      s += dot(Pt[0], Pt[1]) + text(Pt[0] - 26, Pt[1] + (name === 'B' ? 20 : -8), name, { bold: true });
    };
    draw(A, 'A'); draw(B, 'B');
    s += text(ox + 150, 285, formula, { size: 15, bold: true, c: Object.values(hl)[0] });
    return s;
  };
  let b = panel(0, 'So le trong', { A3: 'red', B1: 'red' }, 'Â₃ = B̂₁ (khi a // b)');
  b += panel(300, 'Đồng vị', { A1: 'blue', B1: 'blue' }, 'Â₁ = B̂₁ (khi a // b)');
  b += panel(600, 'Trong cùng phía', { A4: 'green', B1: 'green' }, 'Â₄ + B̂₁ = 180°');
  return svg(900, 305, 'Đường thẳng c cắt hai đường thẳng song song a và b', b);
};

// ---------- Ba trường hợp bằng nhau ----------
F['tam-giac-bang-nhau'] = () => {
  const tri = (ox, oy) => ({ A: [ox + 45, oy], B: [ox, oy + 120], C: [ox + 105, oy + 120] });
  const draw = (t, names, mk) => {
    let s = poly([t.A, t.B, t.C], { fill: 'fBlue', c: 'ink' });
    s += text(t.A[0], t.A[1] - 8, names[0], { bold: true });
    s += text(t.B[0], t.B[1] + 20, names[1], { bold: true });
    s += text(t.C[0], t.C[1] + 20, names[2], { bold: true });
    return s + mk(t);
  };
  const angAt = (V, U, W, c, r = 20) => {
    let a1 = ang(V, U), a2 = ang(V, W);
    // lấy cung nhỏ
    let d = a2 - a1; while (d < 0) d += 360;
    if (d > 180) [a1, a2] = [a2, a1];
    return angleArc(V[0], V[1], a1, a2, r, { c });
  };
  const panel = (ox, title, sub, mk) => {
    let s = rect(ox + 8, 0, 284, 230, { fill: 'panel', c: 'grid' });
    s += text(ox + 150, 24, title, { bold: true, size: 17, c: 'blue' });
    s += draw(tri(ox + 28, 55), ['A', 'B', 'C'], mk);
    s += draw(tri(ox + 165, 55), ['D', 'E', 'F'], mk);
    s += text(ox + 150, 215, sub, { size: 13 });
    return s;
  };
  let b = panel(0, 'c.c.c', '3 cạnh bằng nhau', (t) => tick(...t.A, ...t.B, 1) + tick(...t.B, ...t.C, 2) + tick(...t.C, ...t.A, 3));
  b += panel(300, 'c.g.c', '2 cạnh + góc XEN GIỮA', (t) => tick(...t.A, ...t.B, 1) + tick(...t.C, ...t.A, 2) + angAt(t.A, t.B, t.C, 'red'));
  b += panel(600, 'g.c.g', '1 cạnh + 2 góc KỀ cạnh đó', (t) => tick(...t.B, ...t.C, 1) + angAt(t.B, t.A, t.C, 'red') + angAt(t.C, t.A, t.B, 'green', 24));
  b += text(450, 252, 'Viết kí hiệu: △ABC = △DEF — các đỉnh tương ứng A↔D, B↔E, C↔F viết cùng thứ tự', { size: 14, c: 'soft' });
  return svg(900, 265, 'Ba trường hợp bằng nhau của tam giác', b);
};

// ---------- Biểu đồ quạt tròn và đoạn thẳng ----------
F['bieu-do-quat-doan-thang'] = () => {
  let b = rect(8, 0, 424, 300, { fill: 'panel', c: 'grid' }) + rect(448, 0, 444, 300, { fill: 'panel', c: 'grid' });
  b += text(220, 24, 'Biểu đồ hình quạt tròn: phương tiện đến trường', { bold: true, size: 14 });
  const data = [['Xe đạp', 40, 'blue'], ['Bố mẹ đưa', 35, 'orange'], ['Đi bộ', 15, 'green'], ['Xe buýt', 10, 'purple']];
  const cx = 140, cy = 165, R = 105;
  let a = 90;
  data.forEach(([name, pct, c]) => {
    const a2 = a - pct * 3.6;
    const [x1, y1] = P(cx, cy, R, a), [x2, y2] = P(cx, cy, R, a2);
    const large = pct > 50 ? 1 : 0;
    b += `<path d="M${cx},${cy} L${L.r1(x1)},${L.r1(y1)} A${R},${R} 0 ${large} 1 ${L.r1(x2)},${L.r1(y2)} Z" fill="${C[c]}" fill-opacity="0.85" stroke="#fff" stroke-width="2"/>`;
    const [lx, ly] = P(cx, cy, R * 0.62, (a + a2) / 2);
    b += text(lx, ly + 5, pct + '%', { bold: true, c: '#ffffff', size: 15 });
    a = a2;
  });
  data.forEach(([name, pct, c], i) => {
    b += rect(275, 95 + i * 34, 18, 18, { fill: c, c, rx: 3 }) + text(300, 109 + i * 34, `${name}: ${pct}%`, { anchor: 'start', size: 14 });
  });
  b += note(340, 250, '25% ↔ góc ở tâm 90°\nx% ↔ x% · 360°', 'ink', 13);
  // đoạn thẳng
  const ox = 500, oy = 250, w = 360, h = 180;
  b += text(670, 24, 'Biểu đồ đoạn thẳng: nhiệt độ lúc 12 giờ', { bold: true, size: 14 });
  const ys = [30, 32, 31, 34, 33], days = ['T2', 'T3', 'T4', 'T5', 'T6'];
  const yv = (v) => oy - ((v - 28) / 8) * h;
  for (let v = 28; v <= 36; v += 2) {
    b += line(ox, yv(v), ox + w, yv(v), { c: 'grid', w: 1 }) + text(ox - 8, yv(v) + 4, v + '', { anchor: 'end', size: 12, c: 'soft' });
  }
  b += arrow(ox, oy, ox + w + 15, oy) + arrow(ox, oy, ox, oy - h - 20);
  b += text(ox + 4, oy - h - 24, '°C', { anchor: 'start', size: 12 });
  const pts = ys.map((v, i) => [ox + 40 + i * 75, yv(v)]);
  b += polyline(pts, { c: 'red', w: 3 });
  pts.forEach(([x, y], i) => { b += dot(x, y, 'red', 5) + text(x, y - 10, ys[i] + '', { size: 13, bold: true, c: 'red' }) + text(x, oy + 18, days[i], { size: 13 }); });
  b += note(670, 292, 'Đoạn đi lên: tăng · đi xuống: giảm · càng dốc: thay đổi càng nhanh', 'ink', 12);
  return svg(900, 305, 'Hai loại biểu đồ lớp 7', b);
};

// ---------- 4 điểm đồng quy ----------
F['dong-quy-4-diem'] = () => {
  const mk = (ox) => ({ A: [ox + 105, 60], B: [ox + 25, 215], C: [ox + 205, 215] });
  const d = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
  const foot = (Pt, U, V) => { // chân đường vuông góc từ P xuống UV
    const vx = V[0] - U[0], vy = V[1] - U[1];
    const t = ((Pt[0] - U[0]) * vx + (Pt[1] - U[1]) * vy) / (vx * vx + vy * vy);
    return [U[0] + t * vx, U[1] + t * vy];
  };
  const base = (t, ox, title, sub, c) => {
    let s = rect(ox + 6, 0, 218, 300, { fill: 'panel', c: 'grid' });
    s += text(ox + 115, 24, title, { bold: true, size: 15, c });
    s += poly([t.A, t.B, t.C], { c: 'ink', w: 2 });
    s += text(t.A[0], t.A[1] - 8, 'A', { bold: true }) + text(t.B[0] - 10, t.B[1] + 14, 'B', { bold: true }) + text(t.C[0] + 10, t.C[1] + 14, 'C', { bold: true });
    s += text(ox + 115, 272, sub, { size: 12.5 });
    return s;
  };
  let b = '';
  // trung tuyến
  { const ox = 0, t = mk(ox), c = 'blue';
    const M = [mid(t.B, t.C), mid(t.C, t.A), mid(t.A, t.B)], V = [t.A, t.B, t.C];
    let s = base(t, ox, 'Trung tuyến', 'Trọng tâm G\nAG = 2/3 AM', c);
    V.forEach((v, i) => { s += line(...v, ...M[i], { c, w: 1.8 }) + dot(...M[i], c); });
    s += tick(...t.B, ...M[0], 1) + tick(...M[0], ...t.C, 1);
    const G = [(t.A[0] + t.B[0] + t.C[0]) / 3, (t.A[1] + t.B[1] + t.C[1]) / 3];
    s += dot(...G, 'red', 5) + text(G[0] + 12, G[1] - 4, 'G', { bold: true, c: 'red' }) + text(M[0][0], M[0][1] + 16, 'M', { size: 13 });
    b += s; }
  // phân giác
  { const ox = 225, t = mk(ox), c = 'green';
    const a = d(t.B, t.C), bb = d(t.C, t.A), cc = d(t.A, t.B);
    const I = [(a * t.A[0] + bb * t.B[0] + cc * t.C[0]) / (a + bb + cc), (a * t.A[1] + bb * t.B[1] + cc * t.C[1]) / (a + bb + cc)];
    const D = [(bb * t.B[0] + cc * t.C[0]) / (bb + cc), (bb * t.B[1] + cc * t.C[1]) / (bb + cc)];
    const E = [(a * t.A[0] + cc * t.C[0]) / (a + cc), (a * t.A[1] + cc * t.C[1]) / (a + cc)]; // trên CA từ B
    const Fp = [(a * t.A[0] + bb * t.B[0]) / (a + bb), (a * t.A[1] + bb * t.B[1]) / (a + bb)]; // trên AB từ C
    let s = base(t, ox, 'Phân giác', 'Điểm I cách đều 3 cạnh\n(tâm đường tròn nội tiếp)', c);
    s += line(...t.A, ...D, { c, w: 1.8 }) + line(...t.B, ...E, { c, w: 1.8 }) + line(...t.C, ...Fp, { c, w: 1.8 });
    const area = Math.abs((t.B[0] - t.A[0]) * (t.C[1] - t.A[1]) - (t.C[0] - t.A[0]) * (t.B[1] - t.A[1])) / 2;
    const r = (2 * area) / (a + bb + cc);
    s += circle(...I, r, { c, w: 1.5, dash: '5 4' }) + dot(...I, 'red', 5) + text(I[0] + 12, I[1] - 6, 'I', { bold: true, c: 'red' });
    b += s; }
  // trung trực
  { const ox = 450, t = mk(ox), c = 'purple';
    // tâm ngoại tiếp
    const [ax, ay] = t.A, [bx, by] = t.B, [cx, cy] = t.C;
    const D2 = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
    const ux = ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay - by)) / D2;
    const uy = ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx - ax)) / D2;
    const O = [ux, uy], R = d(O, t.A);
    let s = base(t, ox, 'Trung trực', 'Điểm O cách đều 3 đỉnh\n(tâm đường tròn ngoại tiếp)', c);
    [[t.B, t.C], [t.C, t.A], [t.A, t.B]].forEach(([U, V]) => {
      const M = mid(U, V);
      const vx = M[0] - O[0], vy = M[1] - O[1], len = Math.hypot(vx, vy) || 1;
      const e1 = [M[0] + (vx / len) * 22, M[1] + (vy / len) * 22], e2 = [O[0] - (vx / len) * 30, O[1] - (vy / len) * 30];
      s += line(...e1, ...e2, { c, w: 1.8 }) + rightAngle(M[0], M[1], ang(M, V), 8, c);
    });
    s += circle(...O, R, { c, w: 1.3, dash: '5 4' }) + dot(...O, 'red', 5) + text(O[0] + 12, O[1] + 4, 'O', { bold: true, c: 'red' });
    b += s; }
  // đường cao
  { const ox = 675, t = mk(ox), c = 'orange';
    const V = [t.A, t.B, t.C], opp = [[t.B, t.C], [t.C, t.A], [t.A, t.B]];
    let s = base(t, ox, 'Đường cao', 'Trực tâm H', c);
    const feet = V.map((v, i) => foot(v, ...opp[i]));
    V.forEach((v, i) => { s += line(...v, ...feet[i], { c, w: 1.8 }) + rightAngle(feet[i][0], feet[i][1], ang(feet[i], opp[i][1]), 7, c); });
    // trực tâm: giao AH_a và BH_b
    const [p1, p2] = [t.A, feet[0]], [p3, p4] = [t.B, feet[1]];
    const den = (p1[0] - p2[0]) * (p3[1] - p4[1]) - (p1[1] - p2[1]) * (p3[0] - p4[0]);
    const tt = ((p1[0] - p3[0]) * (p3[1] - p4[1]) - (p1[1] - p3[1]) * (p3[0] - p4[0])) / den;
    const H = [p1[0] + tt * (p2[0] - p1[0]), p1[1] + tt * (p2[1] - p1[1])];
    s += dot(...H, 'red', 5) + text(H[0] + 12, H[1] - 2, 'H', { bold: true, c: 'red' });
    b += s; }
  b += text(450, 322, 'Tam giác đều: G, I, O, H trùng nhau · Tam giác cân tại A: 4 đường xuất phát từ A (và trung trực BC) trùng nhau', { size: 13, c: 'soft' });
  return svg(900, 330, 'Bốn loại đường đồng quy trong tam giác', b);
};

// ---------- Hình khối ----------
F['hinh-khoi-lang-tru'] = () => {
  const d = [42, -30];
  const solid = (front, hiddenIdx, ox, title, sub, fill) => {
    // front: các đỉnh mặt trước (theo thứ tự); back = front + d; hiddenIdx: chỉ số đỉnh bị khuất ở mặt sau
    const back = front.map(([x, y]) => [x + d[0], y + d[1]]);
    let s = rect(ox + 6, 0, 213, 250, { fill: 'panel', c: 'grid' }) + text(ox + 112, 24, title, { bold: true, size: 14 });
    s += poly(front, { fill, c: 'ink' });
    const n = front.length;
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      const hid = hiddenIdx.includes(i) || hiddenIdx.includes(j);
      s += line(...back[i], ...back[j], { dash: hid ? '5 4' : '', c: hid ? 'soft' : 'ink' });
      const hidV = hiddenIdx.includes(i);
      s += line(...front[i], ...back[i], { dash: hidV ? '5 4' : '', c: hidV ? 'soft' : 'ink' });
    }
    s += text(ox + 112, 222, sub, { size: 12.5 });
    return s;
  };
  let b = '';
  b += solid([[30, 190], [150, 190], [150, 110], [30, 110]], [0], 0, 'Hình hộp chữ nhật', 'S_xq = 2(a + b)·c\nV = a·b·c', 'fBlue');
  b += text(90, 206, 'a', { italic: true, c: 'blue' }) + text(172, 175, 'b', { italic: true, c: 'blue' }) + text(18, 155, 'c', { italic: true, c: 'blue' });
  b += solid([[255, 190], [345, 190], [345, 100], [255, 100]], [0], 225, 'Hình lập phương', 'S_xq = 4a²\nV = a³', 'fGreen');
  b += solid([[475, 190], [585, 190], [530, 110]], [0], 450, 'Lăng trụ đứng tam giác', 'S_xq = C_đáy · h\nV = S_đáy · h', 'fOrange');
  b += solid([[690, 190], [810, 190], [785, 120], [715, 120]], [0], 675, 'Lăng trụ đứng tứ giác', 'Đáy: hình thang\nV = S_đáy · h', 'fPurple');
  b += text(450, 268, 'Nét liền: cạnh nhìn thấy · Nét đứt: cạnh bị khuất · Mặt tô màu: một mặt đáy (mặt trước)', { size: 13, c: 'soft' });
  return svg(900, 275, 'Một số hình khối trong thực tiễn', b);
};

// ---------- Trục số hữu tỉ ----------
F['truc-so-huu-ti'] = () => {
  const ox = 450, u = 160, y = 90;
  let b = arrow(60, y, 850, y, { w: 2 });
  for (let k = -10; k <= 10; k++) {
    const x = ox + (k / 4) * u;
    const big = k % 4 === 0;
    b += line(x, y - (big ? 9 : 5), x, y + (big ? 9 : 5), { w: big ? 2 : 1.2, c: big ? 'ink' : 'soft' });
    if (big) b += text(x, y + 30, String(k / 4).replace('-', '−'), { size: 15, bold: true });
  }
  const pts = [[-1.5, '−1,5 = −3/2', 'purple'], [-0.75, '−3/4', 'red'], [0.5, '1/2', 'blue'], [1.25, '5/4', 'green']];
  pts.forEach(([v, s, c], i) => {
    const x = ox + v * u;
    b += dot(x, y, c, 6) + text(x, y - 18 - (i % 2) * 18, s, { size: 15, bold: true, c });
  });
  b += note(450, 150, 'Đoạn đơn vị chia 4 phần bằng nhau (mẫu số 4). Điểm bên trái luôn nhỏ hơn điểm bên phải: −3/2 < −3/4 < 1/2 < 5/4', 'ink', 13);
  return svg(900, 165, 'Biểu diễn số hữu tỉ trên trục số', b);
};

// ---------- Thẻ công thức lũy thừa ----------
F['the-cong-thuc-luy-thua'] = () => {
  const cards = [
    ['Nhân cùng cơ số', 'xᵐ · xⁿ = xᵐ⁺ⁿ', 'Cộng số mũ', 'fBlue', 'blue'],
    ['Chia cùng cơ số', 'xᵐ : xⁿ = xᵐ⁻ⁿ', 'Trừ số mũ (x ≠ 0, m ≥ n)', 'fBlue', 'blue'],
    ['Lũy thừa của lũy thừa', '(xᵐ)ⁿ = xᵐ·ⁿ', 'Nhân số mũ', 'fGreen', 'green'],
    ['Lũy thừa của tích', '(x·y)ⁿ = xⁿ·yⁿ', '', 'fOrange', 'orange'],
    ['Lũy thừa của thương', '(x/y)ⁿ = xⁿ/yⁿ', 'y ≠ 0', 'fOrange', 'orange'],
    ['Dấu của lũy thừa', '(−x)ⁿ: mũ chẵn → dương\nmũ lẻ → âm', 'x⁰ = 1 (x ≠ 0)', 'fRed', 'red'],
  ];
  let b = '';
  cards.forEach(([t, f, n, fill, c], i) => {
    const x = 20 + (i % 3) * 290, y = 10 + Math.floor(i / 3) * 140;
    b += rect(x, y, 270, 125, { fill, c, w: 2, rx: 14 });
    b += text(x + 135, y + 26, t, { bold: true, size: 15, c });
    b += text(x + 135, y + 66, f, { size: f.includes('\n') ? 17 : 24, bold: true });
    b += text(x + 135, y + 110, n, { size: 13, c: 'soft' });
  });
  return svg(900, 290, 'Sáu công thức lũy thừa cần thuộc', b);
};

// ---------- Tập hợp số ----------
F['tap-hop-so'] = () => {
  let b = rect(20, 10, 860, 300, { fill: 'fGray', c: 'ink', rx: 22, w: 2 }) + text(50, 40, 'ℝ  số thực', { anchor: 'start', bold: true, size: 18 });
  b += rect(40, 55, 560, 240, { fill: 'fBlue', c: 'blue', rx: 20, w: 2 }) + text(60, 82, 'ℚ  số hữu tỉ (a/b)', { anchor: 'start', bold: true, size: 16, c: 'blue' });
  b += rect(60, 100, 360, 180, { fill: 'fGreen', c: 'green', rx: 18, w: 2 }) + text(80, 126, 'ℤ  số nguyên', { anchor: 'start', bold: true, size: 16, c: 'green' });
  b += rect(80, 145, 170, 120, { fill: 'fOrange', c: 'orange', rx: 16, w: 2 }) + text(100, 170, 'ℕ  số tự nhiên', { anchor: 'start', bold: true, size: 15, c: 'orange' });
  b += text(165, 215, '0; 1; 2; 15', { size: 16 });
  b += text(335, 215, '−1; −7; −100', { size: 16 });
  b += text(510, 170, '1/2; −3/4\n0,25; 0,(3)', { size: 16 });
  b += rect(620, 55, 245, 240, { fill: 'fPurple', c: 'purple', rx: 20, w: 2, dash: '6 4' }) + text(742, 82, '𝕀  số vô tỉ', { bold: true, size: 16, c: 'purple' });
  b += text(742, 140, '√2; √3; π\n1,41421356…\n(thập phân vô hạn\nkhông tuần hoàn)', { size: 15 });
  b += text(450, 335, 'ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ      ·      ℝ = ℚ ∪ 𝕀 (số hữu tỉ và số vô tỉ)', { size: 16, bold: true });
  return svg(900, 345, 'Các tập hợp số đã học', b);
};

// ---------- Giá trị tuyệt đối ----------
F['gia-tri-tuyet-doi'] = () => {
  const ox = 450, u = 70, y = 120;
  let b = arrow(60, y, 850, y);
  for (let k = -5; k <= 5; k++) { const x = ox + k * u; b += line(x, y - 7, x, y + 7) + text(x, y + 26, String(k).replace('-', '−'), { size: 14 }); }
  b += path(`M${ox - 3 * u},${y - 10} Q${ox - 1.5 * u},${y - 90} ${ox},${y - 10}`, { c: 'red', w: 2.5 });
  b += path(`M${ox},${y - 10} Q${ox + 1.5 * u},${y - 90} ${ox + 3 * u},${y - 10}`, { c: 'blue', w: 2.5 });
  b += text(ox - 1.5 * u, y - 60, 'khoảng cách 3', { c: 'red', bold: true, size: 14 });
  b += text(ox + 1.5 * u, y - 60, 'khoảng cách 3', { c: 'blue', bold: true, size: 14 });
  b += dot(ox - 3 * u, y, 'red', 6) + dot(ox + 3 * u, y, 'blue', 6) + dot(ox, y, 'ink', 6);
  b += text(450, 180, '|−3| = |3| = 3   ·   |x| = 3 ⇔ x = 3 hoặc x = −3   ·   |x| ≥ 0 với mọi x', { size: 16, bold: true });
  return svg(900, 195, 'Giá trị tuyệt đối = khoảng cách từ x đến 0 trên trục số', b);
};

// ---------- Góc kề bù, đối đỉnh, tia phân giác ----------
F['goc-ke-bu-doi-dinh'] = () => {
  let b = '';
  const pan = (ox, t) => rect(ox + 6, 0, 288, 240, { fill: 'panel', c: 'grid' }) + text(ox + 150, 24, t, { bold: true, size: 15 });
  // kề bù
  { const O = [150, 170];
    b += pan(0, 'Hai góc kề bù') + line(25, 170, 275, 170) + text(20, 160, "x'", { italic: true }) + text(278, 160, 'x', { italic: true });
    const Y = P(...O, 120, 55); b += line(...O, ...Y) + text(Y[0] + 8, Y[1], 'y', { italic: true });
    b += angleArc(...O, 0, 55, 30, { c: 'blue', fill: 'fBlue' }) + angleArc(...O, 55, 180, 24, { c: 'red', fill: 'fRed' });
    b += text(200, 158, '55°', { c: 'blue', bold: true }) + text(110, 140, '125°', { c: 'red', bold: true }) + text(...O.map((v, i) => v + (i ? 18 : 0)), 'O', { bold: true });
    b += text(150, 225, "xOy + yOx' = 180°", { bold: true }); }
  // đối đỉnh
  { const O = [450, 140];
    b += pan(300, 'Hai góc đối đỉnh');
    const a1 = P(...O, 120, 25), a2 = P(...O, 120, 205), c1 = P(...O, 120, 150), c2 = P(...O, 120, 330);
    b += line(...a1, ...a2) + line(...c1, ...c2);
    b += angleArc(...O, 25, 150, 26, { c: 'red', fill: 'fRed' }) + angleArc(...O, 205, 330, 26, { c: 'red', fill: 'fRed' });
    b += angleArc(...O, 150, 205, 30, { c: 'blue', fill: 'fBlue' }) + angleArc(...O, 330, 385, 30, { c: 'blue', fill: 'fBlue' });
    b += text(450, 225, 'Hai góc đối đỉnh thì bằng nhau', { bold: true }); }
  // tia phân giác
  { const O = [640, 190];
    b += pan(600, 'Tia phân giác');
    const X = P(...O, 210, 0), Y = P(...O, 145, 80), Z = P(...O, 175, 40);
    b += line(...O, ...X) + line(...O, ...Y) + line(...O, ...Z, { c: 'green', w: 2.5 });
    b += text(X[0] - 4, X[1] - 8, 'x', { italic: true }) + text(Y[0] + 10, Y[1] + 4, 'y', { italic: true }) + text(Z[0] + 8, Z[1], 'z', { italic: true, c: 'green', bold: true });
    b += angleArc(...O, 0, 40, 40, { c: 'orange' }) + angleArc(...O, 40, 80, 40, { c: 'orange' }) + angleArc(...O, 0, 40, 45, { c: 'orange' }) + angleArc(...O, 40, 80, 45, { c: 'orange' });
    b += text(O[0] - 12, O[1] + 6, 'O', { bold: true });
    b += text(750, 225, 'xOz = zOy = xOy : 2', { bold: true }); }
  return svg(900, 245, 'Các góc ở vị trí đặc biệt', b);
};

// ---------- Góc gấp khúc ----------
F['goc-gap-khuc'] = () => {
  const A = [130, 40], O = [258, 147], B = [95, 250];
  let b = line(40, 40, 560, 40, { w: 2.2 }) + line(40, 250, 560, 250, { w: 2.2 });
  b += text(560, 30, 'x', { italic: true }) + text(560, 240, 'y', { italic: true });
  b += line(...A, ...O, { c: 'blue', w: 2.5 }) + line(...B, ...O, { c: 'blue', w: 2.5 });
  b += line(...O, 60, O[1], { c: 'green', w: 2, dash: '7 5' }) + text(52, O[1] + 5, 'z', { italic: true, c: 'green', bold: true });
  b += angleArc(...A, 320, 360, 34, { c: 'red', fill: 'fRed' }) + text(A[0] + 50, A[1] + 22, '40°', { c: 'red', bold: true });
  b += angleArc(...B, 0, 30, 40, { c: 'purple', fill: 'fPurple' }) + text(B[0] + 58, B[1] - 8, '30°', { c: 'purple', bold: true });
  b += angleArc(...O, 140, 180, 30, { c: 'red', fill: 'fRed' }) + angleArc(...O, 180, 210, 36, { c: 'purple', fill: 'fPurple' });
  b += dot(...A) + dot(...B) + dot(...O);
  b += text(A[0] - 6, A[1] - 10, 'A', { bold: true }) + text(B[0] - 6, B[1] + 20, 'B', { bold: true }) + text(O[0] + 14, O[1] + 4, 'O', { bold: true });
  b += box(600, 30, 285, 220, 'Mẹo: qua O kẻ Oz // Ax\n(nên Oz // By)\n\nAOz = xAO = 40° (so le trong)\nzOB = yBO = 30° (so le trong)\n\n⇒ AOB = 40° + 30° = 70°', { fill: 'fGreen', c: 'green', size: 14 });
  return svg(900, 270, 'Bài toán góc gấp khúc giữa hai đường thẳng song song', b);
};

// ---------- Bài gốc tam giác cân ----------
F['bai-goc-tam-giac-can'] = () => {
  const A = [220, 30], B = [110, 215], C = [330, 215], M = [220, 215], D = [220, 400];
  let b = poly([A, B, C], { fill: 'fBlue' }) + line(...A, ...M, { c: 'blue', w: 2.2 }) + line(...M, ...D, { c: 'blue', w: 2.2, dash: '7 5' });
  b += line(...C, ...D, { c: 'red', w: 2.5 }) + line(...A, ...B, { c: 'red', w: 2.5 });
  b += tick(...A, ...B, 1) + tick(...A, ...C, 1) + tick(...B, ...M, 2, 'blue') + tick(...M, ...C, 2, 'blue') + tick(...A, ...M, 3, 'green') + tick(...M, ...D, 3, 'green');
  b += rightAngle(...M, 90, 13);
  b += text(A[0], A[1] - 10, 'A', { bold: true }) + text(B[0] - 12, B[1] + 6, 'B', { bold: true }) + text(C[0] + 12, C[1] + 6, 'C', { bold: true });
  b += text(M[0] + 14, M[1] + 20, 'M', { bold: true }) + text(D[0], D[1] + 20, 'D', { bold: true });
  b += box(420, 20, 465, 380,
    'GT: △ABC cân tại A; MB = MC; MD = MA\n\na) △ABM = △ACM (c.c.c)\n   AB = AC, BM = CM, AM chung\n\nb) ⇒ AMB = AMC, kề bù ⇒ = 90°\n   ⇒ AM ⊥ BC; AM là phân giác góc A\n\nc) △AMB = △DMC (c.g.c)\n   MA = MD, AMB = DMC (đối đỉnh), MB = MC\n   ⇒ BAM = CDM (so le trong) ⇒ AB // CD\n\nCùng màu vạch = đoạn bằng nhau',
    { fill: 'panel', c: 'grid', size: 14 });
  return svg(900, 420, 'Bài gốc: tam giác cân + kéo dài trung tuyến gấp đôi', b);
};

// ---------- Tam giác cân, đều, vuông cân ----------
F['tam-giac-can-deu'] = () => {
  let b = '';
  const pan = (ox, t, s) => rect(ox + 6, 0, 288, 250, { fill: 'panel', c: 'grid' }) + text(ox + 150, 24, t, { bold: true, size: 15 }) + text(ox + 150, 235, s, { size: 13 });
  { const A = [150, 62], B = [80, 200], C = [220, 200];
    b += pan(0, 'Tam giác cân tại A', 'AB = AC ⇔ B̂ = Ĉ') + poly([A, B, C], { fill: 'fBlue' }) + tick(...A, ...B, 1) + tick(...A, ...C, 1);
    b += angleArc(...B, 0, ang(B, A), 24, { c: 'red' }) + angleArc(...C, ang(C, A), 180, 24, { c: 'red' });
    b += text(A[0], A[1] - 8, 'A', { bold: true }) + text(B[0] - 10, B[1] + 16, 'B', { bold: true }) + text(C[0] + 10, C[1] + 16, 'C', { bold: true }); }
  { const B = [370, 200], C = [530, 200], A = [450, 200 - 80 * Math.sqrt(3)];
    b += pan(300, 'Tam giác đều', '3 cạnh bằng nhau, mỗi góc 60°') + poly([A, B, C], { fill: 'fGreen' }) + tick(...A, ...B, 1) + tick(...A, ...C, 1) + tick(...B, ...C, 1);
    [[B, 0, 60], [C, 120, 180], [A, 240, 300]].forEach(([V, a1, a2]) => { b += angleArc(...V, a1, a2, 20, { c: 'green' }); });
    b += text(450, 190, '60°', { size: 12, c: 'green' }); }
  { const A = [680, 200], B = [680, 70], C = [810, 200];
    b += pan(600, 'Tam giác vuông cân tại A', 'AB = AC, Â = 90°, B̂ = Ĉ = 45°') + poly([A, B, C], { fill: 'fOrange' }) + rightAngle(...A, 0, 14) + tick(...A, ...B, 1) + tick(...A, ...C, 1);
    b += angleArc(...B, 270, 315, 26, { c: 'orange' }) + angleArc(...C, 135, 180, 26, { c: 'orange' });
    b += text(A[0] - 12, A[1] + 16, 'A', { bold: true }) + text(B[0] - 12, B[1], 'B', { bold: true }) + text(C[0] + 12, C[1] + 6, 'C', { bold: true }); }
  return svg(900, 255, 'Tam giác cân, tam giác đều, tam giác vuông cân', b);
};

// ---------- Đường trung trực ----------
F['duong-trung-truc'] = () => {
  const A = [150, 200], B = [450, 200], I = [300, 200], M = [300, 70];
  let b = line(...A, ...B, { w: 2.5 }) + line(300, 30, 300, 280, { c: 'purple', w: 2.5 }) + text(312, 40, 'd', { italic: true, c: 'purple', bold: true });
  b += line(...M, ...A, { c: 'blue', dash: '6 4' }) + line(...M, ...B, { c: 'blue', dash: '6 4' }) + tick(...M, ...A, 2, 'blue') + tick(...M, ...B, 2, 'blue');
  b += tick(...A, ...I, 1) + tick(...I, ...B, 1) + rightAngle(...I, 0, 13);
  // cung compa
  const r = 190;
  const h = Math.sqrt(r * r - 150 * 150);
  b += path(`M${L.r1(P(...A, r, 32)[0])},${L.r1(P(...A, r, 32)[1])} A${r},${r} 0 0 0 ${L.r1(P(...A, r, 48)[0])},${L.r1(P(...A, r, 48)[1])}`, { c: 'soft', w: 1.2 });
  b += dot(...A) + dot(...B) + dot(...I, 'red') + dot(...M, 'blue', 5);
  b += text(A[0] - 14, A[1] + 6, 'A', { bold: true }) + text(B[0] + 14, B[1] + 6, 'B', { bold: true }) + text(I[0] + 14, I[1] + 20, 'I', { bold: true }) + text(M[0] + 16, M[1] - 4, 'M', { bold: true, c: 'blue' });
  b += box(520, 40, 365, 200, 'd là trung trực của AB:\n• d ⊥ AB\n• d đi qua trung điểm I của AB\n\nM ∈ d ⇔ MA = MB\n(mọi điểm trên trung trực cách đều\nhai đầu đoạn thẳng)', { fill: 'fPurple', c: 'purple', size: 14 });
  void h;
  return svg(900, 290, 'Đường trung trực của đoạn thẳng', b);
};

// ---------- Tỉ lệ thuận, tỉ lệ nghịch ----------
F['ti-le-thuan-nghich'] = () => {
  let b = rect(8, 0, 434, 330, { fill: 'fBlue', c: 'blue' }) + rect(458, 0, 434, 330, { fill: 'fOrange', c: 'orange' });
  b += text(225, 26, 'Tỉ lệ thuận: y = 2x', { bold: true, size: 16, c: 'blue' });
  b += text(675, 26, 'Tỉ lệ nghịch: x · y = 12', { bold: true, size: 16, c: 'orange' });
  b += table(40, 45, [70, 70, 70, 70, 70], 30, [['x', '1', '2', '3', '4'], ['y', '2', '4', '6', '8']], { headFill: 'bg', size: 14 });
  b += table(490, 45, [62, 62, 62, 62, 62, 62].slice(0, 6), 30, [['x', '1', '2', '3', '4', '6'], ['y', '12', '6', '4', '3', '2']], { headFill: 'bg', size: 14 });
  // đồ thị
  const g = (ox, pts, c, xmax, ymax) => {
    const W = 340, H = 170, oy = 300;
    let s = arrow(ox, oy, ox + W + 10, oy) + arrow(ox, oy, ox, oy - H - 12);
    const X = (x) => ox + (x / xmax) * W, Y = (y) => oy - (y / ymax) * H;
    s += polyline(pts.map(([x, y]) => [X(x), Y(y)]), { c, w: 2.5 });
    pts.forEach(([x, y]) => { s += dot(X(x), Y(y), c, 4.5); });
    return s;
  };
  b += g(60, [[0, 0], [1, 2], [2, 4], [3, 6], [4, 8]], 'blue', 4.5, 9);
  b += g(510, [[1, 12], [1.5, 8], [2, 6], [3, 4], [4, 3], [6, 2]], 'orange', 6.5, 13);
  b += text(225, 135, 'y / x = 2 không đổi', { bold: true, size: 15, c: 'blue' }) + text(225, 155, 'x tăng gấp đôi ⇒ y tăng gấp đôi', { size: 13 });
  b += text(705, 135, 'x · y = 12 không đổi', { bold: true, size: 15, c: 'orange' }) + text(705, 155, 'x tăng gấp đôi ⇒ y giảm một nửa', { size: 13 });
  b += text(110, 318, 'x', { italic: true }) + text(560, 318, 'x', { italic: true });
  return svg(900, 335, 'Đại lượng tỉ lệ thuận và tỉ lệ nghịch', b);
};

// ---------- Giải phẫu đa thức ----------
F['giai-phau-da-thuc'] = () => {
  const y = 130;
  let b = text(215, y, 'P(x) =', { size: 40, bold: true });
  b += rect(305, 82, 120, 66, { c: 'red', w: 2.5, rx: 10, fill: 'fRed' }) + text(365, y, '−4x³', { size: 40, bold: true });
  b += text(450, y, '+', { size: 40, bold: true });
  b += rect(475, 82, 100, 66, { c: 'green', w: 2.5, rx: 10, dash: '6 4' }) + text(525, y, '2x²', { size: 40, bold: true });
  b += text(605, y, '−', { size: 40, bold: true });
  b += rect(625, 82, 70, 66, { c: 'blue', w: 2.5, rx: 10, fill: 'fBlue' }) + text(660, y, '7', { size: 40, bold: true });
  b += arrow(330, 82, 250, 42, { c: 'red' }) + text(170, 36, 'Hệ số cao nhất: −4', { c: 'red', bold: true, size: 15 });
  b += arrow(400, 82, 450, 40, { c: 'orange' }) + text(560, 34, 'Bậc của đa thức: 3 (số mũ lớn nhất)', { c: 'orange', bold: true, size: 15 });
  b += arrow(525, 148, 500, 190, { c: 'green' }) + text(470, 210, 'Một hạng tử (đơn thức)', { c: 'green', bold: true, size: 15 });
  b += arrow(660, 148, 720, 190, { c: 'blue' }) + text(760, 210, 'Hệ số tự do: −7', { c: 'blue', bold: true, size: 15 });
  b += text(450, 252, 'Sắp xếp theo lũy thừa giảm dần của x: x³ → x² → (không có x) → hệ số tự do', { size: 14, c: 'soft' });
  return svg(900, 265, 'Các thành phần của một đa thức một biến', b);
};

// ---------- Xúc xắc ----------
F['xac-suat-xuc-xac'] = () => {
  const pipsOf = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]], 5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] };
  let b = '';
  for (let n = 1; n <= 6; n++) {
    const x = 40 + (n - 1) * 140, y = 20, even = n % 2 === 0;
    b += rect(x, y, 100, 100, { fill: even ? 'fGreen' : 'bg', c: even ? 'green' : 'line', w: even ? 3 : 2, rx: 16 });
    pipsOf[n].forEach(([dx, dy]) => { b += dot(x + 50 + dx * 26, y + 50 + dy * 26, n === 1 ? 'red' : 'ink', 8); });
    b += text(x + 50, y + 125, `${n} chấm`, { size: 13, c: even ? 'green' : 'soft', bold: even });
  }
  b += text(450, 190, 'Biến cố A: "Gieo được số chấm chẵn" → kết quả thuận lợi: 2, 4, 6', { size: 16, bold: true, c: 'green' });
  b += text(450, 225, 'P(A) = số kết quả thuận lợi / tổng số kết quả = 3/6 = 1/2', { size: 18, bold: true });
  b += text(450, 258, 'Biến cố chắc chắn: P = 1 ("số chấm ≤ 6")   ·   Biến cố không thể: P = 0 ("số chấm là 7")', { size: 14, c: 'soft' });
  return svg(900, 270, 'Xác suất khi gieo một con xúc xắc cân đối', b);
};

// ---------- Bất đẳng thức tam giác ----------
F['bat-dang-thuc-tam-giac'] = () => {
  const u = 25;
  let b = rect(8, 0, 434, 270, { fill: 'fRed', c: 'red' }) + rect(458, 0, 434, 270, { fill: 'fGreen', c: 'green' });
  b += text(225, 26, 'Độ dài 3; 4; 8 → KHÔNG thành tam giác', { bold: true, size: 15, c: 'red' });
  { const A = [125, 210], B = [125 + 8 * u, 210];
    b += line(...A, ...B, { w: 3 }) + text(225, 235, '8', { bold: true });
    b += path(`M${A[0] + 3 * u},${A[1]} A${3 * u},${3 * u} 0 0 0 ${A[0] - 3 * u * 0.2},${A[1] - 3 * u * 0.98}`, { c: 'blue', dash: '5 4' });
    b += path(`M${B[0] - 4 * u},${B[1]} A${4 * u},${4 * u} 0 0 1 ${B[0] + 4 * u * 0.2},${B[1] - 4 * u * 0.98}`, { c: 'orange', dash: '5 4' });
    b += line(...A, A[0] + 3 * u * 0.6, A[1] - 3 * u * 0.8, { c: 'blue', w: 2.5 }) + line(...B, B[0] - 4 * u * 0.6, B[1] - 4 * u * 0.8, { c: 'orange', w: 2.5 });
    b += text(150, 150, '3', { c: 'blue', bold: true }) + text(300, 130, '4', { c: 'orange', bold: true });
    b += text(225, 70, '3 + 4 = 7 < 8: hai cạnh không "chạm" nhau', { size: 14 }); }
  b += text(675, 26, 'Độ dài 5; 6; 10 → thành tam giác', { bold: true, size: 15, c: 'green' });
  { const A = [550, 210], B = [550 + 10 * u, 210];
    const a = 5 * u, c2 = 6 * u, d = 10 * u;
    const x = (a * a - c2 * c2 + d * d) / (2 * d), y = Math.sqrt(a * a - x * x);
    const T = [A[0] + x, A[1] - y];
    b += poly([A, B, T], { fill: 'bg', c: 'ink', w: 2.5 });
    b += text(675, 235, '10', { bold: true }) + text((A[0] + T[0]) / 2 - 12, (A[1] + T[1]) / 2, '5', { bold: true, c: 'blue' }) + text((B[0] + T[0]) / 2 + 12, (B[1] + T[1]) / 2, '6', { bold: true, c: 'orange' });
    b += text(675, 70, '5 + 6 = 11 > 10 ✓', { size: 14 }); }
  b += text(450, 290, 'Kiểm tra nhanh: tổng hai cạnh nhỏ > cạnh lớn nhất  ⇔  ba đoạn tạo thành tam giác', { size: 15, bold: true });
  return svg(900, 300, 'Bất đẳng thức tam giác', b);
};

// ---------- Đường vuông góc, đường xiên ----------
F['duong-vuong-goc-duong-xien'] = () => {
  const A = [300, 40], H = [300, 220], B = [460, 220], Cc = [120, 220];
  let b = line(40, 220, 600, 220, { w: 2.5 }) + text(590, 210, 'd', { italic: true, bold: true });
  b += line(...A, ...H, { c: 'green', w: 3 }) + line(...A, ...B, { c: 'red', w: 2.5 }) + line(...A, ...Cc, { c: 'red', w: 2.5, dash: '7 4' });
  b += rightAngle(...H, 0, 14) + line(...H, ...B, { c: 'orange', w: 5 });
  b += dot(...A) + dot(...H) + dot(...B) + dot(...Cc);
  b += text(A[0], A[1] - 10, 'A', { bold: true }) + text(H[0] - 2, H[1] + 22, 'H', { bold: true }) + text(B[0], B[1] + 22, 'B', { bold: true }) + text(Cc[0], Cc[1] + 22, 'C', { bold: true });
  b += text(285, 140, 'AH', { c: 'green', bold: true, anchor: 'end' }) + text(400, 120, 'AB', { c: 'red', bold: true }) + text(380, 245, 'HB: hình chiếu của AB', { c: 'orange', size: 13 });
  b += box(620, 40, 265, 180, 'AH: đường vuông góc\nAB, AC: đường xiên\nH: hình chiếu của A trên d\n\nAH < AB, AH < AC\n(đường vuông góc ngắn nhất)', { fill: 'fGreen', c: 'green', size: 14 });
  return svg(900, 260, 'Đường vuông góc và đường xiên', b);
};

// ---------- Hình khai triển hình hộp ----------
F['trai-hinh-hop'] = () => {
  const a = 150, bb = 90, c = 100, x0 = 40, y0 = 165;
  const faces = [[x0, a, 'Mặt bên\na × c', 'fBlue'], [x0 + a, bb, 'Mặt bên\nb × c', 'fGreen'], [x0 + a + bb, a, 'Mặt bên\na × c', 'fBlue'], [x0 + 2 * a + bb, bb, 'Mặt bên\nb × c', 'fGreen']];
  let b = '';
  faces.forEach(([x, w, s, f]) => { b += box(x, y0, w, c, s, { fill: f, c: 'ink', rx: 0, size: 13 }); });
  b += box(x0 + a, y0 - a, bb, a, 'Đáy trên\na × b', { fill: 'fOrange', c: 'ink', rx: 0, size: 13 });
  b += box(x0 + a, y0 + c, bb, a, 'Đáy dưới\na × b', { fill: 'fOrange', c: 'ink', rx: 0, size: 13 });
  b += text(x0 + a + bb / 2, y0 + c + a + 20, '', {});
  b += box(600, 60, 285, 300, 'Ghép 4 mặt bên thành\nmột hình chữ nhật:\ndài = chu vi đáy 2(a + b)\nrộng = chiều cao c\n\n⇒ S_xq = 2(a + b) · c\n\nS_tp = S_xq + 2 · a · b', { fill: 'panel', c: 'grid', size: 14 });
  b += text(x0 + a + bb + a + bb / 2 - 30, y0 + c + 22, '', {});
  return svg(900, 430, 'Hình khai triển của hình hộp chữ nhật', b);
};

module.exports = F;
