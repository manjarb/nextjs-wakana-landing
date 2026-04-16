# รายการ Tracking UTM สำหรับโอนย้ายลูกค้าไป LINE

`utm_source=website` จะถูกฝังไว้ในทุกลิงก์เพื่อระบุที่มาว่ามาจากเว็บไซต์หลัก ส่วนตัวแปรที่แยกตามจุดที่มีการส่งลูกค้าไปหน้า LINE จะมีรายละเอียดดังนี้:

| ตำแหน่งที่ลูกค้ากด (Action / Component) | ลิงก์ที่ใช้ (Base URL) | `utm_medium` | `utm_campaign` | จุดประสงค์ / สิ่งที่ใช้วัดผล |
| :--- | :--- | :--- | :--- | :--- |
| **ปุ่มลอยติดหน้าจอ (จองเลย)** | `https://lin.ee/SSGzTmt` | `floating_button` | `book_now` | การตัดสินใจจองด่วนรวดเร็ว (ทักได้ตลอดจากทุกส่วนของหน้าจอ) |
| **แถบเมนูหลักบน Desktop (Book a Ritual)** | `https://lin.ee/SSGzTmt` | `desktop_nav` | `book_ritual` | การหาช่องทางจองจากแถบเมนูนำทาง (พฤติกรรมผู้ใช้คอมพิวเตอร์) |
| **เมนูพับด้านข้างบน Mobile (Book a Ritual)**| `https://lin.ee/SSGzTmt` | `mobile_nav` | `book_ritual` | การจงใจกดเมนูออกเพื่อหาช่องทางการจอง (พฤติกรรมผู้ใช้มือถือ) |
| **ปุ่มท้ายหน้าเว็บ (Enquire Now)** | `https://lin.ee/SSGzTmt` | `footer` | `enquire_now` | ความสนใจหลังจากอ่านและศึกษาข้อมูลบนหน้าเว็บจนจบ |
| **หมวดหมู่ติดต่อ Contact (LINE)** | `https://line.me/ti/p/@wanaka.th` | `contact_section` | `contact_line` | ความตั้งใจค้นหาช่องทางติดต่อโดยเฉพาะเจาะจง |
