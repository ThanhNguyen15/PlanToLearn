// Hình minh họa Lịch sử, Địa lí, GDCD, Tin học
const L = require('./lib');
const { C, svg, line, arrow, text, rect, box, circle, dot, poly, polyline, path, P } = L;

const F = {};

// ---------- Trục thời gian Việt Nam X – XVI ----------
F['truc-thoi-gian-viet-nam'] = () => {
  const x0 = 50, x1 = 870, y0 = 930, y1 = 1530;
  const X = (yr) => x0 + ((yr - y0) / (y1 - y0)) * (x1 - x0);
  const dyn = [['Ngô', 939, 965, 'blue'], ['Đinh', 968, 980, 'teal'], ['Tiền Lê', 980, 1009, 'green'], ['Lý', 1009, 1225, 'orange'], ['Trần', 1226, 1400, 'red'], ['Hồ', 1400, 1407, 'purple'], ['Thuộc Minh', 1407, 1427, 'soft'], ['Lê sơ', 1428, 1527, 'pink']];
  let b = '';
  for (let yr = 950; yr <= 1500; yr += 50) b += line(X(yr), 182, X(yr), 192, { c: 'soft', w: 1 }) + text(X(yr), 208, String(yr), { size: 11, c: 'soft' });
  dyn.forEach(([n, a, e, c], i) => {
    b += rect(X(a), 150, Math.max(X(e) - X(a), 3), 32, { fill: c, c, rx: 2 });
    const wide = X(e) - X(a) > 60;
    if (wide) b += text((X(a) + X(e)) / 2, 172, n, { bold: true, c: '#ffffff', size: 14 });
    else { const ly = i % 2 ? 236 : 130; b += line((X(a) + X(e)) / 2, i % 2 ? 182 : 150, (X(a) + X(e)) / 2, ly + (i % 2 ? -14 : 4), { c, w: 1.2 }) + text((X(a) + X(e)) / 2, ly, n, { bold: true, c, size: 12.5 }); }
  });
  const ev = [[938, 'Bạch Đằng\n(Ngô Quyền)'], [981, 'Chống Tống\n(Lê Hoàn)'], [1010, 'Dời đô\nThăng Long'], [1076, 'Như Nguyệt\n1075–1077'], [1258, ''], [1285, 'Chống Mông – Nguyên\n1258 · 1285 · 1288'], [1288, ''], [1418, 'Lam Sơn\n1418–1427'], [1428, ''], [1484, 'Bia tiến sĩ\n1484']];
  const lvls = [40, 80, 40, 80, 40, 80, 40, 80, 40, 80];
  ev.forEach(([yr, s], i) => {
    const x = X(yr), ly = lvls[i];
    if (!s) { b += dot(x, 150, 'ink', 4); return; }
    b += line(x, ly + 20, x, 150, { c: 'ink', w: 1, dash: '3 3' }) + dot(x, 150, 'ink', 4);
    b += text(x, ly - 2, s, { size: 11.5, bold: true });
  });
  b += text(450, 275, 'Ba lần chống Mông – Nguyên: 1258 · 1285 · 1287–1288 (nhà Trần) · 1428: Lê Lợi lập nhà Lê sơ, Bình Ngô đại cáo', { size: 13, c: 'soft' });
  return svg(900, 290, 'Trục thời gian các triều đại Việt Nam (thế kỉ X – đầu XVI)', b);
};

// ---------- Phòng tuyến Như Nguyệt ----------
F['phong-tuyen-nhu-nguyet'] = () => {
  let b = rect(0, 0, 620, 120, { fill: 'fRed', c: 'fRed', rx: 0 }) + text(310, 40, 'Quân Tống (Quách Quỳ, Triệu Tiết)', { bold: true, c: 'red', size: 16 });
  for (let i = 0; i < 6; i++) b += arrow(90 + i * 90, 60, 100 + i * 90, 112, { c: 'red', w: 2.5 });
  b += path('M0,130 C150,115 300,150 450,128 S600,120 620,130 L620,175 C470,165 300,195 150,170 S20,175 0,178 Z', { fill: 'fBlue', c: 'blue', w: 2 });
  b += text(310, 158, 'Sông Như Nguyệt (sông Cầu)', { bold: true, c: 'blue', size: 15 });
  for (let x = 10; x < 620; x += 16) b += line(x, 195, x + 6, 182, { c: 'brown', w: 3 });
  b += text(310, 218, 'Chiến lũy, cọc tre dày đặc dọc bờ Nam', { bold: true, c: 'brown', size: 13 });
  b += rect(0, 230, 620, 110, { fill: 'fGreen', c: 'fGreen', rx: 0 }) + text(310, 265, 'Quân Đại Việt (Lý Thường Kiệt)', { bold: true, c: 'green', size: 16 });
  b += text(310, 300, '"Nam quốc sơn hà Nam đế cư…"', { italic: true, size: 14 }) + text(310, 325, '↓ Thăng Long', { size: 13, c: 'soft' });
  b += box(640, 10, 245, 330, 'Kháng chiến chống Tống\n(1075 – 1077)\n\nGĐ 1 (1075): "tiến công\ntrước để tự vệ" – đánh\nchâu Ung, Khâm, Liêm\n\nGĐ 2 (1077): chặn giặc\nở phòng tuyến; phản công\n→ chủ động giảng hòa', { fill: 'panel', c: 'grid', size: 13.5 });
  return svg(900, 345, 'Sơ đồ phòng tuyến sông Như Nguyệt (1077)', b);
};

