// Hình minh họa môn Ngữ văn và Tiếng Anh
const L = require('./lib');
const { C, svg, line, arrow, text, rect, box, circle, dot, poly, polyline, path, P, note, table } = L;

const F = {};

// sơ đồ tư duy: nút trung tâm + các nhánh xung quanh
function mindmap(w, h, title, center, nodes, o = {}) {
  const cx = w / 2, cy = h / 2;
  const rx = o.rx || w * 0.36, ry = o.ry || h * 0.36;
  let b = '';
  // vị trí các nút: vòng elip, hoặc 2 cột trái – phải (o.columns)
  const pos = (i) => {
    if (o.columns) {
      const half = Math.ceil(nodes.length / 2), k = i % half, right = i >= half;
      const gap = (h - 40) / half;
      return [right ? w - 20 - (o.bw || 210) / 2 : 20 + (o.bw || 210) / 2, 20 + gap / 2 + k * gap];
    }
    const a = 90 - (360 / nodes.length) * i;
    return [cx + rx * Math.cos((a * Math.PI) / 180), cy - ry * Math.sin((a * Math.PI) / 180)];
  };
  nodes.forEach(([t, d, c], i) => {
    const [x, y] = pos(i);
    b += line(cx, cy, x, y, { c, w: 3 });
  });
  b += circle(cx, cy, o.cr || 72, { fill: 'fGray', c: 'ink', w: 3 }) + text(cx, cy + 6 - (center.split('\n').length - 1) * 9, center, { bold: true, size: 17 });
  const bw = o.bw || 210, bh = o.bh || 78;
  nodes.forEach(([t, d, c, f], i) => {
    const [x, y] = pos(i);
    b += rect(x - bw / 2, y - bh / 2, bw, bh, { fill: f, c, w: 2.2, rx: 14 });
    b += text(x, y - bh / 2 + 24, t, { bold: true, size: 15.5, c });
    b += text(x, y - bh / 2 + 46, d, { size: 12.5 });
  });
  return svg(w, h, title, b);
}

F['so-do-doc-hieu-truyen'] = () => mindmap(900, 470, 'Sáu câu hỏi khi đọc hiểu một truyện', 'ĐỌC HIỂU\nTRUYỆN', [
  ['Đề tài', 'Truyện viết về điều gì?\n(tuổi thơ, gia đình, thiên nhiên…)', 'blue', 'fBlue'],
  ['Ngôi kể', 'Ai kể? Xưng "tôi" (ngôi 1)\nhay giấu mình (ngôi 3)? Tác dụng?', 'purple', 'fPurple'],
  ['Cốt truyện', 'Các sự việc chính\ntheo trình tự nào?', 'teal', 'fTeal'],
  ['Nhân vật', 'Ngoại hình, hành động, lời nói,\nsuy nghĩ → tính cách', 'orange', 'fOrange'],
  ['Chi tiết tiêu biểu', 'Chi tiết nào đặc sắc?\nNói lên điều gì?', 'pink', 'fPink'],
  ['Chủ đề – Thông điệp', 'Tác giả muốn gửi gắm gì?\nEm rút ra bài học gì?', 'green', 'fGreen'],
], { bw: 250, bh: 82, rx: 300, ry: 165 });

