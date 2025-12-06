// ===============================
// KONSTANTA LOCAL STORAGE
// ===============================
const STORAGE_KEY = "contactsData";


// Ambil data dari localStorage
function getContacts() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}


// Simpan data ke localStorage
function saveContacts(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}


// ============================
// RENDER DATA PADA INDEX.HTML
// ============================
function loadIndexPage() {
  const listContainer = document.getElementById("contactList");
  if (!listContainer) return;

  const contacts = getContacts();
  listContainer.innerHTML = "";

  // Jika data kosong
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

  // Render semua data
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


// ============================
// HAPUS KONTAK
// ============================
function deleteContact(id) {
  const contacts = getContacts();
  const updated = contacts.filter(c => c.id !== id);
  saveContacts(updated);
  loadIndexPage();
}


// ============================
// PINDAH KE HALAMAN EDIT
// ============================
function goToEdit(id) {
  window.location.href = `edit.html?id=${id}`;
}


// ============================
// FORM TAMBAH (tambah.html)
// ============================
function handleTambahForm() {
  const form = document.getElementById("addForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const newContact = {
      id: Date.now(), // ID angka
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


// ====================================
// HALAMAN EDIT KONTAK (edit.html)
// ====================================
if (document.getElementById("formEdit")) {
  const formEdit = document.getElementById("formEdit");

  // Ambil ID kontak dari URL
  const urlParams = new URLSearchParams(window.location.search);
  const contactId = parseInt(urlParams.get("id"));

  if (!contactId && contactId !== 0) {
    alert("ID kontak tidak ditemukan!");
  } else {
    // Ambil list kontak
    const contacts = getContacts();
    const contact = contacts[contactId];

    // Cek apakah kontak ada
    if (!contact) {
      alert("Kontak tidak ditemukan!");
      window.location.href = "index.html";
    }

    // Isi form dengan data kontak
    formEdit.nama.value = contact.nama;
    formEdit.email.value = contact.email;
    formEdit.telepon.value = contact.telepon;
    formEdit.alamat.value = contact.alamat;
    formEdit.pekerjaan.value = contact.pekerjaan;

    // Saat form disubmit – UPDATE DATA
    formEdit.addEventListener("submit", function (e) {
      e.preventDefault();

      // Update value
      contact.nama = formEdit.nama.value;
      contact.email = formEdit.email.value;
      contact.telepon = formEdit.telepon.value;
      contact.alamat = formEdit.alamat.value;
      contact.pekerjaan = formEdit.pekerjaan.value;

      // Simpan ke localStorage
      contacts[contactId] = contact;
      saveContacts(contacts);

      alert("Kontak berhasil diperbarui!");

      // Redirect ke halaman utama
      window.location.href = "index.html";
    });
  }
}

// ============================
// DETEKSI HALAMAN & JALANKAN
// ============================
document.addEventListener("DOMContentLoaded", () => {
  loadIndexPage();
  handleTambahForm();
  loadEditPage();
});
