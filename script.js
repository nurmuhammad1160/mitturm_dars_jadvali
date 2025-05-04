
const scheduleContainer = document.getElementById('schedule-container'); 
const notificationDiv = document.getElementById('current-lesson-notification');
const weekDays = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];
let schedule = [];

function timeToMinutes(time) {
    if (!time || typeof time !== 'string') return 0;
    const parts = time.split(':');
    if (parts.length !== 2) return 0;
    const [hours, minutes] = parts.map(Number);
    return hours * 60 + minutes;
}


/**
 * displaySchedule: Dars jadvalini kunlar bo'yicha guruhlab sahifada ko‘rsatadi.
 */
function displaySchedule() {
    if (!scheduleContainer) return;
    scheduleContainer.innerHTML = ''; 
    if (!schedule || schedule.length === 0) return;

    const lessonsByDay = {};
    schedule.forEach(lesson => {
        if (!lessonsByDay[lesson.day]) {
            lessonsByDay[lesson.day] = [];
        }
        lessonsByDay[lesson.day].push(lesson);
    });

    for (let day = 1; day <= 6; day++) { 
        if (lessonsByDay[day]) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day-schedule');

            const dayTitle = document.createElement('h3');
            dayTitle.textContent = weekDays[day];
            dayDiv.appendChild(dayTitle);

            
            lessonsByDay[day].sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

            lessonsByDay[day].forEach(lesson => {
                const lessonDiv = document.createElement('div');
                lessonDiv.classList.add('lesson-entry');
               
                lessonDiv.dataset.day = lesson.day;
                lessonDiv.dataset.startTime = lesson.startTime;
                lessonDiv.dataset.group = lesson.group; 

                const timeSpan = document.createElement('span');
                timeSpan.classList.add('time');
                timeSpan.textContent = `${lesson.startTime} - ${lesson.endTime}`;
                lessonDiv.appendChild(timeSpan);

                const groupSpan = document.createElement('span');
                groupSpan.classList.add('group');
                groupSpan.textContent = lesson.group;
                lessonDiv.appendChild(groupSpan);

                const roomSpan = document.createElement('span');
                roomSpan.classList.add('room');
                roomSpan.textContent = `(${lesson.room}-xona)`;
                lessonDiv.appendChild(roomSpan);

                dayDiv.appendChild(lessonDiv);
            });

            scheduleContainer.appendChild(dayDiv);
        }
    }
}


function getCurrentMinutes() {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
}

/**
 * checkForAlert: Dars boshlanishiga 10 daqiqa qolganida ogohlantirish beradi.
 */
function checkForAlert() {
    if (schedule.length === 0 || !scheduleContainer) return;

    const now = new Date();
    const currentDay = now.getDay(); 
    const currentTimeInMinutes = getCurrentMinutes();

    let alertMessage = '';
    let upcomingLessonElement = null;

    for (const lesson of schedule) {
        if (lesson.day === currentDay) {
            const startTimeInMinutes = timeToMinutes(lesson.startTime);
            const alertStartTime = startTimeInMinutes - 10; 
            const alertEndTime = startTimeInMinutes;      

            if (currentTimeInMinutes >= alertStartTime && currentTimeInMinutes < alertEndTime) {
                alertMessage = `<p><strong>DIQQAT!</strong> ${lesson.startTime} da boshlanadigan <strong>${lesson.group}</strong> guruhi darsiga (<strong>${lesson.room}</strong>-xona) <strong>10 daqiqadan kam</strong> vaqt qoldi!</p>`;
                upcomingLessonElement = scheduleContainer.querySelector(`.lesson-entry[data-day="${lesson.day}"][data-start-time="${lesson.startTime}"]`);
                break; 
            }
        }
    }

  
    if (alertMessage) {
        notificationDiv.innerHTML = alertMessage;
        notificationDiv.className = 'upcoming-alert'; 
    } else {
        const formattedTime = now.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
        notificationDiv.innerHTML = `<p>Hozir (${weekDays[currentDay]}, ${formattedTime}) yaqinlashayotgan darslar uchun ogohlantirish yo'q.</p>`;
        notificationDiv.className = ''; 
    }

    const allEntries = scheduleContainer.querySelectorAll('.lesson-entry');
    allEntries.forEach(entry => entry.classList.remove('current-alert')); 
    if (upcomingLessonElement) {
        upcomingLessonElement.classList.add('current-alert'); 
    }
}


// ---- Asosiy qism (Serverdan yuklash va interval) ----
async function fetchSchedule() {
    try {
        const response = await fetch('/api/schedule');
        if (!response.ok) {
            throw new Error(`Serverdan javob olishda xatolik: ${response.statusText}`);
        }
        schedule = await response.json();
        console.log('Jadval serverdan olindi:', schedule);
        displaySchedule(); 
        checkForAlert();   
    } catch (error) {
        console.error("Jadvalni yuklashda xatolik:", error);
        notificationDiv.innerHTML = `<p style="color: red;">Xatolik: Jadvalni serverdan yuklab bo'lmadi. Server ishlayotganiga ishonch hosil qiling.</p>`;
    }
}

fetchSchedule();
setInterval(checkForAlert, 60000); 