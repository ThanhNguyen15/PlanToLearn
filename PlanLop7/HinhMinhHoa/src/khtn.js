// Hình minh họa môn Khoa học tự nhiên
const L = require('./lib');
const { C, svg, line, arrow, text, rect, box, circle, dot, poly, polyline, path, P, angleArc, rightAngle, note } = L;
const r1 = L.r1;

const F = {};

// ---------- Mô hình nguyên tử ----------
function atom(cx, cy, Z, shells, name, mass) {
  let s = '';
  shells.forEach((n, i) => {
    const R = 34 + i * 28;
    s += circle(cx, cy, R, { c: 'soft', w: 1.5 });
    for (let k = 0; k < n; k++) {
      const [x, y] = P(cx, cy, R, 90 + (360 / n) * k + i * 15);
      s += circle(x, y, 6, { fill: 'blue', c: 'blue', w: 1 });
    }
  });
  s += circle(cx, cy, 20, { fill: 'red', c: 'red' }) + text(cx, cy + 5, '+' + Z, { size: 13, bold: true, c: '#ffffff' });
  s += text(cx, cy + 34 + shells.length * 28 + 6, name, { bold: true, size: 15 });
  s += text(cx, cy + 34 + shells.length * 28 + 26, `${Z}p · ${Z}e · ${mass - Z}n · ${shells.join('/')}`, { size: 13, c: 'soft' });
  return s;
}
F['mo-hinh-nguyen-tu'] = () => {
  let b = atom(150, 140, 6, [2, 4], 'Carbon (C)', 12) + atom(450, 140, 11, [2, 8, 1], 'Sodium (Na)', 23) + atom(750, 140, 8, [2, 6], 'Oxygen (O)', 16);
  b += circle(330, 300, 10, { fill: 'red', c: 'red' }) + text(345, 305, 'Hạt nhân: proton (+) và neutron', { anchor: 'start', size: 13 });
  b += circle(600, 300, 6, { fill: 'blue', c: 'blue' }) + text(612, 305, 'Electron (−) trên các lớp', { anchor: 'start', size: 13 });
  return svg(900, 320, 'Mô hình nguyên tử Rutherford – Bohr (lớp 1 tối đa 2e, lớp 2 tối đa 8e)', b);
};

// ---------- Bảng tuần hoàn 20 nguyên tố ----------
F['bang-tuan-hoan-20'] = () => {
  const el = [
    [1, 'H', 'hydrogen', 1, 1, 1, 'pk'], [2, 'He', 'helium', 4, 1, 8, 'kh'],
    [3, 'Li', 'lithium', 7, 2, 1, 'kl'], [4, 'Be', 'beryllium', 9, 2, 2, 'kl'], [5, 'B', 'boron', 11, 2, 3, 'pk'], [6, 'C', 'carbon', 12, 2, 4, 'pk'], [7, 'N', 'nitrogen', 14, 2, 5, 'pk'], [8, 'O', 'oxygen', 16, 2, 6, 'pk'], [9, 'F', 'fluorine', 19, 2, 7, 'pk'], [10, 'Ne', 'neon', 20, 2, 8, 'kh'],
    [11, 'Na', 'sodium', 23, 3, 1, 'kl'], [12, 'Mg', 'magnesium', 24, 3, 2, 'kl'], [13, 'Al', 'aluminium', 27, 3, 3, 'kl'], [14, 'Si', 'silicon', 28, 3, 4, 'pk'], [15, 'P', 'phosphorus', 31, 3, 5, 'pk'], [16, 'S', 'sulfur', 32, 3, 6, 'pk'], [17, 'Cl', 'chlorine', 35.5, 3, 7, 'pk'], [18, 'Ar', 'argon', 40, 3, 8, 'kh'],
    [19, 'K', 'potassium', 39, 4, 1, 'kl'], [20, 'Ca', 'calcium', 40, 4, 2, 'kl'],
  ];
  const col = { kl: ['fBlue', 'blue'], pk: ['fOrange', 'orange'], kh: ['fPurple', 'purple'] };
  const W = 100, H = 76, ox = 70, oy = 40;
  let b = '';
  ['IA', 'IIA', 'IIIA', 'IVA', 'VA', 'VIA', 'VIIA', 'VIIIA'].forEach((g, i) => { b += text(ox + i * W + W / 2, oy - 10, g, { bold: true, size: 13, c: 'soft' }); });
  for (let p = 1; p <= 4; p++) b += text(ox - 30, oy + (p - 1) * H + H / 2 + 5, 'CK ' + p, { bold: true, size: 13, c: 'soft' });
  el.forEach(([z, s, n, m, p, g, k]) => {
    const x = ox + (g - 1) * W, y = oy + (p - 1) * H;
    b += rect(x + 2, y + 2, W - 4, H - 4, { fill: col[k][0], c: col[k][1], rx: 6 });
    b += text(x + 10, y + 18, String(z), { anchor: 'start', size: 12, bold: true });
    b += text(x + W / 2, y + 44, s, { size: 22, bold: true, c: col[k][1] });
    b += text(x + W / 2, y + 62, `${n} · ${String(m).replace('.', ',')}`, { size: 10.5 });
  });
  const lg = [['kl', 'Kim loại'], ['pk', 'Phi kim'], ['kh', 'Khí hiếm']];
  lg.forEach(([k, t], i) => { b += rect(ox + 300 + i * 150, oy + 4 * H + 18, 20, 20, { fill: col[k][0], c: col[k][1], rx: 4 }) + text(ox + 328 + i * 150, oy + 4 * H + 33, t, { anchor: 'start', size: 14 }); });
  b += text(ox + 4, oy + 4 * H + 33, 'Ô: số hiệu Z · kí hiệu · tên · KLNT (amu)', { anchor: 'start', size: 13, c: 'soft' });
  b += text(450, oy + 4 * H + 66, 'Số thứ tự chu kì (CK) = số lớp electron · Số thứ tự nhóm A = số electron lớp ngoài cùng', { size: 13.5, bold: true });
  return svg(900, oy + 4 * H + 80, '20 nguyên tố đầu tiên trong bảng tuần hoàn', b);
};

