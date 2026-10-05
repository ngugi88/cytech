/**
 * Cytech Limited - Ecommerce Store Engine (Cart, Wishlist, Notifications, Drawer)
 */

const STORAGE_KEYS = {
    CART: "cytech_cart",
    WISHLIST: "cytech_wishlist",
    REVIEWS: "cytech_reviews",
    COUPON: "cytech_applied_coupon",
    ORDERS: "cytech_orders"
};

// Available coupons
const COUPONS = {
    "CYTECH10": { code: "CYTECH10", discountType: "percent", value: 10, description: "10% off entire order" },
    "WELCOME5": { code: "WELCOME5", discountType: "percent", value: 5, description: "5% off welcome discount" },
    "FREESHIP": { code: "FREESHIP", discountType: "shipping", value: 100, description: "Free standard shipping" }
};

// ==========================================
// CART MANAGEMENT
// ==========================================

function getCart() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.CART);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Error reading cart from localStorage", e);
        return [];
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
        updateHeaderBadges();
        renderCartDrawer();
        window.dispatchEvent(new CustomEvent("cytech:cart-updated", { detail: { cart } }));
    } catch (e) {
        console.error("Error saving cart", e);
    }
}

function addToCart(productId, quantity = 1, openDrawer = true) {
    const product = getProductById(productId);
    if (!product) {
        showToast("Product not found!", "error");
        return;
    }

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) return;

    let cart = getCart();
    const existingIndex = cart.findIndex(item => item.productId === productId);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += qty;
    } else {
        cart.push({ productId, quantity: qty });
    }

    saveCart(cart);
    showToast(`Added ${qty}x "${product.name}" to your cart!`, "success");

    if (openDrawer) {
        openCartDrawer();
    }
}

function updateCartQuantity(productId, quantity) {
    let cart = getCart();
    const qty = parseInt(quantity, 10);

    if (qty <= 0) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(i => i.productId === productId);
    if (item) {
        item.quantity = qty;
        saveCart(cart);
    }
}

function removeFromCart(productId) {
    let cart = getCart();
    const product = getProductById(productId);
    cart = cart.filter(item => item.productId !== productId);
    saveCart(cart);
    if (product) {
        showToast(`Removed "${product.name}" from cart.`, "info");
    }
}

function clearCart() {
    localStorage.removeItem(STORAGE_KEYS.CART);
    localStorage.removeItem(STORAGE_KEYS.COUPON);
    updateHeaderBadges();
    renderCartDrawer();
    window.dispatchEvent(new CustomEvent("cytech:cart-updated", { detail: { cart: [] } }));
}

function getCartCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}

function getCartDetails() {
    const cart = getCart();
    let subtotal = 0;
    const items = [];

    cart.forEach(item => {
        const product = getProductById(item.productId);
        if (product) {
            const itemTotal = product.price * item.quantity;
            subtotal += itemTotal;
            items.push({
                product,
                quantity: item.quantity,
                lineTotal: itemTotal
            });
        }
    });

    // Check coupon discount
    const coupon = getAppliedCoupon();
    let discount = 0;
    if (coupon) {
        if (coupon.discountType === "percent") {
            discount = Math.round((subtotal * coupon.value) / 100);
        }
    }

    // Shipping rules: Free delivery for orders over KSh 50,000, otherwise KSh 500
    let shipping = subtotal === 0 ? 0 : (subtotal >= 50000 || (coupon && coupon.discountType === "shipping") ? 0 : 500);
    let total = Math.max(0, subtotal - discount + shipping);

    return {
        items,
        subtotal,
        discount,
        shipping,
        total,
        coupon
    };
}

// ==========================================
// COUPON MANAGEMENT
// ==========================================

function applyCoupon(code) {
    if (!code) return { success: false, message: "Please enter a coupon code." };
    const upper = code.trim().toUpperCase();
    if (COUPONS[upper]) {
        localStorage.setItem(STORAGE_KEYS.COUPON, JSON.stringify(COUPONS[upper]));
        window.dispatchEvent(new CustomEvent("cytech:cart-updated"));
        return { success: true, message: `Coupon "${upper}" applied successfully!` };
    }
    return { success: false, message: "Invalid coupon code. Try 'CYTECH10' or 'WELCOME5'." };
}

function removeCoupon() {
    localStorage.removeItem(STORAGE_KEYS.COUPON);
    window.dispatchEvent(new CustomEvent("cytech:cart-updated"));
}

function getAppliedCoupon() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.COUPON);
        return stored ? JSON.parse(stored) : null;
    } catch (e) {
        return null;
    }
}

// ==========================================
// WISHLIST MANAGEMENT
// ==========================================

function getWishlist() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.WISHLIST);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
}

function isInWishlist(productId) {
    const list = getWishlist();
    return list.includes(productId);
}

