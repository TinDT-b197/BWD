const container = document.getElementById('cardContainer');

function swipe(direction) {
    const topCard = container.lastElementChild;
    if (!topCard) return;

    topCard.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    topCard.style.transform = direction === 'left'
        ? 'translateX(-400px) rotate(-30deg)'
        : 'translateX(400px) rotate(30deg)';
    topCard.style.opacity = 0;

    setTimeout(() => {
        container.removeChild(topCard);
    }, 500);
}
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