// ---------- Đơn chất, hợp chất ----------
const ball = (x, y, r, fill, lab, tc = '#ffffff') => circle(x, y, r, { fill, c: 'ink', w: 1.2 }) + (lab ? text(x, y + 5, lab, { size: r > 14 ? 13 : 11, bold: true, c: tc }) : '');
F['don-chat-hop-chat'] = () => {
  let b = rect(8, 0, 434, 270, { fill: 'fGreen', c: 'green' }) + rect(458, 0, 434, 270, { fill: 'fOrange', c: 'orange' });
  b += text(225, 28, 'ĐƠN CHẤT (1 nguyên tố)', { bold: true, size: 16, c: 'green' }) + text(675, 28, 'HỢP CHẤT (≥ 2 nguyên tố)', { bold: true, size: 16, c: 'orange' });
  // O2
  b += ball(70, 110, 22, C.red, 'O') + ball(105, 110, 22, C.red, 'O') + text(88, 160, 'Oxygen O₂', { size: 13 });
  b += ball(195, 110, 15, '#e5e7eb', 'H', C.ink) + ball(220, 110, 15, '#e5e7eb', 'H', C.ink) + text(208, 160, 'Hydrogen H₂', { size: 13 });
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) b += ball(300 + i * 34, 80 + j * 34, 16, '#b45309', 'Cu');
  b += text(334, 200, 'Copper Cu (kim loại)', { size: 13 });
  b += text(225, 240, 'O₃ (ozone) cũng là đơn chất!', { size: 13, c: 'green', bold: true });
  // H2O
  b += ball(560, 110, 22, C.red, 'O') + ball(532, 135, 15, '#e5e7eb', 'H', C.ink) + ball(588, 135, 15, '#e5e7eb', 'H', C.ink) + text(560, 175, 'Nước H₂O', { size: 13 });
  b += ball(645, 110, 20, C.red, 'O') + ball(680, 110, 20, '#374151', 'C') + ball(715, 110, 20, C.red, 'O') + text(680, 175, 'Carbon dioxide CO₂', { size: 13 });
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { const na = (i + j) % 2 === 0; b += ball(775 + i * 34, 80 + j * 34, na ? 13 : 17, na ? '#a855f7' : '#16a34a', na ? 'Na' : 'Cl'); }
  b += text(810, 200, 'Muối ăn NaCl', { size: 13 });
  b += text(675, 240, 'Khối lượng phân tử: H₂O = 2·1 + 16 = 18 amu', { size: 13, c: 'orange', bold: true });
  return svg(900, 275, 'Đơn chất và hợp chất (mô hình phân tử)', b);
};

// ---------- Liên kết ion, cộng hóa trị ----------
F['lien-ket-ion-cong-hoa-tri'] = () => {
  let b = rect(8, 0, 434, 320, { fill: 'fBlue', c: 'blue' }) + rect(458, 0, 434, 320, { fill: 'fGreen', c: 'green' });
  b += text(225, 26, 'Liên kết ION: NaCl', { bold: true, size: 16, c: 'blue' }) + text(675, 26, 'Liên kết CỘNG HÓA TRỊ: H₂O', { bold: true, size: 16, c: 'green' });
  const shell = (cx, cy, R, n, lab, colr, extra = []) => {
    let s = circle(cx, cy, R, { c: 'soft', w: 1.5 }) + circle(cx, cy, 18, { fill: colr, c: colr }) + text(cx, cy + 5, lab, { size: 13, bold: true, c: '#ffffff' });
    for (let k = 0; k < n; k++) { const [x, y] = P(cx, cy, R, 90 + (360 / 8) * k); s += circle(x, y, 5.5, { fill: 'blue', c: 'blue', w: 1 }); }
    extra.forEach(([x, y]) => { s += circle(x, y, 5.5, { fill: 'red', c: 'red', w: 1 }); });
    return s;
  };
  // trước
  b += shell(110, 110, 50, 0, 'Na', '#a855f7', [P(110, 110, 50, 0)]) + shell(330, 110, 50, 7, 'Cl', '#16a34a');
  b += path('M168,100 Q220,60 272,100', { c: 'red', w: 2.5, arrow: true }) + text(220, 62, 'nhường 1e', { c: 'red', size: 13, bold: true });
  b += text(110, 185, 'Na: 2/8/1', { size: 12.5 }) + text(330, 185, 'Cl: 2/8/7', { size: 12.5 });
  // sau
  b += shell(110, 250, 0.1, 0, 'Na⁺', '#a855f7') + shell(330, 250, 50, 8, 'Cl⁻', '#16a34a');
  b += text(110, 300, 'Na⁺ (lớp ngoài 8e)', { size: 12.5 }) + text(220, 255, '⇄ hút nhau', { size: 14, bold: true, c: 'blue' }) + text(388, 300, '(8e)', { size: 12.5, anchor: 'start' });
  // H2O
  const O = [675, 150], H1 = [590, 230], H2 = [760, 230];
  b += circle(...O, 62, { c: 'red', w: 2, fill: 'none' }) + circle(...H1, 42, { c: 'soft', w: 2 }) + circle(...H2, 42, { c: 'soft', w: 2 });
  b += circle(...O, 18, { fill: 'red', c: 'red' }) + text(O[0], O[1] + 5, 'O', { bold: true, c: '#ffffff' });
  b += circle(...H1, 14, { fill: '#9ca3af', c: '#9ca3af' }) + text(H1[0], H1[1] + 5, 'H', { bold: true, c: '#ffffff' });
  b += circle(...H2, 14, { fill: '#9ca3af', c: '#9ca3af' }) + text(H2[0], H2[1] + 5, 'H', { bold: true, c: '#ffffff' });
  // cặp e dùng chung
  [[628, 198], [636, 206], [722, 198], [714, 206]].forEach(([x, y]) => { b += circle(x, y, 5.5, { fill: 'orange', c: 'orange', w: 1 }); });
  [[655, 90], [695, 90], [620, 130], [730, 130]].forEach(([x, y]) => { b += circle(x, y, 5.5, { fill: 'blue', c: 'blue', w: 1 }); });
  b += text(675, 60, 'O có 6e lớp ngoài, mỗi H có 1e', { size: 12.5 });
  b += text(675, 295, 'Mỗi H góp chung 1 cặp e (màu cam) với O', { size: 13, bold: true, c: 'green' });
  return svg(900, 325, 'Liên kết ion và liên kết cộng hóa trị', b);
};

// ---------- Tam giác công thức tốc độ ----------
F['tam-giac-cong-thuc-toc-do'] = () => {
  let b = poly([[200, 20], [60, 240], [340, 240]], { fill: 'fBlue', c: 'blue', w: 3 }) + line(118, 150, 282, 150, { c: 'blue', w: 3 }) + line(200, 150, 200, 240, { c: 'blue', w: 3 });
  b += text(200, 125, 's', { size: 46, bold: true, italic: true, c: 'red' }) + text(155, 215, 'v', { size: 40, bold: true, italic: true, c: 'green' }) + text(245, 215, 't', { size: 40, bold: true, italic: true, c: 'purple' });
  b += box(390, 20, 240, 220, 'Che đại lượng cần tìm:\n\nv = s / t\ns = v · t\nt = s / v', { fill: 'panel', c: 'grid', size: 17 });
  b += box(650, 30, 235, 80, 'm/s  →  km/h\nnhân 3,6', { fill: 'fGreen', c: 'green', size: 16, bold: true, align: 'middle' });
  b += box(650, 140, 235, 80, 'km/h  →  m/s\nchia 3,6', { fill: 'fOrange', c: 'orange', size: 16, bold: true, align: 'middle' });
  return svg(900, 255, 'Công thức tốc độ', b);
};