function toggleWishlist(productId) {
    const product = getProductById(productId);
    if (!product) return false;

    let list = getWishlist();
    let added = false;

    if (list.includes(productId)) {
        list = list.filter(id => id !== productId);
        showToast(`Removed "${product.name}" from your wishlist.`, "info");
    } else {
        list.push(productId);
        added = true;
        showToast(`Added "${product.name}" to your wishlist!`, "success");
    }

    try {
        localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(list));
        updateHeaderBadges();
        window.dispatchEvent(new CustomEvent("cytech:wishlist-updated", { detail: { wishlist: list } }));
    } catch (e) {
        console.error("Error saving wishlist", e);
    }

    return added;
}

function getWishlistCount() {
    return getWishlist().length;
}

// ==========================================
// REVIEWS MANAGEMENT
// ==========================================

const DEFAULT_REVIEWS = {
    "hp-elitebook": [
        { name: "David M.", rating: 5, date: "2026-09-15", comment: "Outstanding laptop for work. Fast boot times, great battery life, and the keyboard feels super comfortable for long coding sessions." },
        { name: "Grace W.", rating: 5, date: "2026-09-22", comment: "Very lightweight and elegant. The Full HD screen is crisp and does not strain my eyes during long office hours. Fast delivery too!" },
        { name: "Brian K.", rating: 4, date: "2026-09-29", comment: "Solid build quality and runs multiple virtual machines easily. Speaker volume could be slightly louder, but headphones sound amazing." }
    ],
    "canon-imagerunner": [
        { name: "Office Manager Peter", rating: 5, date: "2026-08-30", comment: "Workhorse for our legal firm. Prints and copies A3 briefs quickly with sharp monochrome text. Network setup was painless." },
        { name: "Mercy O.", rating: 4, date: "2026-09-18", comment: "Very efficient toner usage. Great value compared to desktop inkjets." }
    ],
    "epson-eb-w55": [
        { name: "Pastor Joseph", rating: 5, date: "2026-09-10", comment: "Very bright projector! Even with curtains open in our auditorium, the slides are sharp, punchy and readable from the back row." },
        { name: "Kenyan Tech Labs", rating: 5, date: "2026-09-25", comment: "HDMI connection works instantly with both Mac and Windows. The colors are vivid and natural." }
    ],
    "logitech-m170": [
        { name: "Collins N.", rating: 5, date: "2026-09-28", comment: "Best affordable wireless mouse you can get. Battery really lasts over a year, fits comfortably in the palm." },
        { name: "Ann N.", rating: 4, date: "2026-10-01", comment: "Plug and play worked immediately on my laptop. Very smooth scrolling." }
    ],
    "ubiquiti-unifi": [
        { name: "Samson IT Solutions", rating: 5, date: "2026-09-14", comment: "Clean ceiling mount, PoE makes cabling clean and simple. Roaming between floors is seamless." }
    ],
    "sony-ps4-controller": [
        { name: "Kevin G.", rating: 5, date: "2026-09-20", comment: "Authentic Sony DualShock 4 with firm analog sticks and great haptic feedback. Pairs instantly with PC via Bluetooth too." }
    ]
};

function getProductReviews(productId) {
    const defaults = DEFAULT_REVIEWS[productId] || [];
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.REVIEWS);
        const userReviews = stored ? JSON.parse(stored) : {};
        const forProduct = userReviews[productId] || [];
        return [...forProduct, ...defaults];
    } catch (e) {
        return defaults;
    }
}

function addProductReview(productId, review) {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.REVIEWS);
        const userReviews = stored ? JSON.parse(stored) : {};
        if (!userReviews[productId]) {
            userReviews[productId] = [];
        }
        userReviews[productId].unshift({
            ...review,
            date: new Date().toISOString().split("T")[0]
        });
        localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(userReviews));
        showToast("Thank you! Your review has been submitted.", "success");
        return true;
    } catch (e) {
        console.error("Error adding review", e);
        return false;
    }
}

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================

