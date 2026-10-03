// Hình minh họa môn Ngữ văn và Tiếng Anh 9
const L = require('./lib');
const { C, svg, line, arrow, text, rect, box, circle, dot, note, table } = L;

const F = {};

// ================= NGỮ VĂN =================

// ---------- Truyện truyền kì ----------
F['so-do-truyen-truyen-ki'] = () => {
  let b = box(20, 10, 260, 150, 'YẾU TỐ HIỆN THỰC\n• bối cảnh lịch sử có thật\n• số phận con người\n  (người phụ nữ, kẻ sĩ…)\n• xã hội bất công', { fill: 'fBlue', c: 'blue', size: 14 });
  b += box(620, 10, 260, 150, 'YẾU TỐ KÌ ẢO\n• thế giới thần tiên, cõi âm,\n  thủy cung\n• nhân vật siêu nhiên\n• chi tiết hoang đường', { fill: 'fPurple', c: 'purple', size: 14 });
  b += box(320, 40, 260, 90, 'TRUYỆN TRUYỀN KÌ\n(văn xuôi chữ Hán thời trung đại)', { fill: 'fOrange', c: 'orange', bold: true, size: 15 });
  b += arrow(282, 85, 318, 85, { c: 'blue' }) + arrow(618, 85, 582, 85, { c: 'purple' });
  b += arrow(450, 132, 450, 176, { c: 'orange' });
  b += box(170, 178, 560, 80, 'Ý NGHĨA: phản ánh hiện thực, bày tỏ niềm cảm thông với con người\n(nhất là người phụ nữ), thể hiện ước mơ công lí:\n"người tốt được đền đáp, kẻ ác bị trừng trị"', { fill: 'fGreen', c: 'green', size: 14, align: 'middle' });
  b += note(450, 282, 'Câu hỏi hay gặp: "Chỉ ra một chi tiết kì ảo và nêu tác dụng" → tạo sức hấp dẫn + hoàn chỉnh tính cách nhân vật + thể hiện ước mơ/thái độ của tác giả', 'ink', 13);
  return svg(900, 292, 'Truyện truyền kì: hiện thực đan xen kì ảo', b);
};

// ---------- Thơ song thất lục bát, thơ tám chữ ----------
F['the-tho-song-that-luc-bat'] = () => {
  let b = rect(8, 0, 534, 300, { fill: 'panel', c: 'grid' }) + rect(556, 0, 336, 300, { fill: 'panel', c: 'grid' });
  b += text(275, 24, 'Song thất lục bát: một khổ 4 câu (7 – 7 – 6 – 8)', { bold: true, size: 15, c: 'blue' });
  const rows = [[7, 'Câu thất 1', [7]], [7, 'Câu thất 2', [5, 7]], [6, 'Câu lục', [6]], [8, 'Câu bát', [6, 8]]];
  const pos = {};
  rows.forEach(([n, name, marks], i) => {
    const y = 60 + i * 52;
    b += text(26, y + 5, name, { anchor: 'start', size: 13, c: 'soft' });
    for (let k = 1; k <= n; k++) {
      const x = 110 + (k - 1) * 46;
      const hit = marks.includes(k);
      b += circle(x + 18, y, 15, { fill: hit ? 'fOrange' : 'bg', c: hit ? 'orange' : 'soft', w: hit ? 2.5 : 1.2 }) + text(x + 18, y + 5, String(k), { size: 12, bold: hit, c: hit ? 'orange' : 'soft' });
      pos[`${i}-${k}`] = [x + 18, y];
    }
  });
  // vần: 7(câu1) - 5(câu2); 7(câu2) - 6(câu lục); 6(câu lục) - 6(câu bát); 8 câu bát - (câu 3 khổ sau)
  const link = (a, c2, col) => { const [x1, y1] = pos[a], [x2, y2] = pos[c2]; return L.path(`M${x1},${y1 + 15} Q${(x1 + x2) / 2 + 30},${(y1 + y2) / 2} ${x2},${y2 - 15}`, { c: col, dash: '5 4', w: 1.8 }); };
  b += link('0-7', '1-5', 'red') + link('1-7', '2-6', 'green') + link('2-6', '3-6', 'purple');
  b += text(275, 268, 'Vần: chữ 7 câu thất 1 ↔ chữ 5 câu thất 2; chữ 7 câu thất 2 ↔ chữ 6 câu lục;', { size: 12.5 });
  b += text(275, 286, 'chữ 6 câu lục ↔ chữ 6 câu bát; chữ 8 câu bát ↔ vần sang khổ sau · nhịp câu thất thường 3/4', { size: 12.5 });
  b += text(724, 24, 'Thơ tám chữ', { bold: true, size: 15, c: 'green' });
  b += box(572, 44, 304, 160, 'Mỗi dòng 8 chữ (có thể linh hoạt)\nNhịp đa dạng: 3/2/3, 3/3/2, 4/4…\nVần chân (liền, cách) hoặc vần lưng\nKhổ thơ thường 4 dòng, có thể tự do\nGiàu nhạc tính, phù hợp mạch cảm xúc\ndạt dào, kể – tả – bộc lộ đan xen', { fill: 'fGreen', c: 'green', size: 13.5 });
  b += box(572, 216, 304, 70, 'Ví dụ quen thuộc: "Quê hương"\n(Tế Hanh), "Nhớ rừng" (Thế Lữ)', { fill: 'bg', c: 'green', size: 13 });
  return svg(900, 305, 'Hai thể thơ trọng tâm lớp 9', b);
};

