# รายการ Tracking UTM สำหรับโอนย้ายลูกค้าไป LINE

`utm_source=website` จะถูกฝังไว้ในทุกลิงก์เพื่อระบุที่มาว่ามาจากเว็บไซต์หลัก ส่วนตัวแปรที่แยกตามจุดที่มีการส่งลูกค้าไปหน้า LINE จะมีรายละเอียดดังนี้:

| ตำแหน่งที่ลูกค้ากด (Action / Component) | ลิงก์ที่ใช้ (Base URL) | `utm_medium` | `utm_campaign` | จุดประสงค์ / สิ่งที่ใช้วัดผล |
| :--- | :--- | :--- | :--- | :--- |
| **ปุ่มลอยติดหน้าจอ (จองเลย)** | `https://lin.ee/SSGzTmt` | `floating_button` | `book_now` | การตัดสินใจจองด่วนรวดเร็ว (ทักได้ตลอดจากทุกส่วนของหน้าจอ) |
| **แถบเมนูหลักบน Desktop (Book a Ritual)** | `https://lin.ee/SSGzTmt` | `desktop_nav` | `book_ritual` | การหาช่องทางจองจากแถบเมนูนำทาง (พฤติกรรมผู้ใช้คอมพิวเตอร์) |
| **เมนูพับด้านข้างบน Mobile (Book a Ritual)**| `https://lin.ee/SSGzTmt` | `mobile_nav` | `book_ritual` | การจงใจกดเมนูออกเพื่อหาช่องทางการจอง (พฤติกรรมผู้ใช้มือถือ) |
| **ปุ่มท้ายหน้าเว็บ (Enquire Now)** | `https://lin.ee/SSGzTmt` | `footer` | `enquire_now` | ความสนใจหลังจากอ่านและศึกษาข้อมูลบนหน้าเว็บจนจบ |
| **หมวดหมู่ติดต่อ Contact (LINE)** | `https://line.me/ti/p/@wanaka.th` | `contact_section` | `contact_line` | ความตั้งใจค้นหาช่องทางติดต่อโดยเฉพาะเจาะจง |

---

## รายการ GTM Event Tracking (dataLayer)

มีการติดตั้ง `dataLayer.push({ event: '<event_name>' })` ไว้ตามจุดต่างๆ ที่เป็น Call to Action (CTA) บนหน้าเว็บไซต์ เพื่อให้ทีม Marketing นำ Event ชื่อเหล่านี้ไปเซ็ตอัปเป็น Conversion (Goal) ใน Google Tag Manager (GTM) ต่อเข้ากับ Google Analytics 4 (GA4) และ Google Ads ได้ทันที

| ตำแหน่งที่ลูกค้ากด (Action / Component) | ชื่อ Event ที่ส่งเข้า GTM (`event_name`) | รายละเอียด |
| :--- | :--- | :--- |
| **ปุ่มลอยติดหน้าจอ (จองเลย)** | `click_line_floating` | ปุ่มสีเขียวมุมล่างขวาที่ตามไปทุกสัดส่วนของหน้าจอ |
| **แถบเมนูหลักบน Desktop (Book a Ritual)** | `click_book_ritual` | ปุ่มในแถบนำทางด้านบน (เฉพาะหน้าจอคอมพิวเตอร์) |
| **เมนูพับด้านข้างบน Mobile (Book a Ritual)** | `click_book_ritual_mobile` | ปุ่มในเมนู Hamburger (เฉพาะหน้าจอมือถือ) |
| **ปุ่มท้ายหน้าเว็บ (Enquire Now)** | `click_enquire_now` | ปุ่มในส่วนล่างสุดของหน้าเว็บไซต์ (Footer) |
| **ลิงก์เบอร์โทรศัพท์ (Contact)** | `click_tel` | การกดปุ่มเบอร์โทรศัพท์ในส่วน Contact |
| **ลิงก์ LINE (Contact)** | `click_line_contact` | การกดปุ่มแอดไลน์ในส่วน Contact (พร้อม UTM `contact_line`) |
