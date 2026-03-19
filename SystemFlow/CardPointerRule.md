# Flow: CardPointerRule

## Overview
Áp dụng rule hover pointer cho các item dùng kiểu hiển thị card, đồng thời override các card tĩnh để tránh gửi tín hiệu sai rằng toàn bộ box đều có thể click.

## Trigger
Các component hoặc page render phần tử với utility class `card`.

## Flow Diagram

```text
Card render
   |
   v
Apply utility .card
   |
   +--> Interactive card -> cursor pointer on hover
   |
   +--> Static info card -> add cursor-default override
   |
   v
Consistent hover behavior across UI
```

## Steps

1. Thêm `cursor: pointer` vào utility `.card` dùng chung.
2. Rà các card ở trang giỏ hàng.
3. Override các card thuần hiển thị bằng `cursor-default`.
4. Giữ nguyên hành vi của button và link bên trong card.

## Error Handling

| Scenario | Behavior |
|---|---|
| Card interactive thiếu hover pointer | Utility `.card` cung cấp con trỏ chung |
| Card tĩnh bị hiểu là clickable | Gắn `cursor-default` để override |
| Button và link con bị ảnh hưởng | Chỉ đổi con trỏ ở wrapper, không đổi handler |

## Files Involved

| File | Role |
|---|---|
| `app/globals.css` | Định nghĩa utility `.card` dùng chung |
| `app/cart/page.tsx` | Override con trỏ cho các card tĩnh trong giỏ hàng |

## Notes
Rule này ưu tiên tính nhất quán ở tầng utility, sau đó tinh chỉnh tại các màn có card thuần thông tin.