// ---------- Truyện Kiều ----------
F['truyen-kieu-nghe-thuat'] = () => {
  const parts = [['Gặp gỡ và\nđính ước', 'Kiều gặp Kim Trọng,\nthề nguyền', 'fGreen', 'green'], ['Gia biến và\nlưu lạc', '15 năm đoạn trường:\nbán mình chuộc cha,\nlầu Ngưng Bích…', 'fRed', 'red'], ['Đoàn tụ', 'Kiều gặp lại gia đình,\n"tái hợp" với Kim Trọng', 'fBlue', 'blue']];
  let b = '';
  parts.forEach(([t, d, f, c], i) => {
    const x = 20 + i * 290;
    b += box(x, 8, 260, 52, t, { fill: f, c, bold: true, size: 15 }) + box(x, 64, 260, 70, d, { fill: 'bg', c, size: 13 });
    if (i < 2) b += arrow(x + 262, 34, x + 288, 34, { c: 'soft' });
  });
  const arts = [
    ['Bút pháp ước lệ,\ntượng trưng', 'Lấy vẻ đẹp thiên nhiên\nđể tả người: "mai cốt cách,\ntuyết tinh thần"', 'fOrange', 'orange'],
    ['Tả cảnh ngụ tình', 'Cảnh là tâm trạng:\n"Buồn trông cửa bể chiều hôm…"\n(lầu Ngưng Bích)', 'fPurple', 'purple'],
    ['Miêu tả nội tâm,\nđộc thoại', 'Nhân vật tự nói với mình,\nbộc lộ day dứt, nhớ thương', 'fTeal', 'teal'],
    ['Ngôn ngữ\ntinh tế, giàu nhạc', 'Từ láy, điệp ngữ, điển cố,\nthể lục bát mượt mà', 'fBlue', 'blue'],
  ];
  b += text(450, 166, 'Thành công nghệ thuật của Nguyễn Du (dùng để phân tích đoạn trích)', { bold: true, size: 15 });
  arts.forEach(([t, d, f, c], i) => {
    const x = 14 + i * 220;
    b += box(x, 180, 208, 54, t, { fill: f, c, bold: true, size: 14 }) + box(x, 238, 208, 76, d, { fill: 'bg', c, size: 12.5 });
  });
  return svg(900, 322, 'Truyện Kiều (Nguyễn Du) – truyện thơ Nôm viết bằng thể lục bát', b);
};

