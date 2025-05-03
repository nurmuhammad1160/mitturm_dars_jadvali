const express = require('express');
const path = require('path'); // path modulini chaqiramiz

const app = express();
const PORT = process.env.PORT || 3000; // Server ishlaydigan port

// Jadval ma'lumotlari (serverda saqlanadi)
// Kelajakda buni alohida fayl yoki ma'lumotlar bazasidan olish mumkin
const schedule = [
    { day: 1, startTime: '08:30', endTime: '10:00', group: 'Kompyuter grafikasi - 101', room: 'A-205' },
    { day: 1, startTime: '10:15', endTime: '11:45', group: 'Ma\'lumotlar bazasi - 202', room: 'B-110' },
    { day: 2, startTime: '14:00', endTime: '15:30', group: 'Web dasturlash - 305', room: 'C-301' },
    { day: 3, startTime: '09:00', endTime: '10:30', group: 'Kompyuter grafikasi - 101', room: 'A-205' },
    // Hozirgi kunni test qilish uchun ( kerak bo'lsa vaqtini o'zgartiring)
    { day: 6, startTime: '14:00', endTime: '14:30', group: 'Algoritmlar - 401', room: 'D-101' }
    // ... boshqa darslarni qo'shing
];

// API endpoint: Jadval ma'lumotlarini JSON formatida qaytaradi
app.get('/api/schedule', (req, res) => {
    res.json(schedule);
});

// Asosiy sahifa (index.html) uchun yo'l (route)
app.get('/', (req, res) => {
    // __dirname joriy papka yo'lini bildiradi
    res.sendFile(path.join(__dirname, 'index.html'));
});

// CSS fayli (style.css) uchun yo'l
app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'style.css'));
});

// JavaScript fayli (script.js) uchun yo'l
app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'script.js'));
});

// Serverni ishga tushirish
app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} manzilida ishga tushdi`);
});