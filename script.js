// // script.js faylida

// const scheduleTableBody = document.getElementById('schedule-table').querySelector('tbody');
// const notificationDiv = document.getElementById('current-lesson-notification');
// const weekDays = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];

// let schedule = []; // Jadval serverdan olinadi

// // Funksiya: Vaqtni (HH:MM) daqiqalarga o'tkazish
// function timeToMinutes(time) {
//     if (!time || typeof time !== 'string') return 0; // Xatolikni oldini olish
//     const parts = time.split(':');
//     if (parts.length !== 2) return 0; // Xatolikni oldini olish
//     const [hours, minutes] = parts.map(Number);
//     return hours * 60 + minutes;
// }

// // Funksiya: To'liq jadvalni HTMLga chiqarish
// function displayFullSchedule() {
//     scheduleTableBody.innerHTML = ''; // Eski jadvalni tozalash
//     if (!schedule || schedule.length === 0) return; // Jadval bo'sh bo'lsa chiqib ketish

//     schedule.forEach(lesson => {
//         const row = scheduleTableBody.insertRow();
//         row.insertCell().textContent = weekDays[lesson.day] || 'Noma\'lum kun';
//         row.insertCell().textContent = lesson.startTime || '--:--';
//         row.insertCell().textContent = lesson.endTime || '--:--';
//         row.insertCell().textContent = lesson.group || 'Noma\'lum';
//         row.insertCell().textContent = lesson.room || 'Noma\'lum';
//         // Keyinchalik joriy darsni belgilash uchun ma'lumotlarni saqlaymiz
//         row.dataset.day = lesson.day;
//         row.dataset.startTime = lesson.startTime;
//     });
// }

// // Funksiya: Hozirgi darsni tekshirish va xabar berish
// function checkCurrentLesson() {
//     if (schedule.length === 0) return; // Jadval hali yuklanmagan bo'lsa, tekshirmaymiz

//     const now = new Date();
//     const currentDay = now.getDay(); // 0 (Yak) - 6 (Shan)
//     const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

//     let currentLesson = null;

//     // Jadvaldagi har bir darsni tekshiramiz
//     for (const lesson of schedule) {
//         if (lesson.day === currentDay) {
//             const startTimeInMinutes = timeToMinutes(lesson.startTime);
//             const endTimeInMinutes = timeToMinutes(lesson.endTime);

//             // Hozirgi vaqt shu dars oralig'ida bo'lsa
//             if (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes) {
//                 currentLesson = lesson;
//                 break; // Birinchi topilgan joriy darsni olamiz
//             }
//         }
//     }

//     // Jadvaldagi joriy dars qatorini belgilash (agar topilgan bo'lsa)
//     const rows = scheduleTableBody.querySelectorAll('tr');
//     rows.forEach(row => {
//         row.classList.remove('current'); // Avvalgi belgilarni olib tashlash
//         if (currentLesson &&
//             parseInt(row.dataset.day) === currentLesson.day &&
//             row.dataset.startTime === currentLesson.startTime) {
//                 row.classList.add('current'); // Joriy dars qatorini belgilash
//             }
//     });


//     // Xabarnomani yangilash
//     if (currentLesson) {
//         notificationDiv.innerHTML = `<p><strong>DIQQAT!</strong> Hozir (${currentLesson.startTime} - ${currentLesson.endTime}) sizda <strong>${currentLesson.group}</strong> guruhi bilan <strong>${currentLesson.room}</strong> xonasida dars!</p>`;
//         notificationDiv.classList.add('active');
//     } else {
//         const formattedTime = now.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
//         notificationDiv.innerHTML = `<p>Hozir (${weekDays[currentDay]}, ${formattedTime}) darsingiz yo'q.</p>`;
//         notificationDiv.classList.remove('active');
//     }
// }

// // Funksiya: Serverdan jadvalni olish
// async function fetchSchedule() {
//     try {
//         // Serverdagi API endpointga so'rov yuborish
//         const response = await fetch('/api/schedule');
//         if (!response.ok) {
//             throw new Error(`Serverdan javob olishda xatolik: ${response.statusText}`);
//         }
//         schedule = await response.json(); // JSON javobni olish
//         console.log('Jadval serverdan olindi:', schedule); // Konsolga chiqarish (tekshirish uchun)
//         displayFullSchedule(); // Jadvalni ko'rsatish
//         checkCurrentLesson(); // Joriy darsni darhol tekshirish
//     } catch (error) {
//         console.error("Jadvalni yuklashda xatolik:", error);
//         notificationDiv.innerHTML = `<p style="color: red;">Xatolik: Jadvalni serverdan yuklab bo'lmadi. Server ishlayotganiga ishonch hosil qiling.</p>`;
//     }
// }

// // ----- Dastur boshlanishi -----

// // 1. Serverdan jadvalni olishni boshlash
// fetchSchedule();

// // 2. Har daqiqada hozirgi darsni qayta tekshirish
// setInterval(checkCurrentLesson, 60000); // 60000 ms = 1 daqiqa




// script.js fayli (Ustoz talablariga moslashtirilgan)

const scheduleTableBody = document.getElementById('schedule-table').querySelector('tbody');
const notificationDiv = document.getElementById('current-lesson-notification');
const weekDays = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];

let schedule = []; // Jadval serverdan olinadi

// Funksiya: Vaqtni (HH:MM) daqiqalarga o'tkazish (yordamchi funksiya)
function timeToMinutes(time) {
    if (!time || typeof time !== 'string') return 0;
    const parts = time.split(':');
    if (parts.length !== 2) return 0;
    const [hours, minutes] = parts.map(Number);
    return hours * 60 + minutes;
}

