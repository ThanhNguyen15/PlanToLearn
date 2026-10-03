// Hình minh họa môn Khoa học tự nhiên 9
const L = require('./lib');
const { C, svg, line, arrow, text, rect, box, circle, dot, poly, polyline, path, P, angleArc, rightAngle, note, table, r1 } = L;

const F = {};

// ================= VẬT LÍ =================

// ---------- Động năng, thế năng, cơ năng ----------
F['co-nang-con-lac'] = () => {
  let b = rect(8, 0, 470, 330, { fill: 'panel', c: 'grid' });
  const O = [243, 30], Lr = 220;
  b += line(150, 30, 336, 30, { w: 4 }) + dot(...O, 'ink', 4);
  const pos = [[-40, 'A', 'blue'], [0, 'B', 'red'], [40, 'C', 'blue']];
  pos.forEach(([deg, name, c]) => {
    const p = P(O[0], O[1], Lr, -90 + deg);
    b += line(...O, ...p, { c: 'soft', w: 1.5, dash: deg ? '5 4' : undefined }) + circle(...p, 16, { fill: deg ? 'fBlue' : 'fRed', c }) + text(p[0], p[1] + 5, name, { bold: true, c });
  });
  const A = P(O[0], O[1], Lr, -130), B = P(O[0], O[1], Lr, -90);
  b += path(`M${r1(A[0])},${r1(A[1])} A${Lr},${Lr} 0 0 0 ${r1(B[0])},${r1(B[1])}`, { c: 'orange', w: 2, dash: '3 4' });
  b += line(50, A[1], 100, A[1], { c: 'soft', w: 1 }) + line(50, B[1], 200, B[1], { c: 'soft', w: 1 }) + arrow(70, B[1], 70, A[1], { c: 'green', w: 1.8 }) + text(56, (A[1] + B[1]) / 2 + 4, 'h', { italic: true, c: 'green', bold: true });
  b += text(80, 90, 'A, C: cao nhất\nWt lớn nhất\nWđ = 0 (v = 0)', { size: 12.5, c: 'blue' });
  b += text(243, 290, 'B: thấp nhất → Wt nhỏ nhất, Wđ lớn nhất (v lớn nhất)', { size: 12.5, c: 'red', bold: true });
  b += text(243, 312, 'A → B: Wt chuyển hóa thành Wđ · B → C: Wđ chuyển hóa thành Wt', { size: 12.5 });
  b += box(492, 0, 400, 330, 'Động năng:  Wđ = ½·m·v²\n   (m: kg; v: m/s; Wđ: J)\n\nThế năng trọng trường:  Wt = P·h = 10·m·h\n   (h: độ cao so với mốc, m)\n\nCơ năng:  W = Wđ + Wt\n   Bỏ qua ma sát, lực cản → W KHÔNG ĐỔI\n\nCông:  A = F·s  (J)\nCông suất:  P = A / t  (W)\n   1 kW = 1000 W ; 1 HP ≈ 746 W', { fill: 'fOrange', c: 'orange', size: 14.5 });
  return svg(900, 335, 'Năng lượng cơ học: con lắc đơn dao động', b);
};

// ---------- Khúc xạ, phản xạ toàn phần ----------
F['khuc-xa-phan-xa-toan-phan'] = () => {
  const panel = (ox, title, c) => rect(ox + 6, 0, 438, 320, { fill: 'panel', c: 'grid' }) + text(ox + 225, 24, title, { bold: true, size: 15, c });
  let b = panel(0, 'Khúc xạ: ánh sáng từ không khí vào nước', 'blue');
  let I = [225, 170];
  b += rect(14, 170, 422, 140, { fill: 'fBlue', c: 'none', rx: 0 }) + line(14, 170, 436, 170, { c: 'blue' });
  b += text(40, 155, 'Không khí', { anchor: 'start', size: 13, c: 'soft' }) + text(40, 300, 'Nước', { anchor: 'start', size: 13, c: 'blue' });
  b += line(225, 45, 225, 300, { dash: '5 4', w: 1.5 }) + text(234, 56, 'N (pháp tuyến)', { anchor: 'start', size: 12, c: 'soft' });
  const S = P(...I, 140, 135), R = P(...I, 140, -62);
  b += line(...S, ...I, { c: 'red', w: 2.5 }) + arrow(...S, ...L.mid(S, I), { c: 'red', w: 2.5 }) + arrow(...I, ...R, { c: 'red', w: 2.5 });
  b += angleArc(...I, 90, 135, 40, { c: 'orange' }) + text(...P(...I, 56, 112), 'i', { bold: true, c: 'orange', italic: true });
  b += angleArc(...I, 270, 298, 46, { c: 'green' }) + text(...P(...I, 64, 284), 'r', { bold: true, c: 'green', italic: true });
  b += text(112, 66, 'S', { bold: true }) + dot(...I) + text(I[0] - 14, I[1] - 6, 'I', { bold: true });
  b += text(330, 230, 'r < i\nTia khúc xạ lệch\nGẦN pháp tuyến', { size: 13, bold: true, c: 'green' });
  b += text(110, 230, 'n = c / v\nsin i / sin r = n₂ / n₁', { size: 13, bold: true });
  b += panel(450, 'Phản xạ toàn phần: từ nước ra không khí', 'purple');
  I = [675, 170];
  b += rect(464, 170, 422, 140, { fill: 'fBlue', c: 'none', rx: 0 }) + line(464, 170, 886, 170, { c: 'blue' }) + line(675, 45, 675, 300, { dash: '5 4', w: 1.5 });
  const rays = [[-110, 'blue', -70], [-140, 'purple', null]];
  // tia 1: i nhỏ → khúc xạ ra ngoài
  const s1 = P(...I, 95, 250), r1o = P(...I, 110, 52);
  b += arrow(...s1, ...I, { c: 'orange', w: 2 }) + arrow(...I, ...r1o, { c: 'orange', w: 2 });
  // tia 2: i lớn → phản xạ toàn phần
  const s2 = P(...I, 150, 215), r2 = P(...I, 150, -35);
  b += arrow(...s2, ...I, { c: 'purple', w: 2.5 }) + arrow(...I, ...r2, { c: 'purple', w: 2.5 });
  b += text(560, 70, 'i nhỏ: có tia khúc xạ\n(lệch XA pháp tuyến)', { size: 12.5, c: 'orange' });
  b += text(815, 70, 'i ≥ i_gh: KHÔNG có\ntia khúc xạ, ánh sáng\nphản xạ hoàn toàn', { size: 12.5, c: 'purple' });
  b += text(675, 285, 'Điều kiện: n₁ > n₂ (đi từ môi trường chiết quang hơn) và i ≥ i_gh', { size: 12.5, bold: true });
  b += text(675, 305, 'Ứng dụng: cáp quang, kim cương lấp lánh', { size: 12.5, c: 'soft' });
  return svg(900, 325, 'Khúc xạ ánh sáng và phản xạ toàn phần', b);
};