// ---------- Đồ thị quãng đường – thời gian ----------
F['do-thi-quang-duong-thoi-gian'] = () => {
  const ox = 90, oy = 290, W = 480, H = 240;
  const X = (t) => ox + (t / 3) * W, Y = (s) => oy - (s / 30) * H;
  let b = '';
  for (let s = 0; s <= 30; s += 5) b += line(ox, Y(s), ox + W, Y(s), { c: 'grid', w: 1 }) + text(ox - 10, Y(s) + 5, String(s), { anchor: 'end', size: 13 });
  for (let t = 0; t <= 3; t += 0.5) b += line(X(t), oy, X(t), oy - H, { c: 'grid', w: 1 }) + text(X(t), oy + 20, String(t).replace('.', ','), { size: 13 });
  b += arrow(ox, oy, ox + W + 25, oy, { w: 2.5 }) + arrow(ox, oy, ox, oy - H - 25, { w: 2.5 });
  b += text(ox + W + 20, oy + 22, 't (h)', { bold: true }) + text(ox + 6, oy - H - 30, 's (km)', { bold: true, anchor: 'start' });
  const pts = [[0, 0], [1, 15], [1.5, 15], [2.5, 25]];
  b += line(X(0), Y(0), X(1), Y(15), { c: 'red', w: 4 }) + line(X(1), Y(15), X(1.5), Y(15), { c: 'soft', w: 4 }) + line(X(1.5), Y(15), X(2.5), Y(25), { c: 'blue', w: 4 });
  pts.forEach(([t, s]) => { b += dot(X(t), Y(s), 'ink', 5); });
  b += text(X(0.4), Y(9) - 6, 'GĐ 1', { c: 'red', bold: true }) + text(X(1.25), Y(15) - 12, 'nghỉ', { c: 'soft', bold: true }) + text(X(2.05), Y(22) - 8, 'GĐ 3', { c: 'blue', bold: true });
  b += box(610, 30, 275, 250, 'GĐ 1: v = 15 : 1 = 15 km/h\n(đường dốc hơn → nhanh hơn)\n\nNghỉ: đoạn nằm ngang\n→ đứng yên\n\nGĐ 3: v = 10 : 1 = 10 km/h\n\nv = Δs / Δt', { fill: 'panel', c: 'grid', size: 14 });
  return svg(900, 320, 'Đồ thị quãng đường – thời gian của người đi xe đạp', b);
};

// ---------- Quãng đường dừng xe ----------
F['quang-duong-dung-xe'] = () => {
  const data = [[30, 8, 5], [50, 14, 14], [70, 19, 27]];
  const u = 11;
  let b = '';
  data.forEach(([v, r, k], i) => {
    const y = 40 + i * 70;
    b += text(110, y + 26, v + ' km/h', { bold: true, size: 16, anchor: 'end' });
    b += rect(130, y, r * u, 40, { fill: 'fOrange', c: 'orange', rx: 4 }) + rect(130 + r * u, y, k * u, 40, { fill: 'fRed', c: 'red', rx: 4 });
    b += text(130 + ((r + k) * u) + 12, y + 26, `≈ ${r + k} m`, { bold: true, anchor: 'start', size: 15 });
  });
  b += rect(130, 255, 20, 18, { fill: 'fOrange', c: 'orange', rx: 3 }) + text(158, 269, 'Quãng đường phản ứng (thấy nguy hiểm → đạp phanh, ~1 giây)', { anchor: 'start', size: 13 });
  b += rect(130, 282, 20, 18, { fill: 'fRed', c: 'red', rx: 3 }) + text(158, 296, 'Quãng đường phanh (đạp phanh → xe dừng hẳn)', { anchor: 'start', size: 13 });
  b += text(450, 330, 'Số liệu minh họa (đường khô). Tốc độ tăng hơn gấp đôi → quãng đường dừng tăng hơn 3 lần!', { size: 13.5, bold: true, c: 'red' });
  return svg(900, 340, 'Tốc độ càng lớn, quãng đường dừng xe càng dài', b);
};

// ---------- Sóng âm ----------
F['song-am'] = () => {
  let b = '';
  // loa
  b += rect(40, 110, 40, 80, { fill: '#374151', c: 'ink', rx: 4 }) + poly([[80, 110], [130, 70], [130, 230], [80, 190]], { fill: '#9ca3af', c: 'ink' });
  b += path('M136,120 q6,30 0,60', { c: 'red', w: 3 }) + path('M146,115 q8,35 0,70', { c: 'red', w: 2 });
  // nén – giãn
  let x = 160, k = 0;
  while (x < 720) {
    const dense = Math.floor(k / 5) % 2 === 0;
    b += line(x, 80, x, 220, { c: dense ? 'blue' : 'soft', w: dense ? 2.2 : 1.2 });
    x += dense ? 9 : 22; k++;
  }
  // tai
  b += path('M770,110 q40,-10 45,35 q3,30 -20,45 q-10,8 -8,25 q2,15 -15,15', { c: 'ink', w: 4 });
  b += arrow(300, 255, 600, 255, { c: 'green', w: 3 }) + text(450, 278, 'Sóng âm lan truyền qua không khí đến tai', { c: 'green', bold: true, size: 14 });
  b += text(190, 66, 'nén', { c: 'blue', size: 13, bold: true }) + text(270, 66, 'giãn', { c: 'soft', size: 13, bold: true });
  b += text(105, 255, 'Màng loa\ndao động', { size: 13, bold: true });
  b += box(40, 300, 820, 60, 'Truyền được: rắn (nhanh nhất ~5000 m/s) > lỏng (~1500 m/s) > khí (~340 m/s) · KHÔNG truyền trong chân không', { fill: 'fBlue', c: 'blue', size: 14, align: 'middle' });
  return svg(900, 370, 'Nguồn âm dao động tạo ra sóng âm', b);
};

