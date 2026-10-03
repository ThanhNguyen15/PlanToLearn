# Chuyên đề 2: Hệ phương trình không mẫu mực

> [Danh mục chuyên đề](Danh-Muc-Chuyen-De.md) · Mức ★★ · Học ở [tuần 14](../../LHP/Tuan-14-Ke-Hoach-Hoc-Tap.md) (khối 🔷 PTNK) · Thời lượng: 3 buổi × 60 phút

## Mục tiêu

- Nhận dạng nhanh 4 loại hệ thường gặp và chọn đúng cách giải.
- Không bỏ sót nghiệm khi hệ có nhiều trường hợp.

---

## 1. Bốn loại hệ và cách giải

| Loại | Dấu hiệu | Cách giải |
|---|---|---|
| **Đặt ẩn phụ** | Xuất hiện 1/x, 1/y, √x, √y... ở cả 2 phương trình | Đặt u, v → hệ bậc nhất |
| **Đối xứng loại 1** | Đổi x ↔ y, **mỗi phương trình** không đổi | Đặt S = x + y, P = xy (ĐK **S² ≥ 4P**); x, y là nghiệm của X² − SX + P = 0 |
| **Đối xứng loại 2** | Đổi x ↔ y thì **hai phương trình đổi chỗ cho nhau** | **Trừ vế** → (x − y)·(...) = 0 → xét từng trường hợp |
| **Có phương trình phân tích được** | Một phương trình đưa được về tích, hoặc rút được x theo y | Phân tích thành tích → mỗi nhân tử = 0 → thế vào phương trình còn lại |

**Công thức hay dùng với S, P:**
x² + y² = S² − 2P · x³ + y³ = S³ − 3SP · (x − y)² = S² − 4P · x²y + xy² = SP

---

## 2. Ví dụ giải mẫu

**Ví dụ 1 (ẩn phụ).** Giải hệ: 2/x + 3/y = 2 và 4/x − 3/y = 1.

> Đặt u = 1/x, v = 1/y: 2u + 3v = 2; 4u − 3v = 1. Cộng: 6u = 3 → u = 1/2 → x = 2. Thế: 3v = 1 → v = 1/3 → y = 3.
> **(x; y) = (2; 3)**.

**Ví dụ 2 (đối xứng loại 1).** Giải hệ: x + y + xy = 11 và x²y + xy² = 30.

> S + P = 11, SP = 30 → S, P là nghiệm của X² − 11X + 30 = 0 → (S; P) = (5; 6) hoặc (6; 5).
> S = 5, P = 6 (25 ≥ 24 ✓): x, y là nghiệm của X² − 5X + 6 = 0 → (2; 3), (3; 2).
> S = 6, P = 5 (36 ≥ 20 ✓): X² − 6X + 5 = 0 → (1; 5), (5; 1).
> **4 nghiệm: (2; 3), (3; 2), (1; 5), (5; 1)**.

**Ví dụ 3 (đối xứng loại 2).** Giải hệ: x² = 3x + 2y và y² = 3y + 2x.

> Trừ vế: x² − y² = 3(x − y) − 2(x − y) = x − y ⇔ (x − y)(x + y − 1) = 0.
> • x = y: x² = 5x → x = 0 hoặc x = 5 → (0; 0), (5; 5).
> • y = 1 − x: x² = 3x + 2 − 2x = x + 2 ⇔ x² − x − 2 = 0 → x = 2 (y = −1), x = −1 (y = 2).
> **4 nghiệm: (0; 0), (5; 5), (2; −1), (−1; 2)**.

**Ví dụ 4 (phân tích thành tích).** Giải hệ: x² − xy − 2y² = 0 và x + y = 3.

> x² − xy − 2y² = (x − 2y)(x + y) = 0.
> • x + y = 0: mâu thuẫn với x + y = 3.
> • x = 2y: 3y = 3 → y = 1, x = 2.
> **(x; y) = (2; 1)**.

---

## 3. Bài tự luyện

1. x + y = 7 và xy = 12
2. x² + y² = 13 và xy = 6
3. x + y + xy = 5 và x²y + xy² = 6
4. x² = 2x + y và y² = 2y + x
5. 3/x − 2/y = 1 và 1/x + 4/y = 5
6. x² − 3xy + 2y² = 0 và x² + y² = 10
7. x + y = 2 và x³ + y³ = 26
8. √x + √y = 5 và x + y = 13

<details>
<summary><b>Đáp án và gợi ý</b></summary>

1. **(3; 4), (4; 3)**
2. S² = 13 + 2·6 = 25 → S = ±5. **(2; 3), (3; 2), (−2; −3), (−3; −2)**
3. S + P = 5, SP = 6 → (S; P) = (2; 3) loại (S² < 4P), (3; 2) nhận → **(1; 2), (2; 1)**
4. Trừ vế: (x − y)(x + y − 1) = 0. x = y → (0; 0), (3; 3). y = 1 − x → x² − x − 1 = 0 → **((1 + √5)/2; (1 − √5)/2), ((1 − √5)/2; (1 + √5)/2)**, cùng (0; 0), (3; 3)
5. u = 1/x, v = 1/y: 3u − 2v = 1, u + 4v = 5 → u = v = 1 → **(1; 1)**
6. (x − y)(x − 2y) = 0. x = y → **(√5; √5), (−√5; −√5)**; x = 2y → **(2√2; √2), (−2√2; −√2)**
7. x³ + y³ = S³ − 3SP = 8 − 6P = 26 → P = −3 → **(3; −1), (−1; 3)**
8. a = √x, b = √y ≥ 0: a + b = 5, a² + b² = 13 → ab = 6 → (a; b) = (2; 3), (3; 2) → **(4; 9), (9; 4)**

</details>

---

## 4. Lỗi hay gặp

| Lỗi | Cách tránh |
|---|---|
| Quên kiểm tra **S² ≥ 4P** | Kiểm tra trước khi giải X² − SX + P = 0 |
| Chỉ ghi (2; 3) mà quên (3; 2) | Hệ đối xứng: **đổi chỗ x, y** cho đủ nghiệm |
| Chia cho (x − y) thay vì đưa về tích | Luôn đưa về **tích = 0**, xét đủ trường hợp |
| Quên điều kiện x ≠ 0, x ≥ 0 khi đặt ẩn phụ | Ghi điều kiện ngay đầu bài |
