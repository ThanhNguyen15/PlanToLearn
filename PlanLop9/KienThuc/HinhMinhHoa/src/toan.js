// Hình minh họa môn Toán 9
const L = require('./lib');
const { C, svg, line, arrow, text, rect, box, circle, dot, poly, polyline, path, P, angleArc, rightAngle, tick, mid, lerp, ang, note, table, r1 } = L;

const F = {};

// ---------- tiện ích ----------
// cung đánh dấu góc nhỏ tại đỉnh V tạo bởi hai tia VU, VW
const angAt = (V, U, W, c = 'red', rr = 20, fill) => {
  let a1 = ang(V, U), a2 = ang(V, W);
  let d = a2 - a1; while (d < 0) d += 360;
  if (d > 180) [a1, a2] = [a2, a1];
  return angleArc(V[0], V[1], a1, a2, rr, { c, fill });
};
// kí hiệu góc vuông tại V giữa hai tia VU, VW
const rightAt = (V, U, W, s = 11, c = 'ink') => {
  const a = ang(V, U), b = ang(V, W);
  let d = b - a; while (d < 0) d += 360;
  return rightAngle(V[0], V[1], d < 180 ? a : b, s, c);
};
const ell = (cx, cy, rx, ry, o = {}) => `<ellipse cx="${r1(cx)}" cy="${r1(cy)}" rx="${r1(rx)}" ry="${r1(ry)}" fill="${C[o.fill] || o.fill || 'none'}" stroke="${C[o.c] || o.c || C.ink}" stroke-width="${o.w ?? 2}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}/>`;
const lbl = (p, s, dx = 0, dy = 0, o = {}) => text(p[0] + dx, p[1] + dy, s, { bold: true, size: 15, ...o });
const foot = (Pt, U, V) => {
  const vx = V[0] - U[0], vy = V[1] - U[1];
  const t = ((Pt[0] - U[0]) * vx + (Pt[1] - U[1]) * vy) / (vx * vx + vy * vy);
  return [U[0] + t * vx, U[1] + t * vy];
};
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const panelBg = (x, y, w, h, fill = 'panel') => rect(x, y, w, h, { fill, c: 'grid' });

// hệ trục tọa độ nhỏ: trả về hàm đổi tọa độ và chuỗi vẽ trục
function axes(x0, y0, sc, xr, yr, o = {}) {
  const m = (x, y) => [x0 + x * sc, y0 - y * sc];
  let s = '';
  if (o.grid !== false) {
    for (let x = Math.ceil(xr[0]); x <= xr[1]; x++) s += line(...m(x, yr[0]), ...m(x, yr[1]), { c: 'grid', w: 1 });
    for (let y = Math.ceil(yr[0]); y <= yr[1]; y++) s += line(...m(xr[0], y), ...m(xr[1], y), { c: 'grid', w: 1 });
  }
  s += arrow(...m(xr[0], 0), ...m(xr[1] + 0.4, 0), { w: 1.5 }) + arrow(...m(0, yr[0]), ...m(0, yr[1] + 0.4), { w: 1.5 });
  s += text(...m(xr[1] + 0.3, -0.5), 'x', { italic: true, size: 13 }) + text(...m(0.4, yr[1] + 0.2), 'y', { italic: true, size: 13 });
  s += text(...m(-0.3, -0.6), 'O', { size: 12 });
  return { m, s };
}
const fnLine = (m, f, xa, xb, o = {}) => {
  const pts = [];
  for (let i = 0; i <= 60; i++) { const x = xa + ((xb - xa) * i) / 60; pts.push(m(x, f(x))); }
  return polyline(pts, o);
};

// ---------- Hệ hai phương trình: 3 trường hợp ----------
F['he-pt-ba-truong-hop'] = () => {
  const panel = (ox, title, sub, c, draw) => {
    let s = panelBg(ox + 6, 0, 288, 330);
    s += text(ox + 150, 24, title, { bold: true, size: 15, c });
    const { m, s: ax } = axes(ox + 110, 230, 28, [-3, 5], [-2.5, 5.5]);
    s += ax + draw(m);
    s += text(ox + 150, 318, sub, { size: 13 });
    return s;
  };
  let b = panel(0, 'Cắt nhau → 1 nghiệm', 'a/a\' ≠ b/b\'  ·  nghiệm (1; 2)', 'blue', (m) =>
    fnLine(m, (x) => x + 1, -3, 4.3, { c: 'blue', w: 2.5 }) + fnLine(m, (x) => -x + 3, -2.3, 5, { c: 'red', w: 2.5 }) +
    dot(...m(1, 2), 'ink', 5) + text(...m(2.2, 1.7), 'M(1; 2)', { bold: true, size: 13 }) +
    text(...m(2.3, 4.6), 'y = x + 1', { size: 12, c: 'blue', anchor: 'end' }) + text(...m(-1.2, 5.1), 'y = −x + 3', { size: 12, c: 'red', anchor: 'start' }) + text(0,0,'', { size: 12, c: 'red' }));
  b += panel(300, 'Song song → vô nghiệm', 'a/a\' = b/b\' ≠ c/c\'', 'red', (m) =>
    fnLine(m, (x) => x + 1, -3, 4.3, { c: 'blue', w: 2.5 }) + fnLine(m, (x) => x - 1, -1.4, 5, { c: 'red', w: 2.5 }) +
    text(...m(2.3, 4.6), 'y = x + 1', { size: 12, c: 'blue' }) + text(...m(4.1, 2.0), 'y = x − 1', { size: 12, c: 'red', anchor: 'start' }));
  b += panel(600, 'Trùng nhau → vô số nghiệm', 'a/a\' = b/b\' = c/c\'', 'green', (m) =>
    fnLine(m, (x) => -0.5 * x + 2, -3, 5, { c: 'green', w: 6 }) + fnLine(m, (x) => -0.5 * x + 2, -3, 5, { c: '#ffffff', w: 2, dash: '6 6' }) +
    text(...m(1.6, 3.9), 'x + 2y = 4\n2x + 4y = 8', { size: 12, c: 'green' }));
  return svg(900, 335, 'Hệ hai phương trình bậc nhất hai ẩn: mỗi phương trình là một đường thẳng', b);
};

