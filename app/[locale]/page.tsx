import Image from 'next/image';
import { Link } from '@/i18n/routing';
import TrackedLink from '@/components/TrackedLink';
import SiteHeader from '@/components/SiteHeader';
import FAQAccordion from '@/components/FAQAccordion';
import GoogleReviews from '@/components/GoogleReviews';
import LocationMap from '@/components/LocationMap';
import { useTranslations } from 'next-intl';

// Navigation items are now defined inside the component for i18n


const serviceCategories = [
  {
    title: 'Relaxation Rituals',
    description:
      'A collection of facial, head, and body relaxation treatments designed to ease tension, restore balance, and bring your skin, body, and mind back to a calmer state.',
    image: '/images/v2/relaxation_head_spa_03.jpg',
    href: '/services/relaxation',
  },
  {
    title: 'Aesthetic Rituals',
    description:
      "Facial treatments and skin renewal programs designed to hydrate, refresh, and restore the skin's natural glow — from soothing facials to advanced skin injections.",
    image: '/images/v2/facial_treatment_01.jpg',
    href: '/services/aesthetic',
  },
  {
    title: 'IV Therapy',
    description:
      'Restorative IV wellness rituals designed to support hydration, replenish essential nutrients, and help restore your body\'s natural balance.',
    image: '/images/v2/drip_iv.jpg',
    href: '/services/iv-therapy',
  },
];

const multiSensoryJourney = [
  {
    text: 'Custom soundscapes tuned to each room — from flowing water to meditative tones.',
    icon: (
      <svg
        className="h-8 w-8 text-[#5b6d65]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M5 11a7 7 0 0 1 7-7v0a7 7 0 0 1 7 7v0a7 7 0 0 1-7 7v0a7 7 0 0 1-7-7Z" />
        <path d="M9 11a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3v0a3 3 0 0 1-3-3Z" />
        <path d="M12 15v4" />
      </svg>
    ),
  },
  {
    text: 'Aroma zoning with lavender, eucalyptus, or citrus to match the desired mood.',
    icon: (
      <svg
        className="h-8 w-8 text-[#5b6d65]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 20c2.2-1.4 4-3.2 4-5.5A4 4 0 0 0 12 10a4 4 0 0 0-4 4.5c0 2.3 1.8 4.1 4 5.5Z" />
        <path d="M12 4.5V6" />
        <path d="M9.5 5 9 6.5" />
        <path d="M14.5 5 15 6.5" />
      </svg>
    ),
  },
  {
    text: 'Adaptive warm-to-cool lighting that signals either deep relaxation or post-treatment refresh.',
    icon: (
      <svg
        className="h-8 w-8 text-[#5b6d65]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 4v4" />
        <path d="M6.3 6.3 8.5 8.5" />
        <path d="M4 12h3" />
        <path d="M19 12h-3" />
        <path d="M15.5 8.5 17.7 6.3" />
        <path d="M12 14a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
      </svg>
    ),
  },
];

const immersiveDetails = [
  {
    text: 'Mood Cards that guide welcome drinks and intention setting.',
    icon: (
      <svg
        className="h-8 w-8 text-[#5b6d65]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="4" y="5" width="8" height="14" rx="2" />
        <path d="m12 7 4-2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8" />
        <path d="M8 9h0" />
        <path d="M8 13h0" />
      </svg>
    ),
  },
  {
    text: 'Scent-matched bath bomb foot soaks as a grounding prelude.',
    icon: (
      <svg
        className="h-8 w-8 text-[#5b6d65]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M5 11h14" />
        <path d="M5 11a7 7 0 0 0 7 7v0a7 7 0 0 0 7-7" />
        <path d="M8 7h0" />
        <path d="M12 7h0" />
        <path d="M16 7h0" />
      </svg>
    ),
  },
  {
    text: 'A two-minute sound bath moment to ease into or out of treatments.',
    icon: (
      <svg
        className="h-8 w-8 text-[#5b6d65]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M5 18a7 7 0 0 1 0-12" />
        <path d="M19 18a7 7 0 0 0 0-12" />
        <path d="M9 16a3 3 0 0 1 0-8" />
        <path d="M15 16a3 3 0 0 0 0-8" />
      </svg>
    ),
  },
  {
    text: 'Thoughtful surprise gifts — from gemstone bracelets to wellness treats.',
    icon: (
      <svg
        className="h-8 w-8 text-[#5b6d65]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 8c1.1-2.5.2-4-1-4S8 4.5 8 6c0 1.6 1 3 4 5 3-2 4-3.4 4-5 0-1.5-1.2-2-3-2" />
        <path d="M5 10h14v10H5z" />
        <path d="M12 10v10" />
      </svg>
    ),
  },
  {
    text: 'A loyalty journey that rewards every visit with meaningful rituals.',
    icon: (
      <svg
        className="h-8 w-8 text-[#5b6d65]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M6 4h12l1 6-7 10-7-10z" />
        <path d="m7 8 5-2 5 2" />
      </svg>
    ),
  },
];

