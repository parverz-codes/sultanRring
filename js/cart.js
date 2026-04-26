// ══════════════════════════════
// SULTAN RING - CART & ORDER SYSTEM
// WhatsApp: 01616797706
// ══════════════════════════════

const WHATSAPP_NUMBER = '8801616797706';

// Cart State
let cart = JSON.parse(localStorage.getItem('sultanCart')) || [];

// ── Cart UI HTML inject ──
function injectCartUI() {
  const cartHTML = `
  <!-- Cart Icon (fixed) -->
  <div id="cart-icon" onclick="toggleCart()" style="
    position:fixed;bottom:30px;right:30px;z-index:1000;
    width:60px;height:60px;
    background:linear-gradient(135deg,#a07828,#f0c860);
    border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    cursor:pointer;
    box-shadow:0 4px 20px rgba(201,149,58,.5);
    transition:transform .3s;
  " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
    <span style="font-size:24px;">🛒</span>
    <span id="cart-count" style="
      position:absolute;top:-4px;right:-4px;
      background:#c0392b;color:#fff;
      width:22px;height:22px;border-radius:50%;
      font-size:12px;font-weight:700;
      display:flex;align-items:center;justify-content:center;
      font-family:'Cinzel',serif;
      display:none;
    ">0</span>
  </div>

  <!-- Cart Drawer -->
  <div id="cart-drawer" style="
    position:fixed;top:0;right:-420px;
    width:420px;max-width:100vw;height:100vh;
    background:#0e0e0e;
    border-left:1px solid rgba(201,149,58,.2);
    z-index:2000;
    transition:right .4s cubic-bezier(.22,.68,0,1.2);
    display:flex;flex-direction:column;
    font-family:'Cormorant Garamond',serif;
  ">
    <!-- Drawer Header -->
    <div style="
      padding:24px 28px;
      border-bottom:1px solid rgba(201,149,58,.15);
      display:flex;justify-content:space-between;align-items:center;
    ">
      <div style="
        font-family:'Cinzel Decorative',serif;font-size:18px;
        background:linear-gradient(135deg,#a07828,#f0c860,#fde89a);
        -webkit-background-clip:text;-webkit-text-fill-color:transparent;
      ">Your Cart</div>
      <button onclick="toggleCart()" style="
        background:transparent;border:1px solid rgba(201,149,58,.3);
        color:#c9953a;width:36px;height:36px;cursor:pointer;
        font-size:18px;
      ">×</button>
    </div>

    <!-- Cart Items -->
    <div id="cart-items" style="flex:1;overflow-y:auto;padding:20px 28px;"></div>

    <!-- Cart Footer -->
    <div id="cart-footer" style="
      padding:24px 28px;
      border-top:1px solid rgba(201,149,58,.15);
    "></div>
  </div>

  <!-- Overlay -->
  <div id="cart-overlay" onclick="toggleCart()" style="
    position:fixed;inset:0;background:rgba(0,0,0,.6);
    z-index:1999;display:none;backdrop-filter:blur(2px);
  "></div>

  <!-- Order Modal -->
  <div id="order-modal" style="
    position:fixed;inset:0;z-index:3000;
    display:none;align-items:center;justify-content:center;
    background:rgba(0,0,0,.8);backdrop-filter:blur(4px);
    padding:20px;
  ">
    <div style="
      background:#0e0e0e;border:1px solid rgba(201,149,58,.3);
      width:100%;max-width:480px;
      padding:36px;position:relative;
      max-height:90vh;overflow-y:auto;
    ">
      <button onclick="closeOrderModal()" style="
        position:absolute;top:16px;right:16px;
        background:transparent;border:none;
        color:#c9953a;font-size:24px;cursor:pointer;
      ">×</button>

      <div style="
        font-family:'Cinzel Decorative',serif;font-size:20px;
        background:linear-gradient(135deg,#a07828,#f0c860);
        -webkit-background-clip:text;-webkit-text-fill-color:transparent;
        margin-bottom:8px;
      ">Place Order</div>
      <div style="font-size:13px;color:#7a6a50;font-style:italic;margin-bottom:28px;">
        আপনার তথ্য দিন — WhatsApp এ confirm করা হবে
      </div>

      <div style="display:flex;flex-direction:column;gap:16px;">
        <div>
          <label style="font-family:'Cinzel',serif;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#c9953a;display:block;margin-bottom:8px;">পূর্ণ নাম *</label>
          <input id="order-name" type="text" placeholder="আপনার নাম লিখুন" style="
            width:100%;padding:12px 16px;background:#141414;
            border:1px solid rgba(201,149,58,.25);color:#e8dcc8;
            font-family:'Cormorant Garamond',serif;font-size:15px;
            outline:none;box-sizing:border-box;
          ">
        </div>
        <div>
          <label style="font-family:'Cinzel',serif;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#c9953a;display:block;margin-bottom:8px;">Phone Number *</label>
          <input id="order-phone" type="tel" placeholder="01XXXXXXXXX" style="
            width:100%;padding:12px 16px;background:#141414;
            border:1px solid rgba(201,149,58,.25);color:#e8dcc8;
            font-family:'Cormorant Garamond',serif;font-size:15px;
            outline:none;box-sizing:border-box;
          ">
        </div>
        <div>
          <label style="font-family:'Cinzel',serif;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#c9953a;display:block;margin-bottom:8px;">সম্পূর্ণ ঠিকানা *</label>
          <textarea id="order-address" placeholder="বাসার নম্বর, রাস্তা, এলাকা, জেলা" rows="3" style="
            width:100%;padding:12px 16px;background:#141414;
            border:1px solid rgba(201,149,58,.25);color:#e8dcc8;
            font-family:'Cormorant Garamond',serif;font-size:15px;
            outline:none;resize:none;box-sizing:border-box;
          "></textarea>
        </div>
        <div>
          <label style="font-family:'Cinzel',serif;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#c9953a;display:block;margin-bottom:8px;">Ring Size (ঐচ্ছিক)</label>
          <select id="order-size" style="
            width:100%;padding:12px 16px;background:#141414;
            border:1px solid rgba(201,149,58,.25);color:#e8dcc8;
            font-family:'Cormorant Garamond',serif;font-size:15px;
            outline:none;box-sizing:border-box;
          ">
            <option value="">Size জানি না</option>
            <option value="6">Size 6</option>
            <option value="7">Size 7</option>
            <option value="8">Size 8</option>
            <option value="9">Size 9 (সবচেয়ে common)</option>
            <option value="10">Size 10</option>
            <option value="11">Size 11</option>
            <option value="12">Size 12</option>
          </select>
        </div>
        <div>
          <label style="font-family:'Cinzel',serif;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#c9953a;display:block;margin-bottom:8px;">Payment Method *</label>
          <select id="order-payment" style="
            width:100%;padding:12px 16px;background:#141414;
            border:1px solid rgba(201,149,58,.25);color:#e8dcc8;
            font-family:'Cormorant Garamond',serif;font-size:15px;
            outline:none;box-sizing:border-box;
          ">
            <option value="bkash">bKash</option>
            <option value="nagad">Nagad</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>

        <!-- Order Summary -->
        <div id="modal-summary" style="
          background:#141414;
          border:1px solid rgba(201,149,58,.15);
          padding:16px;margin-top:8px;
        "></div>

        <button onclick="sendWhatsAppOrder()" style="
          padding:16px;
          background:linear-gradient(135deg,#a07828,#c9953a,#f0c860);
          border:none;color:#080808;cursor:pointer;
          font-family:'Cinzel',serif;font-size:12px;
          letter-spacing:4px;text-transform:uppercase;
          font-weight:700;margin-top:8px;
          transition:opacity .3s;
        " onmouseover="this.style.opacity='.85'" onmouseout="this.style.opacity='1'">
          📱 WhatsApp এ Order করুন
        </button>

        <div style="text-align:center;font-size:12px;color:#7a6a50;font-style:italic;">
          Order confirm হলে আমরা WhatsApp এ যোগাযোগ করবো
        </div>
      </div>
    </div>
  </div>
  `;
  document.body.insertAdjacentHTML('beforeend', cartHTML);
}