// ---------- Ba lần chống Mông – Nguyên ----------
F['ba-lan-khang-chien-mong-nguyen'] = () => {
  const cards = [
    ['Lần 1 – 1258', 'Quân Mông Cổ', '• Rút khỏi Thăng Long:\n  "vườn không nhà trống"\n• Phản công ở Đông Bộ Đầu', 'blue', 'fBlue'],
    ['Lần 2 – 1285', 'Quân Nguyên', '• Hội nghị Bình Than, Diên Hồng\n• Hịch tướng sĩ (Trần Quốc Tuấn)\n• Thắng ở Tây Kết, Hàm Tử,\n  Chương Dương, Vạn Kiếp', 'orange', 'fOrange'],
    ['Lần 3 – 1287–1288', 'Quân Nguyên', '• Diệt đoàn thuyền lương\n  ở Vân Đồn\n• Trận Bạch Đằng 1288:\n  cọc gỗ + thủy triều', 'red', 'fRed'],
  ];
  let b = '';
  cards.forEach(([t, e, d, c, f], i) => {
    const x = 15 + i * 295;
    b += rect(x, 10, 280, 230, { fill: f, c, w: 2.5, rx: 14 }) + text(x + 140, 40, t, { bold: true, size: 17, c }) + text(x + 140, 64, 'Giặc: ' + e, { size: 13, c: 'soft' });
    b += text(x + 16, 100, d, { anchor: 'start', size: 13.5 });
  });
  b += box(15, 255, 870, 75, 'Nguyên nhân thắng lợi: đoàn kết toàn dân ("vua tôi đồng lòng, anh em hòa mục") · chiến lược "vườn không nhà trống", tránh chỗ mạnh,\nđánh chỗ yếu · tài chỉ huy của Trần Quốc Tuấn (Hưng Đạo Vương), Trần Thủ Độ, Trần Quang Khải…', { fill: 'fGreen', c: 'green', size: 13.5, align: 'middle' });
  return svg(900, 340, 'Ba lần kháng chiến chống quân Mông – Nguyên (thế kỉ XIII)', b);
};

// ---------- Khởi nghĩa Lam Sơn ----------
F['khoi-nghia-lam-son'] = () => {
  const st = [['1418', 'Dựng cờ ở Lam Sơn\n(Thanh Hóa)\nLê Lợi – Bình Định Vương', 'soft', 'fGray'],
    ['1418–1423', 'Hoạt động ở miền núi\nThanh Hóa, rất khó khăn\n(Lê Lai cứu chúa)', 'orange', 'fOrange'],
    ['1424–1425', 'Vào Nghệ An; giải phóng\nNghệ An, Tân Bình,\nThuận Hóa', 'teal', 'fTeal'],
    ['1426', 'Tiến ra Bắc\nTrận Tốt Động –\nChúc Động', 'blue', 'fBlue'],
    ['1427', 'Chi Lăng – Xương Giang\ndiệt viện binh Liễu Thăng\nquân Minh rút về nước', 'red', 'fRed'],
    ['1428', 'Bình Ngô đại cáo\n(Nguyễn Trãi)\nLập nhà Lê sơ', 'green', 'fGreen']];
  let b = arrow(20, 60, 885, 60, { w: 3 });
  st.forEach(([y, d, c, f], i) => {
    const x = 20 + i * 145;
    b += circle(x + 65, 60, 10, { fill: c, c }) + text(x + 65, 38, y, { bold: true, c, size: 15 });
    b += rect(x, 85, 135, 115, { fill: f, c, w: 2, rx: 10 }) + text(x + 67, 112, d, { size: 12 });
  });
  b += text(450, 228, 'Đường lối: "lấy yếu chống mạnh, lấy ít địch nhiều" · dựa vào dân · "mưu phạt tâm công" (đánh vào lòng người)', { size: 13, bold: true });
  return svg(900, 240, 'Diễn biến khởi nghĩa Lam Sơn (1418 – 1427)', b);
};