F['bien-phap-tu-tu'] = () => mindmap(900, 470, 'Bản đồ biện pháp tu từ (gọi tên → chỉ từ ngữ → nêu tác dụng)', 'BIỆN PHÁP\nTU TỪ', [
  ['So sánh', 'A như B · "Trẻ em như búp trên cành"\n→ cụ thể, sinh động', 'blue', 'fBlue'],
  ['Nhân hóa', 'Vật được tả như người\n"Ông trời mặc áo giáp đen"', 'green', 'fGreen'],
  ['Ẩn dụ', 'Gọi A bằng tên B (giống nhau)\n"Thuyền về có nhớ bến chăng"', 'purple', 'fPurple'],
  ['Hoán dụ', 'Gọi bằng tên gần gũi\n"Áo chàm đưa buổi phân li"', 'teal', 'fTeal'],
  ['Điệp ngữ', 'Lặp từ, cụm từ\n→ nhấn mạnh, tạo nhịp', 'orange', 'fOrange'],
  ['Liệt kê', 'Kể nhiều sự vật liên tiếp\n→ đầy đủ, phong phú', 'brown', 'fBrown'],
  ['Nói quá', 'Phóng đại mức độ\n"Lỗ mũi mười tám gánh lông"', 'red', 'fRed'],
  ['Nói giảm nói tránh', 'Cách nói tế nhị\n"Bác đã đi rồi sao, Bác ơi!"', 'pink', 'fPink'],
], { bw: 280, bh: 84, columns: true, cr: 75 });

F['van-nhip-tho'] = () => {
  let b = rect(8, 0, 434, 300, { fill: 'fBlue', c: 'blue' }) + rect(458, 0, 434, 300, { fill: 'fGreen', c: 'green' });
  b += text(225, 26, 'Thơ BỐN chữ – nhịp 2/2', { bold: true, size: 16, c: 'blue' });
  b += text(675, 26, 'Thơ NĂM chữ – nhịp 2/3 hoặc 3/2', { bold: true, size: 16, c: 'green' });
  const row = (ox, y, words, split, rhyme, col) => {
    let s = '', x = ox;
    words.forEach((wd, i) => {
      if (i === split) { s += line(x + 2, y - 14, x - 6, y + 22, { c: 'red', w: 2.5 }); x += 12; }
      const hl = rhyme.includes(i);
      s += rect(x, y - 14, 66, 34, { fill: hl ? 'fOrange' : 'bg', c: hl ? 'orange' : col, rx: 6, w: hl ? 2.5 : 1.5 }) + text(x + 33, y + 8, wd, { size: 15, bold: hl });
      x += 72;
    });
    return s;
  };
  const p4 = [['Mẹ', 'ơi', 'trời', 'lạnh'], ['Gió', 'về', 'đầy', 'ngõ'], ['Mẹ', 'ra', 'đồng', 'sớm'], ['Áo', 'mẹ', 'mỏng', 'manh']];
  p4.forEach((w, i) => { b += row(70, 70 + i * 50, w, 2, (i === 0 || i === 3) ? [3] : [], 'blue'); });
  b += text(225, 285, 'Vần chân "lạnh – manh" (vần anh) · gạch đỏ: chỗ ngắt nhịp', { size: 12.5 });
  const p5 = [[['Sân', 'trường', 'mùa', 'phượng', 'nở'], 2], [['Tiếng', 've', 'gọi', 'hè', 'sang'], 2], [['Cô', 'trò', 'đi', 'chầm', 'chậm'], 3], [['Bước', 'chân', 'qua', 'lối', 'vàng'], 2]];
  p5.forEach(([w, sp], i) => { b += row(478, 70 + i * 50, w, sp, (i === 1 || i === 3) ? [4] : [], 'green'); });
  b += text(675, 285, 'Vần "sang – vàng" (gieo vần cách) · dòng 3 nhịp 3/2', { size: 12.5 });
  return svg(900, 305, 'Vần và nhịp trong thơ bốn chữ, năm chữ (đoạn thơ minh họa)', b);
};