// ---------- Dàn ý nghị luận xã hội: vấn đề cần giải quyết ----------
F['dan-y-nghi-luan-xa-hoi'] = () => {
  let b = box(20, 8, 860, 50, 'MỞ BÀI: Giới thiệu vấn đề cần giải quyết + nêu ý kiến của em (cần giải quyết vì sao)', { fill: 'fBlue', c: 'blue', size: 14.5, bold: true });
  const items = [['Thực trạng', 'Vấn đề biểu hiện thế nào?\nSố liệu, ví dụ cụ thể', 'fOrange', 'orange'], ['Nguyên nhân', 'Chủ quan (bản thân)\nKhách quan (gia đình,\nxã hội, công nghệ)', 'fRed', 'red'], ['Hậu quả', 'Với cá nhân,\ngia đình, cộng đồng', 'fPurple', 'purple'], ['GIẢI PHÁP ⭐', 'Khả thi, cụ thể:\nAI làm? Làm GÌ?\nLàm THẾ NÀO?', 'fGreen', 'green']];
  b += text(450, 84, 'THÂN BÀI', { bold: true, size: 15 });
  items.forEach(([t, d, f, c], i) => {
    const x = 20 + i * 218;
    b += box(x, 96, 206, 44, t, { fill: f, c, bold: true, size: 15 }) + box(x, 144, 206, 86, d, { fill: 'bg', c, size: 13 });
    if (i < 3) b += arrow(x + 207, 118, x + 217, 118, { c: 'soft' });
  });
  b += box(20, 240, 860, 40, 'Ý kiến trái chiều: nêu và phản bác / bổ sung một cách thuyết phục (giúp bài sâu hơn)', { fill: 'panel', c: 'soft', size: 13.5 });
  b += box(20, 290, 860, 50, 'KẾT BÀI: Khẳng định lại sự cần thiết của giải pháp + lời kêu gọi + hành động của bản thân', { fill: 'fBlue', c: 'blue', size: 14.5, bold: true });
  return svg(900, 348, 'Dàn ý bài văn nghị luận về một vấn đề cần giải quyết', b);
};

// ---------- Dàn ý nghị luận văn học ----------
F['dan-y-phan-tich-tac-pham'] = () => {
  let b = rect(8, 0, 438, 340, { fill: 'fBlue', c: 'blue' }) + rect(454, 0, 438, 340, { fill: 'fOrange', c: 'orange' });
  b += text(227, 26, 'Phân tích một tác phẩm TRUYỆN', { bold: true, size: 16, c: 'blue' }) + text(673, 26, 'Phân tích một bài / đoạn THƠ', { bold: true, size: 16, c: 'orange' });
  b += box(24, 42, 406, 54, 'MB: tác giả, tác phẩm, vấn đề nghị luận\n(chủ đề / nhân vật cần phân tích)', { fill: 'bg', c: 'blue', size: 13 });
  b += box(24, 104, 406, 160, 'TB:\n① Tóm tắt ngắn, nêu tình huống truyện\n② Phân tích chủ đề qua nhân vật, sự việc\n    (luận điểm → dẫn chứng → phân tích)\n③ Phân tích nghệ thuật: cốt truyện, ngôi kể,\n    chi tiết tiêu biểu, yếu tố kì ảo…\n④ Đánh giá: giá trị nội dung, giá trị nghệ thuật', { fill: 'bg', c: 'blue', size: 13 });
  b += box(24, 272, 406, 56, 'KB: khẳng định giá trị, ý nghĩa\ntác phẩm với bản thân / cuộc sống', { fill: 'bg', c: 'blue', size: 13 });
  b += box(470, 42, 406, 54, 'MB: tác giả, bài thơ (hoàn cảnh sáng tác),\nấn tượng chung', { fill: 'bg', c: 'orange', size: 13 });
  b += box(470, 104, 406, 160, 'TB: phân tích theo KHỔ / theo MẠCH CẢM XÚC\n• Trích thơ → chỉ từ ngữ, hình ảnh đặc sắc\n• Gọi tên biện pháp tu từ + tác dụng\n• Vần, nhịp, thể thơ góp phần thể hiện cảm xúc\n• Cảm xúc, tình cảm của nhân vật trữ tình\nĐánh giá: nội dung + nghệ thuật', { fill: 'bg', c: 'orange', size: 13 });
  b += box(470, 272, 406, 56, 'KB: khái quát giá trị, cảm nghĩ\ncủa em về bài thơ', { fill: 'bg', c: 'orange', size: 13 });
  return svg(900, 345, 'Dàn ý bài văn nghị luận phân tích tác phẩm văn học', b);
};