// ---------- Phát kiến địa lí ----------
F['phat-kien-dia-li'] = () => {
  const v = [['1487', 'B. Đi-a-xơ', 'Bồ Đào Nha', 'Mũi Hảo Vọng\n(cực Nam châu Phi)', 'blue', 'fBlue'],
    ['1492', 'C. Cô-lôm-bô', 'Tây Ban Nha', 'Đến châu Mỹ\n("Tân thế giới")', 'red', 'fRed'],
    ['1497–1498', 'Va-xcô đơ Ga-ma', 'Bồ Đào Nha', 'Vòng qua châu Phi\nđến Ấn Độ', 'green', 'fGreen'],
    ['1519–1522', 'Ph. Ma-gien-lăng', 'Tây Ban Nha', 'Vòng quanh thế giới\n→ Trái Đất hình cầu', 'purple', 'fPurple']];
  let b = arrow(20, 50, 885, 50, { w: 3 });
  v.forEach(([y, n, q, r, c, f], i) => {
    const x = 20 + i * 218;
    b += circle(x + 100, 50, 10, { fill: c, c }) + text(x + 100, 30, y, { bold: true, size: 16, c });
    b += rect(x, 75, 200, 150, { fill: f, c, w: 2, rx: 12 });
    b += text(x + 100, 102, n, { bold: true, size: 15, c }) + text(x + 100, 124, '(' + q + ')', { size: 12.5, c: 'soft' }) + text(x + 100, 160, r, { size: 13.5 });
  });
  b += box(20, 240, 420, 110, 'Nguyên nhân:\n• cần vàng bạc, hương liệu, thị trường\n• kĩ thuật hàng hải: la bàn, tàu Ca-ra-ven', { fill: 'panel', c: 'grid', size: 13.5 });
  b += box(460, 240, 425, 110, 'Hệ quả:\n+ Trái Đất hình cầu; thương mại thế giới mở rộng\n− buôn bán nô lệ, cướp bóc thuộc địa', { fill: 'panel', c: 'grid', size: 13.5 });
  return svg(900, 360, 'Các cuộc đại phát kiến địa lí (cuối thế kỉ XV – đầu XVI)', b);
};

// ---------- Diện tích châu lục ----------
F['dien-tich-chau-luc'] = () => {
  const d = [['Châu Á', 44.4, 'red'], ['Châu Mỹ', 42, 'green'], ['Châu Phi', 30.3, 'orange'], ['Châu Nam Cực', 14.1, 'teal'], ['Châu Âu', 10, 'blue'], ['Châu Đại Dương', 8.5, 'purple']];
  let b = '';
  d.forEach(([n, v, c], i) => {
    const y = 15 + i * 44, w = v * 14;
    b += text(160, y + 22, n, { anchor: 'end', bold: true, size: 14 }) + rect(170, y, w, 30, { fill: c, c, rx: 4 }) + text(178 + w, y + 21, String(v).replace('.', ',') + ' triệu km²', { anchor: 'start', size: 13.5, bold: true });
  });
  b += text(450, 290, 'Số liệu xấp xỉ, đã gồm các đảo. Khi làm bài, ưu tiên số liệu trong SGK.', { size: 12.5, c: 'soft' });
  return svg(900, 300, 'Diện tích các châu lục (từ lớn đến nhỏ)', b);
};

