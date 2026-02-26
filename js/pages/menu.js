/**
 * Menu Page Logic (In-Room)
 * Xu ly filter category, them/bot so luong, cap nhat gio hang.
 */

document.addEventListener('DOMContentLoaded', function () {

  // === CATEGORY FILTER ===
  const categories = document.querySelectorAll('.category');
  const foodCards = document.querySelectorAll('.food-card, .menu-item');

  categories.forEach(cat => {
    cat.addEventListener('click', () => {
      categories.forEach(c => c.classList.remove('active'));
      cat.classList.add('active');
      const type = cat.dataset.category;

      foodCards.forEach(item => {
        if (type === 'all' || item.dataset.category === type) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // === QUANTITY BUTTONS ===
  document.querySelectorAll('.food-card').forEach(card => {
    const minusBtn = card.querySelector('.qty-btn:first-child');
    const plusBtn = card.querySelector('.qty-btn:last-child');
    const qtyEl = card.querySelector('.qty');

    if (minusBtn && plusBtn && qtyEl) {
      minusBtn.addEventListener('click', () => {
        let qty = Number(qtyEl.innerText);
        if (qty > 0) {
          qtyEl.innerText = qty - 1;
          updateCart();
        }
      });

      plusBtn.addEventListener('click', () => {
        let qty = Number(qtyEl.innerText);
        qtyEl.innerText = qty + 1;
        updateCart();
      });
    }
  });

  // === CART UPDATE ===
  function parsePrice(priceText) {
    return Number(priceText.replace(/\D/g, ''));
  }

  function formatPrice(number) {
    return number.toLocaleString('vi-VN') + 'd';
  }

  function updateCart() {
    const cartBox = document.getElementById('cart-box');
    if (!cartBox) return;

    const totalEl = cartBox.querySelector('.cart-total span:last-child');
    let total = 0;

    // Xoa cac dong mon cu
    cartBox.querySelectorAll('.cart-item').forEach(el => el.remove());

    document.querySelectorAll('.food-card').forEach(card => {
      const qtyEl = card.querySelector('.qty');
      const qty = qtyEl ? Number(qtyEl.innerText) : 0;
      if (qty > 0) {
        const name = card.querySelector('.food-name')?.innerText || '';
        const price = parsePrice(card.querySelector('.food-price')?.innerText || '0');
        const lineTotal = qty * price;
        total += lineTotal;

        const line = document.createElement('div');
        line.className = 'cart-line cart-item';
        line.innerHTML = `<span>${name} x ${qty}</span><span>${formatPrice(lineTotal)}</span>`;
        const cartTotalEl = cartBox.querySelector('.cart-total');
        if (cartTotalEl) cartBox.insertBefore(line, cartTotalEl);
      }
    });

    if (totalEl) totalEl.innerText = formatPrice(total);
  }

  // Init cart
  updateCart();

  // === NAVIGATION ===
  document.getElementById('btn-confirm')?.addEventListener('click', () => {
    window.location.href = 'guest_home.html';
  });

  document.getElementById('btn-continue')?.addEventListener('click', () => {
    window.location.href = 'guest_home.html';
  });
});
