/* ==========================================================================
   config.js — كل بيانات المطعم في مكان واحد. عدّل هنا فقط (انظر README.md)
   المصدر: صورة المنيو الأصلية. الحقول الفارغة تظهر في الموقع بعبارة «قريباً».
   ========================================================================== */
const CONFIG = {
  demo: true,                    // true = نسخة معاينة (تظهر شارة "Demo" ويُمنع الأرشفة). اجعلها false عند الإطلاق.
  name: 'CHICKEN FOODS',
  siteUrl: '',                   // مثال: 'https://example.com' — يُفعّل Canonical وروابط og:url تلقائياً
  phone: '+212655-541592',        // ⚠ رقم مؤقت من النسخة القديمة (غير موجود في صورة المنيو)
  wa: '212655541592',            // رقم واتساب بصيغة دولية بدون + ولا مسافات
  address: '',                   // العنوان (نص حر) — فارغ = «قريباً»
  hours: '',                     // ساعات العمل، مثال: '12:00 – 23:00' — فارغ = «قريباً»
  delivery: '',                  // معلومات التوصيل، مثال: 'توصيل داخل المدينة' — فارغ = «قريباً»
  currencyKey: 'cur',            // المفتاح المستعمل في translations.js لرمز العملة
  social: {
    instagram: '',               // ضع الرابط الكامل هنا ليصبح الزر قابلاً للنقر
    facebook: ''
  },
  /* المنتجات: id يربط الصورة والترجمة. السعر بالدرهم. رتّبها كما في المنيو الأصلي. */
  items: [
    { id: 'strips',    price: 25, img: 'strips.jpg' },
    { id: 'cheese',    price: 25, img: 'cheese.jpg' },
    { id: 'croquette', price: 25, img: 'croquette.jpg' },
    { id: 'tacos',     price: 25, img: 'tacos.jpg' },
    { id: 'twister',   price: 20, img: 'twister.jpg' },
    { id: 'pieces',    price: 25, img: 'pieces.jpg' },
    { id: 'burger',    price: 25, img: 'burger.jpg' },
    { id: 'kids',      price: 25, img: 'kids.jpg' },
    { id: 'nuggets',   price: 20, img: 'nuggets.jpg' }
     
  ],
  images: {
    logo: 'logo.svg',       // الشعار الكامل (مع الكتابة) بخلفية شفافة — Header
    hero: 'hero.jpg',       // صورة الواجهة (نسبة 5:4)
    og: 'og-image.jpg'      // صورة المشاركة (1200×630)
  }
};