// ---------- Quy trình giải bài toán bằng cách lập hệ / lập phương trình ----------
F['giai-toan-lap-he'] = () => {
  const steps = [
    ['1. Chọn ẩn', 'Gọi x, y là …\n(đơn vị, điều kiện)', 'fBlue', 'blue'],
    ['2. Lập hệ', 'Biểu diễn các đại lượng\nqua ẩn → 2 phương trình', 'fOrange', 'orange'],
    ['3. Giải hệ', 'Thế hoặc cộng đại số\n(kiểm tra bằng máy tính)', 'fGreen', 'green'],
    ['4. Trả lời', 'Đối chiếu điều kiện,\nghi rõ đơn vị', 'fPurple', 'purple'],
  ];
  let b = '';
  steps.forEach(([t, d, f, c], i) => {
    const x = 14 + i * 222;
    b += rect(x, 10, 200, 120, { fill: f, c }) + text(x + 100, 40, t, { bold: true, size: 17, c }) + text(x + 100, 74, d, { size: 13.5 });
    if (i < 3) b += arrow(x + 202, 70, x + 220, 70, { c: 'soft' });
  });
  const rows = [['Dạng bài', 'Công thức chìa khóa'], ['Chuyển động', 's = v · t ; xuôi dòng v + v_nước, ngược dòng v − v_nước'],
    ['Làm chung công việc', '1 giờ làm được 1/x công việc; cả hai: 1/x + 1/y'], ['Phần trăm, tăng giảm', 'tăng a% → nhân (1 + a%) ; giảm a% → nhân (1 − a%)'],
    ['Số có hai chữ số', 'số ab (hai chữ số a, b) = 10a + b (1 ≤ a ≤ 9; 0 ≤ b ≤ 9)'], ['Hình học', 'chu vi, diện tích, định lí Pythagore']];
  b += table(60, 150, [230, 550], 30, rows, { size: 13.5 });
  return svg(900, 340, 'Giải bài toán bằng cách lập hệ phương trình (4 bước)', b);
};

// ---------- Bất phương trình trên trục số ----------
F['bpt-truc-so'] = () => {
  const row = (y, title, c, a, dir, strict) => {
    const x0 = 250, u = 55;
    const X = (v) => x0 + (v + 4) * u;
    let s = text(20, y + 5, title, { anchor: 'start', bold: true, size: 15, c });
    s += arrow(X(-4.5), y, X(6.3), y, { w: 1.8 });
    for (let v = -4; v <= 6; v++) s += line(X(v), y - 5, X(v), y + 5, { w: 1.5 }) + text(X(v), y + 24, String(v).replace('-', '−'), { size: 12, c: 'soft' });
    // gạch bỏ phần không là nghiệm
    const [ga, gb] = dir > 0 ? [X(-4.5), X(a)] : [X(a), X(6.2)];
    for (let x = ga + 6; x < gb - 2; x += 9) s += line(x, y - 8, x + 6, y - 14, { c: 'soft', w: 1.5 });
    const [ka, kb] = dir > 0 ? [X(a), X(6.2)] : [X(-4.5), X(a)];
    s += line(ka, y, kb, y, { c, w: 5 });
    const br = dir > 0 ? (strict ? '(' : '[') : (strict ? ')' : ']');
    s += text(X(a), y + 8, br, { size: 26, bold: true, c });
    return s;
  };
  let b = row(40, 'x > 2', 'blue', 2, 1, true) + row(120, 'x ≤ −1', 'red', -1, -1, false);
  b += note(450, 180, 'Quy ước: gạch bỏ phần KHÔNG là nghiệm · "(" hoặc ")" : không lấy điểm đầu mút · "[" hoặc "]" : có lấy điểm đầu mút', 'ink', 13);
  b += box(110, 200, 680, 52, 'Nhân/chia hai vế với số ÂM → ĐỔI CHIỀU bất đẳng thức:  −2x > 6  ⇔  x < −3', { fill: 'fRed', c: 'red', bold: true, size: 15 });
  return svg(900, 262, 'Biểu diễn tập nghiệm của bất phương trình trên trục số', b);
};

// ---------- Thẻ công thức căn thức ----------
F['the-cong-thuc-can'] = () => {
  const cards = [
    ['√(A²) = |A|', 'A ≥ 0 → A ; A < 0 → −A', 'fBlue', 'blue'],
    ['√(A·B) = √A · √B', 'A ≥ 0, B ≥ 0', 'fGreen', 'green'],
    ['√(A/B) = √A / √B', 'A ≥ 0, B > 0', 'fGreen', 'green'],
    ['√(A²B) = |A|√B', 'đưa thừa số ra ngoài dấu căn (B ≥ 0)', 'fOrange', 'orange'],
    ['A/√B = A√B / B', 'trục căn thức ở mẫu (B > 0)', 'fPurple', 'purple'],
    ['1/(√a + √b) = (√a − √b)/(a − b)', 'nhân liên hợp (a ≠ b)', 'fPurple', 'purple'],
    ['∛(a³) = a', 'căn bậc ba: mọi số đều có, ∛(−8) = −2', 'fTeal', 'teal'],
    ['√A có nghĩa ⇔ A ≥ 0', '1/√A có nghĩa ⇔ A > 0', 'fRed', 'red'],
  ];
  let b = '';
  cards.forEach(([f, d, fill, c], i) => {
    const x = 14 + (i % 4) * 220, y = 8 + Math.floor(i / 4) * 116;
    b += rect(x, y, 208, 104, { fill, c }) + text(x + 104, y + 44, f, { bold: true, size: f.length > 22 ? 13.5 : 17, c }) + text(x + 104, y + 78, d, { size: 12 });
  });
  return svg(900, 240, 'Các phép biến đổi căn thức bậc hai (học thuộc 8 thẻ)', b);
};

