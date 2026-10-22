/* ==========================================================================
   app.js — واجهة الموقع (React بدون Build). لا تحتاج تعديله لتخصيص المطعم: استعمل config.js و translations.js
   الأقسام: 1) أدوات  2) أيقونات  3) مكونات  4) التطبيق
   ========================================================================== */
const { useState, useEffect, useRef, useReducer, useCallback } = React;
const h = React.createElement;

/* ---------- 1) أدوات ---------- */
const LANGS = ['ar', 'fr', 'en'];
const get = (o, path) => path.split('.').reduce((a, k) => (a == null ? undefined : a[k]), o);
// ترجمة آمنة: اللغة الحالية ← العربية ← المفتاح نفسه
const makeT = lang => (path, ...args) => {
  let v = get(T[lang], path); if (v == null) v = get(T.ar, path);
  if (v == null) { console.warn('[i18n] missing key:', path); return path; }
  return typeof v === 'function' ? v(...args) : v;
};
// تخزين آمن: يعمل حتى لو localStorage غير متاح
const mem = {}; let storageOk = true;
const store = {
  get(k) { try { const v = localStorage.getItem(k); return v; } catch (e) { storageOk = false; return mem[k] ?? null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) { storageOk = false; mem[k] = v; } }
};
const toPrice = p => { const n = typeof p === 'string' ? parseFloat(p) : p; return Number.isFinite(n) && n >= 0 ? n : null; };
const ITEMS = (Array.isArray(CONFIG.items) ? CONFIG.items : []).filter(i => i && i.id).map(i => ({ ...i, price: toPrice(i.price) }));
const BY_ID = Object.fromEntries(ITEMS.map(i => [i.id, i]));
const fmt = n => (Math.round(n * 100) / 100).toString();
const waNumber = String(CONFIG.wa || '').replace(/\D/g, '');
const waOk = waNumber.length >= 8;
const waLink = text => waOk ? `https://wa.me/${waNumber}${text ? '?text=' + encodeURIComponent(text) : ''}` : null;
const cls = (...a) => a.filter(Boolean).join(' ');
const isUrl = u => typeof u === 'string' && /^https?:\/\//i.test(u.trim());