// ---------- Độ cao, độ to ----------
F['do-cao-do-to'] = () => {
  const wave = (ox, oy, w, amp, cycles, c) => {
    const pts = []; for (let i = 0; i <= 200; i++) { const t = i / 200; pts.push([ox + t * w, oy - amp * Math.sin(2 * Math.PI * cycles * t)]); }
    return line(ox, oy, ox + w, oy, { c: 'grid', w: 1 }) + polyline(pts, { c, w: 2.5 });
  };
  let b = rect(8, 0, 434, 330, { fill: 'fBlue', c: 'blue' }) + rect(458, 0, 434, 330, { fill: 'fOrange', c: 'orange' });
  b += text(225, 26, 'ĐỘ CAO ↔ TẦN SỐ', { bold: true, size: 16, c: 'blue' }) + text(675, 26, 'ĐỘ TO ↔ BIÊN ĐỘ', { bold: true, size: 16, c: 'orange' });
  b += text(40, 60, 'Âm trầm: tần số nhỏ (ít dao động/giây)', { anchor: 'start', size: 13.5 }) + wave(40, 120, 370, 40, 2, 'blue');
  b += text(40, 200, 'Âm bổng (cao): tần số lớn', { anchor: 'start', size: 13.5 }) + wave(40, 245, 370, 40, 7, 'blue');
  b += text(490, 60, 'Âm nhỏ: biên độ nhỏ', { anchor: 'start', size: 13.5 }) + wave(490, 120, 370, 15, 3, 'orange');
  b += text(490, 200, 'Âm to: biên độ lớn', { anchor: 'start', size: 13.5 }) + wave(490, 240, 370, 45, 3, 'orange');
  b += line(872, 240, 872, 195, { c: 'red', w: 2, arrow: true }) + text(880, 222, 'A', { c: 'red', bold: true, anchor: 'start' });
  b += text(225, 318, 'Tần số (Hz) = số dao động trong 1 giây', { size: 13, bold: true }) + text(675, 318, 'A: biên độ dao động', { size: 13, bold: true });
  return svg(900, 335, 'Độ cao và độ to của âm', b);
};

// ---------- Phản xạ âm ----------
F['phan-xa-am'] = () => {
  let b = rect(0, 100, 600, 240, { fill: 'fBlue', c: 'fBlue', rx: 0 }) + path('M0,100 q25,-10 50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0', { c: 'blue', w: 2 });
  b += poly([[210, 70], [390, 70], [370, 100], [230, 100]], { fill: '#475569', c: 'ink' }) + rect(270, 45, 60, 25, { fill: '#e2e8f0', c: 'ink', rx: 3 });
  b += path('M0,330 l60,-15 l50,10 l70,-20 l60,15 l80,-10 l70,12 l60,-8 l60,10 l50,-6 l0,30 l-560,0 z', { fill: 'fBrown', c: 'brown', w: 2 });
  b += arrow(285, 105, 285, 312, { c: 'red', w: 3 }) + arrow(315, 312, 315, 105, { c: 'green', w: 3 });
  b += text(275, 210, 'âm phát đi', { c: 'red', bold: true, anchor: 'end', size: 13 }) + text(325, 210, 'âm phản xạ', { c: 'green', bold: true, anchor: 'start', size: 13 });
  b += line(470, 100, 470, 318, { c: 'ink', w: 1.5, arrow: true, arrowStart: true }) + text(480, 215, 'h', { italic: true, bold: true, size: 18, anchor: 'start' });
  b += box(620, 30, 265, 300, 'Đo độ sâu đáy biển\n(máy sonar, siêu âm)\n\nÂm đi xuống rồi dội lên:\nquãng đường = 2h\n\nh = v · t / 2\n\nVí dụ: v = 1500 m/s,\nt = 1,2 s ⇒ h = 900 m', { fill: 'panel', c: 'grid', size: 14 });
  return svg(900, 345, 'Phản xạ âm và ứng dụng đo độ sâu', b);
};

// ---------- Vùng tối, vùng nửa tối ----------
F['vung-toi-nua-toi'] = () => {
  let b = rect(8, 0, 434, 290, { fill: 'panel', c: 'grid' }) + rect(458, 0, 434, 290, { fill: 'panel', c: 'grid' });
  b += text(225, 26, 'Nguồn sáng NHỎ → chỉ có vùng tối', { bold: true, size: 15 }) + text(675, 26, 'Nguồn sáng RỘNG → vùng tối + nửa tối', { bold: true, size: 15 });
  // trái
  { const S = [60, 150], o1 = [220, 115], o2 = [220, 185], sx = 410;
    const ext = (p) => [sx, S[1] + ((p[1] - S[1]) * (sx - S[0])) / (p[0] - S[0])];
    const e1 = ext(o1), e2 = ext(o2);
    b += poly([o1, e1, e2, o2], { fill: '#1f2937', c: 'ink', w: 1 });
    b += line(...S, ...e1, { c: 'orange', w: 1.5 }) + line(...S, ...e2, { c: 'orange', w: 1.5 });
    b += circle(...S, 8, { fill: 'orange', c: 'orange' }) + rect(214, 115, 12, 70, { fill: '#6b7280', c: 'ink', rx: 2 }) + line(sx, 40, sx, 260, { c: 'ink', w: 4 });
    b += text(320, 155, 'vùng tối', { c: '#ffffff', bold: true, size: 13 }) + text(60, 180, 'đèn nhỏ', { size: 12 }) + text(220, 205, 'vật cản', { size: 12 }) + text(410, 280, 'màn', { size: 12 }); }
  // phải
  { const A = [510, 125], B = [510, 175], o1 = [670, 110], o2 = [670, 190], sx = 830;
    const ext = (S, p) => [sx, S[1] + ((p[1] - S[1]) * (sx - S[0])) / (p[0] - S[0])];
    const tA1 = ext(A, o1), tA2 = ext(A, o2), tB1 = ext(B, o1), tB2 = ext(B, o2);
    b += poly([o1, tB1, tA1], { fill: '#9ca3af', c: 'soft', w: 1 }) + poly([o2, tA2, tB2], { fill: '#9ca3af', c: 'soft', w: 1 });
    b += poly([o1, tA1, tB2, o2], { fill: '#1f2937', c: 'ink', w: 1 });
    [[A, tA1], [A, tA2], [B, tB1], [B, tB2]].forEach(([s, e]) => { b += line(...s, ...e, { c: 'orange', w: 1.2 }); });
    b += rect(500, 120, 18, 60, { fill: 'orange', c: 'orange', rx: 6 }) + rect(664, 110, 12, 80, { fill: '#6b7280', c: 'ink', rx: 2 }) + line(sx, 30, sx, 270, { c: 'ink', w: 4 });
    b += text(770, 155, 'vùng tối', { c: '#ffffff', bold: true, size: 13 });
    b += text(785, (tB1[1] + tA1[1]) / 2 + 4, 'nửa tối', { bold: true, size: 12 }) + text(785, (tA2[1] + tB2[1]) / 2 + 4, 'nửa tối', { bold: true, size: 12 });
    b += text(510, 210, 'đèn rộng', { size: 12 }); }
  b += text(450, 312, 'Ứng dụng: nhật thực (Mặt Trăng che Mặt Trời), nguyệt thực (Trái Đất che Mặt Trăng)', { size: 13.5, c: 'soft' });
  return svg(900, 320, 'Vùng tối và vùng nửa tối', b);
};