// ---------- Lăng kính, tán sắc ----------
F['lang-kinh-tan-sac'] = () => {
  const A = [380, 30], B = [270, 230], Cc = [490, 230];
  let b = poly([A, B, Cc], { fill: 'fBlue', c: 'blue' });
  const I = [330, 125];
  b += arrow(60, 175, I[0], I[1], { c: 'ink', w: 4 }) + text(120, 190, 'Ánh sáng trắng', { size: 14, bold: true });
  const cols = ['#e11d48', '#f97316', '#eab308', '#16a34a', '#2563eb', '#4f46e5', '#7c3aed'];
  const names = ['đỏ', 'da cam', 'vàng', 'lục', 'lam', 'chàm', 'tím'];
  cols.forEach((c, i) => {
    const J = [430 + i * 2, 120 + i * 7];
    const E = [820, 120 + i * 26];
    b += `<line x1="${I[0]}" y1="${I[1]}" x2="${J[0]}" y2="${J[1]}" stroke="${c}" stroke-width="2"/>`;
    b += `<line x1="${J[0]}" y1="${J[1]}" x2="${E[0]}" y2="${E[1]}" stroke="${c}" stroke-width="3"/>`;
    b += text(830, E[1] + 5, names[i], { anchor: 'start', size: 13, c, bold: true });
  });
  b += text(380, 260, 'Lăng kính', { size: 14, c: 'blue', bold: true });
  b += note(450, 290, 'Ánh sáng trắng là hỗn hợp nhiều ánh sáng màu · Lăng kính tách thành dải màu: đỏ lệch ÍT nhất, tím lệch NHIỀU nhất', 'ink', 13);
  b += note(450, 312, 'Màu của vật: vật màu nào thì tán xạ (hắt lại) mạnh ánh sáng màu đó · vật trắng tán xạ mọi màu · vật đen không tán xạ', 'ink', 13);
  return svg(900, 322, 'Sự tán sắc ánh sáng qua lăng kính', b);
};