F['dan-y-nghi-luan'] = () => {
  const items = [
    ['MỞ BÀI', 'Nêu vấn đề + ý kiến của em (tán thành)', 'blue', 'fBlue'],
    ['1. Giải thích', 'Vấn đề nghĩa là gì?', 'teal', 'fTeal'],
    ['2. Lí lẽ 1 + bằng chứng', 'Vì sao đúng? Số liệu, sự việc, tấm gương', 'green', 'fGreen'],
    ['3. Lí lẽ 2 + bằng chứng', 'Thêm một lí do khác + ví dụ cụ thể', 'green', 'fGreen'],
    ['4. Ý kiến trái chiều', 'Có người cho rằng… → phản bác ngắn gọn', 'orange', 'fOrange'],
    ['5. Bài học, hành động', 'Em sẽ làm gì? (cụ thể)', 'purple', 'fPurple'],
    ['KẾT BÀI', 'Khẳng định lại ý kiến, lời kêu gọi', 'blue', 'fBlue'],
  ];
  let b = rect(120, 64, 660, 330, { fill: 'none', c: 'green', dash: '8 5', w: 2 }) + text(840, 230, 'THÂN\nBÀI', { bold: true, c: 'green', size: 16 });
  items.forEach(([t, d, c, f], i) => {
    const y = 6 + i * 66;
    b += rect(150, y, 600, 52, { fill: f, c, w: 2, rx: 12 });
    b += text(170, y + 22, t, { anchor: 'start', bold: true, size: 15.5, c });
    b += text(170, y + 42, d, { anchor: 'start', size: 13.5 });
    if (i < items.length - 1) b += arrow(450, y + 52, 450, y + 64, { c: 'soft', w: 2 });
  });
  return svg(900, 470, 'Dàn ý bài nghị luận về một vấn đề trong đời sống', b);
};

F['quy-trinh-viet-bai'] = () => {
  const st = [['1. Tìm hiểu đề', 'Gạch chân kiểu bài,\nđối tượng, yêu cầu', '3 phút', 'blue', 'fBlue'],
    ['2. Lập dàn ý', 'Ghi ý chính ra nháp:\nmở – thân – kết', '7 phút', 'green', 'fGreen'],
    ['3. Viết bài', 'Mỗi ý một đoạn,\ncó dẫn chứng', '40 phút', 'orange', 'fOrange'],
    ['4. Đọc lại, sửa', 'Chính tả, dấu câu,\nlặp từ', '5 – 10 phút', 'purple', 'fPurple']];
  let b = '';
  st.forEach(([t, d, tm, c, f], i) => {
    const x = 20 + i * 220;
    b += rect(x, 20, 190, 150, { fill: f, c, w: 2.5, rx: 16 });
    b += text(x + 95, 50, t, { bold: true, size: 16, c }) + text(x + 95, 90, d, { size: 14 });
    b += rect(x + 45, 132, 100, 28, { fill: 'bg', c, rx: 14 }) + text(x + 95, 151, tm, { size: 13, bold: true, c });
    if (i < 3) b += arrow(x + 192, 95, x + 218, 95, { c: 'soft', w: 3 });
  });
  b += text(450, 200, 'Tổng: bài viết 60 phút · Đừng bỏ bước 2 – dàn ý giúp bài không lạc đề, không thiếu ý', { size: 14, c: 'soft' });
  return svg(900, 215, 'Quy trình viết bài văn 4 bước', b);
};

F['mo-rong-thanh-phan-cau'] = () => {
  let b = '';
  const sent = (y, cn, vn, cw, vw, tag) => {
    let s = text(30, y + 8, tag, { anchor: 'start', bold: true, size: 14, c: 'soft' });
    s += rect(150, y - 22, cw, 44, { fill: 'fBlue', c: 'blue', w: 2 }) + text(150 + cw / 2, y + 7, cn, { size: 18, bold: true });
    s += rect(160 + cw, y - 22, vw, 44, { fill: 'fOrange', c: 'orange', w: 2 }) + text(160 + cw + vw / 2, y + 7, vn, { size: 18, bold: true });
    s += text(150 + cw / 2, y + 42, 'Chủ ngữ', { size: 13, c: 'blue' }) + text(160 + cw + vw / 2, y + 42, 'Vị ngữ', { size: 13, c: 'orange' });
    return s;
  };
  b += sent(40, 'Hoa', 'nở.', 90, 90, 'Câu gốc');
  b += arrow(300, 92, 300, 128, { c: 'green', w: 3 }) + text(320, 115, 'mở rộng bằng cụm từ', { anchor: 'start', c: 'green', bold: true, size: 14 });
  b += sent(170, 'Những bông hoa sen trong đầm', 'đang nở rộ.', 330, 180, 'Câu mở rộng');
  b += text(305, 245, 'cụm danh từ', { size: 13, c: 'blue', italic: true }) + text(585, 245, 'cụm động từ', { size: 13, c: 'orange', italic: true });
  b += box(700, 20, 185, 200, 'Mở rộng giúp câu:\n• cụ thể hơn\n• giàu hình ảnh hơn\n• rõ ý hơn', { fill: 'fGreen', c: 'green', size: 14 });
  return svg(900, 260, 'Mở rộng thành phần chính của câu bằng cụm từ', b);
};