// ── Toggle Cart ──
function toggleCart() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  const isOpen = drawer.style.right === '0px';
  drawer.style.right = isOpen ? '-420px' : '0px';
  overlay.style.display = isOpen ? 'none' : 'block';
  if (!isOpen) renderCart();
}

// ── Add to Cart ──
function addToCart(name, price, img) {
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, img, qty: 1 });
  }
  updateCartCount();
  showAddedToast(name);
  renderCart();
}

// ── Remove from Cart ──
function removeFromCart(name) {
  cart = cart.filter(i => i.name !== name);
  updateCartCount();
  renderCart();
  localStorage.setItem('sultanCart', JSON.stringify(cart));
}

// ── Update Quantity ──
function updateQty(name, delta) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) removeFromCart(name);
    else { updateCartCount(); renderCart(); }
  }
}

// ── Cart Count ──
function updateCartCount() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  const badge = document.getElementById('cart-count');
  badge.textContent = total;
  badge.style.display = total > 0 ? 'flex' : 'none';
  localStorage.setItem('sultanCart', JSON.stringify(cart));
}

// ── Render Cart ──
function renderCart() {
  const el = document.getElementById('cart-items');
  const footer = document.getElementById('cart-footer');
  if (!el) return;

  if (cart.length === 0) {
    el.innerHTML = `
      <div style="text-align:center;padding:60px 20px;color:#7a6a50;">
        <div style="font-size:48px;margin-bottom:16px;">🛒</div>
        <div style="font-family:'Cinzel',serif;font-size:12px;letter-spacing:3px;text-transform:uppercase;">Cart is Empty</div>
        <div style="font-size:14px;font-style:italic;margin-top:8px;">কোনো আংটি add করুন</div>
      </div>`;
    footer.innerHTML = '';
    return;
  }

  el.innerHTML = cart.map(item => `
    <div style="
      display:flex;gap:16px;align-items:center;
      padding:16px 0;border-bottom:1px solid rgba(201,149,58,.1);
    ">
      <img src="${item.img}" style="width:70px;height:70px;object-fit:cover;" onerror="this.style.background='#1a1a1a';this.src=''">
      <div style="flex:1;">
        <div style="font-family:'Cinzel',serif;font-size:12px;letter-spacing:1px;color:#e8dcc8;margin-bottom:4px;">${item.name}</div>
        <div style="
          font-family:'Cinzel Decorative',serif;font-size:16px;
          background:linear-gradient(135deg,#a07828,#f0c860);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;
        ">৳ ${(item.price * item.qty).toLocaleString()}</div>
        <div style="display:flex;align-items:center;gap:12px;margin-top:8px;">
          <button onclick="updateQty('${item.name}',-1)" style="
            width:28px;height:28px;background:transparent;
            border:1px solid rgba(201,149,58,.3);color:#c9953a;cursor:pointer;font-size:16px;
          ">−</button>
          <span style="font-family:'Cinzel',serif;font-size:13px;color:#e8dcc8;">${item.qty}</span>
          <button onclick="updateQty('${item.name}',1)" style="
            width:28px;height:28px;background:transparent;
            border:1px solid rgba(201,149,58,.3);color:#c9953a;cursor:pointer;font-size:16px;
          ">+</button>
          <button onclick="removeFromCart('${item.name}')" style="
            background:transparent;border:none;color:#7a6a50;cursor:pointer;
            font-size:12px;margin-left:8px;font-family:'Cinzel',serif;letter-spacing:1px;
          ">REMOVE</button>
        </div>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  footer.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <div style="font-family:'Cinzel',serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#7a6a50;">Total</div>
      <div style="
        font-family:'Cinzel Decorative',serif;font-size:22px;
        background:linear-gradient(135deg,#a07828,#f0c860);
        -webkit-background-clip:text;-webkit-text-fill-color:transparent;
      ">৳ ${total.toLocaleString()}</div>
    </div>
    <div style="font-size:12px;color:#7a6a50;font-style:italic;margin-bottom:16px;text-align:center;">
      🚚 Delivery charge আলাদা • Cash on Delivery available
    </div>
    <button onclick="openOrderModal()" style="
      width:100%;padding:16px;
      background:linear-gradient(135deg,#a07828,#c9953a,#f0c860);
      border:none;color:#080808;cursor:pointer;
      font-family:'Cinzel',serif;font-size:12px;
      letter-spacing:4px;text-transform:uppercase;font-weight:700;
      transition:opacity .3s;
    " onmouseover="this.style.opacity='.85'" onmouseout="this.style.opacity='1'">
      Order Now 👑
    </button>
  `;
}

// ── Toast notification ──
function showAddedToast(name) {
  const toast = document.createElement('div');
  toast.innerHTML = `✓ <strong>${name}</strong> cart এ যোগ হয়েছে`;
  toast.style.cssText = `
    position:fixed;bottom:100px;right:30px;z-index:5000;
    background:linear-gradient(135deg,#a07828,#c9953a);
    color:#080808;padding:12px 20px;
    font-family:'Cinzel',serif;font-size:11px;letter-spacing:2px;
    animation:slideIn .3s ease;
    box-shadow:0 4px 20px rgba(201,149,58,.4);
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ── Order Modal ──
function openOrderModal() {
  const modal = document.getElementById('order-modal');
  modal.style.display = 'flex';
  updateModalSummary();
}

function closeOrderModal() {
  document.getElementById('order-modal').style.display = 'none';
}

function updateModalSummary() {
  const el = document.getElementById('modal-summary');
  if (!el) return;
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  el.innerHTML = `
    <div style="font-family:'Cinzel',serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#c9953a;margin-bottom:12px;">Order Summary</div>
    ${cart.map(i => `
      <div style="display:flex;justify-content:space-between;font-size:14px;color:#e8dcc8;margin-bottom:6px;">
        <span>${i.name} × ${i.qty}</span>
        <span>৳ ${(i.price * i.qty).toLocaleString()}</span>
      </div>
    `).join('')}
    <div style="border-top:1px solid rgba(201,149,58,.2);margin-top:10px;padding-top:10px;display:flex;justify-content:space-between;">
      <span style="font-family:'Cinzel',serif;font-size:11px;letter-spacing:2px;color:#c9953a;">TOTAL</span>
      <span style="font-family:'Cinzel Decorative',serif;font-size:18px;
        background:linear-gradient(135deg,#a07828,#f0c860);
        -webkit-background-clip:text;-webkit-text-fill-color:transparent;">
        ৳ ${total.toLocaleString()}
      </span>
    </div>
  `;
}

// ── Send WhatsApp Order ──
function sendWhatsAppOrder() {
  const name    = document.getElementById('order-name').value.trim();
  const phone   = document.getElementById('order-phone').value.trim();
  const address = document.getElementById('order-address').value.trim();
  const size    = document.getElementById('order-size').value;
  const payment = document.getElementById('order-payment').value;

  if (!name || !phone || !address) {
    alert('অনুগ্রহ করে সব তথ্য পূরণ করুন!');
    return;
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const items = cart.map(i => `• ${i.name} × ${i.qty} = ৳${(i.price * i.qty).toLocaleString()}`).join('\n');

  const paymentLabels = { bkash: 'bKash', nagad: 'Nagad', cod: 'Cash on Delivery' };

  const msg = `
👑 *SULTAN RING - নতুন Order*

━━━━━━━━━━━━━━━
🛍️ *Order Details:*
${items}

💰 *মোট: ৳${total.toLocaleString()}*
━━━━━━━━━━━━━━━
👤 *Customer Info:*
নাম: ${name}
Phone: ${phone}
ঠিকানা: ${address}
Ring Size: ${size || 'জানি না'}
Payment: ${paymentLabels[payment]}
━━━━━━━━━━━━━━━
🌐 sultanring.github.io
  `.trim();

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
  closeOrderModal();
  toggleCart();
  cart = [];
  updateCartCount();
}

// ── Wire up all "+" buttons ──
function wireAddToCartButtons() {
  const products = [
    { name: 'Suleiman Band',    price: 1200, sel: '.product-card:nth-child(1)' },
    { name: 'Crescent Signet',  price: 1000, sel: '.product-card:nth-child(2)' },
    { name: 'Star of Ertugrul', price: 800,  sel: '.product-card:nth-child(3)' },
    { name: 'Topkapi Gem Ring', price: 1100, sel: '.product-card:nth-child(4)' },
    { name: 'Tughra Scroll Ring',price: 950, sel: '.product-card:nth-child(5)' },
    { name: "Sultan's Throne",  price: 850,  sel: '.product-card:nth-child(6)' },
  ];

  products.forEach(p => {
    const card = document.querySelector(p.sel);
    if (!card) return;
    const btn = card.querySelector('.product-add');
    const img = card.querySelector('img, svg');
    const imgSrc = img && img.tagName === 'IMG' ? img.src : '';
    if (btn) btn.onclick = () => addToCart(p.name, p.price, imgSrc);

    // Quick view also adds
    const qv = card.querySelector('.quick-view');
    if (qv) qv.onclick = () => { addToCart(p.name, p.price, imgSrc); toggleCart(); };
  });

  // Nav "Shop Now" button
  document.querySelectorAll('.nav-cta, .btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  injectCartUI();
  wireAddToCartButtons();
});