// ---------- Thấu kính ----------
function lensPanel(ox, title, conv, d, h, f, c) {
  const y0 = 200, x0 = ox + 260, sc = 1;
  let s = rect(ox + 6, 0, 438, 340, { fill: 'panel', c: 'grid' }) + text(ox + 225, 24, title, { bold: true, size: 14.5, c });
  s += line(ox + 16, y0, ox + 434, y0, { w: 1.5 });
  // thấu kính
  s += line(x0, y0 - 130, x0, y0 + 88, { c: 'blue', w: 3 });
  if (conv) s += arrow(x0, y0, x0, y0 - 132, { c: 'blue', w: 3 }) + arrow(x0, y0, x0, y0 + 90, { c: 'blue', w: 3 });
  else s += line(x0 - 8, y0 - 138, x0, y0 - 128, { c: 'blue', w: 3 }) + line(x0 + 8, y0 - 138, x0, y0 - 128, { c: 'blue', w: 3 }) + line(x0 - 8, y0 + 96, x0, y0 + 86, { c: 'blue', w: 3 }) + line(x0 + 8, y0 + 96, x0, y0 + 86, { c: 'blue', w: 3 });
  s += dot(x0 - f, y0, 'ink', 4) + text(x0 - f, y0 + 18, 'F', { bold: true, size: 13 }) + dot(x0 + f, y0, 'ink', 4) + text(x0 + f, y0 + 18, "F'", { bold: true, size: 13 }) + text(x0 + 10, y0 + 18, 'O', { bold: true, size: 13 });
  const Ax = x0 - d, Bt = [Ax, y0 - h];
  s += arrow(Ax, y0, ...Bt, { c: 'green', w: 3 }) + text(Ax - 10, y0 - h - 6, 'B', { bold: true, c: 'green' }) + text(Ax, y0 + 18, 'A', { bold: true, c: 'green' });
  let dp, hp;
  if (conv) { dp = (d * f) / (d - f); hp = (h * dp) / d; } else { dp = -(d * f) / (d + f); hp = (h * -dp) / d; }
  // tia 1: song song trục → qua F' (hội tụ) hoặc kéo dài qua F (phân kì)
  const I1 = [x0, y0 - h];
  s += line(...Bt, ...I1, { c: 'red', w: 1.8 });
  const dir1 = conv ? [f, h] : [f, -h];
  // kéo dài tia ló nhưng giữ trong khung
  let t1 = 3;
  t1 = Math.min(t1, (ox + 430 - x0) / dir1[0]);
  if (dir1[1] > 0) t1 = Math.min(t1, (y0 + 95 - (y0 - h)) / dir1[1]);
  if (dir1[1] < 0) t1 = Math.min(t1, (y0 - h - 45) / -dir1[1]);
  const far1 = [x0 + dir1[0] * t1, y0 - h + dir1[1] * t1];
  s += arrow(...I1, ...far1, { c: 'red', w: 1.8 });
  // tia 2: qua O
  const k = 2.2;
  const far2 = [x0 + d * (k - 1), y0 - h + h * k];
  s += arrow(...Bt, ...[x0 + (x0 - Ax) * 0.0 + d * 0.9, y0 - h + h * 1.9], { c: 'purple', w: 1.8 });
  if (conv && d > f) {
    const B2 = [x0 + dp, y0 + hp];
    s += arrow(x0 + dp, y0, ...B2, { c: 'orange', w: 3 }) + text(B2[0] + 12, B2[1] + 6, "B'", { bold: true, c: 'orange' }) + text(x0 + dp, y0 - 8, "A'", { bold: true, c: 'orange' });
    s += text(ox + 225, 312, 'd > f: ẢNH THẬT, NGƯỢC CHIỀU vật', { bold: true, size: 13.5, c: 'orange' });
    s += text(ox + 225, 332, '(hứng được trên màn; d > 2f ảnh nhỏ hơn vật)', { size: 12.5 });
  } else {
    // ảnh ảo: kéo dài ngược
    const B2 = [x0 + dp, y0 - (conv ? hp : hp)];
    const Bv = conv ? [x0 + dp, y0 + hp] : B2;
    s += line(...I1, ...Bv, { c: 'red', dash: '5 4', w: 1.5 }) + line(...Bt, ...Bv, { c: 'purple', dash: '5 4', w: 1.5 });
    s += line(x0 + dp, y0, ...Bv, { c: 'orange', w: 3, dash: '7 4' }) + text(Bv[0] - 14, Bv[1] - 6, "B'", { bold: true, c: 'orange' }) + text(x0 + dp - 6, y0 + 18, "A'", { bold: true, c: 'orange', size: 13 });
    s += text(ox + 225, 312, conv ? 'd < f: ẢNH ẢO, CÙNG CHIỀU, LỚN HƠN vật' : 'Luôn cho ẢNH ẢO, CÙNG CHIỀU, NHỎ HƠN vật', { bold: true, size: 13.5, c: 'orange' });
    s += text(ox + 225, 332, conv ? '(kính lúp hoạt động theo nguyên tắc này)' : '(ảnh nằm trong khoảng tiêu cự)', { size: 12.5 });
  }
  return s;
}
F['thau-kinh-hoi-tu'] = () => {
  let b = lensPanel(0, 'Thấu kính hội tụ: vật ngoài tiêu cự (d > f)', true, 170, 70, 70, 'blue');
  b += lensPanel(450, 'Thấu kính hội tụ: vật trong tiêu cự (d < f)', true, 60, 40, 100, 'green');
  b += note(450, 362, 'Tia đỏ: song song trục chính → ló qua F\' · Tia tím: qua quang tâm O → truyền thẳng · Nét đứt: đường kéo dài (ảnh ảo)', 'ink', 13);
  return svg(900, 372, 'Ảnh của vật tạo bởi thấu kính hội tụ (vẽ bằng 2 tia đặc biệt)', b);
};
F['thau-kinh-phan-ki'] = () => {
  let b = lensPanel(0, 'Thấu kính phân kì', false, 150, 80, 90, 'purple');
  b += box(460, 10, 430, 330, 'Nhận biết thấu kính:\n• Hội tụ: rìa MỎNG hơn phần giữa;\n  chùm tới song song → chùm ló HỘI TỤ\n• Phân kì: rìa DÀY hơn phần giữa;\n  chùm tới song song → chùm ló LOE RỘNG\n\nTính toán (dùng tam giác đồng dạng):\n  h\'/h = d\'/d\n• Hội tụ, ảnh thật: 1/f = 1/d + 1/d\'\n\nKính lúp: thấu kính hội tụ tiêu cự ngắn\n  số bội giác G = 25 / f (f tính bằng cm)\n  vật đặt trong khoảng tiêu cự', { fill: 'fPurple', c: 'purple', size: 14 });
  return svg(900, 345, 'Thấu kính phân kì và cách nhận biết thấu kính', b);
};

