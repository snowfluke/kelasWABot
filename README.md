# kelasWABot v1.0.0
🇮🇩 Bot Whatsapp penunjang aktivitas kelas. Bot ini diciptakan agar grup kelas di Whatsapp tidak sebatas spam stiker saja (untung saya tidak gabung grup WA kelas).
Bot ini merupakan versi Whatsapp dari Alel (bot discord) karena teman-teman sekelas habitatnya lebih memilih Whatsapp, dengan codebase dan design pattern yang tidak jauh berbeda dari Alel.

# Fitur

1. bantuan | Lihat bantuan
2. buatgrup <n*> | Buat kelompok sebanyak n anggota
3. buatnama | Buat nama acak
4. dosen <nama*> | Cari dosen
5. harga <simbol*> | Cek harga koin
6. hitung <ekspresi*> <variabel1:nilai1,...?> | Kalkulator perhitungan.
7. info | Lihat info kuliah
8. jadwal <hari?> | Lihat jadwal
9. kbbi <kata*> | Mencari kata di KBBI
10. koin <simbol*> | Cek info koin
11. listmhs | Lihat daftar mahasiswa
12. mhs <nama/nim*> | Cari mahasiswa
13. pilihkan <n1,n2,..*> | Menentukan pilihan
14. ping | Cek koneksi bot
15. stiker | Konversi gambar ke stiker
16. tl <id/en?> <teks*> | Terjemahkan teks ke en/id
17. url <link*> <namaLink*> | Memperpendek URL
18. wiki <katakunci*> | Pencarian wikipedia
19. yt <url*> | Unduh video youtube
20. ytmp3 <url*> | Unduh mp3 dari video youtube

# Pengaturan
Pengaturan utama terdapat pada folder `config/settings.json`, ubah dan sesuaikan dengan data kelas kamu. Berikut detail tabel dan lokasi konfigurasinya.

| Nama                 | Lokasi               |
|----------------------|----------------------|
| Pengaturan dasar     | config/settings.json |
| Data mahasiswa       | data/students.json   |
| Data dosen           | data/lecturers.json  |
| Data jadwal          | data/schedules.json  |
| Pengaturan pengingat | utils/crons.js       |
| Daftar perintah      | commands/*           |

## Pengaturan dasar

Silakan isi sesuai data kelas, untuk keperluan API key bisa mendaftar lalu masukkan ke pengaturan. `classGroupId` bisa diisi setelah dijalankan di local.

### API yang perlu key
1. nomics.com
2. cutt.ly

settings.json
```json
{
	"botPrefix": ".",
	"campusName": "Universitas Bot Whatsapp",
	"classGroupName": "Nama Group WA",
	"classGroupId": "ID Group WA",
	"className": "Teknik Informatika",
	"classCode": "TI",
	"classSemester": "Abadi",
	"classCategory": "A",
	"classTeacher": "Awal Ariansyah, S.arkas, M.ager",
	"nomicsAPI": {
		"endpoint": "https://api.nomics.com/v1/currencies/ticker?",
		"key": "key=[API key dari nomics disini]&"
	},
	"libretranslateAPI": {
		"endpoint": "https://translate.argosopentech.com/translate"
	},
	"wikiAPI": {
		"endpoint": "https://id.wikipedia.org/w/api.php"
	},
	"youtubeDownloader": {
		"endpoint": "https://api.fastfrom.com/download"
	},
	"youtubeMp3": {
		"endpoint": "https://www.yt-download.org/api/button/mp3/"
	},
	"cuttly": {
		"endpoint": "http://cutt.ly/api/api.php?",
		"key": "key=[API key dari cuttly disini]&"
	},
	"kbbi": {
		"endpoint": "https://kateglo.com/api.php"
	}
}
```

## Pengaturan pengingat
Pengingat menggunakan cron dimana pengaturan waktunya memakai notasi asterisk.

Misal disini tertulis **30 9 * * 1** artinya setiap hari senin (1) jam (9) menit ke (30). Untuk lebih jelas cara membaca asterisk cron bisa mengunjungi https://crontab.guru/

crons.js
```js
	const Multimedia = new cron.CronJob(
		"30 9 * * 1",
		() => {
			try {
				bot.sendTextWithMentions(
					classGroupId,
					reminderText("Eksplorasi API whatsapp")
				);
			} catch (error) {
				console.log(error);
			}
		},
		null,
		true,
		"Asia/Jakarta"
	);
```

# Instalasi
Prasyarat keperluan:
1. Node.js v.17.0.0
2. No Whatsapp (jangan gunakan no utama), bisa masukkan ke dalam grup kelas
3. Heroku CLI
4. Akun Heroku, bisa mendaftar di heroku.com

## Jalankan lokal untuk mendapatkan classGroupId
1. Pastikan Node.js sudah terinstall dengan versi 17.0.0
2. Download repositori ini atau clone, kemudian extract
3. Masuk ke folder lalu buka menggunakan cmd
4. Ketikkan `yarn install` atau `npm install`
5. Jalankan dengan `yarn stat` atau `node main.js`
6. Scan QR untuk mendapatkan sesi
7. Catat **classGroupId** yang keluar lalu salin ke settings.json
8. Test bot dengan mengirim pesan ke No Whatsapp tersebut

## Host bot di Heroku
1. Pastikan heroku CLI telah terinstall
2. Pastikan sudah memiliki akun heroku
3. Silakan copy folder dari proyek local yang telah berhasil dijalankan, jangan copy folder **node_modules** dan **logs**!!
4. Buka cmd lalu ketikkan perintah `heroku create`
5. Akan muncul perintah untuk login, silakan login menggunakan akun heroku
6. Silakan jalankan kembali `heroku create` lalu catat nama proyek yang muncul, misalkan **cryptic-dawn-48835**
7. Jalankan dua perintah berikut\
`heroku buildpacks:add --index 1 https://github.com/jontewks/puppeteer-heroku-buildpack -a cryptic-dawn-48835`\
`heroku buildpacks:add --index 1 heroku/nodejs -a cryptic-dawn-48835`
8. Jalankan perintah berikut berurutan
```bash
git init
git add .
git commit -m "initial commit"
heroku git:remote -a cryptic-dawn-48835
git push heroku master
```
9. Ingat cryptic-dawn-48835 hanyalah contoh nama proyek, silakan sesuaikan dengan yang kalian buat di heroku create

# Demo
Menyusul

# Tutorial Instalasi Video
Menyusul

# Fitur yang akan datang
Dikarenakan kesibukan author, maka terdapat fitur yang belum diimplementasikan seperti

- Konversi teks ke gambar tulisan tangan
- Konversi teks ke audio
- Kalkulator konversi mata uang, bilangan digital dan timezone
- Berita harian

Bagi yang ingin membuka PR untuk menambahkan fitur diatas sangat-sangat terbuka, silakan langsung PR saja tanpa open issue.

# STMIK Komputama
