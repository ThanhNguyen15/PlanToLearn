# Chuyên đề 3: Bất đẳng thức và cực trị

> [Danh mục chuyên đề](Danh-Muc-Chuyen-De.md) · Mức ★★ (mục 4 có ★★★) · Học ở [tuần 16](../../LHP/Tuan-16-Ke-Hoach-Hoc-Tap.md) (khối 🔷 PTNK) · Thời lượng: 3 buổi × 60 phút

## Mục tiêu

- Chứng minh bất đẳng thức bằng **biến đổi về bình phương** và **bất đẳng thức Cô-si**.
- Tìm GTLN / GTNN và **luôn chỉ ra khi nào dấu "=" xảy ra**.

---

## 1. Lý thuyết cốt lõi

| Công cụ | Nội dung | Dấu "=" |
|---|---|---|
| Bình phương không âm | A² ≥ 0 với mọi A | A = 0 |
| Hệ quả | a² + b² ≥ 2ab · (a + b)² ≥ 4ab · a² + b² ≥ (a + b)²/2 | a = b |
| Ba số | a² + b² + c² ≥ ab + bc + ca | a = b = c |
| **Cô-si 2 số** (a, b ≥ 0) | a + b ≥ 2√(ab) | a = b |
| **Cô-si 3 số** (a, b, c ≥ 0) | a + b + c ≥ 3∛(abc) | a = b = c |
| Hệ quả Cô-si (a, b > 0) | a/b + b/a ≥ 2 · (a + b)(1/a + 1/b) ≥ 4 | a = b |
| ★★★ Dạng phân thức (x, y > 0) | a²/x + b²/y ≥ (a + b)²/(x + y) | a/x = b/y |

## 2. Quy trình tìm GTNN / GTLN

1. **Dự đoán** giá trị cực trị (thử các giá trị "đẹp", thường là khi các biến bằng nhau).
2. Chứng minh biểu thức **≥ m** (hoặc ≤ M) với mọi giá trị thỏa điều kiện.
3. Chỉ ra **giá trị của biến** để dấu "=" xảy ra.
4. Kết luận: "GTNN của A là m, đạt được khi x = ...".

> Thiếu bước 3 là **mất nửa số điểm** của câu.

---

## 3. Ví dụ giải mẫu

**Ví dụ 1.** Chứng minh a² + b² + c² ≥ ab + bc + ca.

> Nhân 2 hai vế, chuyển vế: 2a² + 2b² + 2c² − 2ab − 2bc − 2ca ≥ 0 ⇔ (a − b)² + (b − c)² + (c − a)² ≥ 0 (luôn đúng).
> Dấu "=" khi a = b = c.

**Ví dụ 2.** Tìm GTNN của A = x² − 4x + 7.

> A = (x − 2)² + 3 ≥ 3. Dấu "=" khi x = 2. **GTNN của A là 3 khi x = 2.**

**Ví dụ 3.** Tìm GTLN của B = −x² + 6x − 5.

> B = −(x − 3)² + 4 ≤ 4. **GTLN của B là 4 khi x = 3.**

**Ví dụ 4.** Với x > 0, tìm GTNN của C = x + 4/x.

> Cô-si cho hai số dương x và 4/x: C ≥ 2√(x · 4/x) = 4. Dấu "=" khi x = 4/x ⇔ x = 2.
> **GTNN của C là 4 khi x = 2.**

**Ví dụ 5.** Với x > 1, tìm GTNN của D = x + 1/(x − 1).

> Tách: D = (x − 1) + 1/(x − 1) + 1 ≥ 2 + 1 = 3 (Cô-si cho x − 1 > 0).
> Dấu "=" khi x − 1 = 1 ⇔ x = 2. **GTNN của D là 3 khi x = 2.**
> *Kỹ thuật: tách / thêm bớt để hai số Cô-si có **tích là hằng số**.*

**Ví dụ 6.** Cho a, b > 0, a + b = 2. Tìm GTNN của 1/a + 1/b.

> (a + b)(1/a + 1/b) ≥ 4 ⇒ 2(1/a + 1/b) ≥ 4 ⇒ 1/a + 1/b ≥ 2. Dấu "=" khi a = b = 1.

---

## 4. Bài tự luyện

1. Tìm GTNN của x² + 2x + 5.
2. Tìm GTLN của 5 + 4x − x².
3. Với x > 0, tìm GTNN của x + 9/x.
4. Với x > 2, tìm GTNN của x + 1/(x − 2).
5. Cho a, b > 0, a + b = 1. Tìm GTNN của 1/a + 1/b.
6. Chứng minh a² + b² ≥ (a + b)²/2.
7. Cho a, b, c > 0. Chứng minh (a + b)(b + c)(c + a) ≥ 8abc.
8. Cho x, y > 0, xy = 4. Tìm GTNN của x + y.
9. Tìm GTNN của E = x² + y² − 2x + 4y + 10.
10. Cho a, b > 0, a + b = 4. Tìm GTLN của ab.
11. ★★★ Cho a, b, c > 0. Chứng minh a/b + b/c + c/a ≥ 3.

<details>
<summary><b>Đáp án và gợi ý</b></summary>

1. (x + 1)² + 4 → **GTNN 4 khi x = −1**
2. 9 − (x − 2)² → **GTLN 9 khi x = 2**
3. Cô-si → **GTNN 6 khi x = 3**
4. (x − 2) + 1/(x − 2) + 2 ≥ 4 → **GTNN 4 khi x = 3**
5. (a + b)(1/a + 1/b) ≥ 4 → **GTNN 4 khi a = b = 1/2**
6. Tương đương (a − b)² ≥ 0
7. Cô-si: a + b ≥ 2√(ab), b + c ≥ 2√(bc), c + a ≥ 2√(ca); nhân vế theo vế. Dấu "=" khi a = b = c
8. x + y ≥ 2√(xy) = 4 → **GTNN 4 khi x = y = 2**
9. E = (x − 1)² + (y + 2)² + 5 → **GTNN 5 khi x = 1, y = −2**
10. ab ≤ (a + b)²/4 = 4 → **GTLN 4 khi a = b = 2**
11. Cô-si 3 số: a/b + b/c + c/a ≥ 3∛(a/b · b/c · c/a) = 3. Dấu "=" khi a = b = c

</details>

---

## 5. Lỗi hay gặp

| Lỗi | Cách tránh |
|---|---|
| Dùng Cô-si khi số **có thể âm** | Kiểm tra điều kiện a, b ≥ 0 trước |
| Cô-si ra kết quả **không phải hằng số** (vẫn chứa x) | Tách / thêm bớt để **tích** hai số là hằng số |
| Không chỉ ra dấu "=" | Luôn kết thúc bằng "đạt được khi..." |
| Dấu "=" **không xảy ra được** trong điều kiện đề | Kiểm tra giá trị tìm được có thỏa điều kiện không |