// ---------- Mạch điện nối tiếp, song song ----------
F['mach-noi-tiep-song-song'] = () => {
  const res = (x, y, lab, vertical) => vertical ? rect(x - 10, y - 25, 20, 50, { fill: 'fOrange', c: 'orange', rx: 2 }) + text(x + 28, y + 5, lab, { bold: true, size: 14 }) : rect(x - 25, y - 10, 50, 20, { fill: 'fOrange', c: 'orange', rx: 2 }) + text(x, y - 18, lab, { bold: true, size: 14 });
  const batt = (x, y) => line(x - 6, y - 18, x - 6, y + 18, { w: 3 }) + line(x + 6, y - 9, x + 6, y + 9, { w: 5 }) + text(x - 6, y - 24, '+', { size: 14, bold: true, c: 'red' });
  let b = rect(8, 0, 438, 360, { fill: 'panel', c: 'grid' }) + rect(454, 0, 438, 360, { fill: 'panel', c: 'grid' });
  b += text(227, 26, 'NỐI TIẾP', { bold: true, size: 17, c: 'blue' }) + text(673, 26, 'SONG SONG', { bold: true, size: 17, c: 'green' });
  // nối tiếp
  b += polyline([[80, 70], [370, 70], [370, 170], [80, 170], [80, 70]], { w: 2 });
  b += `<rect x="150" y="60" width="140" height="20" fill="${C.panel}"/>` + res(170, 70, 'R₁') + res(270, 70, 'R₂');
  b += `<rect x="70" y="100" width="20" height="40" fill="${C.panel}"/>` + batt(80, 120);
  b += circle(225, 170, 14, { fill: 'bg', c: 'red' }) + text(225, 175, 'A', { bold: true, c: 'red', size: 13 });
  b += box(24, 196, 406, 150, 'I = I₁ = I₂  (cường độ như nhau)\nU = U₁ + U₂\nR_tđ = R₁ + R₂\nU₁ / U₂ = R₁ / R₂', { fill: 'fBlue', c: 'blue', size: 15 });
  // song song
  b += line(600, 70, 600, 130) + line(760, 70, 760, 130) + line(600, 70, 760, 70) + line(600, 130, 760, 130);
  b += `<rect x="655" y="60" width="50" height="20" fill="${C.panel}"/>` + `<rect x="655" y="120" width="50" height="20" fill="${C.panel}"/>` + res(680, 70, 'R₁') + res(680, 130, 'R₂');
  b += polyline([[600, 100], [520, 100], [520, 175], [840, 175], [840, 100], [760, 100]], { w: 2 }) + dot(600, 100) + dot(760, 100);
  b += `<rect x="510" y="118" width="20" height="40" fill="${C.panel}"/>` + batt(520, 138) + circle(680, 175, 14, { fill: 'bg', c: 'red' }) + text(680, 180, 'A', { bold: true, c: 'red', size: 13 });
  b += box(470, 196, 406, 150, 'U = U₁ = U₂  (hiệu điện thế như nhau)\nI = I₁ + I₂\n1/R_tđ = 1/R₁ + 1/R₂  ⇒  R_tđ = R₁R₂/(R₁ + R₂)\nI₁ / I₂ = R₂ / R₁', { fill: 'fGreen', c: 'green', size: 15 });
  return svg(900, 365, 'Đoạn mạch nối tiếp và song song (Định luật Ohm: I = U / R)', b);
};

// ---------- Cảm ứng điện từ ----------
F['cam-ung-dien-tu'] = () => {
  let b = rect(8, 0, 470, 300, { fill: 'panel', c: 'grid' });
  // cuộn dây
  for (let i = 0; i < 7; i++) b += L.ellipse ? '' : `<ellipse cx="${250 + i * 18}" cy="120" rx="9" ry="48" fill="none" stroke="${C.brown}" stroke-width="3"/>`;
  b += line(250, 168, 250, 230, { c: C.brown, w: 2 }) + line(358, 168, 358, 230, { c: C.brown, w: 2 }) + line(250, 230, 280, 230, { c: C.brown, w: 2 }) + line(328, 230, 358, 230, { c: C.brown, w: 2 });
  b += circle(304, 230, 24, { fill: 'bg', c: 'ink' }) + text(304, 236, 'G', { bold: true, size: 16 }) + line(304, 230, 316, 214, { c: 'red', w: 2 });
  b += rect(60, 104, 70, 32, { fill: 'red', c: 'red', rx: 2 }) + rect(130, 104, 70, 32, { fill: 'blue', c: 'blue', rx: 2 });
  b += text(95, 126, 'N', { bold: true, c: '#ffffff', size: 16 }) + text(165, 126, 'S', { bold: true, c: '#ffffff', size: 16 });
  b += arrow(150, 80, 220, 80, { c: 'green', w: 3 }) + arrow(150, 165, 80, 165, { c: 'purple', w: 3 });
  b += text(185, 70, 'đưa vào', { size: 12.5, c: 'green' }) + text(115, 185, 'kéo ra', { size: 12.5, c: 'purple' });
  b += text(243, 270, 'Nam châm chuyển động → kim điện kế G lệch', { bold: true, size: 13.5 }) + text(243, 290, '(đưa vào và kéo ra: kim lệch theo hai chiều ngược nhau)', { size: 12.5, c: 'soft' });
  b += box(492, 0, 400, 300, 'Hiện tượng cảm ứng điện từ:\nkhi SỐ ĐƯỜNG SỨC TỪ xuyên qua tiết\ndiện cuộn dây kín BIẾN THIÊN → trong\ncuộn dây xuất hiện dòng điện cảm ứng.\n\nDòng điện xoay chiều: chiều luân phiên\nthay đổi (điện lưới VN: 220 V – 50 Hz).\n\nMáy phát điện xoay chiều: nam châm và\ncuộn dây, một bộ phận quay.\nTác dụng: nhiệt, phát sáng, từ, sinh lí.', { fill: 'fOrange', c: 'orange', size: 14 });
  return svg(900, 305, 'Cảm ứng điện từ và dòng điện xoay chiều', b);
};

