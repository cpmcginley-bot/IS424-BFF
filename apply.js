// apply.js
// Reads the application form, writes a new doc to the D2 applications collection.
// Relies on window.BFFFirebase set by firebase-init.js.

import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const { db } = window.BFFFirebase;

document.getElementById("submit-btn").addEventListener("click", async () => {
  // -- Read values from the form --
  const name = document.getElementById("app-name").value.trim();
  const email = document.getElementById("app-email").value.trim();
  const major = document.getElementById("app-major").value.trim();
  const year = document.getElementById("app-year").value;
  const why = document.getElementById("app-why").value.trim();

  // -- Basic validation: make sure nothing is empty --
  if (!name || !email || !major || !year || !why) {
    document.getElementById("app-error").style.display = "block";
    return;
  }

  // -- Disable button so they can't double-submit --
  const btn = document.getElementById("submit-btn");
  btn.disabled = true;
  btn.textContent = "Submitting...";

  try {
    // -- Write to Firestore D2 applications collection --
    await addDoc(collection(db, "applications"), {
      name: name,
      email: email,
      major: major,
      year: year,
      why: why,
      status: "pending", // admin can later change to "accepted" or "rejected"
      submittedAt: new Date().toISOString(),
    });

    // -- Hide the form, show the success message --
    document.getElementById("app-form").style.display = "none";
    document.getElementById("app-success").style.display = "block";
  } catch (err) {
    // -- Something went wrong with Firestore --
    console.error("Application submission failed:", err);
    btn.disabled = false;
    btn.textContent = "Submit Application";
    document.getElementById("app-error").textContent =
      "Something went wrong. Please try again.";
    document.getElementById("app-error").style.display = "block";
  }
});