// ---------- Định luật phản xạ ----------
F['phan-xa-anh-sang'] = () => {
  const I = [300, 250], i = 40;
  let b = rect(80, 250, 440, 14, { fill: '#cbd5e1', c: 'ink', rx: 0 });
  for (let x = 85; x < 520; x += 15) b += line(x, 264, x - 10, 276, { c: 'soft', w: 1 });
  b += line(I[0], I[1], I[0], 40, { c: 'soft', dash: '6 5', w: 2 }) + text(I[0] + 8, 40, 'N (pháp tuyến)', { anchor: 'start', c: 'soft', size: 13 });
  const S = P(...I, 230, 90 + i), R = P(...I, 230, 90 - i);
  b += line(...S, ...I, { c: 'red', w: 3, arrow: true }) + line(...I, ...R, { c: 'blue', w: 3, arrow: true });
  b += angleArc(...I, 90, 90 + i, 60, { c: 'red', fill: 'fRed' }) + angleArc(...I, 90 - i, 90, 60, { c: 'blue', fill: 'fBlue' });
  b += text(I[0] - 22, I[1] - 70, 'i', { c: 'red', bold: true, size: 18, italic: true }) + text(I[0] + 22, I[1] - 70, "i'", { c: 'blue', bold: true, size: 18, italic: true });
  b += text(S[0] - 10, S[1] - 6, 'S', { bold: true }) + text(R[0] + 10, R[1] - 6, 'R', { bold: true }) + text(I[0], I[1] + 32, 'I', { bold: true }) + text(500, 245, 'gương', { size: 13, c: 'soft' });
  b += text(140, 150, 'tia tới', { c: 'red', bold: true }) + text(460, 150, 'tia phản xạ', { c: 'blue', bold: true });
  b += box(560, 40, 325, 230, "Định luật phản xạ ánh sáng\n\n1. Tia phản xạ nằm trong mặt\n    phẳng chứa tia tới và pháp tuyến\n2. Góc phản xạ = góc tới: i' = i\n\n⚠ Góc tới đo với PHÁP TUYẾN,\n    không đo với mặt gương", { fill: 'panel', c: 'grid', size: 14 });
  return svg(900, 290, 'Định luật phản xạ ánh sáng', b);
};

// ---------- Ảnh qua gương phẳng ----------
F['anh-qua-guong-phang'] = () => {
  const mx = 450, A = [300, 140], B = [300, 260], A2 = [600, 140], B2 = [600, 260];
  let b = rect(mx - 5, 30, 10, 270, { fill: '#cbd5e1', c: 'ink', rx: 0 });
  for (let y = 35; y < 300; y += 15) b += line(mx + 5, y, mx + 15, y + 10, { c: 'soft', w: 1 });
  b += line(...B, ...A, { c: 'green', w: 4, arrow: true }) + line(...B2, ...A2, { c: 'green', w: 3, dash: '7 5', arrow: true });
  b += line(...A, ...A2, { c: 'soft', w: 1, dash: '3 4' }) + line(...B, ...B2, { c: 'soft', w: 1, dash: '3 4' });
  const E1 = [140, 40], E2 = [150, 300];
  const hit = (E) => { const t = (A2[0] - mx) / (A2[0] - E[0]); return [mx, A2[1] + (E[1] - A2[1]) * t]; };
  [E1].forEach((E) => { const I = hit(E); b += line(...A, ...I, { c: 'red', w: 2, arrow: true }) + line(...I, ...E, { c: 'red', w: 2, arrow: true }) + line(...I, ...A2, { c: 'red', w: 1.5, dash: '5 4' }); });
  b += text(A[0] - 14, A[1], 'A', { bold: true }) + text(B[0] - 14, B[1] + 6, 'B', { bold: true }) + text(A2[0] + 16, A2[1], "A'", { bold: true }) + text(B2[0] + 16, B2[1] + 6, "B'", { bold: true });
  b += text(375, 285, 'd', { italic: true, bold: true, c: 'purple', size: 16 }) + text(525, 285, 'd', { italic: true, bold: true, c: 'purple', size: 16 });
  b += text(140, 30, 'mắt', { size: 12, c: 'soft' });
  b += box(650, 40, 235, 230, 'Ảnh tạo bởi gương phẳng:\n\n• Ảnh ẢO (vẽ nét đứt)\n• Lớn BẰNG vật\n• ĐỐI XỨNG với vật\n   qua gương: d = d\n\nĐường kéo dài của tia\nphản xạ đi qua ảnh A\'', { fill: 'panel', c: 'grid', size: 14 });
  return svg(900, 310, 'Ảnh của vật AB tạo bởi gương phẳng', b);
};

// ---------- Đường sức từ ----------
F['duong-suc-tu'] = () => {
  const xN = 330, xS = 570, y = 180;
  let b = '';
  for (let k = 1; k <= 4; k++) {
    const dy = 8 + k * 2, h = 40 + k * 38, sp = 30 + k * 35;
    b += path(`M${xN},${y - dy} C${xN - sp},${y - h} ${xS + sp},${y - h} ${xS},${y - dy}`, { c: 'blue', w: 1.8 });
    b += path(`M${xN},${y + dy} C${xN - sp},${y + h} ${xS + sp},${y + h} ${xS},${y + dy}`, { c: 'blue', w: 1.8 });
    const ty = y - 0.75 * h - dy * 0.25 + 0, by = y + 0.75 * h + dy * 0.25;
    b += poly([[450 + 7, ty], [450 - 6, ty - 6], [450 - 6, ty + 6]], { fill: 'blue', c: 'blue', w: 1 }) + poly([[450 + 7, by], [450 - 6, by - 6], [450 - 6, by + 6]], { fill: 'blue', c: 'blue', w: 1 });
  }
  b += line(xN, y, 120, y, { c: 'blue', w: 1.8 }) + poly([[200 - 8, y], [200 + 5, y - 6], [200 + 5, y + 6]], { fill: 'blue', c: 'blue', w: 1 });
  b += line(xS, y, 780, y, { c: 'blue', w: 1.8 }) + poly([[700 - 8, y], [700 + 5, y - 6], [700 + 5, y + 6]], { fill: 'blue', c: 'blue', w: 1 });
  b += rect(xN, y - 22, 120, 44, { fill: 'red', c: 'ink', rx: 3 }) + rect(xN + 120, y - 22, 120, 44, { fill: 'blue', c: 'ink', rx: 3 });
  b += text(xN + 60, y + 9, 'N', { size: 26, bold: true, c: '#ffffff' }) + text(xN + 180, y + 9, 'S', { size: 26, bold: true, c: '#ffffff' });
  b += text(450, 375, 'Bên ngoài nam châm: đường sức từ đi RA ở cực Bắc (N), đi VÀO ở cực Nam (S) · gần hai cực đường sức dày → từ trường mạnh', { size: 13, bold: true });
  return svg(900, 385, 'Đường sức từ của nam châm thẳng', b);
};

