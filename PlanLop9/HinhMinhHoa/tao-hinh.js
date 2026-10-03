// Sinh toàn bộ hình minh họa SVG cho PlanLop9
// Chạy: node HinhMinhHoa/tao-hinh.js   (sửa nội dung hình trong thư mục src/, rồi chạy lại)
const fs = require('fs');
const path = require('path');

const groups = ['toan', 'van-anh', 'khtn', 'su-dia-khac'];
let n = 0;
for (const g of groups) {
  const file = path.join(__dirname, 'src', g + '.js');
  if (!fs.existsSync(file)) continue;
  const figs = require(file);
  for (const [name, fn] of Object.entries(figs)) {
    fs.writeFileSync(path.join(__dirname, name + '.svg'), fn(), 'utf8');
    n++;
  }
}
console.log(`Đã tạo ${n} hình SVG trong ${__dirname}`);
