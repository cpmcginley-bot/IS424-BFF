import {
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

let adminModal = document.getElementById("admin-modal");
let adminOpenBtn = document.getElementById("admin-open-btn");
let adminCloseBtn = document.getElementById("admin-close-btn");
let adminCancelBtn = document.getElementById("admin-cancel-btn");
let modalBackground = document.querySelector("#admin-modal .modal-background");
let adminLoginBtn = document.getElementById("admin-login-btn");
let adminEmail = document.getElementById("admin-email");
let adminPassword = document.getElementById("admin-password");
let adminLoginError = document.getElementById("admin-login-error");
let auth = window.BFFFirebase.auth;

function openAdminModal() {
  adminModal.classList.add("is-active");
}

function closeAdminModal() {
  adminModal.classList.remove("is-active");
  adminLoginError.style.display = "none";
}

async function signInAdmin() {
  let email = adminEmail.value.trim();
  let password = adminPassword.value;

  if (!email || !password) {
    adminLoginError.textContent = "Please enter an email and password.";
    adminLoginError.style.display = "block";
    return;
  }

  adminLoginBtn.disabled = true;
  adminLoginBtn.textContent = "Signing In...";

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "admin.html";
  } catch (err) {
    console.error("Admin sign in failed:", err);
    adminLoginError.textContent =
      "Admin sign in failed. Please check your email and password.";
    adminLoginError.style.display = "block";
    adminLoginBtn.disabled = false;
    adminLoginBtn.textContent = "Sign In";
  }
}

adminOpenBtn.addEventListener("click", openAdminModal);
adminCloseBtn.addEventListener("click", closeAdminModal);
adminCancelBtn.addEventListener("click", closeAdminModal);
modalBackground.addEventListener("click", closeAdminModal);
adminLoginBtn.addEventListener("click", signInAdmin);