// ---------- Tỉ số lượng giác, hệ thức cạnh – góc, ứng dụng ----------
F['ti-so-luong-giac'] = () => {
  let b = panelBg(6, 0, 288, 320) + panelBg(306, 0, 288, 320) + panelBg(606, 0, 288, 320);
  // panel 1
  const A = [60, 210], B = [250, 210], Cc = [60, 70];
  b += text(150, 24, 'Tỉ số lượng giác của góc α', { bold: true, size: 15, c: 'blue' });
  b += poly([A, B, Cc], { fill: 'fBlue' }) + rightAt(A, B, Cc) + angAt(B, A, Cc, 'red', 30);
  b += text(B[0] - 50, B[1] - 8, 'α', { c: 'red', bold: true, size: 15 });
  b += text(155, 230, 'cạnh kề', { size: 13, c: 'green', bold: true });
  b += text(34, 145, 'cạnh\nđối', { size: 13, c: 'orange', bold: true }) + text(178, 128, 'cạnh huyền', { size: 13, c: 'purple', bold: true });
  b += text(150, 262, 'sin α = đối/huyền  ·  cos α = kề/huyền', { size: 13 }) + text(150, 284, 'tan α = đối/kề  ·  cot α = kề/đối', { size: 13 });
  b += text(150, 306, '"Sin đi học, cos không hư, tan đoàn kết…"', { size: 11.5, c: 'soft', italic: true });
  // panel 2
  const A2 = [360, 220], B2 = [560, 220], C2 = [360, 80];
  b += text(450, 24, 'Hệ thức giữa cạnh và góc', { bold: true, size: 15, c: 'green' });
  b += poly([A2, B2, C2], { fill: 'fGreen' }) + rightAt(A2, B2, C2) + angAt(B2, A2, C2, 'red', 26) + angAt(C2, A2, B2, 'blue', 22);
  b += lbl(A2, 'A', -12, 16) + lbl(B2, 'B', 10, 16) + lbl(C2, 'C', -10, -6);
  b += text(460, 240, 'c', { italic: true, size: 15, c: 'soft' }) + text(346, 155, 'b', { italic: true, size: 15, c: 'soft' }) + text(470, 140, 'a', { italic: true, size: 15, c: 'soft' });
  b += text(450, 270, 'b = a·sin B = a·cos C', { size: 14, bold: true }) + text(450, 294, 'b = c·tan B = c·cot C', { size: 14, bold: true });
  // panel 3: đo chiều cao
  b += text(750, 24, 'Ứng dụng: đo chiều cao', { bold: true, size: 15, c: 'orange' });
  const E = [650, 225], T = [850, 70], Bt = [850, 225];
  b += rect(835, 70, 30, 190, { fill: 'fOrange', c: 'orange', rx: 2 });
  b += line(...E, ...Bt, { c: 'ink', dash: '6 4' }) + line(...E, ...T, { c: 'red' }) + angAt(E, Bt, T, 'red', 34);
  b += text(700, 216, 'α', { c: 'red', bold: true }) + text(750, 244, 'd', { italic: true, size: 15 });
  b += line(650, 225, 650, 260, { w: 3, c: 'blue' }) + text(632, 247, 'h₀', { size: 12, c: 'blue' }) + line(620, 260, 890, 260, { c: 'soft' });
  b += text(750, 286, 'Chiều cao = d · tan α + h₀', { bold: true, size: 14 }) + text(750, 306, '(h₀: chiều cao tầm mắt / giác kế)', { size: 12, c: 'soft' });
  return svg(900, 325, 'Tỉ số lượng giác và hệ thức trong tam giác vuông', b);
};

F['goc-dac-biet'] = () => {
  const rows = [['', '30°', '45°', '60°'], ['sin', '1/2', '√2/2', '√3/2'], ['cos', '√3/2', '√2/2', '1/2'], ['tan', '√3/3', '1', '√3'], ['cot', '√3', '1', '√3/3']];
  let b = table(40, 10, [90, 120, 120, 120], 40, rows, { size: 17 });
  b += box(560, 10, 320, 200, 'Mẹo nhớ:\n• sin α = cos(90° − α)\n• tan α = cot(90° − α)\n• sin²α + cos²α = 1\n• tan α · cot α = 1\n• α tăng → sin, tan tăng; cos, cot giảm', { fill: 'fOrange', c: 'orange', size: 14 });
  return svg(900, 220, 'Tỉ số lượng giác của các góc đặc biệt', b);
};

// ---------- Vị trí đường thẳng – đường tròn ----------
F['vi-tri-duong-thang-duong-tron'] = () => {
  const panel = (ox, title, d, sub, c) => {
    let s = panelBg(ox + 6, 0, 288, 290);
    s += text(ox + 150, 24, title, { bold: true, size: 15, c });
    const O = [ox + 150, 130], R = 70;
    s += circle(...O, R, { fill: 'fBlue', c: 'blue' }) + dot(...O) + text(O[0] - 12, O[1] - 6, 'O', { bold: true });
    const y = O[1] + d;
    s += line(ox + 20, y, ox + 280, y, { c, w: 2.5 }) + text(ox + 270, y - 8, 'a', { italic: true, c });
    s += line(...O, O[0], y, { dash: '5 4', w: 1.5 }) + rightAngle(O[0], y, 0, 10) + text(O[0] + 12, (O[1] + y) / 2 + 4, 'd', { italic: true, anchor: 'start' });
    if (d < R) { const k = Math.sqrt(R * R - d * d); s += dot(O[0] - k, y, 'red', 5) + dot(O[0] + k, y, 'red', 5); }
    if (d === R) s += dot(O[0], y, 'red', 5) + text(O[0] - 14, y + 18, 'H', { bold: true });
    s += text(ox + 150, 262, sub, { size: 13.5, bold: true });
    return s;
  };
  let b = panel(0, 'Cắt nhau: 2 điểm chung', 40, 'd < R', 'green');
  b += panel(300, 'Tiếp xúc: 1 điểm chung', 70, 'd = R  ·  a ⊥ OH tại H', 'red');
  b += panel(600, 'Không giao nhau', 105, 'd > R', 'soft');
  return svg(900, 295, 'Vị trí tương đối của đường thẳng a và đường tròn (O; R)  (d = khoảng cách từ O đến a)', b);
};

// ---------- Hai tiếp tuyến cắt nhau (bài gốc) ----------
F['hai-tiep-tuyen'] = () => {
  const O = [170, 175], R = 80, A = [470, 175];
  const d = dist(O, A), th = (Math.acos(R / d) * 180) / Math.PI;
  const B = P(O[0], O[1], R, th), Cc = P(O[0], O[1], R, -th);
  const H = [O[0] + (R * R) / d, O[1]];
  let b = circle(...mid(O, A), d / 2, { c: 'green', dash: '6 5', w: 1.5 });
  b += circle(...O, R, { fill: 'fBlue', c: 'blue' });
  b += line(...O, ...A) + line(...A, ...B, { c: 'red', w: 2.5 }) + line(...A, ...Cc, { c: 'red', w: 2.5 });
  b += line(...O, ...B) + line(...O, ...Cc) + line(...B, ...Cc, { dash: '6 4' });
  b += rightAt(B, O, A) + rightAt(Cc, O, A) + rightAngle(H[0], H[1], 0, 10);
  b += tick(...A, ...B, 2) + tick(...A, ...Cc, 2) + angAt(A, B, O, 'orange', 50) + angAt(A, O, Cc, 'orange', 56);
  b += lbl(O, 'O', -16, 5) + lbl(A, 'A', 14, 5) + lbl(B, 'B', -4, -10) + lbl(Cc, 'C', -4, 24) + lbl(H, 'H', 14, 20);
  b += text(305, 348, 'Đường tròn đường kính OA (nét đứt xanh) đi qua B và C', { size: 12.5, c: 'green' });
  b += box(560, 30, 330, 290, 'Từ điểm A ngoài (O), vẽ hai\ntiếp tuyến AB, AC (B, C là tiếp điểm):\n\n① AB = AC\n② AO là tia phân giác góc BAC\n③ OA ⊥ BC tại H, HB = HC\n④ Tứ giác ABOC nội tiếp\n    (vì B̂ + Ĉ = 90° + 90° = 180°)\n⑤ OH · OA = OB² = R²\n⑥ AH · AO = AB²', { fill: 'fOrange', c: 'orange', size: 14 });
  return svg(900, 358, 'Bài gốc lớp 9: hai tiếp tuyến cắt nhau', b);
};

