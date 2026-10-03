# Chuyên đề 1: Phương trình chứa căn và phương trình bậc cao

> [Danh mục chuyên đề](Danh-Muc-Chuyen-De.md) · Mức ★★ · Học ở [tuần 14](../../LHP/Tuan-14-Ke-Hoach-Hoc-Tap.md) (khối 🔷 PTNK) · Thời lượng: 3 buổi × 60 phút

## Mục tiêu

- Giải đúng phương trình chứa căn, **không thừa / thiếu nghiệm**.
- Nhận ra khi nào cần **đặt ẩn phụ** và đặt như thế nào.
- Giải phương trình bậc 4 dạng đặc biệt.

---

## 1. Lý thuyết cốt lõi

| Dạng | Biến đổi tương đương |
|---|---|
| √A = B | **B ≥ 0** và A = B² |
| √A = √B | A ≥ 0 (hoặc B ≥ 0) và A = B |
| √A + √B = C | Điều kiện A ≥ 0, B ≥ 0; bình phương 2 vế (C ≥ 0) rồi đưa về dạng √(AB) = ... |
| Có biểu thức lặp lại (x² + x và √(x² + x + k)) | Đặt **t = √(...)** ≥ 0 |
| (x + a)(x + b)(x + c)(x + d) = m với **a + d = b + c** | Nhóm (x + a)(x + d) và (x + b)(x + c), đặt t theo phần chung |
| ax⁴ + bx³ + cx² + bx + a = 0 (hệ số đối xứng) | x = 0 không là nghiệm → chia x² → đặt **t = x + 1/x** (\|t\| ≥ 2), x² + 1/x² = t² − 2 |
| ax⁴ + bx² + c = 0 (trùng phương) | Đặt t = x² ≥ 0 |

## 2. Phương pháp chung (5 bước)

1. **Điều kiện xác định** (biểu thức dưới căn ≥ 0, mẫu ≠ 0).
2. Quan sát: có phần nào **lặp lại**? → đặt ẩn phụ (ghi **điều kiện của ẩn phụ**).
3. Biến đổi tương đương (bình phương khi **hai vế không âm**).
4. Giải, **đối chiếu điều kiện**.
5. **Thử lại** nghiệm (nhanh, tránh sai).

---

## 3. Ví dụ giải mẫu

**Ví dụ 1.** Giải √(2x + 3) = x.

> Điều kiện: x ≥ 0 (vế phải là căn bậc hai nên không âm).
> Bình phương: 2x + 3 = x² ⇔ x² − 2x − 3 = 0 ⇔ x = 3 hoặc x = −1.
> Đối chiếu x ≥ 0: **x = 3**. Thử lại: √9 = 3 ✓.

**Ví dụ 2.** Giải √(x + 1) + √(4 − x) = 3.

> Điều kiện: −1 ≤ x ≤ 4.
> Bình phương: (x + 1) + (4 − x) + 2√((x + 1)(4 − x)) = 9 ⇔ √((x + 1)(4 − x)) = 2
> ⇔ (x + 1)(4 − x) = 4 ⇔ −x² + 3x + 4 = 4 ⇔ x² − 3x = 0 ⇔ x = 0 hoặc x = 3.
> Cả hai thỏa điều kiện. Thử lại: x = 0: 1 + 2 = 3 ✓; x = 3: 2 + 1 = 3 ✓. **S = {0; 3}**.

**Ví dụ 3.** Giải x² + x + √(x² + x + 3) − 9 = 0.

> Đặt t = √(x² + x + 3), t ≥ 0 ⇒ x² + x = t² − 3.
> Phương trình: t² − 3 + t − 9 = 0 ⇔ t² + t − 12 = 0 ⇔ t = 3 (nhận) hoặc t = −4 (loại).
> t = 3 ⇒ x² + x + 3 = 9 ⇔ x² + x − 6 = 0 ⇔ **x = 2 hoặc x = −3**.

**Ví dụ 4.** Giải (x + 1)(x + 2)(x + 3)(x + 4) = 24.