function showToast(message, type = "success") {
    let container = document.getElementById("cytechToastContainer");
    if (!container) {
        container = document.createElement("div");
        container.id = "cytechToastContainer";
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    // Choose icon
    let icon = "✓";
    if (type === "error") icon = "✕";
    if (type === "info") icon = "ℹ";

    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(toast);

    // Auto dismiss after 3.8s
    setTimeout(() => {
        toast.classList.add("toast-fadeout");
        setTimeout(() => {
            if (toast.parentElement) toast.remove();
        }, 400);
    }, 3800);
}

// ==========================================
// CART DRAWER (SLIDE-OUT OVERLAY)
// ==========================================

function injectCartDrawer() {
    if (document.getElementById("cartDrawer")) return;

    const drawerHTML = `
        <div id="cartDrawerOverlay" class="cart-drawer-overlay" onclick="closeCartDrawer()"></div>
        <div id="cartDrawer" class="cart-drawer">
            <div class="cart-drawer-header">
                <h3>Shopping Cart (<span id="drawerCartCount">0</span>)</h3>
                <button class="cart-drawer-close" onclick="closeCartDrawer()">&times;</button>
            </div>
            <div id="cartDrawerBody" class="cart-drawer-body">
                <!-- Rendered dynamically -->
            </div>
            <div class="cart-drawer-footer" id="cartDrawerFooter">
                <div class="cart-drawer-subtotal">
                    <span>Subtotal:</span>
                    <strong id="drawerSubtotal">KSh 0</strong>
                </div>
                <p class="drawer-shipping-notice">Taxes and shipping calculated at checkout</p>
                <div class="cart-drawer-actions">
                    <a href="cart.html" class="drawer-btn drawer-btn-cart">View Cart</a>
                    <a href="checkout.html" class="drawer-btn drawer-btn-checkout">Checkout</a>
                </div>
            </div>
        </div>
    `;

    const wrapper = document.createElement("div");
    wrapper.innerHTML = drawerHTML;
    document.body.appendChild(wrapper);

    renderCartDrawer();
}

function openCartDrawer() {
    injectCartDrawer();
    renderCartDrawer();
    const overlay = document.getElementById("cartDrawerOverlay");
    const drawer = document.getElementById("cartDrawer");
    if (overlay && drawer) {
        overlay.classList.add("active");
        drawer.classList.add("open");
    }
}

function closeCartDrawer() {
    const overlay = document.getElementById("cartDrawerOverlay");
    const drawer = document.getElementById("cartDrawer");
    if (overlay && drawer) {
        overlay.classList.remove("active");
        drawer.classList.remove("open");
    }
}

function renderCartDrawer() {
    const body = document.getElementById("cartDrawerBody");
    const countSpan = document.getElementById("drawerCartCount");
    const subtotalEl = document.getElementById("drawerSubtotal");
    const footer = document.getElementById("cartDrawerFooter");
    if (!body) return;

    const details = getCartDetails();
    if (countSpan) countSpan.textContent = getCartCount();
    if (subtotalEl) subtotalEl.textContent = formatKSh(details.subtotal);

    if (details.items.length === 0) {
        body.innerHTML = `
            <div class="empty-drawer">
                <div class="empty-icon">🛒</div>
                <h4>Your cart is empty</h4>
                <p>Looks like you haven't added any products yet.</p>
                <a href="Shop.html" class="btn-shop-now" onclick="closeCartDrawer()">Start Shopping</a>
            </div>
        `;
        if (footer) footer.style.display = "none";
        return;
    }

    if (footer) footer.style.display = "block";

    let html = '<div class="drawer-items-list">';
    details.items.forEach(item => {
        html += `
            <div class="drawer-item" data-id="${item.product.id}">
                <a href="singleProduct.html?id=${item.product.id}">
                    <img src="${item.product.image}" alt="${item.product.name}" class="drawer-item-img">
                </a>
                <div class="drawer-item-details">
                    <a href="singleProduct.html?id=${item.product.id}" class="drawer-item-title">${item.product.name}</a>
                    <div class="drawer-item-price">${formatKSh(item.product.price)}</div>
                    <div class="drawer-item-qty">
                        <button type="button" class="qty-btn" onclick="updateCartQuantity('${item.product.id}', ${item.quantity - 1})">-</button>
                        <span class="qty-num">${item.quantity}</span>
                        <button type="button" class="qty-btn" onclick="updateCartQuantity('${item.product.id}', ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button class="drawer-item-remove" onclick="removeFromCart('${item.product.id}')" title="Remove">&times;</button>
            </div>
        `;
    });
    html += '</div>';

    body.innerHTML = html;
}

// ==========================================
// HEADER SYNC & INITIALIZATION
// ==========================================

function updateHeaderBadges() {
    const cartCount = getCartCount();
    const wishlistCount = getWishlistCount();

    document.querySelectorAll(".cart-count-badge").forEach(badge => {
        badge.textContent = cartCount;
        badge.style.display = cartCount > 0 ? "inline-flex" : "none";
    });

    document.querySelectorAll(".wishlist-count-badge").forEach(badge => {
        badge.textContent = wishlistCount;
        badge.style.display = wishlistCount > 0 ? "inline-flex" : "none";
    });
}

// Render dynamic star rating helper
function renderStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let starsHtml = "";
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            starsHtml += '<span class="star filled">★</span>';
        } else if (i === fullStars && hasHalf) {
            starsHtml += '<span class="star half">★</span>';
        } else {
            starsHtml += '<span class="star empty">☆</span>';
        }
    }
    return starsHtml;
}

// Document Ready Initialization
document.addEventListener("DOMContentLoaded", () => {
    injectCartDrawer();
    updateHeaderBadges();

    // Listen for storage changes across tabs
    window.addEventListener("storage", (e) => {
        if (e.key === STORAGE_KEYS.CART || e.key === STORAGE_KEYS.WISHLIST) {
            updateHeaderBadges();
            renderCartDrawer();
        }
    });
});