// ---------- Góc ở tâm, góc nội tiếp ----------
F['goc-noi-tiep'] = () => {
  const panel = (ox, title, sub, c, fn) => {
    let s = panelBg(ox + 6, 0, 288, 320);
    s += text(ox + 150, 24, title, { bold: true, size: 15, c });
    const O = [ox + 150, 160], R = 95;
    s += circle(...O, R, { c: 'blue' }) + fn(O, R);
    s += text(ox + 150, 300, sub, { size: 13.5, bold: true });
    return s;
  };
  let b = panel(0, 'Góc ở tâm – góc nội tiếp', 'ACB = ½ AOB = ½ sđ cung AB', 'blue', (O, R) => {
    const A = P(...O, R, 205), B = P(...O, R, 335), Cc = P(...O, R, 100);
    return angleArc(...O, 205, 335, R, { c: 'red', w: 5 }) + line(...O, ...A) + line(...O, ...B) + line(...Cc, ...A, { c: 'green' }) + line(...Cc, ...B, { c: 'green' }) +
      angleArc(O[0], O[1], 205, 335, 22, { c: 'orange', fill: 'fOrange' }) + angAt(Cc, A, B, 'green', 26, 'fGreen') + dot(...O) +
      lbl(O, 'O', 0, -10) + lbl(A, 'A', -14, 10) + lbl(B, 'B', 14, 10) + lbl(Cc, 'C', 0, -10);
  });
  b += panel(300, 'Cùng chắn một cung', 'ACB = ADB (cùng chắn cung AB)', 'green', (O, R) => {
    const A = P(...O, R, 210), B = P(...O, R, 330), Cc = P(...O, R, 120), D = P(...O, R, 55);
    return angleArc(...O, 210, 330, R, { c: 'red', w: 5 }) + line(...Cc, ...A, { c: 'green' }) + line(...Cc, ...B, { c: 'green' }) + line(...D, ...A, { c: 'purple' }) + line(...D, ...B, { c: 'purple' }) +
      angAt(Cc, A, B, 'green', 24, 'fGreen') + angAt(D, A, B, 'purple', 24, 'fPurple') + dot(...O) + lbl(O, 'O', -12, 4) +
      lbl(A, 'A', -14, 10) + lbl(B, 'B', 14, 10) + lbl(Cc, 'C', -8, -8) + lbl(D, 'D', 10, -8);
  });
  b += panel(600, 'Chắn nửa đường tròn', 'Góc nội tiếp chắn nửa đường tròn = 90°', 'red', (O, R) => {
    const A = P(...O, R, 180), B = P(...O, R, 0), Cc = P(...O, R, 115);
    return line(...A, ...B, { c: 'red', w: 2.5 }) + line(...Cc, ...A, { c: 'green' }) + line(...Cc, ...B, { c: 'green' }) + rightAt(Cc, A, B, 13, 'red') + dot(...O) +
      lbl(O, 'O', 0, 20) + lbl(A, 'A', -14, 5) + lbl(B, 'B', 14, 5) + lbl(Cc, 'C', -6, -10);
  });
  return svg(900, 325, 'Góc ở tâm và góc nội tiếp', b);
};

// ---------- Độ dài cung, diện tích hình quạt, hình vành khuyên ----------
F['cung-quat-vanh-khuyen'] = () => {
  const panel = (ox, title, f, c) => panelBg(ox + 6, 0, 288, 290) + text(ox + 150, 24, title, { bold: true, size: 15, c }) + text(ox + 150, 270, f, { bold: true, size: 15, c });
  let b = panel(0, 'Độ dài cung n°', 'ℓ = πRn / 180', 'red');
  let O = [150, 145];
  b += circle(...O, 85, { c: 'soft', w: 1.5 }) + angleArc(...O, 20, 120, 85, { c: 'red', w: 6 }) + line(...O, ...P(...O, 85, 20), { w: 1.5 }) + line(...O, ...P(...O, 85, 120), { w: 1.5 });
  b += angleArc(...O, 20, 120, 22, { c: 'orange' }) + text(O[0] + 6, O[1] - 30, 'n°', { size: 13, c: 'orange', bold: true }) + text(120, 180, 'R', { italic: true }) + dot(...O);
  b += panel(300, 'Diện tích hình quạt', 'S = πR²n / 360 = ℓR / 2', 'blue');
  O = [450, 145];
  b += circle(...O, 85, { c: 'soft', w: 1.5 }) + angleArc(...O, 20, 120, 85, { c: 'blue', fill: 'fBlue' }) + text(O[0] + 4, O[1] - 40, 'n°', { size: 13, c: 'blue', bold: true }) + dot(...O);
  b += panel(600, 'Hình vành khuyên', 'S = π(R² − r²)', 'green');
  O = [750, 145];
  b += circle(...O, 90, { fill: 'fGreen', c: 'green' }) + circle(...O, 50, { fill: 'bg', c: 'green' }) + dot(...O);
  b += line(...O, ...P(...O, 90, 30), { w: 1.5 }) + text(...P(...O, 72, 42), 'R', { italic: true }) + line(...O, ...P(...O, 50, 200), { w: 1.5, c: 'red' }) + text(...P(...O, 30, 185), 'r', { italic: true, c: 'red' });
  b += note(450, 310, 'Chu vi đường tròn C = 2πR · Diện tích hình tròn S = πR²  ·  π ≈ 3,14', 'ink', 13);
  return svg(900, 320, 'Đo cung, hình quạt tròn và hình vành khuyên', b);
};

