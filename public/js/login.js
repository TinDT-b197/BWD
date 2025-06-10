document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript file loaded");

  const container = document.getElementById("container");
  const registerBtn = document.getElementById("register");
  const loginBtn = document.getElementById("login");

  if (registerBtn) {
    registerBtn.addEventListener("click", () => {
      console.log("Clicked Register");
      container?.classList.add("active");
    });
  } else {
    console.error("Register button not found.");
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      console.log("Clicked Login");
      container?.classList.remove("active");
    });
  } else {
    console.error("Login button not found.");
  }

  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  // Xử lý form đăng nhập
  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      console.log("Login Form Submitted");

      const email = document.getElementById("email_login")?.value.trim().toLowerCase();
      const password = document.getElementById("password_login")?.value.trim();

      if (!email || !password) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
          

        });
        console.log("Login with:", email, password);

        const data = await res.json();
        
        if (res.ok) {
          showPopup("Đăng nhập thành công!", "success");
          showLoginNotification();
          setTimeout(() => {
            window.location.href = "Home.html";
          }, 1500);
        } else {
          alert("Đăng nhập thất bại: " + (data.error || "Lỗi không xác định"));
        }
      } catch (err) {
        console.error(err);
        alert("Lỗi kết nối server");
      }
    });
  } else {
    console.error("Login form not found.");
  }

  // Xử lý form đăng ký
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("Register Form Submitted");

      const name = document.getElementById("Name_register")?.value.trim();
      const email = document.getElementById("RegisterEmail")?.value.trim().toLowerCase();
      const password = document.getElementById("RegisterPassword")?.value.trim();

      if (!name || !email || !password) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        console.log(data);
        if (res.ok) {
          alert("Đăng ký thành công với email: " + email);
          showRegisterNotification();
        } else {
          alert("Đăng ký thất bại: " + (data.error || "Lỗi không xác định"));
        }
      } catch (err) {
        console.error(err);
        alert("Đăng ký thất bại: Lỗi kết nối server");
      }
    });
  } else {
    console.error("Register form not found.");
  }
});

// Hàm hiển thị popup khi đăng nhập thành công
function showLoginNotification() {
  const notification = document.getElementById("notification");
  if (!notification) return;
  notification.querySelector(".notification-content p").textContent = "Đăng nhập thành công!";
  notification.classList.remove("hidden");
}

// Hàm hiển thị popup khi đăng ký thành công
function showRegisterNotification() {
  const notification = document.getElementById("notification");
  if (!notification) return;
  notification.querySelector(".notification-content p").textContent = "Đăng ký thành công!";
  notification.onclick = () => {
    const container = document.getElementById("container");
    container?.classList.remove("active"); // Ẩn form đăng ký, hiện form đăng nhập
    notification.classList.add("hidden");
  }
}
function redirectToHome() {
  window.location.href = "Home.html";
}

function showPopup(message, type = "success") {
  const popup = document.getElementById("popup");
  const msg = document.getElementById("popup-message");

  popup.classList.remove("hidden", "success", "error", "warning");
  popup.classList.add(type);
  msg.textContent = message;

  setTimeout(() => {
    popup.classList.add("hidden");
  }, 3000); // popup tự ẩn sau 3 giây
}
