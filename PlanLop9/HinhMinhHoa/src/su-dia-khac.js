// Hình minh họa Lịch sử – Địa lí, GDCD, Tin học – Công nghệ 9
const L = require('./lib');
const { C, svg, line, arrow, text, rect, box, circle, dot, poly, note, table } = L;

const F = {};

// trục thời gian ngang: events = [[nhãn mốc, mô tả, màu, trên(true)/dưới]]
function timeline(title, events, h = 290) {
  const y = h / 2, x0 = 30, x1 = 870, n = events.length;
  let b = arrow(x0, y, x1 + 20, y, { w: 4, c: 'line' });
  events.forEach(([t, d, c], i) => {
    const x = x0 + 40 + (i * (x1 - x0 - 80)) / (n - 1);
    const up = i % 2 === 0;
    b += circle(x, y, 9, { fill: c, c, w: 2 });
    b += line(x, y + (up ? -10 : 10), x, y + (up ? -38 : 38), { c, w: 1.5 });
    b += text(x, y + (up ? -46 : 56), t, { bold: true, size: 13.5, c });
    b += text(x, y + (up ? -66 - 16 * (d.split('\n').length - 1) : 76), d, { size: 12 });
  });
  return svg(900, h, title, b);
}

// ================= LỊCH SỬ =================
F['truc-thoi-gian-the-gioi-1917-1991'] = () => timeline('Lịch sử thế giới 1917 – 1991: các mốc chính', [
  ['11/1917', 'Cách mạng\ntháng Mười Nga', 'red'],
  ['12/1922', 'Liên Xô\nthành lập', 'red'],
  ['1929 – 1933', 'Khủng hoảng\nkinh tế thế giới', 'orange'],
  ['1939 – 1945', 'Chiến tranh\nthế giới thứ hai', 'ink'],
  ['10/1945', 'Liên hợp quốc\nra đời', 'blue'],
  ['1947', 'Bắt đầu\nChiến tranh lạnh', 'purple'],
  ['8/1967', 'ASEAN\nthành lập', 'green'],
  ['12/1989', 'Mỹ – Xô tuyên bố\nchấm dứt Chiến tranh lạnh', 'purple'],
  ['12/1991', 'Liên Xô\ntan rã', 'red'],
]);

F['truc-thoi-gian-vn-1918-1945'] = () => timeline('Việt Nam 1918 – 1945: từ tìm đường cứu nước đến Cách mạng tháng Tám', [
  ['6/1919', 'Gửi Bản yêu sách\ncủa nhân dân An Nam', 'blue'],
  ['7/1920', 'NAQ đọc Luận cương\ncủa Lênin', 'blue'],
  ['6/1925', 'Hội VN Cách mạng\nThanh niên', 'blue'],
  ['3/2/1930', 'Thành lập Đảng\nCộng sản Việt Nam', 'red'],
  ['1930 – 1931', 'Phong trào cách mạng,\nXô viết Nghệ – Tĩnh', 'orange'],
  ['1936 – 1939', 'Phong trào\ndân chủ', 'orange'],
  ['5/1941', 'Thành lập\nMặt trận Việt Minh', 'green'],
  ['19/8/1945', 'Khởi nghĩa giành\nchính quyền ở Hà Nội', 'red'],
  ['2/9/1945', 'Tuyên ngôn\nĐộc lập', 'red'],
]);

F['truc-thoi-gian-vn-1945-1975'] = () => timeline('Việt Nam 1945 – 1975: hai cuộc kháng chiến', [
  ['19/12/1946', 'Toàn quốc\nkháng chiến', 'red'],
  ['Thu – đông 1947', 'Chiến dịch\nViệt Bắc', 'orange'],
  ['Thu – đông 1950', 'Chiến dịch\nBiên giới', 'orange'],
  ['7/5/1954', 'Chiến thắng\nĐiện Biên Phủ', 'red'],
  ['21/7/1954', 'Hiệp định\nGiơ-ne-vơ', 'blue'],
  ['1959 – 1960', 'Phong trào\nĐồng khởi', 'green'],
  ['12/1972', 'Hà Nội – "Điện Biên\nPhủ trên không"', 'purple'],
  ['27/1/1973', 'Hiệp định\nPa-ri', 'blue'],
  ['30/4/1975', 'Giải phóng miền Nam,\nthống nhất đất nước', 'red'],
]);

