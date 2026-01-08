let dataPemain = [
  {
    id: 1,
    namaPemain: "Lionel Messi",
    nomorPunggung: 10,
    email: "messi@intermiami.com",
    klub: "Inter Miami",
  },
  {
    id: 2,
    namaPemain: "Cristiano Ronaldo",
    nomorPunggung: 7,
    email: "ronaldo@alnassr.com",
    klub: "Al Nassr",
  },
  {
    id: 3,
    namaPemain: "Kylian Mbappe",
    nomorPunggung: 7,
    email: "mbappe@psg.com",
    klub: "PSG",
  },
];

const daftarPemain = document.getElementById("daftar-kontak");
const formPemain = document.getElementById("formKontak");

formPemain.addEventListener("submit", tambahPemain);
window.hapusPemain = hapusPemain;

function tampilkanPemain() {
  const data = ambilDariLocalStorage();
  data === null ? simpanKeLocalStorage(dataPemain) : (dataPemain = data);

  daftarPemain.innerHTML = dataPemain
    .map(
      (pemain) => `
      <li class="border my-2 rounded-md p-2">
        <h1>${pemain.namaPemain}</h1>
        <p>${pemain.nomorPunggung}</p>
        <p>${pemain.email}</p>
        <p>${pemain.klub}</p>
        <button
          onclick="hapusPemain(${pemain.id})"
          class="border text-white bg-red-400 rounded-lg px-2 py-1 mt-2"
        >
          Hapus
        </button>
      </li>
    `
    )
    .join("");
}

function buatIdPemain() {
  return dataPemain[dataPemain.length - 1].id + 1;
}

function tambahPemain(e) {
  e.preventDefault();

  const formData = new FormData(formPemain);

  const pemainBaru = {
    id: buatIdPemain(),
    namaPemain: formData.get("nama"),
    nomorPunggung: formData.get("nomor"),
    email: formData.get("email"),
    klub: formData.get("kota"),
  };

  dataPemain.push(pemainBaru);
  simpanKeLocalStorage(dataPemain);
  tampilkanPemain();
  formPemain.reset();
}

function hapusPemain(id) {
  dataPemain = dataPemain.filter((pemain) => pemain.id !== id);
  simpanKeLocalStorage(dataPemain);
  tampilkanPemain();
}

function simpanKeLocalStorage(data) {
  localStorage.setItem("kontak", JSON.stringify(data));
}

function ambilDariLocalStorage() {
  const data = localStorage.getItem("kontak");
  return data ? JSON.parse(data) : null;
}

tampilkanPemain();