// ---------- Sơ đồ châu Âu ----------
F['luoc-do-chau-au'] = () => {
  let b = rect(150, 20, 600, 300, { fill: 'none', c: 'ink', w: 2, rx: 20 });
  b += rect(150, 20, 600, 70, { fill: 'fTeal', c: 'teal', rx: 20 }) + text(450, 50, 'BẮC: cực, cận cực · núi già Xcan-đi-na-vi', { bold: true, size: 14, c: 'teal' }) + text(450, 72, 'đài nguyên, rừng lá kim', { size: 12.5 });
  b += rect(150, 95, 230, 150, { fill: 'fBlue', c: 'blue', rx: 8 }) + text(265, 140, 'TÂY: ôn đới HẢI DƯƠNG', { bold: true, size: 13.5, c: 'blue' }) + text(265, 165, 'mát, ẩm, mưa quanh năm\n(dòng biển nóng Bắc\nĐại Tây Dương, gió Tây)', { size: 12 });
  b += rect(385, 95, 130, 150, { fill: 'fGreen', c: 'green', rx: 8 }) + text(450, 140, 'ĐỒNG BẰNG', { bold: true, size: 13.5, c: 'green' }) + text(450, 165, 'chiếm phần lớn\ndiện tích\n(Đông Âu, Bắc Pháp)', { size: 12 });
  b += rect(520, 95, 230, 150, { fill: 'fOrange', c: 'orange', rx: 8 }) + text(635, 140, 'ĐÔNG: ôn đới LỤC ĐỊA', { bold: true, size: 13.5, c: 'orange' }) + text(635, 165, 'đông lạnh, khô;\nhè nóng, ít mưa\nsông Von-ga', { size: 12 });
  b += rect(150, 250, 600, 70, { fill: 'fRed', c: 'red', rx: 20 }) + text(450, 278, 'NAM: cận nhiệt ĐỊA TRUNG HẢI · núi trẻ An-pơ, Các-pát', { bold: true, size: 14, c: 'red' }) + text(450, 300, 'hè nóng khô, đông ấm có mưa', { size: 12.5 });
  b += text(80, 175, 'Đại\nTây\nDương', { bold: true, c: 'blue', size: 14 }) + text(820, 165, 'dãy\nU-ran\n(giáp\nchâu Á)', { bold: true, c: 'brown', size: 13 });
  b += text(450, 345, 'Bắc Băng Dương ở phía bắc · Địa Trung Hải ở phía nam', { size: 13, c: 'soft' });
  return svg(900, 355, 'Sơ đồ tự nhiên châu Âu (theo hướng Bắc – Nam, Tây – Đông)', b);
};

// ---------- Sơ đồ châu Á ----------
F['luoc-do-chau-a'] = () => {
  let b = rect(30, 20, 840, 320, { fill: 'fBlue', c: 'blue', rx: 24 }) + text(450, 44, 'Ven biển phía Đông, Đông Nam, Nam: khí hậu GIÓ MÙA (mưa nhiều mùa hạ)', { bold: true, c: 'blue', size: 14 });
  b += rect(110, 60, 680, 250, { fill: 'fOrange', c: 'orange', rx: 22 }) + text(450, 84, 'Nội địa, Tây Nam Á: khí hậu LỤC ĐỊA (khô hạn) · dầu mỏ', { bold: true, c: 'orange', size: 14 });
  b += poly([[280, 280], [450, 110], [620, 280]], { fill: 'fBrown', c: 'brown', w: 2.5 }) + text(450, 200, 'NÚI & SƠN NGUYÊN\nCAO ĐỒ SỘ', { bold: true, c: 'brown', size: 14 }) + text(450, 250, 'Hi-ma-lay-a, Tây Tạng\nÊ-vơ-rét ~8 849 m', { size: 12.5 });
  b += arrow(390, 170, 220, 140, { c: 'teal', w: 2 }) + arrow(510, 170, 690, 140, { c: 'teal', w: 2 });
  b += text(185, 125, 'Ô-bi, I-ê-nít-xây\n(chảy lên Bắc Á)', { size: 12, c: 'teal', bold: true }) + text(730, 125, 'Hoàng Hà,\nTrường Giang', { size: 12, c: 'teal', bold: true });
  b += text(190, 240, 'Ấn, Hằng\n(Nam Á)', { size: 12, c: 'teal', bold: true }) + text(715, 240, 'Mê Công\n(Đông Nam Á –\ncó Việt Nam)', { size: 12, c: 'teal', bold: true });
  b += text(450, 365, 'Sông lớn bắt nguồn từ vùng núi trung tâm, chảy ra mọi hướng · Châu Á rộng nhất (~44,4 triệu km²), đông dân nhất', { size: 13, c: 'soft' });
  return svg(900, 375, 'Sơ đồ tự nhiên châu Á: núi ở trung tâm, khí hậu phân hóa từ biển vào', b);
};