// ---------- Năng lượng ----------
F['nguon-nang-luong'] = () => {
  let b = rect(8, 0, 434, 300, { fill: 'fRed', c: 'red' }) + rect(458, 0, 434, 300, { fill: 'fGreen', c: 'green' });
  b += text(225, 28, 'NĂNG LƯỢNG HÓA THẠCH', { bold: true, size: 16, c: 'red' }) + text(675, 28, 'NĂNG LƯỢNG TÁI TẠO', { bold: true, size: 16, c: 'green' });
  b += text(225, 54, 'than đá · dầu mỏ · khí tự nhiên', { size: 14, bold: true });
  b += box(24, 70, 402, 210, '+ Nhiều năng lượng, chủ động, công nghệ\n   sẵn có\n− Có hạn, hình thành hàng triệu năm\n− Thải CO₂ → hiệu ứng nhà kính,\n   biến đổi khí hậu\n− Thải SO₂, NOₓ, bụi → mưa acid,\n   ô nhiễm không khí', { fill: 'bg', c: 'red', size: 14 });
  b += text(675, 54, 'Mặt Trời · gió · nước · sinh khối · địa nhiệt · sóng', { size: 13.5, bold: true });
  b += box(474, 70, 402, 210, '+ Gần như vô tận, có sẵn trong tự nhiên\n+ Ít phát thải, thân thiện môi trường\n− Phụ thuộc thời tiết (nắng, gió)\n− Chi phí đầu tư ban đầu cao\n\nViệt Nam: điện mặt trời (Ninh Thuận…),\nđiện gió, thủy điện (Hòa Bình, Sơn La…)', { fill: 'bg', c: 'green', size: 14 });
  return svg(900, 305, 'Năng lượng hóa thạch và năng lượng tái tạo', b);
};

// ================= HÓA HỌC =================

F['day-hoat-dong-hoa-hoc'] = () => {
  const els = ['K', 'Na', 'Ca', 'Mg', 'Al', 'Zn', 'Fe', 'Pb', 'H', 'Cu', 'Ag', 'Au'];
  let b = text(450, 18, '"Khi Nào Cần May Áo Záp Sắt Phải Hỏi Cửa Hàng Á Âu"', { size: 14, italic: true, c: 'soft' });
  els.forEach((e, i) => {
    const x = 30 + i * 70, H = e === 'H';
    b += rect(x, 34, 60, 54, { fill: H ? 'fGray' : i < 3 ? 'fRed' : i < 8 ? 'fOrange' : 'fBlue', c: H ? 'soft' : i < 3 ? 'red' : i < 8 ? 'orange' : 'blue', dash: H ? '5 3' : undefined }) + text(x + 30, 69, e, { bold: true, size: 20 });
  });
  b += arrow(840, 104, 40, 104, { c: 'red', w: 3 }) + text(440, 124, 'Mức độ hoạt động hóa học TĂNG dần (từ phải sang trái)', { bold: true, size: 14, c: 'red' });
  b += box(20, 140, 280, 128, 'K, Na, Ca… (đầu dãy)\nPhản ứng với NƯỚC ở nhiệt độ\nthường → base + khí H₂\n2Na + 2H₂O → 2NaOH + H₂↑', { fill: 'fRed', c: 'red', size: 13.5 });
  b += box(310, 140, 280, 128, 'Kim loại ĐỨNG TRƯỚC H\ntác dụng với dung dịch acid\n(HCl, H₂SO₄ loãng) → muối + H₂\nFe + 2HCl → FeCl₂ + H₂↑', { fill: 'fOrange', c: 'orange', size: 13.5 });
  b += box(600, 140, 280, 128, 'Kim loại mạnh hơn (trừ K, Na,\nCa…) đẩy kim loại yếu hơn\nra khỏi dung dịch muối\nFe + CuSO₄ → FeSO₄ + Cu↓', { fill: 'fBlue', c: 'blue', size: 13.5 });
  return svg(900, 278, 'Dãy hoạt động hóa học của kim loại', b);
};