// ---------- Đồ thị y = ax² ----------
F['parabol-y-ax2'] = () => {
  const panel = (ox, title, a, yr, c) => {
    let s = panelBg(ox + 6, 0, 428, 330);
    s += text(ox + 220, 24, title, { bold: true, size: 15, c });
    const y0 = a > 0 ? 270 : 95;
    const { m, s: ax } = axes(ox + 220, y0, 32, [-4, 4], yr);
    s += ax + fnLine(m, (x) => a * x * x, a > 0 ? -2.45 : -3, a > 0 ? 2.45 : 3, { c, w: 3 });
    [-2, -1, 1, 2].forEach((x) => { s += dot(...m(x, a * x * x), c, 4.5); });
    s += dot(...m(0, 0), 'ink', 5);
    const tx = ox + (a > 0 ? 306 : 330), ty = a > 0 ? 80 : 250;
    s += text(tx, ty, a > 0 ? 'y = x²' : 'y = −½x²', { bold: true, size: 16, c, anchor: 'start' });
    s += text(tx, ty + 22, a > 0 ? 'bề lõm hướng lên' : 'bề lõm hướng xuống', { size: 12.5, anchor: 'start' });
    s += text(tx, ty + 40, a > 0 ? 'O: điểm thấp nhất' : 'O: điểm cao nhất', { size: 12.5, anchor: 'start' });
    return s;
  };
  let b = panel(0, 'a > 0', 1, [-1, 6], 'blue') + panel(450, 'a < 0', -0.5, [-5, 0.8], 'red');
  b += note(450, 352, 'Parabol đỉnh O(0; 0), nhận trục Oy làm trục đối xứng · Lập bảng 5 giá trị x = −2; −1; 0; 1; 2 rồi nối thành đường cong', 'ink', 13);
  return svg(900, 362, 'Đồ thị hàm số y = ax² (a ≠ 0)', b);
};

// ---------- Sơ đồ giải phương trình bậc hai ----------
F['so-do-delta'] = () => {
  let b = box(300, 6, 300, 44, 'ax² + bx + c = 0  (a ≠ 0)', { fill: 'fBlue', c: 'blue', bold: true, size: 16 });
  b += arrow(450, 50, 450, 74) + box(300, 76, 300, 44, 'Δ = b² − 4ac', { fill: 'fOrange', c: 'orange', bold: true, size: 17 });
  const br = [
    [20, 'Δ > 0', 'Hai nghiệm phân biệt\nx₁,₂ = (−b ± √Δ) / 2a', 'fGreen', 'green'],
    [320, 'Δ = 0', 'Nghiệm kép\nx₁ = x₂ = −b / 2a', 'fPurple', 'purple'],
    [620, 'Δ < 0', 'Phương trình\nvô nghiệm', 'fRed', 'red'],
  ];
  br.forEach(([x, t, d, f, c]) => {
    b += arrow(450, 120, x + 130, 150, { c: 'soft' }) + box(x, 152, 260, 34, t, { fill: f, c, bold: true, size: 16 }) + box(x, 192, 260, 62, d, { fill: 'bg', c, size: 14 });
  });
  b += box(20, 268, 860, 74, 'Khi b = 2b\' (b chẵn) dùng Δ\' = b\'² − ac :  Δ\' > 0 → x₁,₂ = (−b\' ± √Δ\') / a ;  Δ\' = 0 → x = −b\'/a\nMẹo: a và c TRÁI DẤU (ac < 0) ⇒ chắc chắn có 2 nghiệm phân biệt trái dấu.\nPhương trình khuyết: ax² + bx = 0 → đặt x làm nhân tử chung ; ax² + c = 0 → x² = −c/a', { fill: 'panel', c: 'soft', size: 13.5 });
  return svg(900, 350, 'Công thức nghiệm của phương trình bậc hai', b);
};

F['vi-et'] = () => {
  let b = box(14, 8, 420, 120, 'Nếu x₁, x₂ là hai nghiệm của ax² + bx + c = 0 thì:\n\nS = x₁ + x₂ = −b/a   ·   P = x₁ · x₂ = c/a', { fill: 'fBlue', c: 'blue', size: 15, align: 'start' });
  b += box(466, 8, 420, 120, 'Nhẩm nghiệm:\n• a + b + c = 0 → x₁ = 1 ; x₂ = c/a\n• a − b + c = 0 → x₁ = −1 ; x₂ = −c/a\n• Hai số có tổng S, tích P là nghiệm của X² − SX + P = 0', { fill: 'fGreen', c: 'green', size: 14 });
  b += box(14, 144, 420, 130, 'Biểu thức đối xứng thường gặp:\n• x₁² + x₂² = S² − 2P\n• 1/x₁ + 1/x₂ = S / P\n• (x₁ − x₂)² = S² − 4P\n• x₁³ + x₂³ = S³ − 3SP', { fill: 'fOrange', c: 'orange', size: 14 });
  b += box(466, 144, 420, 130, 'Điều kiện về dấu nghiệm:\n• Hai nghiệm trái dấu ⇔ ac < 0\n• Hai nghiệm dương ⇔ Δ ≥ 0, S > 0, P > 0\n• Hai nghiệm âm ⇔ Δ ≥ 0, S < 0, P > 0\n⚠ Luôn kiểm tra Δ ≥ 0 TRƯỚC khi dùng Viète', { fill: 'fRed', c: 'red', size: 14 });
  return svg(900, 284, 'Định lí Viète và ứng dụng', b);
};