// ---------- Từ trường Trái Đất ----------
F['tu-truong-trai-dat'] = () => {
  const c = [280, 210], R = 140;
  let b = '';
  for (let k = 1; k <= 3; k++) {
    const w = R + 30 + k * 35;
    b += path(`M${c[0] - 8},${c[1] + 60} C${c[0] - w},${c[1] + 90} ${c[0] - w},${c[1] - 90} ${c[0] - 8},${c[1] - 60}`, { c: 'blue', w: 1.5, dash: '5 4' });
    b += path(`M${c[0] + 8},${c[1] + 60} C${c[0] + w},${c[1] + 90} ${c[0] + w},${c[1] - 90} ${c[0] + 8},${c[1] - 60}`, { c: 'blue', w: 1.5, dash: '5 4' });
  }
  b += circle(...c, R, { fill: 'fGreen', c: 'green', w: 3 });
  b += line(c[0], c[1] - R - 25, c[0], c[1] + R + 25, { c: 'soft', w: 1.5, dash: '6 4' });
  b += rect(c[0] - 14, c[1] - 70, 28, 70, { fill: 'blue', c: 'ink', rx: 3 }) + rect(c[0] - 14, c[1], 28, 70, { fill: 'red', c: 'ink', rx: 3 });
  b += text(c[0], c[1] - 40, 'S', { bold: true, c: '#ffffff', size: 18 }) + text(c[0], c[1] + 45, 'N', { bold: true, c: '#ffffff', size: 18 });
  b += text(c[0], c[1] - R - 32, 'Cực Bắc địa lí', { bold: true, size: 14 }) + text(c[0], c[1] + R + 45, 'Cực Nam địa lí', { bold: true, size: 14 });
  // la bàn
  const k = [700, 170];
  b += circle(...k, 90, { fill: 'bg', c: 'ink', w: 4 }) + circle(...k, 80, { c: 'grid', w: 1 });
  b += poly([[k[0], k[1] - 70], [k[0] - 12, k[1]], [k[0] + 12, k[1]]], { fill: 'red', c: 'red', w: 1 }) + poly([[k[0], k[1] + 70], [k[0] - 12, k[1]], [k[0] + 12, k[1]]], { fill: '#94a3b8', c: '#94a3b8', w: 1 });
  b += text(k[0], k[1] - 96, 'B (Bắc)', { bold: true }) + text(k[0], k[1] + 112, 'N (Nam)', { bold: true });
  b += text(700, 320, 'Kim la bàn: cực Bắc (đỏ)\nchỉ về hướng Bắc địa lí', { size: 14, bold: true });
  b += text(450, 430, 'Trái Đất như một nam châm khổng lồ: gần cực Bắc địa lí là cực TỪ NAM', { size: 13.5, c: 'blue', bold: true });
  return svg(900, 440, 'Từ trường Trái Đất và la bàn', b);
};

// ---------- Nam châm điện ----------
F['nam-cham-dien'] = () => {
  let b = rect(250, 100, 300, 50, { fill: '#9ca3af', c: 'ink', rx: 4 }) + text(400, 92, 'lõi sắt non', { size: 13, c: 'soft' });
  for (let i = 0; i < 11; i++) {
    const x = 270 + i * 25;
    b += path(`M${x},96 C${x + 18},96 ${x + 18},154 ${x + 6},154`, { c: 'orange', w: 3.5 });
  }
  b += polyline([[270, 154], [230, 154], [230, 260], [360, 260]], { c: 'orange', w: 3 }) + polyline([[530, 154], [570, 154], [570, 260], [450, 260]], { c: 'orange', w: 3 });
  b += rect(360, 240, 90, 40, { fill: 'fBlue', c: 'blue', rx: 4 }) + text(405, 266, 'pin', { bold: true, c: 'blue' }) + text(405, 298, 'dòng điện', { size: 12, c: 'soft' });
  // ghim bị hút
  for (let i = 0; i < 4; i++) { const x = 600 + i * 20; b += path(`M${x},${125 + i * 10} l0,40 a6,6 0 0 0 12,0 l0,-30 a4,4 0 0 0 -8,0 l0,26`, { c: 'soft', w: 2 }); }
  b += text(640, 215, 'đinh ghim\nbị hút', { size: 13 });
  b += box(40, 20, 175, 200, 'Có điện →\ncó từ tính\n\nNgắt điện →\nmất từ tính', { fill: 'fGreen', c: 'green', size: 14 });
  b += box(700, 20, 185, 240, 'Tăng lực từ:\n• tăng số pin\n  (dòng điện mạnh)\n• tăng số vòng dây\n\nĐổi cực:\n• đổi chiều\n  dòng điện', { fill: 'fOrange', c: 'orange', size: 14 });
  return svg(900, 310, 'Nam châm điện', b);
};

// ---------- Quang hợp ----------
F['quang-hop'] = () => {
  let b = circle(90, 70, 40, { fill: 'orange', c: 'orange' });
  for (let k = 0; k < 8; k++) { const [x1, y1] = P(90, 70, 50, k * 45), [x2, y2] = P(90, 70, 66, k * 45); b += line(x1, y1, x2, y2, { c: 'orange', w: 3 }); }
  b += text(90, 152, 'Ánh sáng', { bold: true, c: 'orange' });
  // lá
  b += path('M300,200 C340,90 520,70 620,130 C540,250 380,260 300,200 Z', { fill: 'fGreen', c: 'green', w: 3 }) + path('M300,200 C400,170 500,150 620,130', { c: 'green', w: 2 });
  b += text(470, 205, 'LÁ (lục lạp, diệp lục)', { bold: true, c: 'green' });
  b += arrow(150, 100, 330, 150, { c: 'orange', w: 3 });
  b += arrow(700, 60, 560, 120, { c: 'soft', w: 3 }) + text(720, 50, 'CO₂ (khí khổng)', { bold: true, anchor: 'start' });
  b += arrow(560, 210, 720, 260, { c: 'blue', w: 3 }) + text(730, 268, 'O₂ thải ra', { bold: true, anchor: 'start', c: 'blue' });
  b += line(300, 200, 260, 330, { c: 'brown', w: 6 }) + arrow(240, 340, 285, 220, { c: 'blue', w: 3 }) + text(150, 300, 'Nước\n(rễ → mạch gỗ)', { bold: true, c: 'blue' });
  b += arrow(320, 230, 300, 320, { c: 'purple', w: 3 }) + text(400, 320, 'Glucose → mạch rây\n→ nuôi cây', { bold: true, c: 'purple', size: 13 });
  b += box(40, 370, 820, 60, 'Nước + Carbon dioxide —(ánh sáng, diệp lục)→ Glucose + Oxygen   ·   quang năng → hóa năng', { fill: 'fGreen', c: 'green', size: 16, bold: true, align: 'middle' });
  return svg(900, 440, 'Quang hợp ở lá cây', b);
};