// ---------- Câu ghép: quan hệ giữa các vế ----------
F['cau-ghep-quan-he-ve'] = () => {
  const rows = [['Quan hệ', 'Cặp kết từ / quan hệ từ', 'Ví dụ'],
    ['Nguyên nhân – kết quả', 'Vì … nên …; Do … nên …; Nhờ … mà …', 'Vì trời mưa to nên trận đấu bị hoãn.'],
    ['Điều kiện – kết quả', 'Nếu … thì …; Hễ … thì …', 'Nếu em chăm chỉ thì em sẽ tiến bộ.'],
    ['Tương phản', 'Tuy … nhưng …; Mặc dù … nhưng …', 'Tuy nhà xa nhưng Lan chưa đi muộn.'],
    ['Tăng tiến', 'Không những … mà còn …; Càng … càng …', 'Trời càng về khuya, gió càng lạnh.'],
    ['Lựa chọn', '… hay …; hoặc … hoặc …', 'Em đi hay anh đi?'],
    ['Bổ sung, nối tiếp', 'và, rồi, còn; cặp từ hô ứng: vừa … đã …', 'Mưa vừa tạnh, mặt trời đã ló ra.'],
  ];
  let b = table(20, 6, [190, 330, 340], 38, rows, { size: 13.5 });
  b += note(450, 290, 'Câu ghép = từ hai cụm chủ – vị (C – V) trở lên, không bao chứa nhau · Nối các vế bằng kết từ, cặp kết từ, cặp từ hô ứng hoặc dấu câu', 'ink', 13);
  return svg(900, 300, 'Câu ghép và các kiểu quan hệ giữa các vế', b);
};

// ---------- Cách dẫn trực tiếp, gián tiếp ----------
F['dan-truc-tiep-gian-tiep'] = () => {
  let b = rect(8, 0, 438, 230, { fill: 'fBlue', c: 'blue' }) + rect(454, 0, 438, 230, { fill: 'fGreen', c: 'green' });
  b += text(227, 28, 'DẪN TRỰC TIẾP', { bold: true, size: 17, c: 'blue' }) + text(673, 28, 'DẪN GIÁN TIẾP', { bold: true, size: 17, c: 'green' });
  b += text(227, 60, 'Nhắc lại NGUYÊN VĂN lời / ý nghĩ', { size: 14 }) + text(227, 84, 'Đặt sau dấu hai chấm, trong ngoặc kép " "', { size: 14 });
  b += text(673, 60, 'Thuật lại lời / ý nghĩ CÓ ĐIỀU CHỈNH', { size: 14 }) + text(673, 84, 'KHÔNG dùng ngoặc kép; có thể thêm "rằng", "là"', { size: 14 });
  b += box(24, 108, 406, 108, 'Bác Hồ dạy:\n"Không có việc gì khó\nChỉ sợ lòng không bền."', { fill: 'bg', c: 'blue', size: 15 });
  b += box(470, 108, 406, 108, 'Bác Hồ dạy rằng không có việc gì khó,\nchỉ sợ lòng mình không bền.', { fill: 'bg', c: 'green', size: 15 });
  b += note(450, 254, 'Chuyển trực tiếp → gián tiếp: bỏ ngoặc kép, đổi đại từ nhân xưng (tôi → anh ấy, cô ấy…), từ chỉ thời gian – nơi chốn cho phù hợp', 'ink', 13);
  return svg(900, 264, 'Cách dẫn trực tiếp và cách dẫn gián tiếp', b);
};

// ================= TIẾNG ANH =================

