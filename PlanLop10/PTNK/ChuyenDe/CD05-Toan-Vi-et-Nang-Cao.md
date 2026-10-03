# Chuyên đề 5: Hệ thức Vi-ét nâng cao

> [Danh mục chuyên đề](Danh-Muc-Chuyen-De.md) · Mức ★★ · Học sau [tuần 10](../../LHP/Tuan-10-Ke-Hoach-Hoc-Tap.md) (đã học Vi-ét có tham số), luyện ở buổi 🔷 PTNK tuần 14 hoặc tuần tự chọn · Thời lượng: 2 buổi × 60 phút

## Mục tiêu

- Giải bài Vi-ét có **hệ thức không đối xứng** (x₁ = 2x₂, 3x₁ + x₂ = ...).
- Dùng **nhẩm nghiệm** (a + b + c = 0) để tìm nhanh nghiệm theo m.
- Tìm **hệ thức giữa hai nghiệm không phụ thuộc m**.

---

## 1. Lý thuyết cốt lõi

| Nội dung | Công thức / cách làm |
|---|---|
| Vi-ét | S = x₁ + x₂ = −b/a; P = x₁x₂ = c/a (khi phương trình có nghiệm) |
| Nhẩm nghiệm | a + b + c = 0 ⇒ x₁ = 1, x₂ = c/a · a − b + c = 0 ⇒ x₁ = −1, x₂ = −c/a |
| Hai nghiệm trái dấu | P < 0 |
| Hai nghiệm dương phân biệt | Δ > 0, S > 0, P > 0 |
| Hệ thức không đối xứng | Kết hợp với **S** để giải ra **từng nghiệm**, rồi thế vào **P** |
| Hệ thức độc lập với m | Biểu diễn S, P theo m, **khử m** |

---

## 2. Ví dụ giải mẫu

**Ví dụ 1.** Cho x² − 3x + m = 0. Tìm m để phương trình có hai nghiệm thỏa x₁ = 2x₂.

> Có nghiệm: Δ = 9 − 4m ≥ 0 ⇔ m ≤ 9/4.
> Kết hợp x₁ + x₂ = 3 và x₁ = 2x₂ ⇒ 3x₂ = 3 ⇒ x₂ = 1, x₁ = 2.
> m = x₁x₂ = 2 (thỏa m ≤ 9/4). **m = 2**.

**Ví dụ 2.** Cho x² − 4x + m − 1 = 0. Tìm m để 3x₁ + x₂ = 6.

> Δ' = 4 − (m − 1) = 5 − m ≥ 0 ⇔ m ≤ 5.
> Hệ x₁ + x₂ = 4 và 3x₁ + x₂ = 6 ⇒ 2x₁ = 2 ⇒ x₁ = 1, x₂ = 3.
> m − 1 = x₁x₂ = 3 ⇒ **m = 4** (thỏa m ≤ 5).

**Ví dụ 3.** Cho x² − 2(m + 1)x + 2m + 1 = 0. Tìm m để phương trình có hai nghiệm dương phân biệt.

> a + b + c = 1 − 2(m + 1) + 2m + 1 = 0 ⇒ x₁ = 1, x₂ = 2m + 1.
> Hai nghiệm dương phân biệt ⇔ 2m + 1 > 0 và 2m + 1 ≠ 1 ⇔ **m > −1/2 và m ≠ 0**.

**Ví dụ 4.** Cho x² − 2(m + 1)x + 2m − 3 = 0. Chứng minh phương trình luôn có hai nghiệm phân biệt và tìm hệ thức giữa x₁, x₂ không phụ thuộc m.

> Δ' = (m + 1)² − (2m − 3) = m² + 4 > 0 với mọi m.
> S = 2m + 2, P = 2m − 3 ⇒ S − P = 5. **Hệ thức: x₁ + x₂ − x₁x₂ = 5.**

---

## 3. Bài tự luyện

1. x² − 6x + m = 0. Tìm m để x₁ = 2x₂.
2. x² − 2mx − 3 = 0. Chứng minh phương trình luôn có hai nghiệm trái dấu; tìm m để x₁² + x₂² = 10.
3. x² − (m + 2)x + m + 1 = 0. Tìm m để phương trình có hai nghiệm, nghiệm này gấp đôi nghiệm kia.
4. x² − 2(m − 1)x + m − 3 = 0. Chứng minh phương trình luôn có hai nghiệm phân biệt; tìm hệ thức giữa x₁, x₂ không phụ thuộc m.
5. x² − 5x + m = 0. Tìm m để x₁² − x₂² = 15.
6. x² − 2x + m − 1 = 0. Tìm m để 1/x₁ + 1/x₂ = 2.

<details>
<summary><b>Đáp án và gợi ý</b></summary>

1. 3x₂ = 6 ⇒ x₂ = 2, x₁ = 4 ⇒ **m = 8** (Δ' = 1 > 0 ✓)
2. P = −3 < 0 ⇒ trái dấu. x₁² + x₂² = 4m² + 6 = 10 ⇒ **m = ±1**
3. a + b + c = 0 ⇒ nghiệm 1 và m + 1. m + 1 = 2 ⇒ m = 1; hoặc 1 = 2(m + 1) ⇒ m = −1/2. **m = 1; m = −1/2**
4. Δ' = m² − 3m + 4 = (m − 3/2)² + 7/4 > 0. S = 2m − 2, P = m − 3 ⇒ **x₁ + x₂ − 2x₁x₂ = 4**
5. (x₁ − x₂)(x₁ + x₂) = 15 ⇒ x₁ − x₂ = 3, kết hợp S = 5 ⇒ x₁ = 4, x₂ = 1 ⇒ **m = 4**
6. S/P = 2/(m − 1) = 2 ⇒ m = 2; Δ' = 2 − m ≥ 0 ⇒ m ≤ 2. **m = 2** (nghiệm kép x = 1)

</details>

---

## 4. Lỗi hay gặp

| Lỗi | Cách tránh |
|---|---|
| Quên điều kiện có nghiệm (Δ ≥ 0) | Viết điều kiện **trước tiên** |
| Quên đối chiếu m tìm được với điều kiện | Bước cuối luôn là "đối chiếu" |
| Bài "nghiệm này gấp đôi nghiệm kia" chỉ xét 1 trường hợp | Xét cả x₁ = 2x₂ và x₂ = 2x₁ (hoặc dùng nghiệm nhẩm được) |
