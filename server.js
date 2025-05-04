const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const schedule = [
    // Dushanba (Day 1)
    { day: 1, startTime: '09:00', endTime: '10:20', group: '24-215', room: '128' },
    { day: 1, startTime: '10:30', endTime: '11:50', group: '24-205', room: '219' },
    { day: 1, startTime: '12:00', endTime: '13:20', group: '24-214', room: '130' },
    { day: 1, startTime: '15:50', endTime: '17:10', group: '24-210', room: '221' },
    { day: 1, startTime: '17:20', endTime: '18:40', group: '24-212', room: '226' },

    // Seshanba (Day 2)
    { day: 2, startTime: '09:00', endTime: '10:20', group: '24-215', room: '128' },
    { day: 2, startTime: '10:30', endTime: '11:50', group: '24-205', room: '219' },
    { day: 2, startTime: '15:50', endTime: '17:10', group: '24-212', room: '226' },

    // Chorshanba (Day 3)
    { day: 3, startTime: '09:00', endTime: '10:20', group: '24-214', room: '130' },
    { day: 3, startTime: '12:00', endTime: '13:20', group: '24-205', room: '219' },
    { day: 3, startTime: '14:20', endTime: '15:40', group: '24-212', room: '226' },

    // Payshanba (Day 4)
    { day: 4, startTime: '09:00', endTime: '10:20', group: '24-214', room: '130' },
    { day: 4, startTime: '10:30', endTime: '11:50', group: '24-215', room: '128' },
    { day: 4, startTime: '12:00', endTime: '13:20', group: '24-205', room: '219' },
    { day: 4, startTime: '14:20', endTime: '15:40', group: '24-212', room: '226' },
    { day: 4, startTime: '15:50', endTime: '17:10', group: '24-210', room: '221' },

    // Juma (Day 5)
    { day: 5, startTime: '09:00', endTime: '10:20', group: '24-215', room: '128' },
    { day: 5, startTime: '10:30', endTime: '11:50', group: '24-214', room: '130' },
    { day: 5, startTime: '14:20', endTime: '15:40', group: '24-210', room: '221' },
    { day: 5, startTime: '15:50', endTime: '17:10', group: '24-210', room: '221' },

];


app.get('/api/schedule', (req, res) => {
    res.json(schedule);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'style.css'));
});

app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'script.js'));
});

app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} manzilida ishga tushdi`);
});