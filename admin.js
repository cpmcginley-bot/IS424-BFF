import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let auth = window.BFFFirebase.auth;
let db = window.BFFFirebase.db;

let logoutBtn = document.getElementById("admin-logout-btn");
let createEventBtn = document.getElementById("create-event-btn");
let eventError = document.getElementById("event-error");
let eventSuccess = document.getElementById("event-success");
let adminEventsList = document.getElementById("admin-events-list");
let adminEventsEmptyMessage = document.getElementById(
  "admin-events-empty-message",
);
let deleteEventMessage = document.getElementById("delete-event-message");
let applicationMessage = document.getElementById("application-message");
let pendingApplicationsList = document.getElementById(
  "pending-applications-list",
);
let acceptedApplicationsList = document.getElementById(
  "accepted-applications-list",
);
let rejectedApplicationsList = document.getElementById(
  "rejected-applications-list",
);
let pendingApplicationsEmpty = document.getElementById(
  "pending-applications-empty",
);
let acceptedApplicationsEmpty = document.getElementById(
  "accepted-applications-empty",
);
let rejectedApplicationsEmpty = document.getElementById(
  "rejected-applications-empty",
);

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

function makeAdminEventItem(eventId, eventData) {
  let box = document.createElement("div");
  box.className = "box";

  let title = document.createElement("p");
  title.className = "has-text-weight-semibold is-size-5";
  title.textContent = eventData.title || "Untitled Event";

  let details = document.createElement("p");
  details.className = "has-text-grey mb-3";

  let dateText = "No date";
  let timeText = "No time";
  let locationText = eventData.location || "No location";

  if (eventData.displayDate) {
    dateText = eventData.displayDate;
  } else if (typeof eventData.date === "string" && eventData.date.includes("-")) {
    dateText = formatEventDate(eventData.date);
  }

  if (eventData.displayTime) {
    timeText = eventData.displayTime;
  } else if (typeof eventData.time === "string" && eventData.time.includes(":")) {
    timeText = formatEventTime(eventData.time);
  }

  details.textContent = dateText + " · " + timeText + " · " + locationText;

  let deleteBtn = document.createElement("button");
  deleteBtn.className = "button is-danger is-light has-text-weight-semibold";
  deleteBtn.type = "button";
  deleteBtn.textContent = "Delete Event";

  deleteBtn.addEventListener("click", async () => {
    await deleteDoc(doc(db, "events", eventId));
    deleteEventMessage.style.display = "block";
    loadAdminEvents();
  });

  box.appendChild(title);
  box.appendChild(details);
  box.appendChild(deleteBtn);

  return box;
}

async function loadAdminEvents() {
  try {
    adminEventsEmptyMessage.textContent = "Loading events...";
    adminEventsEmptyMessage.style.display = "";

    let eventDocs = await getDocs(collection(db, "events"));

    adminEventsList.innerHTML = "";

    if (eventDocs.empty) {
      adminEventsEmptyMessage.textContent = "No events have been created yet.";
      adminEventsList.appendChild(adminEventsEmptyMessage);
      adminEventsEmptyMessage.style.display = "";
      return;
    }

    eventDocs.forEach((eventDoc) => {
      let eventData = eventDoc.data();
      adminEventsList.appendChild(makeAdminEventItem(eventDoc.id, eventData));
    });

    if (adminEventsList.children.length === 0) {
      adminEventsEmptyMessage.textContent = "No events could be displayed.";
      adminEventsList.appendChild(adminEventsEmptyMessage);
      adminEventsEmptyMessage.style.display = "";
    }
  } catch (err) {
    console.error("Could not load admin events:", err);
    adminEventsList.innerHTML = "";
    adminEventsEmptyMessage.textContent =
      "Could not load events: " + err.message;
    adminEventsList.appendChild(adminEventsEmptyMessage);
    adminEventsEmptyMessage.style.display = "";
  }
}

function makeApplicationCard(applicationId, applicationData) {
  let box = document.createElement("div");
  box.className = "box";

  let name = document.createElement("p");
  name.className = "has-text-weight-semibold is-size-5";
  name.textContent = applicationData.name || "Unnamed Applicant";

  let details = document.createElement("p");
  details.className = "has-text-grey mb-2";
  details.textContent =
    (applicationData.email || "No email") +
    " · " +
    (applicationData.major || "No major") +
    " · " +
    (applicationData.year || "No year");

  let why = document.createElement("p");
  why.className = "mb-3";
  why.textContent = applicationData.why || "No response provided.";

  box.appendChild(name);
  box.appendChild(details);
  box.appendChild(why);

  if (applicationData.status === "pending" || !applicationData.status) {
    let acceptBtn = document.createElement("button");
    acceptBtn.className = "button is-success is-light has-text-weight-semibold mr-2";
    acceptBtn.type = "button";
    acceptBtn.textContent = "Accept";

    let rejectBtn = document.createElement("button");
    rejectBtn.className = "button is-danger is-light has-text-weight-semibold";
    rejectBtn.type = "button";
    rejectBtn.textContent = "Reject";

    acceptBtn.addEventListener("click", () => {
      updateApplicationStatus(applicationId, "accepted");
    });

    rejectBtn.addEventListener("click", () => {
      updateApplicationStatus(applicationId, "rejected");
    });

    box.appendChild(acceptBtn);
    box.appendChild(rejectBtn);
  }

  return box;
}

