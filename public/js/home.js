document.addEventListener('DOMContentLoaded', function() {
    // Tạo nút hamburger menu
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        // Tạo nút hamburger
        const hamburgerMenu = document.createElement('button');
        hamburgerMenu.className = 'hamburger-menu';
        hamburgerMenu.innerHTML = `
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        `;
        navbar.appendChild(hamburgerMenu);
        
        // Tạo overlay
        const menuOverlay = document.createElement('div');
        menuOverlay.className = 'menu-overlay';
        document.body.appendChild(menuOverlay);
        
        // Lấy menu
        const navMenu = document.querySelector('.nav-links');
        
        // Xử lý sự kiện click vào nút hamburger
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Đóng menu khi click vào overlay
        menuOverlay.addEventListener('click', function() {
            hamburgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Đóng menu khi click vào các mục menu
        const navLinks = document.querySelectorAll('.nav-links li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Đóng menu khi resize về desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                hamburgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});


let currentIndex = 0;
  const track = document.getElementById("carouselTrack");
  const items = document.querySelectorAll(".food-item");
  const visibleItems = 3; // Số lượng món ăn hiển thị cùng lúc
  const itemWidth = items[0].offsetWidth + 16; // Cộng thêm margin nếu có

  function updateSlide() {
    const offset = -currentIndex * itemWidth;
    track.style.transform = `translateX(${offset}px)`;
  }

  function nextSlide() {
    const totalItems = items.length;
    if (currentIndex < totalItems - visibleItems) {
      currentIndex++;
      updateSlide();
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlide();
    }
  }
document.querySelectorAll('a[href="#contactSection"]').forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('contactSection').scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelector('a[href="#home"]').addEventListener('click', function(event) {
  event.preventDefault();
  document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
});
document.getElementById("Tinder").addEventListener("click", function () {
    window.location.href = "foodtinder.html";
});
document.getElementById("Chatbot").addEventListener("click", function () {
    window.location.href = "chatbot.html";
});
document.addEventListener('DOMContentLoaded', () => {
  const foodItems = document.querySelectorAll('.food-item');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1 
  });

  foodItems.forEach(item => {
    observer.observe(item);
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const restaurantItems = document.querySelectorAll('.restaurant-item');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1 
  });

  restaurantItems.forEach(item => {
    observer.observe(item);
  });
});

        var MenuItems = document.getElementById("MenuItems");

        MenuItems.style.maxHeight = "0px";
        
        function menutoggle() {
            if(MenuItems.style.maxHeight =="0px") {
                MenuItems.style.maxHeight = "200px";
            }
            else {
                MenuItems.style.maxHeight = "0px";
            }
        }