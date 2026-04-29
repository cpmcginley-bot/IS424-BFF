// puppeteer.js
// Simple automated browser test for the BFF website.
// Tests: page loads, team page updates, application form submission,
// and admin modal presence.
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

  // ── TEST 3: Team page loads and startup spotlight exists ──────────────────
  console.log("TEST 3: Loading Team page...");
  await page.goto(BASE_URL + "/team.html", { waitUntil: "networkidle2" });
  let teamTitle = await page.title();
  console.log("  Page title:", teamTitle);

  let teamText = await page.$eval("body", (body) => body.innerText);
  if (
    teamText.includes("UW Startup Spotlight") &&
    teamText.includes("Madlease") &&
    teamText.includes("Priority") &&
    teamText.includes("Cookd")
  ) {
    console.log("  PASS: Team page startup spotlight loaded\n");
  } else {
    console.log("  FAIL: Team page startup spotlight text is missing\n");
  }

  // ── TEST 4: Get Started page loads ────────────────────────────────────────
  console.log("TEST 4: Loading Get Started page...");
  await page.goto(BASE_URL + "/get-started.html", {
    waitUntil: "networkidle2",
  });
  let getStartedTitle = await page.title();
  console.log("  Page title:", getStartedTitle);
  console.log("  PASS: Get Started page loaded\n");

  // ── TEST 5: Fill and submit the application form ──────────────────────────
  console.log("TEST 5: Filling out application form...");
  await page.waitForSelector("#app-form", { visible: true });
  await page.type("#app-name", "Puppeteer Test Applicant");
  await page.type("#app-email", "puppeteer.test@wisc.edu");
  await page.type("#app-major", "Information Systems");
  await page.select("#app-year", "Junior");
  await page.type(
    "#app-why",
    "I want to join Badger Future Founders to meet other students interested in entrepreneurship, learn from campus founders, and get feedback on startup ideas.",
  );

  await page.click("#submit-btn");
  console.log("  Clicked Submit button");

  await page.waitForSelector("#app-success", { visible: true, timeout: 10000 });
  console.log(
    "  PASS: Success message appeared — form submitted to Firestore\n",
  );

  // ── TEST 6: Admin modal opens ──────────────────────────────────────────────
  console.log("TEST 6: Opening Admin Sign In modal...");
  await page.goto(BASE_URL + "/get-started.html", {
    waitUntil: "networkidle2",
  });
  await page.click("#admin-open-btn");
  let adminModal = await page.$(".modal.is-active");
  if (adminModal) {
    console.log("  PASS: Admin modal opened\n");
  } else {
    console.log("  FAIL: Admin modal did not open\n");
  }

  // ── TEST 7: About page loads ───────────────────────────────────────────────
  console.log("TEST 7: Loading About page...");
  await page.goto(BASE_URL + "/about.html", { waitUntil: "networkidle2" });
  let aboutTitle = await page.title();
  console.log("  Page title:", aboutTitle);
  console.log("  PASS: About page loaded\n");

  console.log("All tests complete. Closing browser in 5 seconds...");
  await new Promise((r) => setTimeout(r, 5000));
  await browser.close();
}

go();