function resetApplicationLists() {
  pendingApplicationsList.innerHTML = "";
  acceptedApplicationsList.innerHTML = "";
  rejectedApplicationsList.innerHTML = "";
}

function showEmptyApplicationMessages() {
  if (pendingApplicationsList.children.length === 0) {
    pendingApplicationsEmpty.textContent = "No pending applications.";
    pendingApplicationsList.appendChild(pendingApplicationsEmpty);
  }

  if (acceptedApplicationsList.children.length === 0) {
    acceptedApplicationsEmpty.textContent = "No accepted members yet.";
    acceptedApplicationsList.appendChild(acceptedApplicationsEmpty);
  }

  if (rejectedApplicationsList.children.length === 0) {
    rejectedApplicationsEmpty.textContent = "No rejected applications.";
    rejectedApplicationsList.appendChild(rejectedApplicationsEmpty);
  }
}

async function loadApplications() {
  try {
    resetApplicationLists();

    let applicationDocs = await getDocs(collection(db, "applications"));

    applicationDocs.forEach((applicationDoc) => {
      let applicationData = applicationDoc.data();
      let status = applicationData.status || "pending";
      let card = makeApplicationCard(applicationDoc.id, applicationData);

      if (status === "accepted") {
        acceptedApplicationsList.appendChild(card);
      } else if (status === "rejected") {
        rejectedApplicationsList.appendChild(card);
      } else {
        pendingApplicationsList.appendChild(card);
      }
    });

    showEmptyApplicationMessages();
  } catch (err) {
    console.error("Could not load applications:", err);
    resetApplicationLists();
    pendingApplicationsEmpty.textContent =
      "Could not load applications: " + err.message;
    pendingApplicationsList.appendChild(pendingApplicationsEmpty);
  }
}

async function updateApplicationStatus(applicationId, newStatus) {
  await updateDoc(doc(db, "applications", applicationId), {
    status: newStatus,
  });

  applicationMessage.style.display = "block";
  loadApplications();
}

// Protect this page. If nobody is signed in, send them back.
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "get-started.html";
  } else {
    console.log("Admin signed in:", user.email);
    loadAdminEvents();
    loadApplications();
  }
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "index.html";
});

createEventBtn.addEventListener("click", async () => {
  let title = document.getElementById("event-title").value.trim();
  let date = document.getElementById("event-date").value;
  let time = document.getElementById("event-time").value;
  let location = document.getElementById("event-location").value.trim();
  let lumaLink = document.getElementById("event-luma-link").value.trim();
  let description = document.getElementById("event-description").value.trim();

  if (!title || !date || !time || !location || !lumaLink || !description) {
    eventSuccess.style.display = "none";
    eventError.textContent =
      "Please fill out every field before creating an event.";
    eventError.style.display = "block";
    return;
  }

  let displayDate = formatEventDate(date);
  let displayTime = formatEventTime(time);

  createEventBtn.disabled = true;
  createEventBtn.textContent = "Creating...";

  try {
    await addDoc(collection(db, "events"), {
      title: title,
      date: date,
      time: time,
      displayDate: displayDate,
      displayTime: displayTime,
      location: location,
      lumaLink: lumaLink,
      description: description,
      createdAt: new Date().toISOString(),
    });

    document.getElementById("event-title").value = "";
    document.getElementById("event-date").value = "";
    document.getElementById("event-time").value = "";
    document.getElementById("event-location").value = "";
    document.getElementById("event-luma-link").value = "";
    document.getElementById("event-description").value = "";

    eventError.style.display = "none";
    eventSuccess.style.display = "block";
    loadAdminEvents();
  } catch (err) {
    console.error("Event creation failed:", err);
    eventSuccess.style.display = "none";
    eventError.textContent = "Event creation failed: " + err.message;
    eventError.style.display = "block";
  }

  createEventBtn.disabled = false;
  createEventBtn.textContent = "Create Event";
});