// ---------- Trục thời gian các thì ----------
F['truc-thoi-gian-cac-thi-lop9'] = () => {
  const y = 150, x0 = 60, x1 = 840, now = 560;
  let b = arrow(x0, y, x1 + 30, y, { w: 3 }) + text(x1 + 26, y + 26, 'thời gian', { size: 12, c: 'soft' });
  b += line(now, y - 62, now, y + 40, { c: 'red', w: 2, dash: '6 4' }) + text(now, y + 58, 'NOW', { bold: true, c: 'red', size: 15 });
  // past perfect -> past simple
  b += dot(180, y, 'purple', 8) + text(180, y - 18, 'had + V3', { bold: true, size: 13, c: 'purple' }) + text(180, y + 30, 'Quá khứ hoàn thành\n(xảy ra TRƯỚC một\nviệc quá khứ khác)', { size: 12, c: 'purple' });
  b += dot(330, y, 'blue', 8) + text(330, y - 18, 'V2 / V-ed', { bold: true, size: 13, c: 'blue' }) + text(330, y + 30, 'Quá khứ đơn\n(yesterday, ago,\nlast …, in 2020)', { size: 12, c: 'blue' });
  b += L.path(`M190,${y - 40} Q255,${y - 70} 320,${y - 40}`, { c: 'purple', arrow: true, w: 1.8 }) + text(255, y - 72, 'before / by the time', { size: 11.5, c: 'purple' });
  // past continuous
  b += rect(380, y - 12, 110, 24, { fill: 'fOrange', c: 'orange', rx: 12 }) + text(435, y - 22, 'was/were + V-ing', { bold: true, size: 12.5, c: 'orange' }) + text(435, y + 30, 'Quá khứ tiếp diễn\n(đang xảy ra tại một\nthời điểm quá khứ)', { size: 12, c: 'orange' });
  // present perfect
  b += L.path(`M400,${y - 70} Q480,${y - 120} ${now - 4},${y - 60}`, { c: 'green', arrow: true, w: 2.5 }) + text(470, y - 108, 'have/has + V3', { bold: true, size: 13, c: 'green' });
  b += text(700, y - 100, 'Hiện tại hoàn thành: bắt đầu trong quá khứ,\nkéo dài / còn ảnh hưởng đến hiện tại\n(for, since, already, yet, ever, never, just)', { size: 12, c: 'green' });
  // future
  b += dot(760, y, 'teal', 8) + text(760, y - 18, 'will + V / be going to + V', { bold: true, size: 12.5, c: 'teal' }) + text(760, y + 30, 'Tương lai\n(tomorrow, next …,\nin the future)', { size: 12, c: 'teal' });
  return svg(900, 245, 'Các thì trọng tâm lớp 9 trên trục thời gian', b);
};

// ---------- Câu bị động ----------
F['cau-bi-dong'] = () => {
  let b = box(20, 10, 860, 56, 'Chủ động:   People   |   built   |   this bridge   |   in 1990.', { fill: 'fBlue', c: 'blue', size: 17, bold: true });
  b += arrow(300, 68, 300, 100, { c: 'orange' }) + arrow(530, 68, 530, 100, { c: 'orange' });
  b += box(20, 104, 860, 56, 'Bị động:   This bridge   |   was built   |   (by people)   |   in 1990.', { fill: 'fGreen', c: 'green', size: 17, bold: true });
  const rows = [['Thì', 'Chủ động', 'Bị động  (be + V3/ed)'], ['Hiện tại đơn', 'V / V-s', 'am / is / are + V3'], ['Quá khứ đơn', 'V2 / V-ed', 'was / were + V3'], ['Hiện tại hoàn thành', 'have / has + V3', 'have / has been + V3'], ['Tương lai đơn', 'will + V', 'will be + V3'], ['Động từ khuyết thiếu', 'can / must / should + V', 'can / must / should be + V3']];
  b += table(20, 176, [240, 290, 330], 32, rows, { size: 14 });
  b += note(450, 386, 'Bỏ "by + them / people / someone" · O của câu chủ động → S của câu bị động · động từ "be" chia theo thì của câu gốc', 'ink', 13);
  return svg(900, 395, 'Câu bị động (The passive voice)', b);
};