> Nhận xét 1 + 4 = 2 + 3. Nhóm: (x² + 5x + 4)(x² + 5x + 6) = 24.
> Đặt t = x² + 5x + 5 ⇒ (t − 1)(t + 1) = 24 ⇔ t² = 25 ⇔ t = ±5.
> t = 5: x² + 5x = 0 ⇔ x = 0 hoặc x = −5.
> t = −5: x² + 5x + 10 = 0, Δ = 25 − 40 < 0, vô nghiệm.
> **S = {0; −5}**.

**Ví dụ 5.** Giải x⁴ − 3x³ + 4x² − 3x + 1 = 0.

> x = 0 không là nghiệm. Chia hai vế cho x²: (x² + 1/x²) − 3(x + 1/x) + 4 = 0.
> Đặt t = x + 1/x (\|t\| ≥ 2) ⇒ x² + 1/x² = t² − 2.
> t² − 2 − 3t + 4 = 0 ⇔ t² − 3t + 2 = 0 ⇔ t = 1 (loại vì \|t\| < 2) hoặc t = 2.
> t = 2: x + 1/x = 2 ⇔ x² − 2x + 1 = 0 ⇔ **x = 1**.

---

## 4. Bài tự luyện

1. √(x + 5) = x − 1
2. √(3x + 1) = √(x + 5)
3. x − √x − 6 = 0
4. √(x + 2) + √(7 − x) = 3
5. x² − 2x + √(x² − 2x + 4) = 8
6. x(x + 1)(x + 2)(x + 3) = 24
7. x⁴ − 5x² + 4 = 0
8. (x² + x)² − 8(x² + x) + 12 = 0
9. √(x − 1) + √(x + 4) = 5
10. 2x⁴ + 3x³ − 10x² + 3x + 2 = 0

<details>
<summary><b>Đáp án và gợi ý</b></summary>

1. ĐK x ≥ 1. x² − 3x − 4 = 0 → x = 4 (loại x = −1). **x = 4**
2. ĐK x ≥ −1/3. 3x + 1 = x + 5 → **x = 2**
3. Đặt t = √x ≥ 0: t² − t − 6 = 0 → t = 3 → **x = 9**
4. Bình phương: 9 + 2√((x + 2)(7 − x)) = 9 → (x + 2)(7 − x) = 0 → **x = −2; x = 7**
5. Đặt t = √(x² − 2x + 4) ≥ 0: t² + t − 12 = 0 → t = 3 → x² − 2x − 5 = 0 → **x = 1 ± √6**
6. Nhóm x(x + 3) và (x + 1)(x + 2), đặt t = x² + 3x + 1: t² = 25 → t = 5 cho x² + 3x − 4 = 0 → **x = 1; x = −4** (t = −5 vô nghiệm)
7. t = x²: t = 1 hoặc t = 4 → **x = ±1; x = ±2**
8. t = x² + x: t = 2 hoặc t = 6 → **x ∈ {1; −2; 2; −3}**
9. ĐK x ≥ 1. Bình phương: √((x − 1)(x + 4)) = 11 − x (cần x ≤ 11) → 25x = 125 → **x = 5**
10. Chia x², t = x + 1/x: 2t² + 3t − 14 = 0 → t = 2 hoặc t = −7/2. t = 2 → x = 1; t = −7/2 → 2x² + 7x + 2 = 0 → x = (−7 ± √33)/4. **S = {1; (−7 ± √33)/4}**

</details>

---

## 5. Lỗi hay gặp

| Lỗi | Cách tránh |
|---|---|
| Bình phương khi vế phải có thể âm → thừa nghiệm | Luôn ghi điều kiện **vế phải ≥ 0** trước khi bình phương |
| Quên điều kiện của ẩn phụ (t ≥ 0, \|t\| ≥ 2) | Viết điều kiện **ngay khi đặt** ẩn phụ |
| Chia cho x mà không xét x = 0 | Kiểm tra x = 0 trước khi chia |
| Không thử lại | Thử lại mất 1 phút, cứu được cả câu |
