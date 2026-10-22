/* ==========================================================================
   translations.js — الترجمات (ar / fr / en). أسماء الوجبات في items بنفس id في config.js
   أي مفتاح ناقص يرجع تلقائياً إلى العربية ثم يظهر المفتاح نفسه (انظر app.js).
   ========================================================================== */
const T = {
ar: {
  label: 'العربية', title: 'CHICKEN FOODS | دجاج مقرمش، برغر وساندويتشات',
  desc: 'منيو CHICKEN FOODS: شرائح دجاج، برجر، ساندويتشات، تويستر ووجبات الأطفال بأسعار واضحة. اطلب مباشرة عبر واتساب.',
  skip: 'انتقل إلى المحتوى', lang: 'اللغة', menuBtn: 'فتح القائمة', closeMenu: 'إغلاق القائمة', mainNav: 'التنقل الرئيسي', footNav: 'روابط الموقع',
  nav: { home: 'الرئيسية', menu: 'المنيو', contact: 'تواصل معنا' }, orderNow: 'اطلب الآن', cur: 'DH',
  hero: { h1: 'القرمشة اللي كتستاهلها!', sub: 'دجاج مقرمش، برغر وساندويتشات بأسعار واضحة. اختر وجبتك وأرسل طلبك عبر واتساب.', see: 'اكتشف المنيو', wa: 'اطلب عبر واتساب' },
  menu: { title: 'المنيو', sub: 'تسع وجبات، وكل واحدة بسعرها الواضح.' },
  add: 'أضف للطلب', inc: 'زيادة الكمية', dec: 'إنقاص الكمية', remove: 'حذف', qty: 'الكمية', unavailable: 'غير متوفر', imgMissing: 'الصورة غير متوفرة',
  about: { kicker: 'من نحن', title: 'دجاج مقرمش بنكهة قوية.', text: 'في CHICKEN FOODS نركز على ما يهم فعلاً: دجاج مقرمش يُقدَّم في وجبات متنوعة تناسب كل الأذواق.',
    pts: [['دجاج مقرمش', 'شرائح، قطع، برجر وطاكوس.'], ['تنوع الوجبات', 'ساندويتشات، تويستر وبرجر لكل مزاج.'], ['وجبات الأطفال', 'وجبتان مخصصتان للصغار.']] },
  contact: { title: 'تواصل معنا', sub: 'اطلب وجبتك أو اسأل عن أي شيء.', phone: 'الهاتف', whatsapp: 'واتساب', address: 'العنوان', hours: 'ساعات العمل', delivery: 'التوصيل', soon: 'قريباً', call: 'اتصل بنا', chat: 'تواصل عبر واتساب', noWa: 'رقم واتساب غير مُعد بعد.' },
  social: { instagram: 'إنستغرام', facebook: 'فيسبوك', whatsapp: 'واتساب', soon: 'قريباً' },
  footer: { desc: 'دجاج مقرمش، برغر وساندويتشات.', rights: 'جميع الحقوق محفوظة.', demo: 'نسخة تجريبية للمعاينة' }, demoTag: 'نسخة تجريبية',
  cart: { title: 'طلبك', open: 'عرض الطلب', close: 'إغلاق', empty: 'طلبك فارغ.', emptyHint: 'أضف وجبة من المنيو لتبدأ.', items: n => n === 1 ? 'وجبة واحدة' : n === 2 ? 'وجبتان' : n + ' وجبات',
    total: 'المجموع', note: 'ملاحظات أو عنوان التوصيل (اختياري)', send: 'أرسل الطلب عبر واتساب', backMenu: 'تصفح المنيو', storageOff: 'تعذّر حفظ الطلب على هذا الجهاز؛ سيبقى مؤقتاً حتى إغلاق الصفحة.',
    msgHead: 'مرحباً CHICKEN FOODS، أريد طلب:', msgTotal: 'المجموع', msgNote: 'ملاحظات', msgGeneral: 'مرحباً CHICKEN FOODS، أريد الاستفسار عن المنيو.' },
  items: { strips: 'شرائح الدجاج', cheese: 'ساندويش فورماج', croquette: 'برجر كروكيت', tacos: 'طاكوس دجاج مقرمش', twister: 'تويستر الدجاج', pieces: '3 قطع دجاج', burger: 'برجر دجاج مقرمش', kids: 'وجبة الأطفال', nuggets: 'وجبة الأطفال ناجتس' }
},
fr: {
  label: 'Français', title: 'CHICKEN FOODS | Poulet croustillant, burgers et sandwichs',
  desc: 'Le menu CHICKEN FOODS : lamelles de poulet, burgers, sandwichs, twister et menus enfants à prix affichés. Commandez directement sur WhatsApp.',
  skip: 'Aller au contenu', lang: 'Langue', menuBtn: 'Ouvrir le menu', closeMenu: 'Fermer le menu', mainNav: 'Navigation principale', footNav: 'Liens du site',
  nav: { home: 'Accueil', menu: 'Menu', contact: 'Contact' }, orderNow: 'Commander', cur: 'DH',
  hero: { h1: 'Le croustillant que vous méritez !', sub: 'Poulet croustillant, burgers et sandwichs à prix clairs. Choisissez votre plat et envoyez la commande sur WhatsApp.', see: 'Voir le menu', wa: 'Commander sur WhatsApp' },
  menu: { title: 'Menu', sub: 'Neuf plats, chacun à son prix affiché.' },
  add: 'Ajouter', inc: 'Augmenter la quantité', dec: 'Diminuer la quantité', remove: 'Supprimer', qty: 'Quantité', unavailable: 'Indisponible', imgMissing: 'Image indisponible',
  about: { kicker: 'À propos', title: 'Du poulet croustillant bien relevé.', text: 'Chez CHICKEN FOODS, on se concentre sur l’essentiel : du poulet croustillant, servi dans des plats variés pour tous les goûts.',
    pts: [['Poulet croustillant', 'Lamelles, morceaux, burgers et tacos.'], ['Des plats variés', 'Sandwichs, twister et burgers pour chaque envie.'], ['Menus enfants', 'Deux menus pensés pour les petits.']] },
  contact: { title: 'Contact', sub: 'Commandez ou posez-nous vos questions.', phone: 'Téléphone', whatsapp: 'WhatsApp', address: 'Adresse', hours: 'Horaires', delivery: 'Livraison', soon: 'Bientôt', call: 'Appelez-nous', chat: 'Écrire sur WhatsApp', noWa: 'Numéro WhatsApp non configuré.' },
  social: { instagram: 'Instagram', facebook: 'Facebook', whatsapp: 'WhatsApp', soon: 'bientôt' },
  footer: { desc: 'Poulet croustillant, burgers et sandwichs.', rights: 'Tous droits réservés.', demo: 'Version de démonstration' }, demoTag: 'Démo',
  cart: { title: 'Votre commande', open: 'Ma commande', close: 'Fermer', empty: 'Votre commande est vide.', emptyHint: 'Ajoutez un plat du menu pour commencer.', items: n => n + (n === 1 ? ' plat' : ' plats'),
    total: 'Total', note: 'Remarques ou adresse de livraison (facultatif)', send: 'Envoyer la commande sur WhatsApp', backMenu: 'Voir le menu', storageOff: 'Impossible d’enregistrer la commande sur cet appareil ; elle reste temporaire jusqu’à la fermeture de la page.',
    msgHead: 'Bonjour CHICKEN FOODS, je souhaite commander :', msgTotal: 'Total', msgNote: 'Remarques', msgGeneral: 'Bonjour CHICKEN FOODS, je souhaite des informations sur le menu.' },
  items: { strips: 'Lamelles de poulet', cheese: 'Sandwich fromage', croquette: 'Burger croquette', tacos: 'Tacos poulet croustillant', twister: 'Twister poulet', pieces: '3 morceaux de poulet', burger: 'Burger poulet croustillant', kids: 'Menu enfant', nuggets: 'Menu enfant nuggets' }
},
en: {
  label: 'English', title: 'CHICKEN FOODS | Crispy chicken, burgers and sandwiches',
  desc: 'The CHICKEN FOODS menu: chicken strips, burgers, sandwiches, twister and kids’ meals with clear prices. Order directly on WhatsApp.',
  skip: 'Skip to content', lang: 'Language', menuBtn: 'Open menu', closeMenu: 'Close menu', mainNav: 'Main navigation', footNav: 'Site links',
  nav: { home: 'Home', menu: 'Menu', contact: 'Contact' }, orderNow: 'Order now', cur: 'MAD',
  hero: { h1: 'The crunch you deserve!', sub: 'Crispy chicken, burgers and sandwiches at clear prices. Pick your meal and send your order on WhatsApp.', see: 'See the menu', wa: 'Order on WhatsApp' },
  menu: { title: 'Menu', sub: 'Nine dishes, each with a clear price.' },
  add: 'Add to order', inc: 'Increase quantity', dec: 'Decrease quantity', remove: 'Remove', qty: 'Quantity', unavailable: 'Unavailable', imgMissing: 'Image unavailable',
  about: { kicker: 'About us', title: 'Crispy chicken with bold flavor.', text: 'At CHICKEN FOODS we focus on what matters: crispy chicken, served in a varied menu for every taste.',
    pts: [['Crispy chicken', 'Strips, pieces, burgers and tacos.'], ['A varied menu', 'Sandwiches, twisters and burgers for every craving.'], ['Kids’ meals', 'Two meals made for little ones.']] },
  contact: { title: 'Contact', sub: 'Place an order or ask us anything.', phone: 'Phone', whatsapp: 'WhatsApp', address: 'Address', hours: 'Opening hours', delivery: 'Delivery', soon: 'Coming soon', call: 'Call us', chat: 'Chat on WhatsApp', noWa: 'WhatsApp number not configured yet.' },
  social: { instagram: 'Instagram', facebook: 'Facebook', whatsapp: 'WhatsApp', soon: 'coming soon' },
  footer: { desc: 'Crispy chicken, burgers and sandwiches.', rights: 'All rights reserved.', demo: 'Preview demo version' }, demoTag: 'Demo',
  cart: { title: 'Your order', open: 'View order', close: 'Close', empty: 'Your order is empty.', emptyHint: 'Add a dish from the menu to start.', items: n => n + (n === 1 ? ' item' : ' items'),
    total: 'Total', note: 'Notes or delivery address (optional)', send: 'Send order on WhatsApp', backMenu: 'Browse the menu', storageOff: 'Could not save your order on this device; it will last until you close the page.',
    msgHead: 'Hello CHICKEN FOODS, I’d like to order:', msgTotal: 'Total', msgNote: 'Notes', msgGeneral: 'Hello CHICKEN FOODS, I’d like to ask about the menu.' },
  items: { strips: 'Chicken strips', cheese: 'Cheese sandwich', croquette: 'Croquette burger', tacos: 'Crispy chicken tacos', twister: 'Chicken twister', pieces: '3 chicken pieces', burger: 'Crispy chicken burger', kids: 'Kids’ meal', nuggets: 'Kids’ nuggets meal' }
}};
