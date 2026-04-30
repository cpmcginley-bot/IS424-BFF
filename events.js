import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let db = window.BFFFirebase.db;
let eventsList = document.getElementById("events-list");
let emptyMessage = document.getElementById("events-empty-message");

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

function makeEventCard(eventData) {
  let column = document.createElement("div");
  column.className = "column";

  let card = document.createElement("div");
  card.className = "card home-info-card event-info-card";

  let cardContent = document.createElement("div");
  cardContent.className = "card-content";

  let title = document.createElement("p");
  title.className = "title is-4 has-text-white";
  title.textContent = eventData.title;

  let date = document.createElement("p");
  date.className = "has-text-grey mb-2";
  date.textContent =
    (eventData.displayDate || formatEventDate(eventData.date)) +
    " · " +
    (eventData.displayTime || formatEventTime(eventData.time));

  let location = document.createElement("p");
  location.className = "has-text-grey mb-3";
  location.textContent = eventData.location;

  let description = document.createElement("p");
  description.className = "content is-size-5";
  description.textContent = eventData.description;

  let rsvpLink = document.createElement("a");
  rsvpLink.className = "button is-light bff-red-text has-text-weight-semibold";
  rsvpLink.href = eventData.lumaLink;
  rsvpLink.target = "_blank";
  rsvpLink.textContent = "RSVP on Luma";

  cardContent.appendChild(title);
  cardContent.appendChild(date);
  cardContent.appendChild(location);
  cardContent.appendChild(description);
  cardContent.appendChild(rsvpLink);
  card.appendChild(cardContent);
  column.appendChild(card);

  return column;
}

async function loadEvents() {
  try {
    let eventDocs = await getDocs(collection(db, "events"));

    if (eventDocs.empty) {
      return;
    }

    emptyMessage.style.display = "none";
    eventsList.innerHTML = "";

    eventDocs.forEach((eventDoc) => {
      let eventData = eventDoc.data();

      if (isValidEvent(eventData) && isUpcomingEvent(eventData)) {
        eventsList.appendChild(makeEventCard(eventData));
      }
    });

    if (eventsList.children.length === 0) {
      eventsList.appendChild(emptyMessage.parentElement);
      emptyMessage.style.display = "";
    }
  } catch (err) {
    console.error("Could not load events:", err);
  }
}

loadEvents();
