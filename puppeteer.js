// puppeteer.js
// Automated browser test for the BFF website.
// Tests: page loads, application form submission, and admin modal presence.
//
// HOW TO RUN:
//   1. cd into your project folder
//   2. npm install puppeteer
//   3. node puppeteer.js

let puppeteer = require("puppeteer");

let BASE_URL = "https://badgerff.web.app";

async function go() {
  let browser = await puppeteer.launch({
    headless: false,
    slowMo: 60,
  });

  let page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  // ── TEST 1: Homepage loads ─────────────────────────────────────────────────
  console.log("TEST 1: Loading homepage...");
  await page.goto(BASE_URL, { waitUntil: "networkidle2" });
  let homeTitle = await page.title();
  console.log("  Page title:", homeTitle);
  console.log("  PASS: Homepage loaded\n");

  // ── TEST 2: Events page loads ──────────────────────────────────────────────
  console.log("TEST 2: Loading Events page...");
  await page.goto(BASE_URL + "/events.html", { waitUntil: "networkidle2" });
  let eventsTitle = await page.title();
  console.log("  Page title:", eventsTitle);
  console.log("  PASS: Events page loaded\n");

  // ── TEST 3: Get Started page loads ────────────────────────────────────────
  console.log("TEST 3: Loading Get Started page...");
  await page.goto(BASE_URL + "/get-started.html", {
    waitUntil: "networkidle2",
  });
  let getStartedTitle = await page.title();
  console.log("  Page title:", getStartedTitle);
  console.log("  PASS: Get Started page loaded\n");

  // ── TEST 4: Fill and submit the application form ───────────────────────────
  console.log("TEST 4: Filling out application form...");
  await page.type("#app-name", "Test Applicant");
  await page.type("#app-email", "test@wisc.edu");
  await page.type("#app-major", "Information Systems");
  await page.select("#app-year", "Junior");
  await page.type(
    "#app-why",
    "I am passionate about entrepreneurship and want to connect with like-minded students at UW-Madison.",
  );

  await new Promise((r) => setTimeout(r, 1000));
  await page.click("#submit-btn");
  console.log("  Clicked Submit button");

  await page.waitForSelector("#app-success", { visible: true, timeout: 8000 });
  console.log(
    "  PASS: Success message appeared — form submitted to Firestore\n",
  );

  // ── TEST 5: Admin modal opens ──────────────────────────────────────────────
  console.log("TEST 5: Opening Admin Sign In modal...");
  await page.click("#admin-open-btn");
  let adminModal = await page.$(".modal.is-active");
  if (adminModal) {
    console.log("  PASS: Admin modal opened\n");
  } else {
    console.log("  FAIL: Admin modal did not open\n");
  }

  // ── TEST 6: About page loads ───────────────────────────────────────────────
  console.log("TEST 6: Loading About page...");
  await page.goto(BASE_URL + "/about.html", { waitUntil: "networkidle2" });
  let aboutTitle = await page.title();
  console.log("  Page title:", aboutTitle);
  console.log("  PASS: About page loaded\n");

  console.log("All tests complete. Closing browser in 5 seconds...");
  await new Promise((r) => setTimeout(r, 5000));
  await browser.close();
}

go();