// ---------- Sơ đồ châu Phi ----------
F['luoc-do-chau-phi'] = () => {
  const bands = [['Cận nhiệt Địa Trung Hải', 'fGreen', 'green'], ['Hoang mạc Xa-ha-ra (lớn nhất thế giới)', 'fBrown', 'brown'], ['Nhiệt đới: xa-van', 'fOrange', 'orange'], ['Xích đạo ẩm: rừng rậm', 'fGreen', 'green'], ['Nhiệt đới: xa-van', 'fOrange', 'orange'], ['Hoang mạc Ca-la-ha-ri, Na-mip', 'fBrown', 'brown'], ['Cận nhiệt', 'fGreen', 'green']];
  const ws = [420, 470, 440, 380, 320, 250, 170];
  let b = '';
  bands.forEach(([t, f, c], i) => {
    const y = 15 + i * 44, w = ws[i];
    b += rect(330 - w / 2, y, w, 40, { fill: f, c, rx: 8 }) + text(330, y + 26, t, { bold: true, size: 13.5, c });
  });
  b += line(60, 15 + 3 * 44 + 20, 140, 15 + 3 * 44 + 20, { c: 'red', w: 2, dash: '8 5' }) + line(520, 15 + 3 * 44 + 20, 545, 15 + 3 * 44 + 20, { c: 'red', w: 2, dash: '8 5' }) + text(70, 15 + 3 * 44 + 14, 'Xích đạo', { anchor: 'start', c: 'red', bold: true, size: 13 });
  b += line(560, 40, 560, 230, { c: 'blue', w: 4 }) + text(570, 90, 'sông Nin\n(rất dài)', { anchor: 'start', c: 'blue', bold: true, size: 13 });
  b += box(640, 15, 245, 300, 'Châu Phi:\n• ~30 triệu km² (thứ 3)\n• nóng và khô bậc nhất\n• địa hình: khối sơn\n  nguyên lớn\n• các môi trường đối xứng\n  qua Xích đạo\n• dân số tăng nhanh\n• kim tự tháp Ai Cập', { fill: 'panel', c: 'grid', size: 13.5 });
  return svg(900, 330, 'Sơ đồ các môi trường tự nhiên châu Phi (từ Bắc xuống Nam)', b);
};

// ---------- Lát cắt địa hình châu Mỹ ----------
F['luoc-do-chau-my'] = () => {
  const prof = (oy, title, pts, labels, c) => {
    let s = text(30, oy - 150, title, { anchor: 'start', bold: true, size: 15, c });
    const d = 'M40,' + oy + ' ' + pts.map(([x, h]) => `L${x},${oy - h}`).join(' ') + ` L860,${oy} Z`;
    s += path(d, { fill: 'fBrown', c: 'brown', w: 2 });
    labels.forEach(([x, h, t]) => { s += text(x, oy - h - 10, t, { bold: true, size: 13 }); });
    s += text(40, oy + 18, 'TÂY (Thái Bình Dương)', { anchor: 'start', size: 12, c: 'blue' }) + text(860, oy + 18, 'ĐÔNG (Đại Tây Dương)', { anchor: 'end', size: 12, c: 'blue' });
    return s;
  };
  let b = prof(180, 'Bắc Mỹ – lát cắt Tây → Đông', [[80, 60], [120, 95], [160, 70], [200, 100], [240, 60], [280, 20], [600, 10], [660, 45], [700, 55], [740, 40], [800, 10]], [[170, 100, 'Coóc-đi-e (núi cao, đồ sộ)'], [440, 15, 'Đồng bằng trung tâm'], [700, 55, 'A-pa-lát (núi già)']], 'green');
  b += prof(400, 'Nam Mỹ – lát cắt Tây → Đông', [[70, 80], [110, 110], [150, 85], [190, 20], [520, 8], [600, 35], [700, 50], [800, 30]], [[110, 110, 'An-đét (cao, đồ sộ)'], [360, 12, 'Đồng bằng A-ma-dôn (rộng nhất TG)'], [700, 50, 'Sơn nguyên']], 'orange');
  b += text(450, 440, 'Rừng A-ma-dôn: rừng nhiệt đới lớn nhất – "lá phổi xanh" của Trái Đất · Kênh đào Pa-na-ma nối hai đại dương', { size: 13, c: 'soft' });
  return svg(900, 450, 'Lát cắt địa hình châu Mỹ (sơ đồ, không theo tỉ lệ)', b);
};