F['vong-hoc-tu-vung'] = () => {
  const steps = [['1. Nghe – đọc to', 'blue'], ['2. Viết từ, nghĩa,\ntừ loại', 'green'], ['3. Đặt 1 câu\nvề bản thân', 'orange'], ['4. Làm thẻ ôn', 'purple'], ['5. Ôn lại\nđúng lịch', 'red']];
  const cx = 230, cy = 185, R = 122;
  let b = circle(cx, cy, R, { c: 'grid', w: 10 });
  steps.forEach(([t, c], i) => {
    const a = 90 - i * 72;
    const [x, y] = P(cx, cy, R, a);
    const [x2, y2] = P(cx, cy, R, a - 72);
    void x2; void y2;
    b += circle(x, y, 56, { fill: 'bg', c, w: 3 }) + text(x, y + 5 - (t.split('\n').length - 1) * 7, t, { size: 11.5, bold: true, c });
  });
  b += text(cx, cy + 6, '1 – 2 phút\nmỗi từ', { size: 15, bold: true });
  // lịch ôn
  b += text(660, 40, 'Lịch ôn lại (lặp lại ngắt quãng)', { bold: true, size: 16 });
  const days = [['Ngày 0', 'Học mới'], ['+1 ngày', 'Ôn 1'], ['+3 ngày', 'Ôn 2'], ['+7 ngày', 'Ôn 3'], ['+14 ngày', 'Nhớ lâu']];
  b += arrow(470, 140, 880, 140, { w: 2.5 });
  days.forEach(([d, s], i) => {
    const x = 490 + i * 90;
    b += dot(x, 140, i === 4 ? 'green' : 'blue', 8) + text(x, 120, d, { size: 13, bold: true }) + text(x, 168, s, { size: 13, c: i === 4 ? 'green' : 'ink' });
  });
  b += box(480, 200, 400, 100, 'Mỗi tối 15 phút: 5 phút ôn thẻ cũ\n+ 10 phút học 5 – 8 từ mới.\nTừ nào sai 2 lần → chép vào sổ lỗi sai.', { fill: 'fBlue', c: 'blue', size: 14, align: 'start' });
  return svg(900, 360, 'Vòng học từ vựng 5 bước', b);
};