// công thức cấu tạo dạng chữ
function molecule(cx, cy, atoms, bonds) {
  let s = '';
  bonds.forEach(([a, b2, n]) => {
    const [x1, y1] = atoms[a].slice(0, 2), [x2, y2] = atoms[b2].slice(0, 2);
    const dx = x2 - x1, dy = y2 - y1, Lh = Math.hypot(dx, dy), nx = -dy / Lh * 4, ny = dx / Lh * 4;
    if (n === 2) s += line(cx + x1 + nx, cy + y1 + ny, cx + x2 + nx, cy + y2 + ny, { w: 2 }) + line(cx + x1 - nx, cy + y1 - ny, cx + x2 - nx, cy + y2 - ny, { w: 2 });
    else s += line(cx + x1, cy + y1, cx + x2, cy + y2, { w: 2 });
  });
  Object.values(atoms).forEach(([x, y, e]) => {
    const col = e === 'C' ? '#374151' : e === 'O' ? C.red : '#d1d5db';
    const r = e === 'H' ? 11 : 15;
    s += circle(cx + x, cy + y, r, { fill: col, c: 'ink', w: 1 }) + text(cx + x, cy + y + 5, e, { bold: true, size: 13, c: e === 'H' ? C.ink : '#ffffff' });
  });
  return s;
}
F['cong-thuc-huu-co'] = () => {
  const panel = (ox, w, title, sub, c) => rect(ox + 4, 0, w - 8, 300, { fill: 'panel', c: 'grid' }) + text(ox + w / 2, 24, title, { bold: true, size: 14.5, c }) + text(ox + w / 2, 260, sub, { size: 12.5 });
  let b = panel(0, 210, 'Methane CH₄', 'Chỉ liên kết đơn\nPhản ứng THẾ với Cl₂ (as)', 'blue');
  b += molecule(105, 140, { c: [0, 0, 'C'], a: [0, -50, 'H'], b2: [0, 50, 'H'], d: [-50, 0, 'H'], e: [50, 0, 'H'] }, [['c', 'a'], ['c', 'b2'], ['c', 'd'], ['c', 'e']]);
  b += panel(210, 230, 'Ethylene C₂H₄', '1 liên kết ĐÔI C=C\nPhản ứng CỘNG (làm mất màu\nnước bromine), trùng hợp', 'green');
  b += molecule(325, 140, { c1: [-28, 0, 'C'], c2: [28, 0, 'C'], h1: [-62, -38, 'H'], h2: [-62, 38, 'H'], h3: [62, -38, 'H'], h4: [62, 38, 'H'] }, [['c1', 'c2', 2], ['c1', 'h1'], ['c1', 'h2'], ['c2', 'h3'], ['c2', 'h4']]);
  b += panel(440, 230, 'Ethylic alcohol C₂H₅OH', 'Nhóm –OH\nTác dụng Na → H₂; cháy;\nlên men giấm', 'orange');
  b += molecule(555, 140, { c1: [-60, 0, 'C'], c2: [0, 0, 'C'], o: [55, 0, 'O'], ho: [92, 0, 'H'], h1: [-60, -45, 'H'], h2: [-60, 45, 'H'], h3: [-100, 0, 'H'], h4: [0, -45, 'H'], h5: [0, 45, 'H'] }, [['c1', 'c2'], ['c2', 'o'], ['o', 'ho'], ['c1', 'h1'], ['c1', 'h2'], ['c1', 'h3'], ['c2', 'h4'], ['c2', 'h5']]);
  b += panel(670, 230, 'Acetic acid CH₃COOH', 'Nhóm –COOH: tính ACID\n(quỳ tím → đỏ, + base, + muối\ncarbonate, + kim loại)', 'red');
  b += molecule(785, 140, { c1: [-62, 0, 'C'], c2: [0, 0, 'C'], o1: [0, -52, 'O'], o2: [52, 18, 'O'], ho: [86, 18, 'H'], h1: [-62, -42, 'H'], h2: [-62, 42, 'H'], h3: [-100, 0, 'H'] }, [['c1', 'c2'], ['c2', 'o1', 2], ['c2', 'o2'], ['o2', 'ho'], ['c1', 'h1'], ['c1', 'h2'], ['c1', 'h3']]);
  return svg(900, 305, 'Công thức cấu tạo một số hợp chất hữu cơ (C hóa trị IV, O hóa trị II, H hóa trị I)', b);
};

// ================= SINH HỌC =================

F['adn-arn-protein'] = () => {
  let b = '';
  const steps = [['ADN (gene)', 'mạch kép, xoắn\nA – T, G – C', 'fBlue', 'blue'], ['mARN', 'mạch đơn\nA – U, G – C', 'fGreen', 'green'], ['Protein', 'chuỗi amino acid', 'fOrange', 'orange'], ['Tính trạng', 'màu mắt, nhóm máu…', 'fPurple', 'purple']];
  steps.forEach(([t, d, f, c], i) => {
    const x = 14 + i * 224;
    b += box(x, 10, 190, 46, t, { fill: f, c, bold: true, size: 17 }) + box(x, 60, 190, 52, d, { fill: 'bg', c, size: 13 });
  });
  const lab = ['PHIÊN MÃ\n(trong nhân)', 'DỊCH MÃ\n(ribosome)', 'biểu hiện'];
  lab.forEach((t, i) => { const x = 204 + i * 224; b += arrow(x + 2, 33, x + 32, 33, { c: 'red', w: 2.5 }) + text(x + 17, 132, t, { size: 12, c: 'red', bold: true }); });
  // đoạn mạch minh họa
  const top = 'ATGCCGTA', bot = 'TACGGCAT', rna = 'UACGGCAU';
  b += text(20, 205, 'Mạch gốc (3\'→5\')', { anchor: 'start', size: 12.5, c: 'soft' }) + text(20, 235, 'Mạch bổ sung', { anchor: 'start', size: 12.5, c: 'soft' }) + text(20, 285, 'mARN (phiên mã\ntừ mạch gốc)', { anchor: 'start', size: 12.5, c: 'green' });
  for (let i = 0; i < 8; i++) {
    const x = 180 + i * 46;
    b += rect(x, 190, 38, 24, { fill: 'fBlue', c: 'blue', rx: 4 }) + text(x + 19, 207, bot[i], { bold: true }) + rect(x, 222, 38, 24, { fill: 'fBlue', c: 'blue', rx: 4 }) + text(x + 19, 239, top[i], { bold: true });
    b += rect(x, 272, 38, 24, { fill: 'fGreen', c: 'green', rx: 4 }) + text(x + 19, 289, top[i] === 'T' ? 'U' : top[i], { bold: true, c: 'green' });
  }
  b += box(570, 160, 316, 140, 'Nguyên tắc bổ sung:\nADN: A – T, G – C\nmARN: A(gốc) → U, T → A, G → C, C → G\n⇒ mARN giống mạch bổ sung, chỉ thay T bằng U\nDịch mã: 3 nucleotide liền kề = 1 codon\n→ quy định 1 amino acid', { fill: 'fGray', c: 'soft', size: 12.5 });
  return svg(900, 308, 'Từ gene đến tính trạng: ADN → mARN → protein → tính trạng', b);
};