// ---------- Tần số, tần số tương đối ----------
F['tan-so-tuong-doi'] = () => {
  let b = panelBg(6, 0, 438, 360) + panelBg(456, 0, 438, 360);
  b += text(225, 24, 'Biểu đồ cột tần số tương đối (điểm kiểm tra)', { bold: true, size: 14, c: 'blue' });
  const vals = [['6', 4], ['7', 8], ['8', 10], ['9', 6], ['10', 2]], n = 30;
  const ox = 70, oy = 290, h = 220;
  for (let p = 0; p <= 40; p += 10) b += line(ox, oy - (p / 40) * h, ox + 340, oy - (p / 40) * h, { c: 'grid', w: 1 }) + text(ox - 8, oy - (p / 40) * h + 4, p + '%', { anchor: 'end', size: 11, c: 'soft' });
  vals.forEach(([v, f], i) => {
    const pct = (f / n) * 100, x = ox + 20 + i * 64, bh = (pct / 40) * h;
    b += rect(x, oy - bh, 40, bh, { fill: 'blue', c: 'blue', rx: 2 }) + text(x + 20, oy - bh - 6, pct.toFixed(1).replace('.', ',') + '%', { size: 11.5, bold: true }) + text(x + 20, oy + 18, v, { size: 13 });
  });
  b += line(ox, oy, ox + 340, oy) + text(225, 334, 'Điểm · n = 30 · f = tần số : n × 100%', { size: 12.5, c: 'soft' });
  b += text(675, 24, 'Tần số tương đối GHÉP NHÓM (chiều cao, cm)', { bold: true, size: 14, c: 'green' });
  const gr = [['145', 3], ['150', 9], ['155', 12], ['160', 6]];
  const ox2 = 520;
  for (let p = 0; p <= 40; p += 10) b += line(ox2, oy - (p / 40) * h, ox2 + 340, oy - (p / 40) * h, { c: 'grid', w: 1 }) + text(ox2 - 8, oy - (p / 40) * h + 4, p + '%', { anchor: 'end', size: 11, c: 'soft' });
  gr.forEach(([v, f], i) => {
    const pct = (f / n) * 100, x = ox2 + 20 + i * 75, bh = (pct / 40) * h;
    b += rect(x, oy - bh, 75, bh, { fill: 'fGreen', c: 'green', rx: 0 }) + text(x + 37, oy - bh - 6, pct + '%', { size: 12, bold: true }) + text(x, oy + 18, v, { size: 12 });
  });
  b += text(ox2 + 320, oy + 18, '165', { size: 12 }) + line(ox2, oy, ox2 + 340, oy);
  b += text(675, 334, 'Các cột LIỀN NHAU · nhóm [a; b) không lấy b', { size: 12.5, c: 'soft' });
  return svg(900, 362, 'Tần số tương đối và tần số tương đối ghép nhóm', b);
};

// ---------- Không gian mẫu ----------
F['khong-gian-mau'] = () => {
  const ox = 90, oy = 40, s = 46;
  let b = text(ox + 3 * s, 18, 'Gieo 2 con xúc xắc: Ω có 6 × 6 = 36 kết quả', { bold: true, size: 14 });
  for (let i = 1; i <= 6; i++) {
    b += text(ox + (i - 0.5) * s, oy - 6, String(i), { bold: true, size: 13, c: 'blue' }) + text(ox - 14, oy + (i - 0.5) * s + 5, String(i), { bold: true, size: 13, c: 'red' });
    for (let j = 1; j <= 6; j++) {
      const hit = i + j === 7;
      b += rect(ox + (j - 1) * s, oy + (i - 1) * s, s, s, { rx: 0, fill: hit ? 'fGreen' : 'bg', c: hit ? 'green' : 'grid', w: hit ? 2 : 1 }) + text(ox + (j - 0.5) * s, oy + (i - 0.5) * s + 5, `(${i};${j})`, { size: 11, c: hit ? 'green' : 'soft', bold: hit });
    }
  }
  b += text(ox - 50, oy + 3 * s + 30, 'Lần 1', { size: 12, c: 'red' }) + text(ox + 3 * s, oy + 6 * s + 22, 'Lần 2', { size: 12, c: 'blue' });
  b += text(ox + 3 * s, oy + 6 * s + 46, 'Tổng bằng 7: 6 kết quả → P = 6/36 = 1/6', { bold: true, size: 14, c: 'green' });
  // cây tung 2 đồng xu
  const tx = 520;
  b += text(tx + 170, 18, 'Sơ đồ cây: tung 2 đồng xu', { bold: true, size: 14 });
  const root = [tx + 20, 170];
  const L1 = [[tx + 130, 100, 'S'], [tx + 130, 240, 'N']];
  L1.forEach(([x, y, a]) => {
    b += line(...root, x - 14, y, { c: 'soft' }) + circle(x, y, 14, { fill: 'fOrange', c: 'orange' }) + text(x, y + 5, a, { bold: true });
    [[-38, 'S'], [38, 'N']].forEach(([dy, c2]) => {
      const x2 = x + 120, y2 = y + dy;
      b += line(x + 14, y, x2 - 14, y2, { c: 'soft' }) + circle(x2, y2, 14, { fill: 'fBlue', c: 'blue' }) + text(x2, y2 + 5, c2, { bold: true }) + text(x2 + 60, y2 + 5, a + c2, { bold: true, size: 15, c: 'purple' });
    });
  });
  b += dot(...root, 'ink', 5);
  b += box(tx, 300, 360, 76, 'P(A) = (số kết quả thuận lợi cho A) : (số phần tử của Ω)\n(chỉ dùng khi các kết quả ĐỒNG KHẢ NĂNG)', { fill: 'fPurple', c: 'purple', size: 13.5 });
  return svg(900, 390, 'Liệt kê không gian mẫu: bảng và sơ đồ cây', b);
};

