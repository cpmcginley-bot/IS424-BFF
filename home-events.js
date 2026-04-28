import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let db = window.BFFFirebase.db;
let homeEventsList = document.getElementById("home-events-list");
let emptyMessage = document.getElementById("home-events-empty-message");

function isValidEvent(eventData) {
  if (!eventData.title || !eventData.date || !eventData.time) {
    return false;
  }

  if (!eventData.location || !eventData.description || !eventData.lumaLink) {
    return false;
  }

  if (typeof eventData.date !== "string" || typeof eventData.time !== "string") {
    return false;
  }

  return eventData.date.includes("-") && eventData.time.includes(":");
}

function isUpcomingEvent(eventData) {
  if (!isValidEvent(eventData)) {
    return false;
  }

  let today = new Date();
  let dateParts = eventData.date.split("-");
  let year = Number(dateParts[0]);
  let month = Number(dateParts[1]) - 1;
  let day = Number(dateParts[2]);
  let eventDate = new Date(year, month, day, 23, 59, 59);

  return eventDate >= today;
}

function formatEventDate(dateValue) {
  if (typeof dateValue !== "string" || !dateValue.includes("-")) {
    return "No date";
  }

  let dateParts = dateValue.split("-");
  let year = Number(dateParts[0]);
  let month = Number(dateParts[1]) - 1;
  let day = Number(dateParts[2]);
  let eventDate = new Date(year, month, day);

  return eventDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatEventTime(timeValue) {
  if (typeof timeValue !== "string" || !timeValue.includes(":")) {
    return "No time";
  }

  let timeParts = timeValue.split(":");
  let hour = Number(timeParts[0]);
  let minute = timeParts[1];
  let period = "AM";

  if (hour >= 12) {
    period = "PM";
  }

  if (hour === 0) {
    hour = 12;
  } else if (hour > 12) {
    hour = hour - 12;
  }

  return hour + ":" + minute + " " + period;
}

function makeHomeEventBox(eventData) {
  let box = document.createElement("div");
  box.className = "box mb-4";

  let title = document.createElement("p");
  title.className = "has-text-weight-semibold is-size-5";
  title.textContent = eventData.title;

  let details = document.createElement("p");
  details.className = "has-text-grey";
  details.textContent =
    (eventData.displayDate || formatEventDate(eventData.date)) +
    " · " +
    (eventData.displayTime || formatEventTime(eventData.time)) +
    " · " +
    eventData.location;

  let description = document.createElement("p");
  description.className = "mt-2";
  description.textContent = eventData.description;

  box.appendChild(title);
  box.appendChild(details);
  box.appendChild(description);

  return box;
}

async function loadHomeEvents() {
  try {
    let eventDocs = await getDocs(collection(db, "events"));
    let events = [];

    eventDocs.forEach((eventDoc) => {
      let eventData = eventDoc.data();

      if (isValidEvent(eventData) && isUpcomingEvent(eventData)) {
        events.push(eventData);
      }
    });

    if (events.length === 0) {
      return;
    }

    events.sort((firstEvent, secondEvent) => {
      return firstEvent.date.localeCompare(secondEvent.date);
    });

    emptyMessage.style.display = "none";
    homeEventsList.innerHTML = "";

    events.slice(0, 2).forEach((eventData) => {
      homeEventsList.appendChild(makeHomeEventBox(eventData));
    });
  } catch (err) {
    console.error("Could not load homepage events:", err);
  }
}

loadHomeEvents();
