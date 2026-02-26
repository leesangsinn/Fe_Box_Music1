/**
 * Cart Store
 * Quan ly gio hang (trong phong) bang localStorage.
 * Moi phong co 1 cart rieng biet theo roomId.
 */

const CartStore = {
  STORAGE_KEY: 'macoliz_cart',

  /**
   * Lay toan bo cart cua phong hien tai
   * @param {string} roomId
   * @returns {Array} - [{ id, name, price, quantity }]
   */
  getCart(roomId) {
    try {
      const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
      return data[roomId] || [];
    } catch {
      return [];
    }
  },

  /**
   * Luu cart cua phong
   * @param {string} roomId
   * @param {Array} items
   */
  _saveCart(roomId, items) {
    const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    data[roomId] = items;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  },

  /**
   * Them mon vao gio
   * @param {string} roomId
   * @param {Object} item - { id, name, price }
   * @param {number} quantity
   */
  addItem(roomId, item, quantity = 1) {
    const cart = this.getCart(roomId);
    const existing = cart.find(i => i.id === item.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...item, quantity });
    }

    this._saveCart(roomId, cart);
    return cart;
  },

  /**
   * Cap nhat so luong mon
   * @param {string} roomId
   * @param {string} itemId
   * @param {number} quantity
   */
  updateQuantity(roomId, itemId, quantity) {
    let cart = this.getCart(roomId);

    if (quantity <= 0) {
      cart = cart.filter(i => i.id !== itemId);
    } else {
      const item = cart.find(i => i.id === itemId);
      if (item) item.quantity = quantity;
    }

    this._saveCart(roomId, cart);
    return cart;
  },

  /**
   * Xoa mon khoi gio
   * @param {string} roomId
   * @param {string} itemId
   */
  removeItem(roomId, itemId) {
    return this.updateQuantity(roomId, itemId, 0);
  },

  /**
   * Xoa toan bo gio hang cua phong
   * @param {string} roomId
   */
  clearCart(roomId) {
    this._saveCart(roomId, []);
    return [];
  },

  /**
   * Tinh tong tien tam tinh
   * @param {string} roomId
   * @returns {number}
   */
  getSubtotal(roomId) {
    return this.getCart(roomId).reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  /**
   * Tinh tong so luong mon
   * @param {string} roomId
   * @returns {number}
   */
  getTotalItems(roomId) {
    return this.getCart(roomId).reduce((sum, item) => sum + item.quantity, 0);
  },

  /**
   * Format tien VND
   * @param {number} amount
   * @returns {string}
   */
  formatPrice(amount) {
    return amount.toLocaleString('vi-VN') + 'd';
  },
};