// ---------- Câu tường thuật ----------
F['cau-tuong-thuat'] = () => {
  const rows = [['Trực tiếp', '→', 'Gián tiếp (lùi thì)'], ['V (hiện tại đơn)', '→', 'V2/ed (quá khứ đơn)'], ['am/is/are + V-ing', '→', 'was/were + V-ing'], ['V2/ed · have/has + V3', '→', 'had + V3'], ['will / can / may', '→', 'would / could / might'], ['must', '→', 'had to']];
  let b = table(20, 8, [190, 40, 200], 34, rows, { size: 13.5 });
  const rows2 = [['Trực tiếp', 'Gián tiếp'], ['now', 'then'], ['today / tonight', 'that day / that night'], ['tomorrow', 'the next day'], ['yesterday', 'the day before'], ['here / this / these', 'there / that / those']];
  b += table(470, 8, [190, 220], 34, rows2, { size: 13.5, headFill: 'fOrange' });
  b += box(20, 226, 860, 104, 'Câu hỏi Yes/No:  "Do you like tea?" she asked me.  →  She asked me IF / WHETHER I liked tea.\nCâu hỏi Wh-:  "Where do you live?" he asked.  →  He asked me WHERE I lived.   (KHÔNG đảo trợ động từ)\nĐổi đại từ: I → he/she · my → his/her · we → they · you → I/me (tùy người nghe)', { fill: 'fGreen', c: 'green', size: 13.5 });
  return svg(900, 338, 'Câu tường thuật (Reported speech): lùi thì và đổi trạng từ', b);
};

// ---------- Câu điều kiện, câu ước ----------
F['dieu-kien-va-wish'] = () => {
  const card = (x, y, w, h, t, f, c, body) => box(x, y, w, 40, t, { fill: c, c, bold: true, size: 15, tc: '#ffffff' }) + box(x, y + 44, w, h, body, { fill: f, c, size: 13.5 });
  let b = card(14, 6, 280, 120, 'Loại 0 – sự thật', 'fGray', 'soft', 'If + S + V(s/es), S + V(s/es)\n\nIf you heat ice, it melts.');
  b += card(310, 6, 280, 120, 'Loại 1 – có thể xảy ra', 'fBlue', 'blue', 'If + S + V(s/es), S + will + V\n\nIf it rains, we will stay home.');
  b += card(606, 6, 280, 120, 'Loại 2 – trái hiện tại', 'fPurple', 'purple', 'If + S + V2/ed, S + would + V\n(to be: were cho mọi ngôi)\nIf I were you, I would study more.');
  b += card(14, 184, 430, 108, 'Câu ước ở hiện tại (wish)', 'fOrange', 'orange', 'S + wish(es) + S + V2/ed (were)\nI wish I had more free time.\n(Thực tế: I don\'t have much free time.)');
  b += card(456, 184, 430, 108, 'Unless = If … not', 'fGreen', 'green', 'Unless you hurry, you will be late.\n= If you don\'t hurry, you will be late.\n(Sau unless KHÔNG dùng not)');
  return svg(900, 344, 'Câu điều kiện và câu ước', b);
};

// ---------- Mệnh đề quan hệ ----------
F['menh-de-quan-he'] = () => {
  const rows = [['Đại từ', 'Thay cho', 'Ví dụ'], ['who', 'người (chủ ngữ)', 'The girl who sits next to me is Lan.'], ['whom', 'người (tân ngữ)', 'The man whom you met is my uncle.'], ['which', 'vật, sự việc', 'The book which I bought is useful.'], ['that', 'người / vật (MĐQH xác định)', 'This is the best film that I have seen.'], ['whose', 'sở hữu (của ai / cái gì)', 'The boy whose bike was stolen is sad.'], ['where / when', 'nơi chốn / thời gian', 'Hue is the city where I was born.']];
  let b = table(20, 6, [140, 260, 460], 34, rows, { size: 13.5 });
  b += box(20, 252, 425, 92, 'XÁC ĐỊNH (defining): cần thiết để xác định\ndanh từ · KHÔNG dấu phẩy · dùng được "that"\nThe student who won the prize is in 9A.', { fill: 'fBlue', c: 'blue', size: 13.5 });
  b += box(455, 252, 425, 92, 'KHÔNG XÁC ĐỊNH (non-defining): thêm thông tin\n· CÓ dấu phẩy · KHÔNG dùng "that"\nHa Long Bay, which is in Quang Ninh, is famous.', { fill: 'fOrange', c: 'orange', size: 13.5 });
  return svg(900, 352, 'Mệnh đề quan hệ (Relative clauses)', b);
};

module.exports = F;