/* ---------- 2) أيقونات ---------- */
const svg = (children, p = {}) => h('svg', { viewBox: '0 0 24 24', 'aria-hidden': true, focusable: false, ...p }, children);
const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
const Icon = {
  // WhatsApp: مسار Simple Icons (CC0)
  wa: () => svg(h('path', { fill: 'currentColor', d: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' })),
  ig: () => svg([h('rect', { key: 1, x: 3, y: 3, width: 18, height: 18, rx: 5, ...stroke }), h('circle', { key: 2, cx: 12, cy: 12, r: 4.2, ...stroke }), h('circle', { key: 3, cx: 17.4, cy: 6.6, r: 1.1, fill: 'currentColor' })]),
  fb: () => svg(h('path', { fill: 'currentColor', d: 'M13.6 21.5v-8.2h2.8l.5-3.3h-3.3V7.9c0-.9.4-1.7 1.8-1.7h1.6V3.3c-.3 0-1.3-.2-2.4-.2-2.5 0-4.2 1.5-4.2 4.3V10H7.6v3.3h2.8v8.2z' })),
  phone: () => svg(h('path', { ...stroke, d: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.7 2z' })),
  chev: () => svg(h('path', { ...stroke, d: 'm6 9 6 6 6-6' })),
  x: () => svg([h('path', { key: 1, ...stroke, d: 'M18 6 6 18' }), h('path', { key: 2, ...stroke, d: 'M6 6l12 12' })], { width: 22, height: 22 }),
  bag: () => svg(h('path', { ...stroke, d: 'M6 7h12l1 13H5zM9 7a3 3 0 0 1 6 0' }), { width: 22, height: 22 }),
  trash: () => svg([h('path', { key: 1, ...stroke, d: 'M4 7h16' }), h('path', { key: 2, ...stroke, d: 'M9 7V4.5h6V7' }), h('path', { key: 3, ...stroke, d: 'M6 7l1 13h10l1-13' }), h('path', { key: 4, ...stroke, d: 'M10 11v6M14 11v6' })], { width: 20, height: 20 })
};

/* ---------- 3) مكونات ---------- */
// صورة مع بديل عند فقدان الملف
function Img({ src, alt, t, eager, width, height, style }) {
  const [bad, setBad] = useState(!src);
  useEffect(() => setBad(!src), [src]);
  if (bad) return h('div', { className: 'ph', role: 'img', 'aria-label': alt }, t('imgMissing'));
  return h('img', { src, alt, width, height, style, loading: eager ? 'eager' : 'lazy', decoding: 'async', fetchPriority: eager ? 'high' : undefined, onError: () => setBad(true) });
}

function LangMenu({ lang, setLang, t }) {
  const [open, setOpen] = useState(false); const box = useRef(null);
  useEffect(() => {
    if (!open) return;
    const away = e => { if (box.current && !box.current.contains(e.target)) setOpen(false); };
    const esc = e => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', away); document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('pointerdown', away); document.removeEventListener('keydown', esc); };
  }, [open]);
  return h('div', { className: 'lang', ref: box },
    h('button', { className: 'lang-btn', 'aria-haspopup': 'menu', 'aria-expanded': open, 'aria-label': t('lang') + ': ' + T[lang].label, onClick: () => setOpen(!open) }, h('span', { className: 'd', style: { textTransform: 'uppercase' } }, lang), Icon.chev()),
    open && h('div', { className: 'lang-list', role: 'menu', 'aria-label': t('lang') },
      LANGS.map(l => h('button', { key: l, role: 'menuitemradio', 'aria-checked': l === lang, lang: l, dir: l === 'ar' ? 'rtl' : 'ltr', onClick: () => { setLang(l); setOpen(false); } }, T[l].label))));
}

function Header({ t, lang, setLang }) {
  const [open, setOpen] = useState(false);
  const links = [['home', '#home'], ['menu', '#menu'], ['contact', '#contact']];
  useEffect(() => { if (!open) return; const esc = e => e.key === 'Escape' && setOpen(false); document.addEventListener('keydown', esc); return () => document.removeEventListener('keydown', esc); }, [open]);
  return h('header', { className: 'hdr' },
    h('div', { className: 'wrap hdr-in' },
      h('a', { href: '#home', className: 'brand' }, h('img', { src: CONFIG.images.logo, alt: '', width: 52, height: 62 }), h('span', { className: 'sr' }, CONFIG.name), CONFIG.demo && h('span', { className: 'demo-tag' }, t('demoTag'))),
      h('nav', { className: 'nav', 'aria-label': t('mainNav') }, links.map(([k, href]) => h('a', { key: k, href }, t('nav.' + k)))),
      h(LangMenu, { lang, setLang, t }),
      h('a', { href: '#menu', className: 'btn btn-or btn-sm hdr-cta' }, t('orderNow')),
      h('button', { className: 'burger', 'aria-label': open ? t('closeMenu') : t('menuBtn'), 'aria-expanded': open, 'aria-controls': 'mnav', onClick: () => setOpen(!open) }, h('i'), h('i'), h('i'))),
    open && h('nav', { id: 'mnav', className: 'mnav', 'aria-label': t('mainNav') },
      links.map(([k, href]) => h('a', { key: k, href, onClick: () => setOpen(false) }, t('nav.' + k))),
      h('a', { href: '#menu', className: 'btn btn-or', onClick: () => setOpen(false) }, t('orderNow'))));
}

function Hero({ t }) {
  const link = waLink(t('cart.msgGeneral'));
  return h('section', { id: 'home', className: 'hero dark' },
    h('div', { className: 'wrap hero-in' },
      h('div', null,
        h('p', { className: 'kick d' }, CONFIG.name),
        h('h1', null, t('hero.h1')),
        h('p', { className: 'sub' }, t('hero.sub')),
        h('div', { className: 'acts' },
          h('a', { href: '#menu', className: 'btn btn-or' }, t('hero.see')),
          link ? h('a', { href: link, target: '_blank', rel: 'noopener noreferrer', className: 'btn btn-line' }, Icon.wa(), t('hero.wa'))
               : h('span', { className: 'btn btn-line is-disabled', 'aria-disabled': true, title: t('contact.noWa') }, Icon.wa(), t('hero.wa')))),
      h('div', { className: 'hero-img' }, h(Img, { src: CONFIG.images.hero, alt: t('items.burger'), t, eager: true, width: 540, height: 432 }))));
}

const Qty = ({ qty, onSet, t, name }) => h('div', { className: 'step', role: 'group', 'aria-label': t('qty') + ': ' + name },
  h('button', { onClick: () => onSet(qty - 1), 'aria-label': t('dec') + ' — ' + name }, qty === 1 ? '×' : '−'),
  h('b', { 'aria-live': 'polite' }, qty),
  h('button', { onClick: () => onSet(qty + 1), 'aria-label': t('inc') + ' — ' + name, disabled: qty >= 99 }, '+'));

/* ضبط موضع/تكبير الصورة لكل منتج من config.js (pos / zoom) */
function imgFit(item) {
  if (!item.pos && !item.zoom) return undefined;
  const pos = item.pos || 'center';
  return { objectPosition: pos, transformOrigin: pos, transform: item.zoom ? 'scale(' + item.zoom + ')' : undefined };
}

function Card({ item, qty, onSet, t }) {
  const name = t('items.' + item.id); const ok = item.price !== null;
  return h('article', { className: 'card' },
    h('div', { className: 'card-img' + (item.zoom && item.zoom < 1 ? ' fit' : ''), style: item.zoom && item.zoom < 1 ? { '--bg': 'url(' + item.img + ')' } : undefined }, h(Img, { src: item.img, alt: name, t, width: 540, height: 432, style: imgFit(item) })),
    h('div', { className: 'card-b' },
      h('h3', null, name),
      h('p', { className: 'price d' }, ok ? fmt(item.price) : '—', ok && h('small', null, t('cur'))),
      !ok ? h('button', { className: 'btn btn-br btn-sm', disabled: true }, t('unavailable'))
        : qty ? h(Qty, { qty, onSet: n => onSet(item.id, n), t, name })
        : h('button', { className: 'btn btn-br btn-sm', onClick: () => onSet(item.id, 1), 'aria-label': t('add') + ': ' + name }, t('add'))));
}

const Menu = ({ t, cart, onSet }) => h('section', { id: 'menu', className: 'wrap sec', 'aria-labelledby': 'menu-h' },
  h('h2', { id: 'menu-h', className: 'd' }, t('menu.title')), h('p', { className: 'sub' }, t('menu.sub')),
  h('div', { className: 'grid' }, ITEMS.map(it => h(Card, { key: it.id, item: it, qty: cart[it.id] || 0, onSet, t }))));

const About = ({ t }) => h('section', { id: 'about', className: 'about sec' },
  h('div', { className: 'wrap about-in' },
    h('div', null, h('p', { className: 'k' }, t('about.kicker')), h('h2', null, t('about.title')), h('p', { className: 't' }, t('about.text'))),
    h('ol', { className: 'pts' }, [0, 1, 2].map(i => h('li', { key: i }, h('span', { className: 'n d' }, '0' + (i + 1)), h('div', null, h('h3', null, t(`about.pts.${i}.0`)), h('p', null, t(`about.pts.${i}.1`)))))))); 

function Social({ t }) {
  const defs = [['instagram', Icon.ig], ['facebook', Icon.fb]];
  return h('div', { className: 'soc' },
    waOk ? h('a', { href: waLink(''), target: '_blank', rel: 'noopener noreferrer', 'aria-label': t('social.whatsapp') }, Icon.wa())
         : h('span', { className: 'is-disabled', role: 'img', 'aria-label': t('social.whatsapp') + ' — ' + t('social.soon') }, Icon.wa()),
    defs.map(([k, ic]) => { const u = CONFIG.social && CONFIG.social[k];
      return isUrl(u) ? h('a', { key: k, href: u.trim(), target: '_blank', rel: 'noopener noreferrer', 'aria-label': t('social.' + k) }, ic())
        : h('span', { key: k, className: 'is-disabled', role: 'img', 'aria-label': t('social.' + k) + ' — ' + t('social.soon'), title: t('social.soon') }, ic()); }));
}

function Contact({ t }) {
  const rows = [['phone', CONFIG.phone, true], ['whatsapp', waOk ? CONFIG.phone : '', true], ['address', CONFIG.address], ['hours', CONFIG.hours], ['delivery', CONFIG.delivery]];
  const link = waLink('');
  return h('section', { id: 'contact', className: 'contact sec', 'aria-labelledby': 'contact-h' },
    h('div', { className: 'wrap contact-in' },
      h('div', null, h('h2', { id: 'contact-h' }, t('contact.title')), h('p', { className: 'sub' }, t('contact.sub')),
        h('dl', { className: 'info' }, rows.map(([k, v, ltr]) => h('div', { key: k }, h('dt', null, t('contact.' + k)),
          v ? h('dd', { dir: ltr ? 'ltr' : undefined, style: ltr ? { textAlign: 'start' } : undefined, className: ltr ? 'd' : undefined }, v) : h('dd', { className: 'soon' }, t('contact.soon')))))),
      h('div', { className: 'c-act' },
        h('div', { className: 'row' },
          CONFIG.phone ? h('a', { href: 'tel:' + String(CONFIG.phone).replace(/[^\d+]/g, ''), className: 'btn btn-wh' }, Icon.phone(), t('contact.call')) : null,
          link ? h('a', { href: link, target: '_blank', rel: 'noopener noreferrer', className: 'btn btn-br' }, Icon.wa(), t('contact.chat'))
               : h('span', { className: 'btn btn-br is-disabled', 'aria-disabled': true }, Icon.wa(), t('contact.chat'))),
        h(Social, { t }))));
}

function Footer({ t }) {
  return h('footer', { className: 'ftr on-dark' },
    h('div', { className: 'wrap ftr-in' },
      h('nav', { 'aria-label': t('footNav') }, h('h2', null, t('footNav')), [['home', '#home'], ['menu', '#menu'], ['contact', '#contact']].map(([k, href]) => h('a', { key: k, href }, t('nav.' + k)))),
      h('div', { className: 'ftr-ct' }, h('h2', null, t('contact.title')), CONFIG.phone ? h('a', { className: 'tel d', dir: 'ltr', href: 'tel:' + String(CONFIG.phone).replace(/[^\d+]/g, '') }, CONFIG.phone) : null, h(Social, { t }))),
    h('div', { className: 'wrap copy' }, `© ${new Date().getFullYear()} ${CONFIG.name}. ${t('footer.rights')}`, CONFIG.demo ? ' · ' + t('footer.demo') : ''));
}

function CartSheet({ t, cart, onSet, onClear, onClose, total, count }) {
  const [note, setNote] = useState(''); const ref = useRef(null); const closeBtn = useRef(null);
  useEffect(() => {
    const prev = document.activeElement; document.body.style.overflow = 'hidden'; closeBtn.current && closeBtn.current.focus();
    const key = e => {
      if (e.key === 'Escape') return onClose();
      if (e.key !== 'Tab' || !ref.current) return;
      const f = ref.current.querySelectorAll('button:not(:disabled),a[href],textarea'); if (!f.length) return;
      const a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    };
    document.addEventListener('keydown', key);
    return () => { document.removeEventListener('keydown', key); document.body.style.overflow = ''; prev && prev.focus && prev.focus(); };
  }, []);
  const lines = Object.keys(cart).map(id => BY_ID[id]).filter(Boolean);
  const buildMsg = () => {
    const L = lines.map(i => `• ${cart[i.id]} × ${t('items.' + i.id)} — ${fmt(i.price * cart[i.id])} ${t('cur')}`);
    let m = `${t('cart.msgHead')}\n${L.join('\n')}\n${t('cart.msgTotal')}: ${fmt(total)} ${t('cur')}`;
    if (note.trim()) m += `\n${t('cart.msgNote')}: ${note.trim()}`;
    return m;
  };
  const link = lines.length && waOk ? waLink(buildMsg()) : null;
  return h('div', { className: 'ovl', onMouseDown: e => e.target === e.currentTarget && onClose() },
    h('div', { className: 'sheet', role: 'dialog', 'aria-modal': true, 'aria-labelledby': 'cart-h', ref },
      h('div', { className: 'sheet-h' }, h('h2', { id: 'cart-h' }, t('cart.title') + (count ? ' · ' + t('cart.items', count) : '')), h('button', { className: 'x', ref: closeBtn, onClick: onClose, 'aria-label': t('cart.close') }, Icon.x())),
      lines.length === 0
        ? h('div', { className: 'sheet-b' }, h('div', { className: 'empty' }, h('p', null, t('cart.empty')), h('p', null, t('cart.emptyHint')), h('a', { href: '#menu', className: 'btn btn-or', onClick: onClose }, t('cart.backMenu'))))
        : h(React.Fragment, null,
          h('div', { className: 'sheet-b' }, lines.map(i => { const name = t('items.' + i.id); return h('div', { className: 'line', key: i.id },
            h('div', null, h(Img, { src: i.img, alt: '', t, width: 56, height: 45, style: imgFit(i) })),
            h('div', null, h('h3', null, name),
              h('div', { className: 'meta' }, h(Qty, { qty: cart[i.id], onSet: n => onSet(i.id, n), t, name }), h('span', { className: 'sum d' }, fmt(i.price * cart[i.id]) + ' ' + t('cur')),
                h('button', { className: 'rm', type: 'button', onClick: () => onSet(i.id, 0), title: t('remove'), 'aria-label': t('remove') + ': ' + name }, Icon.trash())))); })),
          h('div', { className: 'sheet-f' },
            !storageOk && h('p', { className: 'warn', role: 'status' }, t('cart.storageOff')),
            h('div', { className: 'tot' }, h('span', null, t('cart.total')), h('span', { className: 'd' }, fmt(total) + ' ' + t('cur'))),
            h('textarea', { className: 'note', value: note, onChange: e => setNote(e.target.value), maxLength: 300, 'aria-label': t('cart.note'), placeholder: t('cart.note') }),
            link ? h('a', { href: link, target: '_blank', rel: 'noopener noreferrer', className: 'btn btn-or btn-block' }, Icon.wa(), t('cart.send'))
                 : h('span', { className: 'btn btn-or btn-block is-disabled', 'aria-disabled': true }, Icon.wa(), waOk ? t('cart.send') : t('contact.noWa'))))));
}

/* ---------- 4) التطبيق ---------- */
function cartReducer(s, a) {
  const next = { ...s };
  if (a.type === 'set') { const n = Math.max(0, Math.min(99, Math.floor(a.n))); if (!BY_ID[a.id] || BY_ID[a.id].price === null) return s; n ? next[a.id] = n : delete next[a.id]; return next; }
  return {};
}
function loadCart() {
  try { const o = JSON.parse(store.get('cf_cart') || '{}'), c = {};
    for (const id in o) if (BY_ID[id] && BY_ID[id].price !== null && Number.isInteger(o[id]) && o[id] > 0) c[id] = Math.min(o[id], 99);
    return c; } catch (e) { return {}; }
}
function setMeta(sel, attr, val) { const el = document.querySelector(sel); if (el) el.setAttribute(attr, val); }
function setHead(t, lang) {
  const d = document.documentElement; d.lang = lang; d.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.title = t('title');
  setMeta('meta[name=description]', 'content', t('desc'));
  setMeta('meta[property="og:title"]', 'content', t('title')); setMeta('meta[property="og:description"]', 'content', t('desc'));
  setMeta('meta[name="twitter:title"]', 'content', t('title')); setMeta('meta[name="twitter:description"]', 'content', t('desc'));
  const base = isUrl(CONFIG.siteUrl) ? CONFIG.siteUrl.replace(/\/$/, '') : '';
  if (base) { // Canonical / og:url / صور مطلقة فقط عند وجود نطاق حقيقي في config.js
    let c = document.querySelector('link[rel=canonical]'); if (!c) { c = document.createElement('link'); c.rel = 'canonical'; document.head.appendChild(c); } c.href = base + '/';
    let u = document.querySelector('meta[property="og:url"]'); if (!u) { u = document.createElement('meta'); u.setAttribute('property', 'og:url'); document.head.appendChild(u); } u.content = base + '/';
    setMeta('meta[property="og:image"]', 'content', base + '/' + CONFIG.images.og); setMeta('meta[name="twitter:image"]', 'content', base + '/' + CONFIG.images.og);
  }
  if (!CONFIG.demo) { const r = document.querySelector('meta[name=robots]'); if (r) r.remove(); }
  // JSON-LD: يُبنى من config فقط — لا عنوان ولا تقييمات مخترعة
  const ld = { '@context': 'https://schema.org', '@type': 'Restaurant', name: CONFIG.name, servesCuisine: 'Fast food', inLanguage: lang };
  if (CONFIG.phone) ld.telephone = CONFIG.phone; if (CONFIG.address) ld.address = CONFIG.address; if (CONFIG.hours) ld.openingHours = CONFIG.hours; if (base) { ld.url = base + '/'; ld.image = base + '/' + CONFIG.images.og; }
  const priced = ITEMS.filter(i => i.price !== null);
  if (priced.length) ld.hasMenu = { '@type': 'Menu', hasMenuSection: { '@type': 'MenuSection', name: t('menu.title'), hasMenuItem: priced.map(i => ({ '@type': 'MenuItem', name: t('items.' + i.id), offers: { '@type': 'Offer', price: i.price, priceCurrency: 'MAD' } })) } };
  let s = document.getElementById('ld'); if (!s) { s = document.createElement('script'); s.id = 'ld'; s.type = 'application/ld+json'; document.head.appendChild(s); } s.textContent = JSON.stringify(ld);
}

function App() {
  const [lang, setLangState] = useState(() => { const l = store.get('cf_lang'); return T[l] ? l : 'ar'; });
  const setLang = l => { setLangState(l); store.set('cf_lang', l); };
  const [cart, dispatch] = useReducer(cartReducer, undefined, loadCart);
  const [open, setOpen] = useState(false);
  const t = makeT(lang);
  useEffect(() => setHead(t, lang), [lang]);
  useEffect(() => store.set('cf_cart', JSON.stringify(cart)), [cart]);
  const onSet = useCallback((id, n) => dispatch({ type: 'set', id, n }), []);
  const ids = Object.keys(cart);
  const count = ids.reduce((s, id) => s + cart[id], 0);
  const total = ids.reduce((s, id) => s + cart[id] * (BY_ID[id].price || 0), 0);
  const link = waLink('');
  return h(React.Fragment, null,
    h('a', { href: '#menu', className: 'skip' }, t('skip')),
    h(Header, { t, lang, setLang }),
    h('main', null, h(Hero, { t }), h(Menu, { t, cart, onSet }), h(About, { t }), h(Contact, { t })),
    h(Footer, { t }),
    count > 0 && h('button', { className: 'cartbar', onClick: () => setOpen(true), 'aria-haspopup': 'dialog' },
      h('span', { className: 'l' }, Icon.bag(), h('span', null, t('cart.open')), h('span', { className: 'cnt', 'aria-label': t('cart.items', count) }, count)), h('span', { className: 'd' }, fmt(total) + ' ' + t('cur'))),
    link ? h('a', { href: link, target: '_blank', rel: 'noopener noreferrer', className: 'fab', 'aria-label': t('social.whatsapp') }, Icon.wa()) : null,
    open && h(CartSheet, { t, cart, onSet, onClose: () => setOpen(false), total, count }));
}
try { ReactDOM.createRoot(document.getElementById('root')).render(h(App)); }
catch (e) { console.error(e); document.getElementById('root').innerHTML = '<p style="padding:2rem;text-align:center">CHICKEN FOODS</p>'; }