F['dien-bien-phu-3-dot'] = () => {
  const d = [['Đợt 1', '13/3 – 17/3/1954', 'Tiêu diệt cứ điểm Him Lam\nvà phân khu Bắc (Độc Lập,\nbức hàng Bản Kéo)', 'fBlue', 'blue'],
    ['Đợt 2', '30/3 – 26/4/1954', 'Đánh chiếm các cao điểm\nphía đông phân khu trung tâm\n(E1, D1, C1, A1 – giằng co ác liệt)', 'fOrange', 'orange'],
    ['Đợt 3', '1/5 – 7/5/1954', 'Tổng công kích; 17 giờ 30\nngày 7/5 bắt sống tướng\nĐờ Ca-xtơ-ri cùng Bộ chỉ huy', 'fRed', 'red']];
  let b = '';
  d.forEach(([t, time, desc, f, c], i) => {
    const x = 20 + i * 292;
    b += box(x, 10, 270, 44, t, { fill: c, c, bold: true, size: 17, tc: '#ffffff' }) + box(x, 58, 270, 34, time, { fill: f, c, bold: true, size: 14 }) + box(x, 96, 270, 92, desc, { fill: 'bg', c, size: 13 });
    if (i < 2) b += arrow(x + 272, 32, x + 290, 32, { c: 'soft' });
  });
  b += box(20, 202, 856, 92, 'Ý nghĩa: đập tan kế hoạch Na-va, giáng đòn quyết định vào ý chí xâm lược của thực dân Pháp; buộc Pháp kí\nHiệp định Giơ-ne-vơ (21/7/1954), chấm dứt chiến tranh, lập lại hòa bình ở Đông Dương; cổ vũ phong trào giải\nphóng dân tộc thế giới. "Lừng lẫy năm châu, chấn động địa cầu" – 56 ngày đêm.', { fill: 'panel', c: 'soft', size: 13.5, align: 'start' });
  return svg(900, 302, 'Chiến dịch Điện Biên Phủ (1954): ba đợt tấn công', b);
};

F['chien-tranh-lanh-hai-phe'] = () => {
  let b = rect(8, 0, 420, 190, { fill: 'fBlue', c: 'blue' }) + rect(472, 0, 420, 190, { fill: 'fRed', c: 'red' });
  b += text(218, 30, 'MỸ VÀ CÁC NƯỚC TƯ BẢN', { bold: true, size: 16, c: 'blue' }) + text(682, 30, 'LIÊN XÔ VÀ CÁC NƯỚC XHCN', { bold: true, size: 16, c: 'red' });
  b += text(218, 70, '• Học thuyết Tru-man (3/1947)\n• Kế hoạch Mác-san (1947)\n• Khối quân sự NATO (1949)\n• Chạy đua vũ trang, chiến tranh\n  cục bộ (Triều Tiên, Việt Nam…)', { size: 14, anchor: 'middle' });
  b += text(682, 70, '• Hội đồng tương trợ kinh tế\n  SEV (1949)\n• Tổ chức Hiệp ước Vác-sa-va\n  (1955)\n• Ủng hộ phong trào giải phóng dân tộc', { size: 14 });
  b += text(450, 120, '⚔', { size: 34 }) + text(450, 156, 'đối đầu', { size: 12, c: 'soft' });
  b += box(150, 204, 600, 56, 'Trật tự thế giới HAI CỰC (Ianta) · Kết thúc: 12/1989 (gặp gỡ Man-ta)\n→ Liên Xô tan rã (12/1991) → trật tự đơn cực rồi đa cực', { fill: 'fPurple', c: 'purple', size: 13.5, align: 'middle' });
  return svg(900, 268, 'Chiến tranh lạnh (1947 – 1989)', b);
};

