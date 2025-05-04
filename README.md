# ⏰ Darsga Ogohlantiruvchi Soat

Bu loyiha universitetdagi ("Mitturm") o'quv jarayoni uchun yaratilgan oddiy veb-ilova bo'lib, o'qituvchining dars jadvali asosida dars boshlanishiga **10 daqiqa** qolganda foydalanuvchini (o'qituvchini) ogohlantirish uchun mo'ljallangan.

**Talaba:** Samatov Nurmuhammadjon Qahramonjon o‘g‘li

## 🚀 Texnologiyalar

Ushbu loyihada quyidagi texnologiyalardan foydalanilgan:

* **Frontend:** HTML, CSS, JavaScript (Vanilla JS)
* **Backend:** Node.js, Express.js
* **Ma'lumotlar:** Dars jadvali hozircha `server.js` faylida massiv (array) ko'rinishida saqlangan.

## ⚙️ O'rnatish va Ishga Tushirish

Loyihani o'z kompyuteringizda ishga tushirish uchun quyidagi qadamlarni bajaring:

1.  **Repozitoriyni klonlash (nusxalash):**
    Terminal yoki buyruqlar satrida quyidagi buyruqni kiriting:
    ```bash
    git clone [https://github.com/nurmuhammad1160/mitturm_dars_jadvali.git](https://github.com/nurmuhammad1160/mitturm_dars_jadvali.git)
    ```

2.  **Loyiha papkasiga o'tish:**
    ```bash
    cd mitturm_dars_jadvali
    ```

3.  **Kerakli paketlarni o'rnatish:**
    Loyiha ishlashi uchun zarur bo'lgan `Express.js` paketini o'rnatish uchun quyidagi buyruqni kiriting:
    ```bash
    npm install
    ```
    * **Nega faqat `npm install`?** Chunki loyiha papkasidagi `package.json` faylida qaysi paketlar kerakligi (`dependencies` bo'limida, masalan, `express`) yozilgan. `npm install` buyrug'i shu faylni o'qiydi va kerakli barcha paketlarni avtomatik ravishda `node_modules` papkasiga yuklab oladi. Shuning uchun `node_modules` papkasini GitHub'ga yuklash shart emas.

4.  **Serverni ishga tushirish:**
    Node.js serverini ishga tushirish uchun quyidagi buyruqni kiriting:
    ```bash
    node server.js
    ```
    Server muvaffaqiyatli ishga tushganligi haqida terminalda xabar paydo bo'ladi (masalan, `Server http://localhost:3000 manzilida ishga tushdi`).

5.  **Ilovani ochish:**
    Brauzeringizni oching va `http://localhost:3000` manziliga kiring (yoki server ishga tushgan boshqa portga).

## ✨ Asosiy Funksiyalar

* **Jadvalni ko'rsatish (`displaySchedule`):** O'qituvchining dars jadvalini kunlar bo'yicha guruhlab, chiroyli ko'rinishda aks ettiradi.
* **Joriy vaqtni hisoblash (`getCurrentMinutes`):** Hozirgi kompyuter vaqtini daqiqalarda hisoblaydi.
* **Ogohlantirish (`checkForAlert`):** Har daqiqada joriy vaqtni tekshiradi va agar biror dars boshlanishiga 10 daqiqa yoki undan kam vaqt qolgan bo'lsa, sahifaning yuqorisida maxsus ogohlantirish xabarini chiqaradi va tegishli darsni jadvalda ajratib ko'rsatadi.