F['lai-mot-cap-tinh-trang'] = () => {
  let b = text(220, 18, 'Mendel: lai một cặp tính trạng (đậu Hà Lan)', { bold: true, size: 15 });
  b += box(20, 34, 400, 40, 'P (thuần chủng): Hoa đỏ AA  ×  Hoa trắng aa', { fill: 'fGray', c: 'soft', size: 14 });
  b += arrow(220, 76, 220, 96) + box(20, 98, 400, 40, 'F₁: 100% Aa (hoa đỏ) – đỏ là TRỘI', { fill: 'fRed', c: 'red', size: 14 });
  b += arrow(220, 140, 220, 160) + box(20, 162, 400, 40, 'F₁ × F₁:  Aa × Aa', { fill: 'fGray', c: 'soft', size: 14 });
  b += box(20, 214, 400, 72, 'F₂: kiểu gene 1 AA : 2 Aa : 1 aa\nkiểu hình 3 đỏ : 1 trắng', { fill: 'fOrange', c: 'orange', size: 15, bold: true });
  const ox = 520, oy = 70, s = 90;
  b += text(ox + s, oy - 30, 'Giao tử F₁ (♂)', { size: 13, c: 'blue', bold: true }) + text(ox - 50, oy + s + 5, '♀', { size: 16, c: 'red', bold: true });
  ['A', 'a'].forEach((g, j) => { b += text(ox + s / 2 + j * s, oy - 8, g, { bold: true, size: 18, c: 'blue' }); b += text(ox - 18, oy + s / 2 + j * s + 6, g, { bold: true, size: 18, c: 'red' }); });
  [['AA', 'Aa'], ['Aa', 'aa']].forEach((row, i) => row.forEach((g, j) => {
    const red = g !== 'aa';
    b += rect(ox + j * s, oy + i * s, s, s, { rx: 0, fill: red ? 'fRed' : 'bg', c: 'line' }) + text(ox + j * s + s / 2, oy + i * s + s / 2 + 2, g, { bold: true, size: 20 }) + text(ox + j * s + s / 2, oy + i * s + s / 2 + 24, red ? 'đỏ' : 'trắng', { size: 12, c: red ? 'red' : 'soft' });
  }));
  b += text(ox + s, oy + 2 * s + 30, 'Khung Punnett', { size: 13, c: 'soft' });
  b += note(450, 302, 'Quy luật phân li: mỗi tính trạng do một cặp nhân tố di truyền (cặp allele) quy định; khi tạo giao tử, mỗi allele phân li về một giao tử', 'ink', 12.5);
  return svg(900, 312, 'Lai một cặp tính trạng và khung Punnett', b);
};

F['nguyen-phan-giam-phan'] = () => {
  const cell = (x, y, r, n, c, lab) => {
    let s = circle(x, y, r, { fill: c === 'blue' ? 'fBlue' : 'fGreen', c });
    const chrom = n === '2n' ? [['red', -10], ['red', -3], ['blue', 4], ['blue', 11]] : [['red', -4], ['blue', 4]];
    chrom.forEach(([cc, dx]) => { s += line(x + dx, y - 9, x + dx, y + 9, { c: cc, w: 4 }); });
    return s + text(x, y + r + 16, lab || n, { size: 12.5, bold: true, c });
  };
  let b = rect(8, 0, 434, 300, { fill: 'panel', c: 'grid' }) + rect(458, 0, 434, 300, { fill: 'panel', c: 'grid' });
  b += text(225, 26, 'NGUYÊN PHÂN', { bold: true, size: 17, c: 'blue' }) + text(675, 26, 'GIẢM PHÂN', { bold: true, size: 17, c: 'green' });
  b += cell(90, 130, 34, '2n', 'blue', 'tế bào mẹ 2n');
  b += arrow(130, 120, 250, 85, { c: 'soft' }) + arrow(130, 140, 250, 175, { c: 'soft' }) + cell(290, 80, 30, '2n', 'blue') + cell(290, 180, 30, '2n', 'blue');
  b += text(190, 92, '1 lần phân bào', { size: 12, c: 'soft' });
  b += text(225, 250, '1 tế bào 2n → 2 tế bào con 2n\nGiống hệt tế bào mẹ · tế bào sinh dưỡng\nÝ nghĩa: sinh trưởng, tái sinh, sinh sản vô tính', { size: 13 });
  b += cell(510, 130, 30, '2n', 'green', '2n');
  b += arrow(542, 120, 590, 90, { c: 'soft' }) + arrow(542, 140, 590, 170, { c: 'soft' });
  b += text(560, 58, 'GP I', { size: 12, c: 'soft', bold: true }) + text(700, 40, 'GP II', { size: 12, c: 'soft', bold: true });
  [90, 170].forEach((y) => { b += circle(615, y, 22, { fill: 'fGreen', c: 'green' }) + line(611, y - 8, 611, y + 8, { c: y === 90 ? 'red' : 'blue', w: 4 }) + line(619, y - 8, 619, y + 8, { c: y === 90 ? 'red' : 'blue', w: 4 }); });
  [60, 110, 150, 200].forEach((y, i) => { b += arrow(638, i < 2 ? 90 : 170, 708, y, { c: 'soft', w: 1.5 }) + circle(728, y, 18, { fill: 'fGreen', c: 'green' }) + line(728, y - 8, 728, y + 8, { c: i < 2 ? 'red' : 'blue', w: 4 }) + text(762, y + 5, 'n', { bold: true, c: 'green' }); });
  b += text(675, 250, '1 tế bào 2n → 4 tế bào con n (giao tử)\n2 lần phân bào liên tiếp · tế bào sinh dục\nÝ nghĩa: tạo giao tử, kết hợp thụ tinh → ổn định 2n', { size: 13 });
  return svg(900, 305, 'So sánh nguyên phân và giảm phân', b);
};