F['bien-bao-giao-thong'] = () => {
  let b = '';
  const cell = (i, label, draw) => {
    const x = 20 + i * 145;
    b += rect(x, 10, 130, 200, { fill: 'panel', c: 'grid' }) + draw(x + 65, 85) + text(x + 65, 175, label, { size: 13, bold: true });
  };
  cell(0, 'No parking\n(cấm đỗ xe)', (x, y) => circle(x, y, 50, { fill: 'blue', c: 'red', w: 10 }) + line(x - 35, y - 35, x + 35, y + 35, { c: 'red', w: 9 }));
  cell(1, 'No left turn\n(cấm rẽ trái)', (x, y) => circle(x, y, 50, { fill: 'bg', c: 'red', w: 10 }) + path(`M${x + 12},${y + 32} L${x + 12},${y - 5} Q${x + 12},${y - 15} ${x},${y - 15} L${x - 22},${y - 15}`, { c: 'ink', w: 4, arrow: true }) + line(x - 35, y - 35, x + 35, y + 35, { c: 'red', w: 7 }));
  cell(2, 'Stop\n(dừng lại)', (x, y) => {
    const pts = []; for (let k = 0; k < 8; k++) pts.push(P(x, y, 54, 22.5 + k * 45));
    return poly(pts, { fill: 'red', c: 'red' }) + text(x, y + 9, 'STOP', { size: 22, bold: true, c: '#ffffff' });
  });
  cell(3, 'Traffic lights ahead\n(phía trước có đèn)', (x, y) => poly([[x, y - 52], [x - 56, y + 45], [x + 56, y + 45]], { fill: 'orange', c: 'red', w: 6 }) + rect(x - 10, y - 18, 20, 52, { fill: 'ink', c: 'ink', rx: 4 }) + dot(x, y - 8, 'red', 5) + dot(x, y + 8, 'orange', 5) + dot(x, y + 24, 'green', 5));
  cell(4, 'Hospital\n(bệnh viện)', (x, y) => rect(x - 50, y - 50, 100, 100, { fill: 'blue', c: 'blue', rx: 8 }) + rect(x - 30, y - 30, 60, 60, { fill: 'bg', c: 'bg', rx: 4 }) + text(x, y + 16, 'H', { size: 44, bold: true, c: 'blue' }));
  cell(5, 'Speed limit 40\n(tốc độ tối đa 40)', (x, y) => circle(x, y, 50, { fill: 'bg', c: 'red', w: 10 }) + text(x, y + 13, '40', { size: 34, bold: true }));
  b += text(450, 235, 'You must stop at a red light. · You mustn\'t park here. · You should wear a helmet.', { size: 14, c: 'soft', italic: true });
  return svg(900, 245, 'Một số biển báo giao thông (Unit 7: Traffic)', b);
};

F['truc-thoi-gian-cac-thi'] = () => {
  let b = arrow(40, 150, 870, 150, { w: 3 });
  b += line(450, 60, 450, 240, { c: 'red', w: 2.5, dash: '6 5' }) + text(450, 52, 'NOW (bây giờ)', { bold: true, c: 'red' });
  b += text(170, 52, 'PAST (quá khứ)', { bold: true, c: 'soft' }) + text(740, 52, 'FUTURE (tương lai)', { bold: true, c: 'soft' });
  // quá khứ đơn
  b += line(200, 125, 220, 175, { c: 'blue', w: 4 }) + line(220, 125, 200, 175, { c: 'blue', w: 4 });
  b += box(100, 190, 220, 74, 'Past simple\nI visited Hue last year.\nyesterday, ago, last…', { fill: 'fBlue', c: 'blue', size: 13, align: 'middle' });
  // hiện tại đơn
  [330, 380, 520, 570].forEach((x) => { b += line(x, 135, x, 165, { c: 'green', w: 4 }); });
  b += box(320, 70, 260, 50, 'Present simple: thói quen\nI usually walk to school.', { fill: 'fGreen', c: 'green', size: 13, align: 'middle' });
  // hiện tại tiếp diễn
  b += path('M420,150 q7.5,-12 15,0 t15,0 t15,0 t15,0', { c: 'orange', w: 4 });
  b += box(345, 190, 210, 74, 'Present continuous\nI am studying now.\nnow, at the moment', { fill: 'fOrange', c: 'orange', size: 13, align: 'middle' });
  // tương lai đơn
  b += circle(720, 150, 10, { fill: 'purple', c: 'purple' });
  b += box(600, 190, 250, 74, 'Future simple\nPeople will travel by flying car.\ntomorrow, next…, in the future', { fill: 'fPurple', c: 'purple', size: 13, align: 'middle' });
  b += box(640, 70, 210, 50, 'used to + V: thói quen\ncũ, nay không còn', { fill: 'fGray', c: 'soft', size: 12.5, align: 'middle' });
  return svg(900, 275, 'Các thì tiếng Anh lớp 7 trên trục thời gian', b);
};