F['doi-moi-1986'] = () => {
  let b = box(300, 8, 300, 56, 'ĐỔI MỚI (Đại hội VI – 12/1986)', { fill: 'red', c: 'red', bold: true, size: 17, tc: '#ffffff' });
  const cols = [['Kinh tế (trọng tâm)', '• Xóa cơ chế tập trung,\n  quan liêu, bao cấp\n• Kinh tế thị trường định hướng\n  XHCN, nhiều thành phần\n• Công nghiệp hóa, hiện đại hóa', 'fOrange', 'orange'], ['Chính trị', '• Xây dựng Nhà nước pháp quyền\n  XHCN của dân, do dân, vì dân\n• Phát huy dân chủ\n• Đại đoàn kết dân tộc', 'fBlue', 'blue'], ['Đối ngoại', '• Hòa bình, hữu nghị, đa phương\n  hóa, đa dạng hóa\n• Gia nhập ASEAN (1995), APEC\n  (1998), WTO (2007)\n• Bình thường hóa quan hệ với Mỹ (1995)', 'fGreen', 'green']];
  cols.forEach(([t, d, f, c], i) => {
    const x = 14 + i * 296;
    b += arrow(450, 66, x + 140, 86, { c: 'soft' }) + box(x, 88, 280, 40, t, { fill: f, c, bold: true, size: 15 }) + box(x, 132, 280, 120, d, { fill: 'bg', c, size: 13 });
  });
  b += box(14, 266, 872, 60, 'Thành tựu: từ nước thiếu lương thực → xuất khẩu gạo hàng đầu thế giới; thoát khỏi nhóm nước thu nhập thấp (2008);\ntỉ lệ hộ nghèo giảm mạnh; vị thế quốc tế nâng cao. Hạn chế: chênh lệch giàu nghèo, ô nhiễm môi trường, tham nhũng…', { fill: 'panel', c: 'soft', size: 13, align: 'start' });
  return svg(900, 334, 'Công cuộc Đổi mới ở Việt Nam từ năm 1986', b);
};

// ================= ĐỊA LÍ =================
F['dan-so-viet-nam'] = () => {
  let b = '';
  const cards = [['≈ 100 triệu', 'người (2023)\nđông thứ 3 Đông Nam Á', 'blue'], ['54', 'dân tộc\nKinh chiếm ≈ 85%', 'green'], ['≈ 300', 'người/km²\nmật độ dân số cao', 'orange'], ['≈ 38%', 'dân số sống ở\nthành thị và đang tăng', 'purple']];
  cards.forEach(([v, d, c], i) => {
    const x = 14 + i * 222;
    b += rect(x, 8, 206, 130, { fill: 'f' + c[0].toUpperCase() + c.slice(1), c }) + text(x + 103, 56, v, { bold: true, size: 30, c }) + text(x + 103, 88, d, { size: 13.5 });
  });
  b += box(14, 154, 430, 150, 'Phân bố dân cư CHƯA ĐỀU:\n• Đồng bằng, ven biển: đông đúc\n  (Đồng bằng sông Hồng mật độ cao nhất)\n• Trung du, miền núi: thưa thớt\n  (Tây Nguyên, Tây Bắc)\n• Nông thôn vẫn chiếm phần lớn dân số', { fill: 'fGray', c: 'soft', size: 13.5 });
  b += box(456, 154, 430, 150, 'Cơ cấu dân số đang biến đổi:\n• Đang trong thời kì "cơ cấu dân số vàng"\n  (nhiều người trong độ tuổi lao động)\n• Tỉ lệ trẻ em giảm, người cao tuổi tăng\n  → xu hướng già hóa dân số\n• Cơ hội: nguồn lao động dồi dào', { fill: 'fGray', c: 'soft', size: 13.5 });
  b += note(450, 324, 'Số liệu làm tròn để dễ nhớ; khi làm bài dùng số liệu trong SGK hoặc Atlat / đề cho', 'soft', 12.5);
  return svg(900, 332, 'Dân cư Việt Nam: những con số cần nhớ', b);
};