F['xac-dinh-gioi-tinh'] = () => {
  let b = box(130, 10, 240, 50, 'Mẹ: 44A + XX', { fill: 'fPink', c: 'pink', bold: true, size: 16 }) + box(530, 10, 240, 50, 'Bố: 44A + XY', { fill: 'fBlue', c: 'blue', bold: true, size: 16 });
  b += text(450, 42, '×', { size: 24, bold: true });
  b += arrow(250, 62, 250, 92) + arrow(600, 62, 560, 92) + arrow(700, 62, 740, 92);
  b += box(190, 94, 120, 40, '22A + X', { fill: 'fPink', c: 'pink', size: 15 }) + box(500, 94, 120, 40, '22A + X', { fill: 'fBlue', c: 'blue', size: 15 }) + box(680, 94, 120, 40, '22A + Y', { fill: 'fBlue', c: 'blue', size: 15 });
  b += text(250, 152, 'Giao tử: 1 loại', { size: 12.5, c: 'soft' }) + text(650, 152, 'Giao tử: 2 loại tỉ lệ 1 : 1', { size: 12.5, c: 'soft' });
  b += arrow(250, 160, 330, 200, { c: 'soft' }) + arrow(560, 136, 340, 200, { c: 'soft' }) + arrow(250, 160, 560, 200, { c: 'soft' }) + arrow(740, 136, 580, 200, { c: 'soft' });
  b += box(230, 202, 200, 50, 'Con gái: 44A + XX', { fill: 'fPink', c: 'pink', bold: true, size: 15 }) + box(470, 202, 200, 50, 'Con trai: 44A + XY', { fill: 'fBlue', c: 'blue', bold: true, size: 15 });
  b += note(450, 280, 'Tỉ lệ con trai : con gái ≈ 1 : 1 · Giới tính của con do loại TINH TRÙNG (X hay Y) kết hợp với trứng quyết định', 'ink', 13.5);
  return svg(900, 292, 'Cơ chế xác định giới tính ở người (NST giới tính)', b);
};

F['chon-loc-tu-nhien'] = () => {
  const st = [['Biến dị', 'Các cá thể trong loài\nkhác nhau (màu, kích\nthước, sức chịu đựng)', 'fBlue', 'blue'], ['Đấu tranh sinh tồn', 'Thức ăn, nơi ở có hạn;\nkẻ thù, điều kiện\nmôi trường khắc nghiệt', 'fOrange', 'orange'], ['Chọn lọc tự nhiên', 'Cá thể có biến dị CÓ LỢI\nsống sót, sinh sản nhiều;\nbiến dị có hại bị đào thải', 'fRed', 'red'], ['Hình thành loài mới', 'Đặc điểm có lợi tích lũy\nqua nhiều thế hệ →\nsinh vật thích nghi', 'fGreen', 'green']];
  let b = '';
  st.forEach(([t, d, f, c], i) => {
    const x = 14 + i * 222;
    b += box(x, 10, 200, 44, t, { fill: f, c, bold: true, size: 15 }) + box(x, 58, 200, 90, d, { fill: 'bg', c, size: 13 });
    if (i < 3) b += arrow(x + 202, 32, x + 220, 32, { c: 'soft' });
  });
  b += box(14, 166, 872, 74, 'Ví dụ: bướm sâu đo bạch dương ở Anh – khi thân cây bị muội than làm sẫm màu, bướm màu sẫm khó bị chim phát hiện\n→ sống sót nhiều hơn → tỉ lệ bướm sẫm tăng dần. Vi khuẩn kháng thuốc kháng sinh cũng hình thành theo cách tương tự.', { fill: 'panel', c: 'soft', size: 13.5, align: 'start' });
  return svg(900, 248, 'Học thuyết tiến hóa của Darwin: chọn lọc tự nhiên', b);
};

module.exports = F;