// ---------- Châu Nam Cực ----------
F['chau-nam-cuc'] = () => {
  let b = circle(230, 190, 170, { fill: 'fBlue', c: 'blue', w: 2 }) + text(230, 40, 'Đại dương bao quanh', { size: 12.5, c: 'blue' });
  b += path('M120,120 C170,60 300,60 350,120 C390,170 360,260 300,290 C230,320 140,300 110,240 C90,200 95,150 120,120 Z', { fill: '#f8fafc', c: 'soft', w: 2.5 });
  b += circle(230, 190, 150, { c: 'red', w: 2, dash: '8 6' }) + text(230, 352, 'vòng cực Nam (66°33′ vĩ độ Nam)', { size: 12.5, c: 'red', bold: true });
  b += dot(230, 190, 'red', 6) + text(230, 215, 'Cực Nam', { bold: true, size: 14 });
  b += text(230, 150, 'BĂNG dày ~2 km', { bold: true, c: 'teal', size: 14 });
  b += box(450, 20, 435, 330, 'Châu Nam Cực:\n• ~14 triệu km², phát hiện muộn nhất (~1820)\n• lạnh nhất thế giới (từng đo < −89°C)\n• gần như phủ kín băng; gió bão nhiều\n• chim cánh cụt, hải cẩu, cá voi\n• không có dân cư thường xuyên,\n  chỉ có trạm nghiên cứu khoa học\n• Hiệp ước Nam Cực (1959): chỉ dùng\n  cho hòa bình, nghiên cứu khoa học\n\n⚠ Băng tan → nước biển dâng →\n   đe dọa đồng bằng sông Cửu Long', { fill: 'panel', c: 'grid', size: 13.5 });
  return svg(900, 360, 'Châu Nam Cực – lục địa băng giá (sơ đồ)', b);
};

// ---------- Xử lý tình huống GDCD ----------
F['xu-ly-tinh-huong-gdcd'] = () => {
  const st = [['1. Xác định', 'Chuyện gì đang\nxảy ra? Ai làm gì?', 'blue', 'fBlue'], ['2. Đánh giá', 'Đúng hay sai?\nVì sao (theo bài học)?', 'orange', 'fOrange'], ['3. Đề xuất', 'Nếu là em, em làm gì?\n(cụ thể, an toàn)', 'green', 'fGreen'], ['4. Bài học', 'Em rút ra điều gì\ncho bản thân?', 'purple', 'fPurple']];
  let b = '';
  st.forEach(([t, d, c, f], i) => {
    const x = 20 + i * 220;
    b += rect(x, 20, 190, 130, { fill: f, c, w: 2.5, rx: 16 }) + text(x + 95, 52, t, { bold: true, size: 17, c }) + text(x + 95, 90, d, { size: 13.5 });
    if (i < 3) b += arrow(x + 192, 85, x + 218, 85, { c: 'soft', w: 3 });
  });
  b += text(450, 180, 'Gặp bạo lực, bắt nạt (kể cả trên mạng): KHÔNG im lặng – báo ngay thầy cô, bố mẹ', { size: 14, bold: true, c: 'red' });
  return svg(900, 195, 'Bốn bước xử lý tình huống (GDCD)', b);
};

// ---------- Tìm kiếm nhị phân ----------
F['tim-kiem-nhi-phan'] = () => {
  const a = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
  const steps = [[0, 9, 4, '16 < 23 → bỏ nửa trái'], [5, 9, 7, '56 > 23 → bỏ nửa phải'], [5, 6, 5, '23 = 23 → TÌM THẤY']];
  let b = '';
  steps.forEach(([lo, hi, m, s], r) => {
    const y = 20 + r * 85;
    b += text(20, y + 30, 'Bước ' + (r + 1), { anchor: 'start', bold: true, size: 14 });
    a.forEach((v, i) => {
      const x = 100 + i * 62, act = i >= lo && i <= hi, isM = i === m;
      b += rect(x, y, 56, 46, { fill: isM ? (r === 2 ? 'fGreen' : 'fOrange') : act ? 'fBlue' : 'fGray', c: isM ? (r === 2 ? 'green' : 'orange') : act ? 'blue' : 'grid', w: isM ? 3 : 1.5, rx: 6 });
      b += text(x + 28, y + 29, String(v), { size: 16, bold: act, c: act ? 'ink' : '#cbd5e1' });
    });
    b += text(740, y + 30, s, { anchor: 'start', size: 13, bold: true, c: r === 2 ? 'green' : 'orange' });
  });
  b += text(450, 285, 'Tìm số 23 trong dãy ĐÃ SẮP XẾP: mỗi bước so với phần tử giữa, loại bỏ một nửa dãy', { size: 14, bold: true });
  return svg(900, 295, 'Thuật toán tìm kiếm nhị phân (Tin học 7)', b);
};

module.exports = F;