F['gioi-tu-in-on-at'] = () => {
  let b = poly([[150, 20], [750, 20], [620, 120], [280, 120]], { fill: 'fBlue', c: 'blue' });
  b += text(450, 60, 'IN – rộng nhất', { bold: true, size: 20, c: 'blue' }) + text(450, 92, 'in 2027 · in May · in summer · in the morning · in Hanoi · in Vietnam', { size: 14 });
  b += poly([[280, 130], [620, 130], [540, 220], [360, 220]], { fill: 'fGreen', c: 'green' });
  b += text(450, 165, 'ON', { bold: true, size: 20, c: 'green' }) + text(450, 195, 'on Monday · on 5th May · on the table', { size: 13.5 });
  b += poly([[330, 230], [570, 230], [450, 340]], { fill: 'fOrange', c: 'orange' });
  b += text(450, 262, 'AT', { bold: true, size: 20, c: 'orange' }) + text(450, 288, 'at 7 a.m.', { size: 13 }) + text(450, 305, 'at home', { size: 12 });
  b += text(800, 170, 'Thời gian\nvà nơi chốn:\ncàng cụ thể,\ncàng nhỏ\n→ AT', { size: 14, c: 'soft' });
  return svg(900, 350, 'Giới từ IN – ON – AT (từ rộng đến cụ thể)', b);
};

F['dem-duoc-khong-dem-duoc'] = () => {
  let b = rect(8, 0, 434, 290, { fill: 'fGreen', c: 'green' }) + rect(458, 0, 434, 290, { fill: 'fBlue', c: 'blue' });
  b += text(225, 28, 'Đếm được (countable)', { bold: true, size: 17, c: 'green' });
  b += text(675, 28, 'Không đếm được (uncountable)', { bold: true, size: 17, c: 'blue' });
  for (let i = 0; i < 3; i++) {
    const x = 120 + i * 95;
    b += circle(x, 95, 32, { fill: 'red', c: 'red' }) + line(x, 63, x + 6, 50, { c: 'brown', w: 4 }) + text(x, 150, ['an apple', 'two apples', 'three apples'][i], { size: 13 });
  }
  b += text(225, 195, 'How MANY apples?', { bold: true, size: 17 }) + text(225, 225, 'a / an · many · a few · số đếm', { size: 14 }) + text(225, 255, 'apple → apples (có số nhiều)', { size: 14, c: 'soft' });
  b += path('M600,55 L610,145 Q612,150 620,150 L670,150 Q678,150 680,145 L690,55 Z', { fill: 'none', c: 'ink', w: 3 }) + path('M604,85 L610,145 Q612,150 620,150 L670,150 Q678,150 680,145 L686,85 Z', { fill: 'blue', c: 'blue', w: 0 });
  b += text(645, 172, 'a glass of water', { size: 13 });
  b += rect(735, 80, 90, 70, { fill: 'fBrown', c: 'brown', rx: 30 }) + text(780, 172, 'a loaf of bread', { size: 13 });
  b += text(675, 205, 'How MUCH water?', { bold: true, size: 17 }) + text(675, 232, 'much · a little · a glass/bottle/kilo of…', { size: 14 }) + text(675, 258, 'water, milk, rice, flour, bread, butter', { size: 14, c: 'soft' });
  b += text(450, 315, 'some: câu khẳng định, lời mời  ·  any: câu phủ định, câu hỏi', { bold: true, size: 15 });
  return svg(900, 325, 'Danh từ đếm được và không đếm được (Unit 5)', b);
};

module.exports = F;