// ---------- Hô hấp tế bào ----------
F['ho-hap-te-bao'] = () => {
  let b = path('M250,60 C380,20 560,40 620,120 C680,210 560,300 400,290 C260,280 170,200 250,60 Z', { fill: 'fPink', c: 'pink', w: 3 });
  b += text(560, 70, 'tế bào', { c: 'pink', bold: true });
  b += `<ellipse cx="420" cy="170" rx="120" ry="60" fill="${C.fOrange}" stroke="${C.orange}" stroke-width="3"/>`;
  b += path('M310,170 q15,-35 30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0', { c: 'orange', w: 2 });
  b += text(420, 250, 'TI THỂ', { bold: true, c: 'orange' });
  b += arrow(70, 120, 300, 150, { c: 'green', w: 3 }) + text(60, 110, 'Glucose', { bold: true, c: 'green', anchor: 'start' });
  b += arrow(70, 220, 300, 190, { c: 'blue', w: 3 }) + text(60, 245, 'Oxygen', { bold: true, c: 'blue', anchor: 'start' });
  b += arrow(540, 140, 760, 90, { c: 'soft', w: 3 }) + text(770, 85, 'CO₂', { bold: true, anchor: 'start' });
  b += arrow(545, 170, 760, 170, { c: 'blue', w: 3 }) + text(770, 175, 'Nước', { bold: true, anchor: 'start', c: 'blue' });
  b += arrow(540, 200, 760, 250, { c: 'red', w: 3 }) + text(770, 255, 'Năng lượng\n(ATP + nhiệt)', { bold: true, anchor: 'start', c: 'red' });
  b += box(40, 310, 820, 56, 'Glucose + Oxygen → Carbon dioxide + Nước + Năng lượng   ·   diễn ra ở mọi tế bào, cả ngày lẫn đêm', { fill: 'fOrange', c: 'orange', size: 15, bold: true, align: 'middle' });
  return svg(900, 375, 'Hô hấp tế bào', b);
};

// ---------- Vận chuyển nước ở cây ----------
F['van-chuyen-nuoc-o-cay'] = () => {
  let b = rect(0, 300, 560, 90, { fill: 'fBrown', c: 'fBrown', rx: 0 });
  b += rect(265, 80, 30, 225, { fill: '#a16207', c: 'brown', rx: 4 });
  b += path('M280,300 C260,330 220,345 190,370 M280,300 C300,335 340,350 370,372 M280,300 L282,380', { c: 'brown', w: 4 });
  [[180, 110, -1], [380, 120, 1], [170, 190, -1], [390, 200, 1]].forEach(([x, y, s]) => {
    b += path(`M280,${y + 20} C${280 + s * 40},${y - 30} ${x + s * 20},${y - 20} ${x},${y} C${x + s * 30},${y + 30} ${280 + s * 30},${y + 30} 280,${y + 20} Z`, { fill: 'fGreen', c: 'green', w: 2.5 });
  });
  for (let y = 290; y > 90; y -= 45) b += arrow(274, y, 274, y - 30, { c: 'blue', w: 3 });
  for (let y = 100; y < 290; y += 45) b += arrow(287, y, 287, y + 30, { c: 'purple', w: 3 });
  [[150, 70], [420, 80], [130, 150]].forEach(([x, y]) => { b += path(`M${x},${y} q-8,-12 0,-24 q8,-12 0,-24`, { c: 'blue', w: 2, dash: '3 4' }); });
  b += text(420, 40, 'Thoát hơi nước (khí khổng)', { bold: true, c: 'blue', size: 13 });
  b += text(180, 395, 'Lông hút ở rễ hút nước, muối khoáng', { bold: true, size: 12.5 });
  b += box(590, 20, 295, 330, 'Mạch gỗ (mũi tên xanh dương):\nnước + muối khoáng\nrễ → thân → lá (đi LÊN)\n\nMạch rây (mũi tên tím):\nchất hữu cơ từ lá\n→ các bộ phận (đi XUỐNG)\n\nThoát hơi nước:\n• tạo lực kéo nước lên\n• làm mát lá\n• khí khổng mở → lấy CO₂', { fill: 'panel', c: 'grid', size: 14 });
  return svg(900, 400, 'Vận chuyển nước và chất dinh dưỡng ở cây', b);
};

// ---------- Cảm ứng ở thực vật ----------
F['cam-ung-thuc-vat'] = () => {
  let b = '';
  const pan = (i, t) => rect(8 + i * 222, 0, 214, 260, { fill: 'panel', c: 'grid' }) + text(115 + i * 222, 26, t, { bold: true, size: 14.5 });
  // hướng sáng
  b += pan(0, 'Hướng sáng');
  b += circle(180, 70, 18, { fill: 'orange', c: 'orange' }) + rect(30, 210, 160, 20, { fill: 'fBrown', c: 'brown', rx: 3 });
  b += path('M80,210 C80,150 110,110 160,85', { c: 'green', w: 4 }) + path('M110,140 q20,-25 40,-5 q-20,15 -40,5 Z', { fill: 'fGreen', c: 'green', w: 2 });
  b += arrow(165, 80, 130, 105, { c: 'orange', w: 2 }) + text(115, 250, 'ngọn vươn về phía sáng', { size: 12 });
  // hướng nước
  b += pan(1, 'Hướng nước');
  b += rect(230, 70, 214, 170, { fill: 'fBrown', c: 'fBrown', rx: 0 }) + path('M290,70 L290,40 M290,45 q-15,-10 -25,0 M290,45 q15,-10 25,0', { c: 'green', w: 3 });
  b += path('M290,70 C290,120 330,150 380,190', { c: 'brown', w: 4 }) + `<ellipse cx="395" cy="205" rx="40" ry="18" fill="${C.fBlue}" stroke="${C.blue}" stroke-width="2"/>` + text(395, 210, 'nước', { size: 12, c: 'blue', bold: true });
  b += text(337, 250, 'rễ mọc về phía có nước', { size: 12 });
  // hướng tiếp xúc
  b += pan(2, 'Hướng tiếp xúc');
  b += rect(560, 50, 10, 180, { fill: '#a16207', c: 'brown', rx: 2 });
  b += path('M520,230 C520,180 540,150 548,130', { c: 'green', w: 4 });
  let sp = 'M548,130'; for (let k = 0; k < 6; k++) sp += ` C${k % 2 ? 540 : 590},${120 - k * 12} ${k % 2 ? 540 : 590},${112 - k * 12} ${k % 2 ? 590 : 540},${108 - k * 12}`;
  b += path(sp, { c: 'green', w: 2.5 }) + text(559, 250, 'tua cuốn quấn vào giàn', { size: 12 });
  // không định hướng
  b += pan(3, 'Cây xấu hổ (trinh nữ)');
  b += line(700, 140, 800, 140, { c: 'green', w: 3 });
  for (let k = 0; k < 6; k++) { const x = 710 + k * 16; b += path(`M${x},140 q4,-24 10,-26`, { c: 'green', w: 2 }) + path(`M${x},140 q4,24 10,26`, { c: 'green', w: 2 }); }
  b += text(750, 190, 'chạm vào → lá cụp lại', { size: 12 }) + path('M760,215 l25,0', { c: 'soft', arrow: true, w: 2 }) + line(800, 215, 840, 215, { c: 'green', w: 3 });
  for (let k = 0; k < 3; k++) b += line(805 + k * 12, 215, 815 + k * 12, 210, { c: 'green', w: 2 });
  b += text(447, 285, 'Cảm ứng giúp thực vật thích nghi với môi trường · Động vật cảm ứng nhanh hơn nhờ hệ thần kinh', { size: 13.5, c: 'soft' });
  return svg(900, 295, 'Các kiểu cảm ứng ở thực vật', b);
};

