Nama Anggota/npm
Michael Phrigyan Hartanto/223400020
Petrus Maxmiliano/22340003

Website Pemogramman Kolaborasi berbahasa Python
Rencana Fitur Aplikasi sini :
Fitur :
1. Login
2. Tema(terang dan gelap)
4. Banyak kolaborator
5. Mengatur berapa banyak kolaborator setiap kodenya
6. Mengatur setiap kolaborator view-only mode atau tidak(hanya untuk pemilik file kode saja yang bisa mengaturnya)
7. Preview Kode

SETUP
Clone semua ini :
Frontend : https://github.com/lcgamingsby/PROYEKPEMJAR
Backend : https://github.com/lcgamingsby/ProyekPemjarBE
Database(akan ikut terclone karena di github backend) : collabdb.sql

1. Masukan database ke phpmyadmin(disarankan) dengan nama yang sama seperti filenya
2. Nyalakan XAMPP(nomor satu dan nomor dua dari atas)
Untuk Frontend :
3. npm install axios react-router-dom zustand socket.io-client
4. npm install @uiw/react-codemirror @codemirror/lang-python (Jika bermasalah seperti muncul tanda kuning maka npm audit fix)
5. npm run dev
Untuk backend(requirement minimal 1.20) :
6. go mod tidy
7. go run main.go
8. untuk mengetes tinggal buka link yang diberikan di saat npm run dev


