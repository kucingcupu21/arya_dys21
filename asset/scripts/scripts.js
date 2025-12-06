
const STORAGE_KEY = "contactsData";



function getContacts() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}



function saveContacts(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}



function loadIndexPage() {
  const listContainer = document.getElementById("contactList");
  if (!listContainer) return;

  const contacts = getContacts();
  listContainer.innerHTML = "";


  if (contacts.length === 0) {
    listContainer.innerHTML = `
      <tr>
        <td colspan="6" class="text-center py-4 text-gray-300">
          Tidak ada data kontak.
        </td>
      </tr>
    `;
    return;
  }


  contacts.forEach(contact => {
    const row = document.createElement("tr");
    row.className = "hover:bg-purple-900/30 transition";

    row.innerHTML = `
      <td class="p-3">${contact.nama}</td>
      <td class="p-3">${contact.email}</td>
      <td class="p-3">${contact.phone}</td>
      <td class="p-3">${contact.alamat}</td>
      <td class="p-3">${contact.pekerjaan}</td>

      <td class="p-3 text-center space-x-2">
        <button 
          onclick="goToEdit(${contact.id})"
          class="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-sm shadow">
          Edit
        </button>

        <button 
          onclick="deleteContact(${contact.id})"
          class="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm shadow">
          Hapus
        </button>
      </td>
    `;

    listContainer.appendChild(row);
  });
}



function deleteContact(id) {
  const contacts = getContacts();
  const updated = contacts.filter(c => c.id !== id);
  saveContacts(updated);
  loadIndexPage();
}



function goToEdit(id) {
  window.location.href = `edit.html?id=${id}`;
}



function handleTambahForm() {
  const form = document.getElementById("addForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const newContact = {
      id: Date.now(),
      nama: document.getElementById("nama").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      alamat: document.getElementById("alamat").value,
      pekerjaan: document.getElementById("pekerjaan").value,
    };

    const contacts = getContacts();
    contacts.push(newContact);
    saveContacts(contacts);

    window.location.href = "index.html";
  });
}

function loadEditPage() {
  const formEdit = document.getElementById("formEdit");
  if (!formEdit) return;




  const urlParams = new URLSearchParams(window.location.search);
  const contactId = urlParams.get("id");

  if (!contactId) {
    alert("ID kontak tidak ditemukan!");
    return;
  }

  const contacts = getContacts();
  const contact = contacts.find(c => c.id == contactId);

  if (!contact) {
    alert("Kontak tidak ditemukan!");
    window.location.href = "index.html";
    return;
  }

  formEdit.nama.value = contact.nama;
  formEdit.email.value = contact.email;
  formEdit.telepon.value = contact.phone;
  formEdit.alamat.value = contact.alamat;
  formEdit.pekerjaan.value = contact.pekerjaan;

  formEdit.addEventListener("submit", function (e) {
    e.preventDefault();

    contact.nama = formEdit.nama.value;
    contact.email = formEdit.email.value;
    contact.phone = formEdit.telepon.value;
    contact.alamat = formEdit.alamat.value;
    contact.pekerjaan = formEdit.pekerjaan.value;

    saveContacts(contacts);

    alert("Kontak berhasil diperbarui!");
    window.location.href = "index.html";
  });
}






document.addEventListener("DOMContentLoaded", () => {
  loadIndexPage();
  handleTambahForm();
  loadEditPage();
});

