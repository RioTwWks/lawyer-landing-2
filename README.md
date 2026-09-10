# lawyer-landing-2

Второй вариант лендинга ООО «Дело Правое» — строгий красно-жёлтый стиль по ТЗ.

## Стек

- Статический HTML + Tailwind CSS 4
- Деплой на Selectel S3 через GitHub Actions

## Структура

| Файл | Описание |
|------|----------|
| `index.html` | Главная страница (9 блоков по ТЗ) |
| `about.html` | О нас |
| `services.html` | Полный список услуг |
| `prices-physical.html` | Прайс для физ. лиц |
| `prices-legal.html` | Прайс для юр. лиц |
| `cases.html` | Все судебные дела |
| `privacy.html` | Политика персональных данных |

## Разработка

```bash
npm install
npm run dev    # watch CSS
npm run build  # minify CSS
```

## CI/CD

При пуше в `main` GitHub Actions собирает CSS и деплоит на Selectel S3.
Требуются secrets: `SELECTEL_ACCESS_KEY_ID`, `SELECTEL_SECRET_ACCESS_KEY`, `SELECTEL_BUCKET_NAME`.