F['cac-vung-kinh-te'] = () => {
  const v = [
    ['Trung du và miền núi Bắc Bộ', 'Khoáng sản (than, apatit), thủy điện\n(sông Đà), chè, dược liệu, trâu bò,\ndu lịch (Sa Pa, Hạ Long)', 'fGreen', 'green'],
    ['Đồng bằng sông Hồng', 'Dân số đông, mật độ cao nhất;\nlúa, vụ đông; công nghiệp – dịch vụ\nphát triển; Hà Nội, Hải Phòng', 'fBlue', 'blue'],
    ['Bắc Trung Bộ và Duyên hải\nmiền Trung', 'Kinh tế biển: thủy sản, cảng, du lịch\n(Huế, Hội An, Phong Nha – Kẻ Bàng);\nnhiều thiên tai: bão, lũ, hạn hán', 'fOrange', 'orange'],
    ['Tây Nguyên', 'Đất badan: cà phê (lớn nhất), cao su,\nhồ tiêu; thủy điện; bauxite; rừng;\nKhông gian văn hóa Cồng chiêng', 'fBrown', 'brown'],
    ['Đông Nam Bộ', 'Kinh tế phát triển nhất cả nước;\nTP Hồ Chí Minh; dầu khí, công nghiệp,\ndịch vụ, xuất khẩu; cao su', 'fPurple', 'purple'],
    ['Đồng bằng sông Cửu Long', 'Vựa lúa lớn nhất (> 50% sản lượng);\nthủy sản (cá tra, tôm), trái cây;\nthách thức: xâm nhập mặn, BĐKH', 'fTeal', 'teal'],
  ];
  let b = '';
  v.forEach(([t, d, f, c], i) => {
    const x = 14 + (i % 3) * 296, y = 8 + Math.floor(i / 3) * 170;
    b += box(x, y, 280, 52, t, { fill: c, c, bold: true, size: 14.5, tc: '#ffffff' }) + box(x, y + 56, 280, 100, d, { fill: f, c, size: 13 });
  });
  return svg(900, 350, 'Sáu vùng kinh tế – xã hội của Việt Nam: thế mạnh nổi bật', b);
};

F['kinh-te-bien-dao'] = () => {
  let b = box(300, 8, 300, 70, 'PHÁT TRIỂN TỔNG HỢP\nKINH TẾ BIỂN', { fill: 'blue', c: 'blue', bold: true, size: 16, tc: '#ffffff' });
  const n = [['Khai thác, nuôi trồng\nhải sản', 'Ngư trường lớn; nuôi tôm, cá;\nđánh bắt xa bờ', 'teal'], ['Du lịch biển – đảo', 'Hạ Long, Nha Trang, Phú Quốc,\nCôn Đảo…', 'orange'], ['Giao thông vận tải biển', 'Cảng Hải Phòng, Đà Nẵng,\nCái Mép – Thị Vải…', 'purple'], ['Khai thác khoáng sản', 'Dầu khí (thềm lục địa phía Nam),\nmuối, cát, titan', 'brown']];
  n.forEach(([t, d, c], i) => {
    const x = 14 + i * 222;
    b += arrow(450, 80, x + 103, 104, { c: 'soft' }) + box(x, 106, 206, 54, t, { fill: 'f' + c[0].toUpperCase() + c.slice(1), c, bold: true, size: 13.5 }) + box(x, 164, 206, 64, d, { fill: 'bg', c, size: 12.5 });
  });
  b += box(14, 242, 872, 76, 'Bờ biển dài hơn 3 260 km, vùng biển rộng khoảng 1 triệu km², hàng nghìn đảo; hai quần đảo Hoàng Sa và Trường Sa.\nBảo vệ chủ quyền biển đảo + bảo vệ tài nguyên, môi trường biển (chống khai thác hủy diệt, rác thải nhựa, sự cố tràn dầu).', { fill: 'fRed', c: 'red', size: 13.5, align: 'start' });
  return svg(900, 326, 'Kinh tế biển đảo Việt Nam', b);
};

