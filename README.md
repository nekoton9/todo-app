# 📋 ToDo List — Full Stack App

Повноцінний ToDo List із **Node.js backend** та зберіганням завдань у файловій системі сервера.

## Структура проєкту

```
todo-app/
├── server.js          # Backend — Express API
├── public/
│   └── index.html     # Frontend — інтерфейс додатку
├── data/
│   └── todos.json     # Файл зберігання завдань (auto-created)
├── package.json
└── README.md
```

## Встановлення та запуск

### 1. Встановити залежності
```bash
npm install
```

### 2. Запустити сервер
```bash
npm start
```

### 3. Відкрити браузер
```
http://localhost:3000
```

---

## API Endpoints

| Метод  | URL               | Дія                           |
|--------|-------------------|-------------------------------|
| GET    | /api/todos        | Отримати всі завдання         |
| POST   | /api/todos        | Створити завдання             |
| PATCH  | /api/todos/:id    | Переключити статус виконання  |
| DELETE | /api/todos/:id    | Видалити конкретне завдання   |
| DELETE | /api/todos        | Видалити всі виконані         |

---

## Зберігання даних

Завдання зберігаються у файлі `data/todos.json` у форматі:

```json
[
  {
    "id": "uuid-v4",
    "text": "Назва завдання",
    "completed": false,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

## Технології

- **Backend**: Node.js, Express.js
- **Зберігання**: Файлова система (JSON)
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Fonts**: DM Serif Display + DM Sans (Google Fonts)
