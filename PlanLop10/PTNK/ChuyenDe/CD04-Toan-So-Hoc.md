# Chuyên đề 4: Số học

> [Danh mục chuyên đề](Danh-Muc-Chuyen-De.md) · Mức ★★ (một số bài ★★★) · Học ở [tuần 6](../../LHP/Tuan-06-Ke-Hoach-Hoc-Tap.md) (khối 🔷 PTNK) · Thời lượng: 3 buổi × 60 phút

## Mục tiêu

- Chứng minh chia hết bằng **phân tích thành tích** các số nguyên liên tiếp.
- Dùng **số dư** để xét số chính phương, chữ số tận cùng.
- Giải phương trình nghiệm nguyên bằng cách **đưa về tích bằng hằng số**.

---

## 1. Lý thuyết cốt lõi

| Nội dung | Kết quả cần nhớ |
|---|---|
| Tích 2 số nguyên liên tiếp | Chia hết cho 2 |
| Tích 3 số nguyên liên tiếp | Chia hết cho 2 và 3, tức **chia hết cho 6** |
| Số chính phương chia cho 3 | Dư **0 hoặc 1** (không bao giờ dư 2) |
| Số chính phương chia cho 4 | Dư **0 hoặc 1** |
| Chữ số tận cùng của lũy thừa | Lặp theo chu kỳ: 2 → (2, 4, 8, 6); 3 → (3, 9, 7, 1); 7 → (7, 9, 3, 1); 8 → (8, 4, 2, 6); 4 → (4, 6); 9 → (9, 1); 0, 1, 5, 6 không đổi |
| Phân số nguyên | (an + b)/(n + c) nguyên ⇔ tách phần nguyên, phần dư chia hết cho (n + c) |
| Phương trình nghiệm nguyên | Đưa về **A·B = hằng số** → A, B là ước của hằng số đó |

---

## 2. Ví dụ giải mẫu

**Ví dụ 1.** Chứng minh n³ − n chia hết cho 6 với mọi số nguyên n.

> n³ − n = n(n² − 1) = (n − 1)n(n + 1): tích 3 số nguyên liên tiếp ⇒ chia hết cho 2 và 3 ⇒ chia hết cho 6.

**Ví dụ 2.** Chứng minh số chính phương chia cho 3 chỉ dư 0 hoặc 1.

> n = 3k ⇒ n² = 9k² chia hết cho 3.
> n = 3k ± 1 ⇒ n² = 9k² ± 6k + 1 chia 3 dư 1.

**Ví dụ 3.** Tìm chữ số tận cùng của 7²⁰²⁷.

> Chữ số tận cùng của 7ⁿ lặp chu kỳ 4: 7, 9, 3, 1. Có 2027 = 4·506 + 3 ⇒ giống 7³ ⇒ **tận cùng là 3**.

**Ví dụ 4.** Tìm số nguyên n để (n + 5)/(n + 2) là số nguyên.

> (n + 5)/(n + 2) = 1 + 3/(n + 2) ⇒ n + 2 ∈ {±1; ±3} ⇒ **n ∈ {−1; −3; 1; −5}**.

**Ví dụ 5.** Tìm các số nguyên x, y thỏa xy − x − y = 2.

> xy − x − y + 1 = 3 ⇔ (x − 1)(y − 1) = 3.
> (x − 1; y − 1) ∈ {(1; 3), (3; 1), (−1; −3), (−3; −1)}
> ⇒ **(x; y) ∈ {(2; 4), (4; 2), (0; −2), (−2; 0)}**.

**Ví dụ 6.** Tìm các số nguyên dương x, y thỏa x² − y² = 15.

> (x − y)(x + y) = 15, với 0 < x − y < x + y.
> • x − y = 1, x + y = 15 ⇒ x = 8, y = 7.
> • x − y = 3, x + y = 5 ⇒ x = 4, y = 1.
> **(8; 7), (4; 1)**.

---

## 3. Bài tự luyện

1. Chứng minh n³ + 5n chia hết cho 6.
2. Chứng minh n² + 1 không chia hết cho 3 với mọi số nguyên n.
3. Tìm chữ số tận cùng của 3¹⁰⁰.
4. Tìm số nguyên n để (2n + 7)/(n + 1) là số nguyên.
5. Tìm các số nguyên x, y thỏa xy + x + y = 5.
6. Tìm các số nguyên dương x, y thỏa x² − y² = 21.
7. Chứng minh n(n + 1)(n + 2)(n + 3) + 1 là số chính phương.
8. Tìm số nguyên tố p sao cho p + 2 và p + 4 cũng là số nguyên tố.
9. ★★★ Chứng minh n⁵ − n chia hết cho 5.

<details>
<summary><b>Đáp án và gợi ý</b></summary>

1. n³ + 5n = (n³ − n) + 6n; cả hai phần chia hết cho 6.
2. n² chia 3 dư 0 hoặc 1 ⇒ n² + 1 chia 3 dư 1 hoặc 2.
3. Chu kỳ 3, 9, 7, 1; 100 chia hết cho 4 ⇒ **tận cùng 1**.
4. 2 + 5/(n + 1) ⇒ n + 1 ∈ {±1; ±5} ⇒ **n ∈ {0; −2; 4; −6}**.
5. (x + 1)(y + 1) = 6 ⇒ **(0; 5), (1; 2), (2; 1), (5; 0), (−2; −7), (−3; −4), (−4; −3), (−7; −2)**.
6. (x − y)(x + y) = 21 ⇒ **(11; 10), (5; 2)**.
7. Nhóm n(n + 3) = n² + 3n và (n + 1)(n + 2) = n² + 3n + 2; đặt t = n² + 3n + 1 ⇒ biểu thức = (t − 1)(t + 1) + 1 = t² = **(n² + 3n + 1)²**.
8. Trong 3 số p, p + 2, p + 4 luôn có 1 số chia hết cho 3 ⇒ số đó phải bằng 3 ⇒ **p = 3** (3, 5, 7).
9. n⁵ − n = n(n² − 1)(n² + 1) = n(n − 1)(n + 1)[(n² − 4) + 5] = (n − 2)(n − 1)n(n + 1)(n + 2) + 5(n − 1)n(n + 1). Tích 5 số nguyên liên tiếp chia hết cho 5 ⇒ đpcm.

</details>

---

## 4. Lỗi hay gặp

| Lỗi | Cách tránh |
|---|---|
| Thiếu trường hợp **ước âm** | Liệt kê đủ ±1, ±d... |
| Quên điều kiện "nguyên dương" ở đề | Đọc lại đề trước khi kết luận |
| Chứng minh chia hết bằng vài ví dụ số | Ví dụ chỉ để **dự đoán**, phải chứng minh tổng quát |