// ---------- Đường tròn ngoại tiếp, nội tiếp ----------
F['duong-tron-ngoai-noi-tiep'] = () => {
  const panel = (ox, title, sub, c) => panelBg(ox + 4, 0, 216, 330) + text(ox + 112, 22, title, { bold: true, size: 14, c }) + text(ox + 112, 300, sub, { size: 12, bold: true });
  let b = panel(0, 'Ngoại tiếp', 'O = giao 3 đường trung trực', 'blue');
  let O = [112, 160], R = 82;
  let A = P(...O, R, 105), B = P(...O, R, 215), Cc = P(...O, R, 330);
  b += circle(...O, R, { c: 'blue' }) + poly([A, B, Cc], { fill: 'fBlue' });
  [[A, B], [B, Cc], [Cc, A]].forEach(([u, v]) => { const M = mid(u, v); b += line(...O, ...M, { dash: '4 3', c: 'blue', w: 1.5 }) + rightAt(M, O, v, 7, 'blue'); });
  b += dot(...O, 'blue', 4) + text(O[0] - 12, O[1] + 18, 'O', { bold: true, c: 'blue' }) + note(112, 280, 'OA = OB = OC = R', 'ink', 12);
  b += panel(225, 'Nội tiếp', 'I = giao 3 đường phân giác', 'green');
  A = [300, 70]; B = [240, 245]; Cc = [420, 245];
  const a = dist(B, Cc), bb = dist(A, Cc), cc = dist(A, B);
  const I = [(a * A[0] + bb * B[0] + cc * Cc[0]) / (a + bb + cc), (a * A[1] + bb * B[1] + cc * Cc[1]) / (a + bb + cc)];
  const r = dist(I, foot(I, B, Cc));
  b += poly([A, B, Cc], { fill: 'fGreen', c: 'ink' }) + circle(...I, r, { c: 'green' });
  [A, B, Cc].forEach((V) => { b += line(...V, ...lerp(V, I, 1.0), { dash: '4 3', c: 'green', w: 1.5 }); });
  b += dot(...I, 'green', 4) + text(I[0] + 10, I[1] - 4, 'I', { bold: true, c: 'green' }) + note(337, 280, 'I cách đều 3 cạnh (bằng r)', 'ink', 12);
  b += panel(450, 'Tam giác vuông', 'O = trung điểm cạnh huyền', 'red');
  O = [562, 160]; R = 85;
  B = P(...O, R, 180); Cc = P(...O, R, 0); A = P(...O, R, 120);
  b += circle(...O, R, { c: 'red' }) + poly([A, B, Cc], { fill: 'fRed', c: 'ink' }) + rightAt(A, B, Cc, 10) + dot(...O, 'red', 4) + text(O[0], O[1] + 18, 'O', { bold: true, c: 'red' });
  b += lbl(A, 'A', -4, -8, { size: 13 }) + lbl(B, 'B', -10, 4, { size: 13 }) + lbl(Cc, 'C', 10, 4, { size: 13 }) + note(562, 280, 'R = BC / 2', 'ink', 12);
  b += panel(675, 'Tam giác đều cạnh a', 'Tâm ngoại tiếp ≡ tâm nội tiếp', 'purple');
  O = [787, 165]; R = 84;
  A = P(...O, R, 90); B = P(...O, R, 210); Cc = P(...O, R, 330);
  b += circle(...O, R, { c: 'purple' }) + poly([A, B, Cc], { fill: 'fPurple', c: 'ink' }) + circle(...O, R / 2, { c: 'purple', dash: '5 3' }) + dot(...O, 'purple', 4);
  b += note(787, 270, 'R = a√3 / 3   ·   r = a√3 / 6', 'ink', 12.5);
  return svg(900, 335, 'Đường tròn ngoại tiếp và nội tiếp tam giác', b);
};

// ---------- Tứ giác nội tiếp ----------
F['tu-giac-noi-tiep'] = () => {
  const O = [180, 175], R = 120;
  const A = P(...O, R, 125), B = P(...O, R, 205), Cc = P(...O, R, 315), D = P(...O, R, 40);
  let b = circle(...O, R, { c: 'blue' }) + poly([A, B, Cc, D], { fill: 'fBlue', c: 'ink' }) + dot(...O) + text(O[0] + 10, O[1] + 4, 'O', { bold: true });
  b += angAt(A, B, D, 'red', 26, 'fRed') + angAt(Cc, D, B, 'red', 26, 'fRed') + angAt(B, Cc, A, 'green', 22, 'fGreen') + angAt(D, A, Cc, 'green', 22, 'fGreen');
  b += lbl(A, 'A', -10, -8) + lbl(B, 'B', -14, 8) + lbl(Cc, 'C', 10, 16) + lbl(D, 'D', 14, -2);
  b += box(360, 14, 530, 140, 'Tính chất: tứ giác ABCD nội tiếp ⇒\n  Â + Ĉ = 180°   và   B̂ + D̂ = 180°\n(tổng hai góc đối bằng 180°)', { fill: 'fRed', c: 'red', size: 15 });
  b += box(360, 166, 530, 160, 'Cách chứng minh tứ giác nội tiếp (hay dùng):\n① Tổng hai góc đối bằng 180°\n② Hai đỉnh kề cùng nhìn cạnh nối hai đỉnh còn lại\n    dưới hai góc BẰNG NHAU (hay gặp: cùng bằng 90°)\n③ Bốn đỉnh cách đều một điểm (tìm được tâm)', { fill: 'fGreen', c: 'green', size: 14 });
  b += note(180, 330, 'Hình chữ nhật, hình vuông, hình thang cân luôn nội tiếp', 'ink', 12.5);
  return svg(900, 340, 'Tứ giác nội tiếp đường tròn', b);
};

// ---------- Đa giác đều và phép quay ----------
F['da-giac-deu-phep-quay'] = () => {
  const panel = (ox, n, title, sub, c, f) => {
    let s = panelBg(ox + 6, 0, 288, 300) + text(ox + 150, 24, title, { bold: true, size: 15, c });
    const O = [ox + 150, 150], R = 90;
    const pts = [];
    for (let k = 0; k < n; k++) pts.push(P(...O, R, 90 + (360 / n) * k));
    s += poly(pts, { fill: f, c }) + dot(...O) + text(O[0] + 12, O[1] + 16, 'O', { bold: true, size: 13 });
    s += line(...O, ...pts[0], { dash: '4 3', w: 1.5 }) + line(...O, ...pts[1], { dash: '4 3', w: 1.5 });
    s += angleArc(...O, 90, 90 + 360 / n, 30, { c: 'red' }) + text(...P(...O, 46, 90 + 180 / n), `${360 / n}°`, { size: 13, bold: true, c: 'red' });
    const a1 = P(...O, R + 14, 90 + 8), a2 = P(...O, R + 14, 90 + 360 / n - 8);
    s += path(`M${r1(a1[0])},${r1(a1[1])} A${R + 14},${R + 14} 0 0 0 ${r1(a2[0])},${r1(a2[1])}`, { c: 'red', arrow: true, w: 1.8 });
    s += text(ox + 150, 272, sub, { size: 13 });
    return s;
  };
  let b = panel(0, 3, 'Tam giác đều', 'Quay 120°, 240° giữ nguyên hình', 'blue', 'fBlue');
  b += panel(300, 4, 'Hình vuông', 'Quay 90°, 180°, 270° giữ nguyên', 'green', 'fGreen');
  b += panel(600, 6, 'Lục giác đều', 'Quay 60°, 120°, … giữ nguyên', 'purple', 'fPurple');
  b += note(450, 322, 'Đa giác đều n cạnh: mỗi góc = (n − 2)·180° / n · phép quay tâm O góc 360°/n (ngược chiều kim đồng hồ) biến hình thành chính nó', 'ink', 13);
  return svg(900, 330, 'Đa giác đều và phép quay', b);
};

