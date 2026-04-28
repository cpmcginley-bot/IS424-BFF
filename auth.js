// auth.js
// Handles Google Sign-In, Sign-Out, and writing new users to Firestore.
// Relies on window.BFFFirebase set by firebase-init.js.

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Wait for firebase-init.js to expose window.BFFFirebase
// (both are type="module" so execution order is guaranteed by script tag order)
const { auth, db } = window.BFFFirebase;
const provider = new GoogleAuthProvider();

// ── UI elements ──────────────────────────────────────────────────────────────
const authSection = document.getElementById("auth-section");
const profileSection = document.getElementById("profile-section");
const userPhoto = document.getElementById("user-photo");
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");

// ── Sign in / Sign up (same Google popup flow) ───────────────────────────────
async function handleGoogleSignIn() {
  try {
    const result = await signInWithPopup(auth, provider);
    // onAuthStateChanged below will handle the UI update
  } catch (err) {
    // err.code === "auth/popup-closed-by-user" just means they closed it — not a real error
    if (err.code !== "auth/popup-closed-by-user") {
      document.getElementById("signin-error").textContent = err.message;
      document.getElementById("signin-error").style.display = "block";
    }
  }
}

document
  .getElementById("google-signin-btn")
  .addEventListener("click", handleGoogleSignIn);
document
  .getElementById("google-signup-btn")
  .addEventListener("click", handleGoogleSignIn);

// ── Sign out ─────────────────────────────────────────────────────────────────
document.getElementById("signout-btn").addEventListener("click", async () => {
  await signOut(auth);
});

// ── Auth state listener ───────────────────────────────────────────────────────
// This runs automatically on page load AND whenever the user signs in or out.
// It is the single place that controls which UI is visible.
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // ── Logged in ────────────────────────────────────────────────────────────
    showProfile(user);
    await saveUserToFirestore(user);
  } else {
    // ── Logged out ───────────────────────────────────────────────────────────
    showAuthCards();
  }
});

// ── Helper: show the logged-in profile card ──────────────────────────────────
function showProfile(user) {
  authSection.style.display = "none";
  profileSection.style.display = "";

  userName.textContent = user.displayName || "BFF Member";
  userEmail.textContent = user.email || "";

  if (user.photoURL) {
    userPhoto.src = user.photoURL;
    userPhoto.style.display = "inline-block";
  }
}

// ── Helper: show the sign-in / sign-up cards ─────────────────────────────────
function showAuthCards() {
  authSection.style.display = "";
  profileSection.style.display = "none";
}

// ── Helper: write new user to Firestore (D1 users collection) ────────────────
// Uses setDoc with merge:true so returning users don't overwrite their data.
async function saveUserToFirestore(user) {
  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    // First time this user has signed in — create their document
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName || "",
      email: user.email || "",
      photoURL: user.photoURL || "",
      role: "member", // default role; admin can change this later
      joinedAt: new Date().toISOString(),
    });
  }
  // If they already exist, do nothing — don't overwrite their role or other data
}