// ---- Talab qilingan funksiyalar ----

/**
 * displaySchedule: Dars jadvalidagi fan nomlari va boshlanish vaqtlarini sahifada ko‘rsatadi.
 * (Endi ko'proq ma'lumot ko'rsatadi, lekin talabni qondiradi)
 */
function displaySchedule() {
    scheduleTableBody.innerHTML = ''; // Eski jadvalni tozalash
    if (!schedule || schedule.length === 0) return;

    schedule.forEach(lesson => {
        const row = scheduleTableBody.insertRow();
        row.insertCell().textContent = weekDays[lesson.day] || 'Noma\'lum kun';
        row.insertCell().textContent = lesson.startTime || '--:--'; // Boshlanish vaqti (Talabda bor)
        row.insertCell().textContent = lesson.endTime || '--:--';
        row.insertCell().textContent = lesson.group || 'Noma\'lum';   // Fan nomi (Talabda bor)
        row.insertCell().textContent = lesson.room || 'Noma\'lum';
        // Ogohlantirish uchun ma'lumotlarni saqlaymiz
        row.dataset.day = lesson.day;
        row.dataset.startTime = lesson.startTime;
    });
}

/**
 * getCurrentMinutes: Hozirgi soatni daqiqaga aylantirib, kompyuter vaqtiga asoslangan holda hisoblaydi.
 */
function getCurrentMinutes() {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
}

/**
 * checkForAlert: Dars boshlanishiga 10 daqiqa qolganida ogohlantirish beradi.
 */
function checkForAlert() {
    if (schedule.length === 0) return; // Jadval hali yuklanmagan

    const now = new Date();
    const currentDay = now.getDay();
    const currentTimeInMinutes = getCurrentMinutes(); // Alohida funksiyadan foydalanish

    let alertMessage = ''; // Ogohlantirish xabari
    let upcomingLessonFound = false;

    // Jadvaldagi har bir darsni tekshiramiz
    for (const lesson of schedule) {
        if (lesson.day === currentDay) {
            const startTimeInMinutes = timeToMinutes(lesson.startTime);
            const alertStartTime = startTimeInMinutes - 10; // Darsdan 10 daqiqa oldin
            const alertEndTime = startTimeInMinutes; // Dars boshlanish vaqti

            // Hozirgi vaqt 10 daqiqalik ogohlantirish oralig'ida bo'lsa
            if (currentTimeInMinutes >= alertStartTime && currentTimeInMinutes < alertEndTime) {
                alertMessage = `<p><strong>DIQQAT!</strong> ${lesson.startTime} da boshlanadigan <strong>${lesson.group}</strong> darsiga 10 daqiqadan kam vaqt qoldi! (Xona: ${lesson.room})</p>`;
                upcomingLessonFound = true;
                // Agar brauzer alert() kerak bo'lsa:
                // alert(`${lesson.startTime} da boshlanadigan ${lesson.group} darsiga 10 daqiqadan kam vaqt qoldi! (Xona: ${lesson.room})`);
                break; // Birinchi topilgan yaqinlashayotgan dars uchun xabar beramiz
            }
        }
    }

    // Xabarnomani yangilash
    if (upcomingLessonFound) {
        notificationDiv.innerHTML = alertMessage;
        notificationDiv.classList.add('active'); // CSS orqali stil berish uchun
    } else {
        // Agar hozir dars bo'layotganini ham ko'rsatish kerak bo'lsa, bu yerga qo'shimcha tekshiruv qo'shish mumkin
        // Hozircha faqat 10 daqiqa qolganini tekshiramiz
        const formattedTime = now.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
        notificationDiv.innerHTML = `<p>Hozir (${weekDays[currentDay]}, ${formattedTime}) yaqinlashayotgan darslar uchun ogohlantirish yo'q.</p>`;
        notificationDiv.classList.remove('active');
    }

    // Jadvaldagi qatorlarni belgilashni (highlight) ham o'zgartirish mumkin,
    // masalan, yaqinlashayotgan dars qatorini belgilash. Hozircha bu qism o'zgartirilmadi.
    const rows = scheduleTableBody.querySelectorAll('tr');
    rows.forEach(row => row.classList.remove('current')); // Barcha belgilarni olib tashlash
    // Kerak bo'lsa, yaqin darsni belgilash logikasini qo'shing
}


// ---- Asosiy qism ----

// Funksiya: Serverdan jadvalni olish
async function fetchSchedule() {
    try {
        const response = await fetch('/api/schedule');
        if (!response.ok) {
            throw new Error(`Serverdan javob olishda xatolik: ${response.statusText}`);
        }
        schedule = await response.json();
        console.log('Jadval serverdan olindi:', schedule);
        displaySchedule(); // Talab qilingan funksiya nomi bilan jadvalni ko'rsatish
        checkForAlert();   // Talab qilingan funksiya nomi bilan tekshirishni boshlash
    } catch (error) {
        console.error("Jadvalni yuklashda xatolik:", error);
        notificationDiv.innerHTML = `<p style="color: red;">Xatolik: Jadvalni serverdan yuklab bo'lmadi. Server ishlayotganiga ishonch hosil qiling.</p>`;
    }
}

// ----- Dastur boshlanishi -----

// 1. Serverdan jadvalni olishni boshlash
fetchSchedule();

// 2. Har daqiqada ogohlantirishni tekshirish
setInterval(checkForAlert, 60000); // 60000 ms = 1 daqiqa