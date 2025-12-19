let dataContacts = [
  {
    id: 1,
    fullName: "Robert Downey Jr",
    phone: "628111111111",
    email: "rdj@marvel.com",
    location: "New York",
  },
  {
    id: 2,
    fullName: "Chris Evans",
    phone: "628222222222",
    email: "cevans@marvel.com",
    location: "Boston",
  },
  {
    id: 3,
    fullName: "Scarlett Johansson",
    phone: "628333333333",
    email: "sjohansson@marvel.com",
    location: "Los Angeles",
  },
  {
    id: 4,
    fullName: "Chris Hemsworth",
    phone: "628444444444",
    email: "chemsworth@marvel.com",
    location: "Sydney",
  },
];

// --- DOM ---
const contactList = document.getElementById("contact-list");

// --- FUNCTION ---

function displayContacts() {
  const loadContacts = loadFromLocalStorage() || dataContacts;

  const contactListElement = loadContacts.map((contact) => {
    return `
      <li class="border w-lg my-2 rounded-md p-2">
        <h1>${contact.fullName}</h1>
        <p>${contact.phone}</p>
        <p>${contact.email}</p>
        <p>${contact.location}</p>
      </li>
    `;
  });

  contactList.innerHTML = contactListElement.join("");
}

function createNewId() {
  if (dataContacts.length === 0) return 1;
  return dataContacts[dataContacts.length - 1].id + 1;
}

function addContact(fullName, phone, email, location) {
  dataContacts.push({
    id: createNewId(),
    fullName,
    phone,
    email,
    location,
  });
  saveToLocalStorage();
  displayContacts();
}

function searchContacts(keyword) {
  const filteredContacts = dataContacts.filter((contact) =>
    contact.fullName.toLowerCase().includes(keyword.toLowerCase())
  );

  for (const contact of filteredContacts) {
    console.log(`
       🆔 : ${contact.id}
       🧑‍🦱 : ${contact.fullName}
       📱 : ${contact.phone}
       📍 : ${contact.location}
       ✉️ : ${contact.email}
    `);
  }
}

function deleteContact(id) {
  dataContacts = dataContacts.filter((contact) => contact.id !== id);
  saveToLocalStorage();
  displayContacts();
}

function updateContact(id, newContact) {
  dataContacts = dataContacts.map((contact) => {
    if (contact.id === id) {
      return { ...contact, ...newContact };
    }
    return contact;
  });
  saveToLocalStorage();
  displayContacts();
}

function saveToLocalStorage() {
  localStorage.setItem("contacts", JSON.stringify(dataContacts));
}

function loadFromLocalStorage() {
  const contactsFromStorage = localStorage.getItem("contacts");
  return contactsFromStorage ? JSON.parse(contactsFromStorage) : null;
}

// RUN PROGRAM
displayContacts();