// ---------- Hình trụ, nón, cầu ----------
F['hinh-tru-non-cau'] = () => {
  const panel = (ox, title, f, c) => panelBg(ox + 6, 0, 288, 360) + text(ox + 150, 24, title, { bold: true, size: 16, c }) + box(ox + 20, 268, 260, 80, f, { fill: 'bg', c, size: 14 });
  const halfEll = (cx, cy, rx, ry, front, o) => path(`M${cx - rx},${cy} A${rx},${ry} 0 0 ${front ? 0 : 1} ${cx + rx},${cy}`, { ...o, dash: front ? undefined : '6 4' });
  let b = panel(0, 'Hình trụ', 'Sxq = 2πrh\nStp = 2πrh + 2πr²\nV = πr²h', 'blue');
  let cx = 150, top = 70, bot = 220, rx = 70, ry = 18;
  b += `<rect x="${cx - rx}" y="${top}" width="${2 * rx}" height="${bot - top}" fill="${C.fBlue}" stroke="none"/>`;
  b += ell(cx, bot, rx, ry, { fill: 'fBlue', c: 'none', w: 0 }) + ell(cx, top, rx, ry, { fill: '#bfdbfe', c: 'blue' });
  b += line(cx - rx, top, cx - rx, bot, { c: 'blue' }) + line(cx + rx, top, cx + rx, bot, { c: 'blue' }) + halfEll(cx, bot, rx, ry, true, { c: 'blue' }) + halfEll(cx, bot, rx, ry, false, { c: 'blue', w: 1.5 });
  b += line(cx, top, cx + rx, top, { c: 'red', w: 1.5 }) + text(cx + 35, top - 6, 'r', { italic: true, c: 'red' }) + line(cx, top, cx, bot, { dash: '5 4', w: 1.5 }) + text(cx + 10, 150, 'h', { italic: true });
  b += panel(300, 'Hình nón', 'Sxq = πrl   (l² = r² + h²)\nStp = πrl + πr²\nV = ⅓πr²h', 'orange');
  cx = 450; const apex = [cx, 60];
  b += poly([apex, [cx - rx, bot], [cx + rx, bot]], { fill: 'fOrange', c: 'none', w: 0 }) + ell(cx, bot, rx, ry, { fill: 'fOrange', c: 'none', w: 0 });
  b += line(...apex, cx - rx, bot, { c: 'orange' }) + line(...apex, cx + rx, bot, { c: 'orange' }) + halfEll(cx, bot, rx, ry, true, { c: 'orange' }) + halfEll(cx, bot, rx, ry, false, { c: 'orange', w: 1.5 });
  b += line(...apex, cx, bot, { dash: '5 4', w: 1.5 }) + line(cx, bot, cx + rx, bot, { c: 'red', w: 1.5 }) + rightAngle(cx, bot, 0, 9);
  b += text(cx - 10, 150, 'h', { italic: true }) + text(cx + 35, bot - 6, 'r', { italic: true, c: 'red' }) + text(cx + 46, 135, 'l', { italic: true, bold: true, c: 'purple', size: 16 });
  b += panel(600, 'Hình cầu', 'S = 4πR²\nV = ⁴⁄₃πR³\n(mặt cầu = 4 hình tròn lớn)', 'green');
  cx = 750; const cy = 150, R = 85;
  b += circle(cx, cy, R, { fill: 'fGreen', c: 'green' }) + halfEll(cx, cy, R, 22, true, { c: 'green', w: 1.5 }) + halfEll(cx, cy, R, 22, false, { c: 'green', w: 1.2 });
  b += dot(cx, cy) + line(cx, cy, cx + R, cy, { c: 'red', w: 1.8 }) + text(cx + 40, cy - 8, 'R', { italic: true, c: 'red' });
  return svg(900, 365, 'Hình trụ – hình nón – hình cầu', b);
};

// ---------- Bài gốc: hai đường cao, tứ giác nội tiếp ----------
F['bai-goc-truc-tam'] = () => {
  const A = [200, 40], B = [60, 300], Cc = [380, 300];
  const E = foot(B, A, Cc), Fp = foot(Cc, A, B);
  // H = giao BE và CF
  const inter = (p1, p2, p3, p4) => {
    const d = (p1[0] - p2[0]) * (p3[1] - p4[1]) - (p1[1] - p2[1]) * (p3[0] - p4[0]);
    const t = ((p1[0] - p3[0]) * (p3[1] - p4[1]) - (p1[1] - p3[1]) * (p3[0] - p4[0])) / d;
    return [p1[0] + t * (p2[0] - p1[0]), p1[1] + t * (p2[1] - p1[1])];
  };
  const H = inter(B, E, Cc, Fp);
  const D = foot(A, B, Cc);
  const rb = dist(B, Cc) / 2;
  let b = path(`M${Cc[0]},${Cc[1]} A${rb},${rb} 0 0 0 ${B[0]},${B[1]}`, { c: 'blue', dash: '6 5', w: 1.5 }) + text(...mid(B, Cc), '', {}) +circle(...mid(A, H), dist(A, H) / 2, { c: 'green', dash: '6 5', w: 1.5 });
  b += poly([A, B, Cc], { fill: 'none', c: 'ink' }) + line(...B, ...E, { c: 'red' }) + line(...Cc, ...Fp, { c: 'red' }) + line(...A, ...D, { c: 'red', dash: '5 4', w: 1.5 });
  b += rightAt(E, B, Cc, 10, 'red') + rightAt(Fp, Cc, B, 10, 'red') + rightAt(D, A, Cc, 9, 'red');
  b += lbl(A, 'A', 0, -8) + lbl(B, 'B', -14, 8) + lbl(Cc, 'C', 14, 8) + lbl(E, 'E', 14, -2) + lbl(Fp, 'F', -14, -2) + lbl(H, 'H', 14, 4) + lbl(D, 'D', 0, 20);
  b += box(470, 10, 420, 320, 'Cho △ABC nhọn, hai đường cao BE, CF cắt nhau tại H.\n\n① BCEF nội tiếp: E, F cùng nhìn BC dưới góc 90°\n    → tâm là trung điểm BC (vòng xanh dương)\n② AEHF nội tiếp: Ê + F̂ = 90° + 90° = 180°\n    → đường tròn đường kính AH (vòng xanh lá)\n③ △ABE ∽ △ACF (g.g) ⇒ AE · AC = AF · AB\n④ AH ⊥ BC (H là trực tâm, AD là đường cao thứ ba)\n\nMẹo: thấy 2 góc vuông → nghĩ ngay\n"tứ giác nội tiếp"!', { fill: 'fOrange', c: 'orange', size: 14 });
  return svg(900, 340, 'Bài gốc lớp 9: hai đường cao và tứ giác nội tiếp', b);
};

module.exports = F;
