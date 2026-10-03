// Hình minh họa dùng chung: lộ trình, ôn thi, học cùng AI
const L = require('./lib');
const { svg, line, arrow, text, rect, box, circle } = L;

const F = {};

F['ban-do-nam-hoc'] = () => {
  const ph = [[1, 4, 'Khởi động\nnền tảng', 'blue', 'fBlue'], [5, 5, 'Giữa\nHK1', 'red', 'fRed'], [6, 9, 'Hình học\nHK1', 'blue', 'fBlue'], [10, 11, 'Ôn & thi\nHK1', 'red', 'fRed'],
    [12, 17, 'Đầu HK2: tỉ lệ,\nđa thức, từ, TĐC', 'green', 'fGreen'], [18, 19, 'Tết', 'orange', 'fOrange'], [20, 23, 'Xác suất, tam giác\ncảm ứng', 'green', 'fGreen'], [24, 24, 'Giữa\nHK2', 'red', 'fRed'],
    [25, 28, 'Hình khối, sinh sản\nôn tổng hợp', 'green', 'fGreen'], [29, 32, 'Ôn & thi\ncuối năm', 'red', 'fRed'], [33, 34, 'Tổng\nkết', 'purple', 'fPurple']];
  const X = (wk) => 20 + ((wk - 1) / 34) * 860;
  let b = '';
  ph.forEach(([a, e, t, c, f], i) => {
    const x = X(a), w = X(e + 1) - X(a) - 3;
    b += rect(x, 40, w, 70, { fill: f, c, w: 2, rx: 8 });
    b += text(x + w / 2, i % 2 ? 182 : 140, t, { size: 11.5, bold: true, c });
    b += line(x + w / 2, 110, x + w / 2, i % 2 ? 168 : 126, { c, w: 1 });
    b += text(x + w / 2, 80, a === e ? `T${a}` : `T${a}–${e}`, { size: 11, c: 'ink' });
  });
  const months = [['10/2026', 1], ['11', 5], ['12', 9], ['01/2027', 13.6], ['02', 18], ['03', 22], ['04', 26.5], ['05', 30.9]];
  months.forEach(([m, wk]) => { b += text(X(wk), 28, m, { size: 12, c: 'soft', anchor: 'start' }); });
  b += text(450, 240, 'Đỏ: kì kiểm tra (dự kiến) · Xanh: học theo chương trình · Cam: Tết · Tím: tổng kết', { size: 13, c: 'soft' });
  return svg(900, 250, 'Bản đồ năm học lớp 7 (34 tuần, 05/10/2026 – 30/05/2027)', b);
};

F['quy-trinh-on-thi'] = () => {
  const st = [['Vòng 1: Hệ thống', 'Ngày 1 – 4', 'Đề cương → sơ đồ tư duy\nmỗi chương → làm lại\nbài cơ bản (Nhóm A)', 'blue', 'fBlue'],
    ['Vòng 2: Luyện đề', 'Ngày 5 – 10', '2 đề bấm giờ / môn chính\nchữa ngay → phiếu\nphân tích lỗi', 'orange', 'fOrange'],
    ['Vòng 3: Sửa lỗi', 'Ngày 11 – 13', 'Chỉ làm lại câu sai\n+ 5 câu "hay sai"\nmỗi môn', 'green', 'fGreen'],
    ['Ngày thi', 'Tối hôm trước', 'Xem thẻ 30 – 60 phút\nngủ trước 21:30\nchuẩn bị đồ dùng', 'purple', 'fPurple']];
  let b = '';
  st.forEach(([t, d, s, c, f], i) => {
    const x = 20 + i * 220;
    b += rect(x, 10, 195, 175, { fill: f, c, w: 2.5, rx: 16 }) + text(x + 97, 40, t, { bold: true, size: 15.5, c }) + text(x + 97, 62, d, { size: 13, c: 'soft' }) + text(x + 97, 100, s, { size: 13 });
    if (i < 3) b += arrow(x + 197, 97, x + 218, 97, { c: 'soft', w: 3 });
  });
  return svg(900, 195, 'Ôn thi 3 vòng trong 2 tuần', b);
};

F['bon-loai-loi-sai'] = () => {
  const L4 = [['K', 'Không biết', 'Học lại kiến thức\n+ làm bài cơ bản', 'red', 'fRed'], ['N', 'Nhầm lẫn', 'Bảng so sánh\n+ bài phân biệt', 'orange', 'fOrange'], ['Ẩ', 'Ẩu', 'Gạch chân đề\n+ 5 phút kiểm tra', 'blue', 'fBlue'], ['T', 'Thiếu thời gian', 'Đề bấm giờ\n+ câu dễ làm trước', 'purple', 'fPurple']];
  let b = '';
  L4.forEach(([k, n, s, c, f], i) => {
    const x = 20 + i * 220;
    b += rect(x, 10, 200, 160, { fill: f, c, w: 2.5, rx: 16 }) + circle(x + 100, 55, 30, { fill: 'bg', c, w: 3 }) + text(x + 100, 66, k, { size: 30, bold: true, c });
    b += text(x + 100, 112, n, { bold: true, size: 15, c }) + text(x + 100, 136, s, { size: 13 });
  });
  return svg(900, 180, 'Bốn loại lỗi sai – mỗi loại một cách sửa', b);
};

F['hoc-cung-ai'] = () => {
  const ok = ['Tự nghĩ ≥ 15 phút rồi mới hỏi', 'Xin GỢI Ý từng bước', 'Nhờ chỉ lỗi sai trong bài đã làm', 'Tạo bài tương tự để luyện', 'Kiểm chứng thông tin với sách'];
  const no = ['Chụp đề xin lời giải', 'Nhờ viết bài văn rồi chép', 'Tin ngay số liệu, dẫn chứng', 'Đưa họ tên, trường, ảnh', 'Dùng khuya trước giờ ngủ'];
  let b = rect(8, 0, 434, 280, { fill: 'fGreen', c: 'green' }) + rect(458, 0, 434, 280, { fill: 'fRed', c: 'red' });
  b += text(225, 30, '✓ NÊN: AI là gia sư', { bold: true, size: 17, c: 'green' }) + text(675, 30, '✗ KHÔNG: AI làm bài hộ', { bold: true, size: 17, c: 'red' });
  ok.forEach((s, i) => { b += rect(30, 50 + i * 44, 390, 36, { fill: 'bg', c: 'green', rx: 10 }) + text(45, 74 + i * 44, s, { anchor: 'start', size: 14 }); });
  no.forEach((s, i) => { b += rect(480, 50 + i * 44, 390, 36, { fill: 'bg', c: 'red', rx: 10 }) + text(495, 74 + i * 44, s, { anchor: 'start', size: 14 }); });
  b += text(450, 305, 'Tối đa 20 phút/ngày · có bố mẹ ở cùng phòng · phòng thi không có AI', { size: 14, bold: true });
  return svg(900, 315, 'Học cùng AI đúng cách (học sinh lớp 7)', b);
};

module.exports = F;
