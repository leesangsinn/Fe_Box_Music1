/* ==============================
   DANH SÁCH TÀI KHOẢN DO ADMIN CẤP (DEMO)
   ============================== */

const ADMIN_USERS = [
  {
    username: "admin",
    password: "admin123",
    role: "admin"
  },
  {
    username: "staff01",
    password: "123456",
    role: "staff"
  }
];

/* ==============================
   LOGIN
   ============================== */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Validate rỗng
    if (!username || !password) {
      alert("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!");
      return;
    }

    // Kiểm tra tài khoản do admin cấp
    const user = ADMIN_USERS.find(
      u => u.username === username && u.password === password
    );

    if (!user) {
      alert("Sai tên đăng nhập hoặc mật khẩu!");
      return;
    }

    // Lưu trạng thái đăng nhập (demo)
    localStorage.setItem("currentUser", JSON.stringify(user));

    alert(`Đăng nhập thành công (${user.role})`);
    window.location.href = "index.html";
  });
}

/* ==============================
   FORGOT PASSWORD
   ============================== */

const forgotForm = document.getElementById("forgotForm");

if (forgotForm) {
  forgotForm.addEventListener("submit", function (e) {
    e.preventDefault();

    alert(
      "Yêu cầu đặt lại mật khẩu đã được gửi tới quản trị viên.\nVui lòng chờ admin cấp lại mật khẩu."
    );

    window.location.href = "login.html";
  });
}