// ---------- Vòng đời ếch, bướm ----------
F['vong-doi-ech-buom'] = () => {
  const cycle = (ox, title, items, c, f) => {
    const cx = ox + 215, cy = 175, R = 105;
    let s = rect(ox + 8, 0, 422, 355, { fill: 'panel', c: 'grid' }) + text(cx, 26, title, { bold: true, size: 16, c });
    const pos = [[0, -1], [1, 0], [0, 1], [-1, 0]].map(([dx, dy]) => [cx + dx * (R + 22), cy + dy * R * 0.95]);
    pos.forEach(([x, y], i) => {
      const [xn, yn] = pos[(i + 1) % 4];
      s += path(`M${x + (xn - x) * 0.3},${y + (yn - y) * 0.3} Q${cx + (x + xn - 2 * cx) * 0.75},${cy + (y + yn - 2 * cy) * 0.75} ${x + (xn - x) * 0.7},${y + (yn - y) * 0.7}`, { c, w: 2.5, arrow: true });
    });
    pos.forEach(([x, y], i) => { s += rect(x - 72, y - 26, 144, 52, { fill: f, c, rx: 14 }) + items[i](x, y); });
    return s;
  };
  const lbl = (s) => (x, y) => text(x, y + 5, s, { bold: true, size: 12.5 });
  let b = cycle(0, 'Vòng đời của ếch (biến thái)', [lbl('1. Trứng'), lbl('2. Nòng nọc'), lbl('3. Ếch con'), lbl('4. Ếch trưởng thành')], 'green', 'fGreen');
  b += cycle(450, 'Vòng đời của bướm (biến thái)', [lbl('1. Trứng'), lbl('2. Sâu'), lbl('3. Nhộng'), lbl('4. Bướm')], 'orange', 'fOrange');
  b += text(219, 340, 'Nòng nọc thở bằng mang; ếch thở bằng phổi và da', { size: 12.5, c: 'soft' });
  b += text(669, 340, 'Sâu phá hoại cây trồng → diệt ở giai đoạn sâu', { size: 12.5, c: 'soft' });
  return svg(900, 360, 'Sinh trưởng và phát triển: vòng đời có biến thái', b);
};

// ---------- Giâm, chiết, ghép ----------
F['giam-chiet-ghep'] = () => {
  let b = '';
  const pan = (i, t, s) => rect(8 + i * 297, 0, 289, 300, { fill: 'panel', c: 'grid' }) + text(152 + i * 297, 26, t, { bold: true, size: 16 }) + text(152 + i * 297, 270, s, { size: 12.5 });
  // giâm
  b += pan(0, 'Giâm cành', 'cắm đoạn cành vào đất ẩm\n→ cành ra rễ thành cây mới');
  b += rect(40, 180, 225, 60, { fill: 'fBrown', c: 'brown', rx: 3 }) + line(150, 230, 160, 70, { c: 'brown', w: 7 });
  b += path('M157,110 q30,-20 50,0 q-25,18 -50,0 Z', { fill: 'fGreen', c: 'green', w: 2 }) + path('M159,90 q-30,-20 -50,0 q25,18 50,0 Z', { fill: 'fGreen', c: 'green', w: 2 });
  b += path('M150,230 q-20,10 -35,5 M150,230 q15,12 30,8 M150,232 l-2,10', { c: 'brown', w: 2 });
  // chiết
  b += pan(1, 'Chiết cành', 'bóc vỏ, bó bầu đất trên cành\n→ ra rễ rồi cắt khỏi cây mẹ');
  b += line(380, 250, 380, 60, { c: 'brown', w: 10 }) + line(380, 150, 520, 80, { c: 'brown', w: 6 });
  b += `<ellipse cx="450" cy="115" rx="30" ry="22" fill="${C.fBrown}" stroke="${C.brown}" stroke-width="2"/>` + text(450, 160, 'bầu đất', { size: 12, c: 'brown', bold: true });
  b += path('M520,80 q20,-25 40,-10 q-20,20 -40,10 Z', { fill: 'fGreen', c: 'green', w: 2 });
  // ghép
  b += pan(2, 'Ghép', 'gắn cành/mắt ghép lên gốc ghép\n→ cây mới mang đặc tính tốt');
  b += rect(660, 180, 200, 60, { fill: 'fBrown', c: 'brown', rx: 3 }) + line(760, 230, 760, 130, { c: 'brown', w: 10 });
  b += line(760, 130, 765, 60, { c: '#65a30d', w: 7 }) + rect(750, 120, 22, 22, { fill: 'fBlue', c: 'blue', rx: 3 }) + text(800, 136, 'băng buộc', { size: 12, c: 'blue', anchor: 'start' });
  b += text(800, 85, 'cành ghép', { size: 12, c: 'green', anchor: 'start' }) + text(800, 175, 'gốc ghép', { size: 12, c: 'brown', anchor: 'start' });
  b += text(450, 318, 'Đều là SINH SẢN VÔ TÍNH (sinh sản sinh dưỡng): giữ nguyên đặc tính của cây mẹ, nhanh cho thu hoạch', { size: 13.5, bold: true });
  return svg(900, 330, 'Nhân giống cây: giâm, chiết, ghép', b);
};

module.exports = F;