const galleryImages = [
  {
    src: '/images/v2/lobby.jpg',
    alt: 'Ambient view of the WANAKA lounge with curved seating',
    label: 'Lounge Glow',
  },
  {
    src: '/images/v2/family_living_room.jpg',
    alt: 'Calm corner featuring tea ritual and botanical accents',
    label: 'Calm Corners',
  },
  {
    src: '/images/v2/outside.jpg',
    alt: 'Perspective down the sanctuary wellness wing',
    label: 'Wellness Wing',
  },
];

const contactDetails = [
  {
    label: 'Email',
    value: 'wanakasanctuary@gmail.com',
    href: 'mailto:wanakasanctuary@gmail.com',
    icon: (
      <svg
        className="h-6 w-6 text-white/80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M4 6h16v12H4z" />
        <path d="m4 8 8 5 8-5" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '088 665 1936',
    href: 'tel:+66886651936',
    eventName: 'click_tel',
    icon: (
      <svg
        className="h-6 w-6 text-white/80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M6.6 4.6 9 4l1.3 3.5-1.5 1.1a10 10 0 0 0 4.6 4.6l1.1-1.5L18 15l-.6 2.4a2 2 0 0 1-2 1.6c-6.1 0-11-4.9-11-11a2 2 0 0 1 1.6-2Z" />
      </svg>
    ),
  },
  {
    label: 'Address',
    value: '99 65 Tambon Bang Kaeo, Bang Phli District, Samut Prakan 10540',
    icon: (
      <svg
        className="h-6 w-6 text-white/80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 21c-4-3.5-7-7.1-7-10.5a7 7 0 0 1 14 0c0 3.4-3 7-7 10.5Z" />
        <circle cx="12" cy="11" r="2.5" />
      </svg>
    ),
  },
  {
    label: 'LINE',
    value: '@wanaka.th',
    href: 'https://line.me/ti/p/@wanaka.th?utm_source=website&utm_medium=contact_section&utm_campaign=contact_line',
    eventName: 'click_line_contact',
    icon: (
      <svg
        className="h-6 w-6 text-white/80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M9 11h6M9 14h4" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    value: 'WANAKA Sanctuary',
    href: 'https://www.facebook.com/share/17jTr63L62/?mibextid=wwXIfr',
    icon: (
      <svg
        className="h-6 w-6 text-white/80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    value: '@wanakasanctuary',
    href: 'https://www.instagram.com/wanakasanctuary?igsh=MXhjMDUxaXBqNDVvbw==',
    icon: (
      <svg
        className="h-6 w-6 text-white/80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" />
      </svg>
    ),
  },
];

const faqItems = [
  {
    id: 1,
    questionTH: 'Wellness clinic คืออะไร?',
    questionEN: 'What is a wellness clinic?',
    answerTH: 'Wellness clinic คือสถานที่ดูแลสุขภาพแบบองค์รวม เน้นการพักผ่อน ฟื้นฟู และการดูแลอย่างต่อเนื่อง เพื่อให้ร่างกายและจิตใจกลับมาสมดุล เหมาะกับการดูแลในชีวิตประจำวัน ไม่เร่ง ไม่กดดัน สำหรับผู้ที่มองหาพื้นที่ดูแลสุขภาพในโซน บางนา ใกล้ Mega Bangna Wanaka Sanctuary ออกแบบการดูแลให้เข้ากับไลฟ์สไตล์และการกลับมาดูแลซ้ำ — สอบถามได้ทาง LINE @wanaka.th',
    answerEN: 'A wellness clinic focuses on holistic, ongoing care—supporting rest, recovery, and balance for everyday life. If you\'re seeking consistent wellness care near Bangna and Mega Bangna, Wanaka Sanctuary offers a calm, lifestyle-friendly approach. Add LINE @wanaka.th to learn more.',
  },
  {
    id: 2,
    questionTH: 'Wellness ต่างจากการรักษาโรคอย่างไร?',
    questionEN: 'How is wellness different from medical treatment?',
    answerTH: 'Wellness เน้นการดูแลเชิงป้องกันและความสมดุลในระยะยาว ไม่ใช่การรักษาเมื่อป่วย แต่เป็นการดูแลให้รู้สึกดีและแข็งแรงอย่างสม่ำเสมอ ที่ Wanaka Sanctuary โซนบางนา เราช่วยวางแผนการดูแลที่ทำได้จริงในชีวิตประจำวัน — แอดไลน์ @wanaka.th เพื่อเริ่มต้น',
    answerEN: 'Wellness focuses on prevention and long-term balance rather than treating illness after it occurs. At Wanaka Sanctuary near Bangna, we support sustainable care you can return to. Add LINE @wanaka.th.',
  },
  {
    id: 3,
    questionTH: 'นวดหน้าให้ผลลัพธ์เรื่องอะไรบ้าง?',
    questionEN: 'What benefits can facial massage provide?',
    answerTH: 'นวดหน้าช่วยคลายความตึงของกล้ามเนื้อใบหน้า กระตุ้นการไหลเวียน และช่วยให้ผิวดูสดใสขึ้นอย่างเป็นธรรมชาติ การทำต่อเนื่องช่วยคงสมดุลผิวและความผ่อนคลาย ที่ Wanaka Sanctuary ใกล้ Mega Bangna Facial Ritual ถูกออกแบบให้เหมาะกับการดูแลระยะยาว — ปรึกษาได้ที่ @wanaka.th',
    answerEN: 'Facial massage relaxes facial tension, supports circulation, and maintains a naturally refreshed look. At Wanaka Sanctuary near Mega Bangna, our Facial Rituals are designed for ongoing care. Add LINE @wanaka.th.',
  },
  {
    id: 4,
    questionTH: 'ควรนวดหน้าบ่อยแค่ไหน?',
    questionEN: 'How often should I get a facial massage?',
    answerTH: 'โดยทั่วไปหลายคนเลือกทำทุก 2–4 สัปดาห์ เพื่อรักษาสมดุลผิวและความผ่อนคลาย ความถี่ที่เหมาะสมขึ้นกับสภาพผิวและไลฟ์สไตล์ ทีม Wanaka Sanctuary บางนา สามารถช่วยประเมินและวางแผนให้เหมาะกับคุณ — แอดไลน์ @wanaka.th',
    answerEN: 'Many people benefit from sessions every 2–4 weeks, depending on skin condition and lifestyle. At Wanaka Sanctuary near Bangna, we help personalize your schedule. Add LINE @wanaka.th.',
  },
  {
    id: 5,
    questionTH: 'Head Spa ช่วยเรื่องอะไรบ้าง?',
    questionEN: 'What does a head spa help with?',
    answerTH: 'Head Spa ช่วยคลายความตึงเครียดบริเวณศีรษะ คอ และไหล่ ช่วยให้รู้สึกผ่อนคลายและพักผ่อนได้ดีขึ้น เหมาะกับผู้ที่ทำงานหน้าจอหรือมีความเครียดสะสม ที่ Wanaka Sanctuary ใกล้ Mega Bangna เราเน้นจังหวะการดูแลที่ช้าและสบาย — สอบถามคอร์สได้ที่ @wanaka.th',
    answerEN: 'Head spa eases tension in the scalp, neck, and shoulders, supporting better relaxation and rest. At Wanaka Sanctuary near Mega Bangna, the focus is calm and comfort. Add LINE @wanaka.th.',
  },
  {
    id: 6,
    questionTH: 'ควรทำ Head Spa ต่อเนื่องหรือไม่?',
    questionEN: 'Is regular head spa recommended?',
    answerTH: 'การทำ Head Spa อย่างต่อเนื่องช่วยให้ร่างกายปรับตัวกับการพักผ่อนที่มีคุณภาพมากขึ้น หลายคนเลือกทำเดือนละ 1–2 ครั้งเพื่อดูแลตัวเอง ที่ Wanaka Sanctuary โซนบางนา เราออกแบบแพ็กเกจให้เหมาะกับการกลับมาทำซ้ำ — แอดไลน์ @wanaka.th',
    answerEN: 'Regular head spa sessions help build a healthier rest routine. Many choose monthly visits. At Wanaka Sanctuary near Bangna, care is designed for continuity. Add LINE @wanaka.th.',
  },
  {
    id: 7,
    questionTH: 'IV Drip คืออะไร?',
    questionEN: 'What is IV drip therapy?',
    answerTH: 'IV Drip เป็นการดูแลเชิงสนับสนุนด้วยสารน้ำหรือวิตามินบางชนิด เพื่อช่วยเรื่องความสดชื่นและการฟื้นตัว โดยควรมีการประเมินความเหมาะสมก่อนทุกครั้ง ที่ Wanaka Sanctuary ใกล้ Mega Bangna เราเน้นการให้ข้อมูลและการดูแลอย่างพอดี — สอบถามได้ที่ @wanaka.th',
    answerEN: 'IV drip therapy supports hydration and recovery with proper assessment beforehand. At Wanaka Sanctuary near Mega Bangna, care is thoughtful and balanced. Add LINE @wanaka.th.',
  },
  {
    id: 8,
    questionTH: 'IV Drip เหมาะกับการดูแลระยะยาวไหม?',
    questionEN: 'Is IV drip suitable for long-term care?',
    answerTH: 'หลายคนเลือก IV Drip เป็นส่วนหนึ่งของการดูแลสุขภาพในช่วงที่ร่างกายอ่อนล้า การดูแลแบบพอดีและต่อเนื่องช่วยให้เห็นผลสม่ำเสมอ หากคุณอยู่โซนบางนา ทีม Wanaka Sanctuary พร้อมช่วยวางแผน — แอดไลน์ @wanaka.th',
    answerEN: 'When used appropriately, IV drips can be part of a consistent wellness routine. At Wanaka Sanctuary near Bangna, we help plan safely. Add LINE @wanaka.th.',
  },
  {
    id: 9,
    questionTH: 'Skin Booster ช่วยเรื่องผิวอย่างไร?',
    questionEN: 'How does a skin booster support skin health?',
    answerTH: 'Skin Booster ช่วยสนับสนุนความชุ่มชื้นและคุณภาพผิว เหมาะกับการดูแลผิวแบบค่อยเป็นค่อยไป การทำต่อเนื่องช่วยให้ผิวดูสุขภาพดีขึ้น ที่ Wanaka Sanctuary ใกล้ Mega Bangna เราเน้นผลลัพธ์ที่ดูเป็นธรรมชาติ — แอดไลน์ @wanaka.th',
    answerEN: 'Skin boosters support hydration and overall skin quality with gradual improvement. At Wanaka Sanctuary near Mega Bangna, results remain natural. Add LINE @wanaka.th.',
  },
  // {
  //   id: 10,
  //   questionTH: 'Botox ควรดูแลต่อเนื่องหรือไม่?',
  //   questionEN: 'Is ongoing Botox care recommended?',
  //   answerTH: 'Botox มักให้ผลลัพธ์ชั่วคราว การติดตามผลและดูแลอย่างต่อเนื่องช่วยให้ผลลัพธ์ดูสม่ำเสมอและเป็นธรรมชาติ ที่ Wanaka Sanctuary โซนบางนา เราเน้นการติดตามผลและความพอดี — สอบถามแนวทางได้ที่ @wanaka.th',
  //   answerEN: 'Botox results are temporary; follow-up and continuity help maintain balanced outcomes. At Wanaka Sanctuary near Bangna, care focuses on natural balance. Add LINE @wanaka.th.',
  // },
  {
    id: 11,
    questionTH: 'ควรเริ่มดูแลสุขภาพและผิวจากอะไรดี?',
    questionEN: 'How should I start a wellness and skin care routine?',
    answerTH: 'เริ่มจากเป้าหมายของคุณ เช่น การพักผ่อน (Head Spa), ดูแลผิว (Facial / Skin Booster), หรือฟื้นฟูความอ่อนล้า (IV Drip) แล้วทำอย่างต่อเนื่องในจังหวะที่เหมาะ Wanaka Sanctuary ใกล้ Mega Bangna ช่วยวางแผนให้ดูแลได้จริง — แอดไลน์ @wanaka.th',
    answerEN: 'Start with your goal—rest, skin maintenance, or recovery—and continue at a sustainable pace. Wanaka Sanctuary near Mega Bangna helps you plan long-term care. Add LINE @wanaka.th.',
  },
  {
    id: 12,
    questionTH: 'การดูแลสุขภาพแบบ Wellness เหมาะกับคนทำงานยุคนี้อย่างไร?',
    questionEN: 'How does wellness care fit into a modern working lifestyle?',
    answerTH: 'คนทำงานยุคนี้มักเผชิญความเครียดสะสม พักผ่อนไม่พอ และใช้ร่างกายเกินสมดุล Wellness จึงช่วยเติม "ช่วงพักที่มีคุณภาพ" ผ่านการดูแลอย่างต่อเนื่อง ไม่เร่ง ไม่ฝืน สำหรับคนทำงานในโซน บางนา ใกล้ Mega Bangna Wanaka Sanctuary ออกแบบบริการให้เข้ากับเวลาจำกัดและการกลับมาดูแลซ้ำ — แอดไลน์ @wanaka.th เพื่อวางแผนที่เหมาะกับชีวิตประจำวัน',
    answerEN: 'Modern work often leads to accumulated stress and insufficient rest. Wellness care provides intentional, high-quality recovery through consistent routines. Near Bangna and Mega Bangna, Wanaka Sanctuary supports busy lifestyles — add LINE @wanaka.th to plan yours.',
  },
  {
    id: 13,
    questionTH: 'ถ้าพักผ่อนไม่พอ ควรเริ่มดูแลตัวเองจากอะไร?',
    questionEN: 'Where should I start if I\'m not getting enough rest?',
    answerTH: 'การเริ่มจากการผ่อนคลายระบบประสาท เช่น Head Spa หรือ Facial Ritual ช่วยให้ร่างกายค่อยๆ ปรับเข้าสู่การพักผ่อนที่มีคุณภาพ ก่อนเสริมการดูแลด้านอื่น ที่ Wanaka Sanctuary ใกล้ Mega Bangna เราช่วยแนะนำจุดเริ่มต้นที่ไม่หนักและทำได้ต่อเนื่อง — แอดไลน์ @wanaka.th',
    answerEN: 'Starting with nervous-system relaxation—such as head spa or gentle facial rituals—helps the body relearn quality rest. At Wanaka Sanctuary near Mega Bangna, we guide you step by step. Add LINE @wanaka.th.',
  },
  {
    id: 14,
    questionTH: 'การดูแลสุขภาพแบบต่อเนื่องสำคัญกว่าการทำครั้งเดียวอย่างไร?',
    questionEN: 'Why is consistent wellness care more effective than one-time treatments?',
    answerTH: 'การดูแลต่อเนื่องช่วยให้ร่างกายและผิวปรับตัว เกิดสมดุล และรักษาผลลัพธ์ได้ยาวนานกว่าการทำครั้งเดียวแล้วหยุด ที่ Wanaka Sanctuary โซนบางนา เราออกแบบโปรแกรมให้เหมาะกับการกลับมาดูแลอย่างสม่ำเสมอ — สอบถามได้ทาง @wanaka.th',
    answerEN: 'Consistency allows the body and skin to adapt and maintain balance, delivering more sustainable results than one-off sessions. At Wanaka Sanctuary near Bangna, continuity is part of the care. Add LINE @wanaka.th.',
  },
  {
    id: 15,
    questionTH: 'ถ้าไม่เคยทำ IV Drip มาก่อน ควรรู้อะไรบ้าง?',
    questionEN: 'What should I know before trying IV drip for the first time?',
    answerTH: 'ควรเริ่มจากการประเมินความเหมาะสม แจ้งประวัติสุขภาพ และเลือกการดูแลที่พอดีกับร่างกาย การเริ่มอย่างค่อยเป็นค่อยไปช่วยให้สบายใจและปลอดภัย ที่ Wanaka Sanctuary ใกล้ Mega Bangna ทีมงานให้ข้อมูลครบก่อนตัดสินใจ — แอดไลน์ @wanaka.th เพื่อสอบถาม',
    answerEN: 'Start with an assessment, share your health history, and choose an appropriate approach. Beginning gradually supports comfort and safety. At Wanaka Sanctuary near Mega Bangna, we provide clear guidance. Add LINE @wanaka.th.',
  },
  {
    id: 16,
    questionTH: 'การดูแลผิวแบบ Wellness ต่างจากการดูแลผิวทั่วไปอย่างไร?',
    questionEN: 'How is wellness-based skin care different from regular skin treatments?',
    answerTH: 'Wellness skin care เน้นความสมดุล ความสบาย และการดูแลอย่างต่อเนื่อง ไม่เร่งผลลัพธ์ แต่ช่วยให้ผิวค่อยๆ แข็งแรงและดูสุขภาพดี ที่ Wanaka Sanctuary โซนบางนา เราผสาน Facial, Skin Booster และการพักผ่อนเข้าด้วยกัน — แอดไลน์ @wanaka.th',
    answerEN: 'Wellness skin care emphasizes balance, comfort, and gradual improvement rather than quick fixes. At Wanaka Sanctuary near Bangna, care blends skin treatments with relaxation. Add LINE @wanaka.th.',
  },
  {
    id: 17,
    questionTH: 'Skin Booster เหมาะกับการดูแลผิวในชีวิตประจำวันหรือไม่?',
    questionEN: 'Are skin boosters suitable for everyday skin maintenance?',
    answerTH: 'Skin Booster มักถูกเลือกเป็นส่วนหนึ่งของการดูแลผิวระยะยาว เพื่อช่วยสนับสนุนความชุ่มชื้นและคุณภาพผิวอย่างสม่ำเสมอ ที่ Wanaka Sanctuary ใกล้ Mega Bangna เราช่วยวางแผนความถี่ให้เหมาะกับการใช้ชีวิตจริง — แอดไลน์ @wanaka.th',
    answerEN: 'Skin boosters can be part of a long-term routine to support hydration and skin quality. At Wanaka Sanctuary near Mega Bangna, frequency is planned around real life. Add LINE @wanaka.th.',
  },
  // {
  //   id: 18,
  //   questionTH: 'Botox สามารถทำร่วมกับการดูแลแบบ Wellness ได้ไหม?',
  //   questionEN: 'Can Botox be combined with a wellness routine?',
  //   answerTH: 'หลายคนเลือกผสาน Botox เข้ากับการดูแลแบบ Wellness เช่น Facial หรือ Head Spa เพื่อให้การดูแลผิวและการพักผ่อนเป็นไปอย่างสมดุล ที่ Wanaka Sanctuary โซนบางนา เราช่วยจัดลำดับการดูแลให้เหมาะและไม่เร่ง — แอดไลน์ @wanaka.th',
  //   answerEN: 'Many choose to combine Botox with wellness care such as Facial or Head Spa for balanced skin and relaxation. At Wanaka Sanctuary near Bangna, we sequence care thoughtfully. Add LINE @wanaka.th.',
  // },
];

export default function HomePage() {
  const tReviews = useTranslations('reviews');
  const tServices = useTranslations('services');
  const tHero = useTranslations('hero');
  const tPillars = useTranslations('ritualPillars');
  const tAbout = useTranslations('about');

  return (
    <div className="bg-[#f7f2e8] text-[#2f3a36]">
      <SiteHeader />

      <main>
        <section
          id="hero"
          className="relative isolate overflow-hidden"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/generated/hero-bg.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#1d1f1c]/80 via-[#1d1f1c]/55 to-[#4a3c31]/20" />
          </div>
          <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 text-white lg:py-32">
            <div className="max-w-2xl space-y-8">
              <span className="inline-flex w-fit items-center rounded-full bg-white/85 px-4 py-1 text-xs font-medium uppercase tracking-[0.3em] text-[#4b5853]">
                Everyday Sanctuary
              </span>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                Small Rituals. Big Rest.
              </h1>
              <div id="hero-paragraph" className="flex flex-col gap-4">
                <p className="text-lg leading-relaxed text-white/85">{tHero('paragraph1')}</p>
                <p className="text-lg leading-relaxed text-white/85">{tHero('paragraph2')}</p>
                <p className="text-lg leading-relaxed text-white/85">{tHero('paragraph3')}</p>
                <p className="text-lg leading-relaxed text-white/85">{tHero('paragraph4')}</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#services"
                  className="rounded-full bg-[#f7f2e8]/95 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#2f3a36] transition hover:bg-white"
                >
                  Explore Services
                </Link>
                <Link
                  href="#about"
                  className="rounded-full border border-white/70 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-white"
                >
                  {tHero('discoverCta')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="second-section" className="border-t border-[#d6c8b2]/50 bg-white/60">
          <div className="mx-auto grid max-w-5xl gap-6 px-6 py-12 sm:grid-cols-3">
            {([
              {
                key: 'soul',
                icon: (
                  <svg className="h-10 w-10 text-[#5b6d65]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M4 9c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0" />
                    <path d="M4 14c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0" />
                  </svg>
                ),
              },
              {
                key: 'body',
                icon: (
                  <svg className="h-10 w-10 text-[#5b6d65]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M12 3v4M8 5l2 2M16 5l-2 2" />
                    <path d="M9 9h6l1 6H8l1-6Z" />
                    <path d="M10 15v4M14 15v4" />
                  </svg>
                ),
              },
              {
                key: 'skin',
                icon: (
                  <svg className="h-10 w-10 text-[#5b6d65]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M12 4c-4 0-7 3.4-7 7.6 0 6.1 4.2 8.4 7 9.9 2.8-1.5 7-3.8 7-9.9C19 7.4 16 4 12 4Z" />
                    <path d="M9 12c1.2.8 2.4 1 3.8.6 1.4-.4 2.4-1.2 3.2-2.6" />
                  </svg>
                ),
              },
            ] as const).map(({ key, icon }) => (
              <div
                key={key}
                className="group rounded-3xl border border-[#d6c8b2]/60 bg-white/80 p-6 shadow-sm shadow-[#d6c8b2]/20 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-[#d6c8b2]/40"
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-[#f7f2e8] p-3 text-[#5b6d65]">
                  {icon}
                </div>
                <h3 className="text-lg font-semibold text-[#2f3a36]">
                  {tPillars(`${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52635d]">
                  {tPillars(`${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="about"
          className="mx-auto max-w-6xl px-6 py-24 lg:py-28"
        >
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6f7b7a]">
                {tAbout('eyebrow')}
              </p>
              <h2 className="text-3xl font-semibold leading-tight text-[#2f3a36] sm:text-4xl">
                {tAbout('title')}
              </h2>
              <div className="flex flex-col gap-4">
                <p className="text-lg leading-relaxed text-[#44544d]">{tAbout('paragraph1')}</p>
                <p className="text-lg leading-relaxed text-[#44544d]">{tAbout('paragraph2')}</p>
                <p className="text-lg leading-relaxed text-[#44544d]">{tAbout('paragraph3')}</p>
                <p className="text-lg leading-relaxed text-[#44544d]">{tAbout('paragraph4')}</p>
              </div>
              <div className="pt-2">
                <p className="font-semibold text-[#2f3a36]">{tAbout('signatureName')}</p>
                <p className="text-sm italic text-[#6f7b7a]">{tAbout('signatureTagline')}</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 rounded-[32px] bg-[#d6c8b2]/40 blur-3xl" />
              <div className="relative h-80 rounded-[32px] bg-white/80 shadow-xl shadow-[#d6c8b2]/30 md:h-[26rem]">
                <div className="relative h-full w-full overflow-hidden rounded-[32px] border border-white/60">
                  <Image
                    src="/images/v2/lobby_5.jpg"
                    alt="Serene treatment suite inside WANAKA Sanctuary"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 460px, 85vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="services"
          className="mx-auto max-w-6xl px-6 py-24 lg:py-28"
        >
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6f7b7a]">
                Services
              </p>
              <h2 className="text-3xl font-semibold leading-tight text-[#2f3a36] sm:text-4xl">
                Rituals designed to ease tension, restore balance, and bring calm.
              </h2>
            </div>
            <Link
              href="/services"
              className="shrink-0 rounded-full border border-[#5b6d65] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#5b6d65] transition hover:bg-[#5b6d65] hover:text-white"
            >
              {tServices('viewFullMenu')}
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="group flex flex-col rounded-3xl border border-[#d6c8b2]/70 bg-white/80 shadow-md shadow-[#d6c8b2]/20 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#d6c8b2]/40 overflow-hidden"
              >
                <div className="relative h-52 shrink-0 bg-[#f7f2e8]">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(min-width: 1024px) 360px, 90vw"
                  />
                </div>
                <div className="flex flex-col gap-3 p-6">
                  <h3 className="text-lg font-semibold text-[#2f3a36]">{cat.title}</h3>
                  <p className="text-sm leading-relaxed text-[#52635d]">{cat.description}</p>
                  <span className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#5b6d65] transition group-hover:text-[#2f3a36]">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section
          id="experience"
          className="border-t border-[#d6c8b2]/50 bg-[#f7f2e8]/90"
        >
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6f7b7a]">
                  Experience Design
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#2f3a36] sm:text-4xl">
                  A multi-sensory journey that lingers long after you leave.
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-[#44544d]">
                  Every touchpoint is curated to honor your senses. Wanaka flows like the gentle
                  rhythm of waves: arrive softly, move through guided rituals, and depart feeling
                  balanced, cherished, and renewed.
                </p>
              </div>
              <div className="space-y-10">
                <div className="relative h-56 overflow-hidden rounded-[32px] border border-white/60 bg-white/70 shadow-lg shadow-[#d6c8b2]/30 sm:h-64">
                  <Image
                    src="/images/v2/lobby_3.jpg"
                    alt="Sensory lighting journey inside WANAKA Sanctuary"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 420px, 90vw"
                  />
                </div>
                <div className="rounded-3xl border border-[#d6c8b2]/70 bg-white/80 p-6 shadow-md shadow-[#d6c8b2]/20">
                  <h3 className="text-lg font-semibold text-[#2f3a36]">
                    Multi-sensory Notes
                  </h3>
                  <ul className="mt-4 space-y-4 text-sm leading-relaxed text-[#52635d]">
                    {multiSensoryJourney.map((item) => (
                      <li key={item.text} className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#f7f2e8] text-[#5b6d65]">
                          {item.icon}
                        </div>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl border border-[#d6c8b2]/70 bg-white/80 p-6 shadow-md shadow-[#d6c8b2]/20">
                  <h3 className="text-lg font-semibold text-[#2f3a36]">
                    Immersive Details
                  </h3>
                  <ul className="mt-4 space-y-4 text-sm leading-relaxed text-[#52635d]">
                    {immersiveDetails.map((detail) => (
                      <li key={detail.text} className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#f7f2e8] text-[#5b6d65]">
                          {detail.icon}
                        </div>
                        <span>{detail.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-24 lg:py-28">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6f7b7a]">
                Sanctuary Preview
              </p>
              <h2 className="text-3xl font-semibold leading-tight text-[#2f3a36] sm:text-4xl">
                A glimpse into the rituals we are crafting for you.
              </h2>
            </div>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image) => (
              <div
                key={image.src}
                className="group relative h-80 overflow-hidden rounded-[32px] border border-white/50 bg-white/60 shadow-lg shadow-[#d6c8b2]/30 sm:h-96"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 340px, 90vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2f3a36]/50 via-transparent to-transparent opacity-80 transition group-hover:opacity-90" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-lg font-semibold">{image.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="reviews" className="mx-auto max-w-6xl px-6 py-24 lg:py-28">
          <div className="mb-12 text-center sm:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6f7b7a]">
              {tReviews('heading')}
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#2f3a36] sm:text-4xl">
              {tReviews('title')}
            </h2>
          </div>
          <GoogleReviews />
        </section>

        <section
          id="faq"
          className="border-t border-[#d6c8b2]/50 bg-[#e3d8c7]/60"
        >
          <div className="mx-auto max-w-4xl px-6 py-24 lg:py-28">
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6f7b7a]">
                Frequently Asked Questions
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#2f3a36] sm:text-4xl">
                Everything you need to know
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#44544d]">
                Find answers to common questions about our wellness services, rituals, and how we can
                support your journey to balance and calm.
              </p>
            </div>
            <FAQAccordion items={faqItems} />
            <div className="mt-12 text-center">
              <p className="text-sm text-[#52635d]">
                Still have questions?{' '}
                <Link
                  href="#contact"
                  className="font-semibold text-[#5b6d65] underline underline-offset-4 transition hover:text-[#2f3a36]"
                >
                  Contact us
                </Link>
              </p>
            </div>
          </div>
        </section>

        <section id="location" className="bg-[#fcfaf7]">
          <LocationMap />
        </section>

        <section
          id="contact"
          className="relative overflow-hidden border-t border-[#d6c8b2]/50 bg-gradient-to-br from-[#5b6d65] via-[#44544d] to-[#2f3a36] text-white"
        >
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/15 to-transparent mix-blend-screen" />
          <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-10 px-6 py-24 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
                Book Your Moment
              </p>
              <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
                Ready for the calm between drop-off and pick-up?
              </h2>
              <p className="text-base leading-relaxed text-white/80">
                Share your preferred ritual, schedule, or special requests. Our concierge team will
                curate the ideal experience — from express resets to immersive family retreats.
              </p>
            </div>
            <div className="w-full max-w-md rounded-3xl bg-white/10 p-8 backdrop-blur">
              <div className="space-y-4 text-sm text-white/80">
                {contactDetails.map((detail) => (
                  <div key={detail.label} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
                      {detail.icon}
                    </div>
                    {detail.href ? (
                      <TrackedLink
                        href={detail.href}
                        className="text-white/80 transition hover:text-white hover:underline"
                        eventName={detail.eventName}
                      >
                        <span className="font-semibold text-white">{detail.label}:</span>{' '}
                        {detail.value}
                      </TrackedLink>
                    ) : (
                      <p>
                        <span className="font-semibold text-white">{detail.label}:</span>{' '}
                        {detail.value}
                      </p>
                    )}
                  </div>
                ))}
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  Membership Preview Available on Request
                </p>
              </div>
              <TrackedLink
                href="https://lin.ee/SSGzTmt?utm_source=website&utm_medium=footer&utm_campaign=enquire_now"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#2f3a36] transition hover:bg-[#f7f2e8]"
                eventName="click_enquire_now"
              >
                Enquire Now
              </TrackedLink>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#2f3a36] py-10 text-sm text-white/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Wanaka Sanctuary. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="#about" className="transition hover:text-white">
              About
            </Link>
            <Link href="#services" className="transition hover:text-white">
              Services
            </Link>
            <Link href="#experience" className="transition hover:text-white">
              Experience
            </Link>
            <Link href="#faq" className="transition hover:text-white">
              FAQ
            </Link>
            <Link href="#location" className="transition hover:text-white">
              Location
            </Link>
            <Link href="#contact" className="transition hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Trigger deploy 01
