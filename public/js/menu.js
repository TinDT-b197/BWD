document.addEventListener('DOMContentLoaded', function() {
    console.log("Menu JS loaded"); // Để kiểm tra xem JS có hoạt động không
    
    // Lấy các phần tử DOM
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('nav ul');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (!hamburgerMenu) {
        console.error("Hamburger menu not found!");
        return;
    }
    
    // Xử lý sự kiện click vào nút hamburger
    hamburgerMenu.addEventListener('click', function() {
        console.log("Hamburger clicked"); // Để debug
        hamburgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Đóng menu khi click vào overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            hamburgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Đóng menu khi click vào các mục menu
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
            if (menuOverlay) menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});
let cart = JSON.parse(localStorage.getItem('grapeeCart')) || [];
    document.getElementById('cart-count').innerText = cart.length;

    const section = document.getElementById('product-section');
    products.forEach(item => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      productDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <p>${item.name}</p>
        <button class="add-btn" onclick="addToCart('${item.name}')">Thêm vào giỏ</button>
      `;
      section.appendChild(productDiv);
    });

    function addToCart(item) {
      cart.push(item);
      localStorage.setItem('grapeeCart', JSON.stringify(cart));
      document.getElementById('cart-count').innerText = cart.length;
    }
    function showCart() {
      let countMap = {};
      cart.forEach(item => countMap[item] = (countMap[item] || 0) + 1);
      let summary = Object.entries(countMap).map(([k, v]) => `${k} (${v})`).join("\n");
      if (summary) alert("Giỏ hàng của bạn:\n" + summary);
      else alert("Giỏ hàng trống");
    }