// ================= GDCD, TIN, CÔNG NGHỆ =================
F['xu-ly-tinh-huong-gdcd'] = () => {
  const s = [['1. Đọc kĩ', 'Ai? Làm gì?\nHành vi đúng hay sai?', 'fBlue', 'blue'], ['2. Nhận xét', 'Hành vi thể hiện / vi\nphạm phẩm chất, luật gì?', 'fOrange', 'orange'], ['3. Giải thích', 'Vì sao? Hậu quả\nvới bản thân, người khác', 'fPurple', 'purple'], ['4. Đề xuất', 'Nếu là bạn đó / là em,\nem sẽ làm gì? (cụ thể)', 'fGreen', 'green']];
  let b = '';
  s.forEach(([t, d, f, c], i) => {
    const x = 14 + i * 222;
    b += box(x, 10, 200, 44, t, { fill: c, c, bold: true, size: 16, tc: '#ffffff' }) + box(x, 58, 200, 70, d, { fill: f, c, size: 13.5 });
    if (i < 3) b += arrow(x + 202, 32, x + 220, 32, { c: 'soft' });
  });
  b += note(450, 152, 'Mẫu câu: "Em đồng tình / không đồng tình với việc làm của bạn … vì … Nếu là …, em sẽ …"', 'ink', 14);
  return svg(900, 164, 'Bốn bước xử lí tình huống môn Giáo dục công dân', b);
};

F['ham-bang-tinh'] = () => {
  const rows = [['', 'A', 'B', 'C', 'D'], ['1', 'Họ tên', 'Lớp', 'Điểm', 'Kết quả'], ['2', 'An', '9A', '8,5', '=IF(C2>=5,"Đạt","Chưa đạt")'], ['3', 'Bình', '9B', '4,0', 'Chưa đạt'], ['4', 'Chi', '9A', '7,0', 'Đạt'], ['5', 'Dũng', '9A', '9,0', 'Đạt']];
  let b = table(14, 8, [40, 110, 70, 70, 290], 32, rows, { size: 13 });
  b += box(620, 8, 266, 192, 'Kết quả với dữ liệu bên:\n=COUNTIF(B2:B5,"9A") → 3\n=SUMIF(B2:B5,"9A",C2:C5) → 24,5\n=AVERAGEIF(B2:B5,"9A",C2:C5)\n   → 8,17\n=COUNTIF(C2:C5,">=8") → 2', { fill: 'fGreen', c: 'green', size: 13 });
  b += box(14, 214, 872, 92, 'COUNTIF(vùng, điều kiện): ĐẾM số ô thỏa điều kiện · SUMIF(vùng điều kiện, điều kiện, vùng tính tổng): TÍNH TỔNG có điều kiện\nIF(điều kiện, giá trị nếu đúng, giá trị nếu sai) · Điều kiện dạng chữ / so sánh đặt trong dấu ngoặc kép: "9A", ">=8"\nĐịa chỉ tuyệt đối $A$1: không đổi khi sao chép công thức · Xác thực dữ liệu (Data Validation): giới hạn giá trị được nhập', { fill: 'fBlue', c: 'blue', size: 13, align: 'start' });
  return svg(900, 314, 'Hàm có điều kiện trong bảng tính (Tin học 9)', b);
};

module.exports = F;
