---
id: doc7
title: Deploying Your Next.js App
slug: deploying-your-nextjs-app
---

Dalam pelajaran dasar terakhir ini, kita akan menggunakan aplikasi Next.js untuk produksi.

Kita akan belajar bagaimana menggunakan Next.js ke [Vercel](https://vercel.com/), _the Jamstack deployment platform_ yang dibangun oleh pembuat Next.js. Kami juga akan berbicara tentang opsi deployment lainnya.

:::note
Prasyarat : Anda harus memiliki [akun GitHub](https://github.com/) untuk pelajaran ini.
:::

### Apa yang akan Anda Pelajari dalam Pelajaran Ini

Dalam pelajaran ini, Anda akan belajar:

- Bagaimana cara men-deploy aplikasi Next.js Anda ke Vercel .
- The DPS Workflow: Develop, Preview, and Ship.
- Bagaimana cara men-deploy aplikasi Next.js Anda ke penyedia hosting Anda sendiri.

### Push ke GitHub

Sebelum kita deploy, push aplikasi Next.js ke [GitHub](https://github.com/vercel/next.js) jika Anda belum melakukannya. Ini akan membuat deployment lebih mudah.

- Di akun GitHub pribadi Anda, buat repositori baru bernama `nextjs-blog`.
- Repositori dapat bersifat publik atau pribadi. Anda **tidak** perlu menginisialisasi dengan README atau file lain.
- Jika Anda butuh bantuan, lihat [panduan ini di GitHub](https://help.github.com/en/github/getting-started-with-github/create-a-repo).

Kemudian:

- Jika Anda belum menginisialisasi repositori git secara lokal untuk aplikasi Next.js Anda, lakukan sekarang.
- Push aplikasi Next.js ke repositori GitHub ini.

Untuk melakukan push ke GitHub, Anda dapat menjalankan perintah berikut (ganti `<username>` dengan nama pengguna GitHub Anda):

```bash
git remote add origin https://github.com/<username>/nextjs-blog.git
git push -u origin master
```

### Deploy ke Vercel

Cara termudah untuk men-deploy Next.js ke produksi adalah dengan menggunakan platform [Vercel](https://vercel.com/) yang dikembangkan oleh pencipta Next.js.

Vercel adalah semua-dalam-satu platform dengan Global CDN yang mendukung statis & deployment JAMstack dan Serverless Functions. Kami percaya Vercel adalah tempat yang optimal untuk men-deploy aplikasi Next.js. Anda dapat mulai menggunakannya secara **gratis** - tidak memerlukan kartu kredit.

### Buat Akun Vercel

Pertama, buka [https://vercel.com/signup](https://vercel.com/signup) untuk membuat akun Vercel. Pilih **Continue with GitHub** dan lakukan proses pendaftaran.

### Impor repositori `nextjs-blog` Anda

Setelah Anda mendaftar, **impor** repositori `nextjs-blog` Anda di Vercel. Anda dapat melakukannya dari sini: [https://vercel.com/import/git](https://vercel.com/import/git).

- Anda harus **Install Vercel for GitHub**. Anda dapat memberikannya akses ke **Semua Repositori**.
- Setelah Anda menginstal Vercel, impor `nextjs-blog`.

Anda dapat menggunakan nilai default untuk pengaturan berikut - tidak perlu mengubah apa pun. Vercel secara otomatis mendeteksi bahwa Anda memiliki aplikasi Next.js dan memilih pengaturan build optimal untuk Anda.

- Project Name
- Root Directory
- Build Command
- Output Directory
- Development Command

Ketika melakukan deploy, aplikasi Next.js Anda akan mulai membangun. Itu harus selesai dalam waktu kurang dari satu menit.

:::note
Jika deployment Anda gagal, Anda selalu dapat memperoleh bantuan pada [Diskusi GitHub](https://github.com/vercel/next.js/discussions). Untuk mempelajari lebih lanjut tentang deployment, lihat [dokumentasi kami](https://nextjs.org/docs/deployment).
:::

Setelah selesai, Anda akan mendapatkan **deployment URLs**. Klik salah satu URL dan Anda akan melihat halaman starter Next.js langsung.

Selamat! Anda baru saja menggunakan aplikasi Next.js Anda untuk produksi. Berikutnya, kita akan masuk ke detail Vercel dan alur kerja yang direkomendasikan.

### Next.js dan Vercel

Vercel dibuat oleh creator Next.js dan memiliki dukungan _first-class_ untuk Next.js. Ketika Anda men-deploy aplikasi Next.js Anda ke Vercel, berikut ini yang terjadi secara default:

- Halaman yang menggunakan Static Generation dan assets (JS, CSS, gambar, font, dll.) Akan secara otomatis disajikan dari Vercel Edge Network, yang sangat cepat.
- Halaman yang menggunakan Server-Side Rendering dan API Routes akan secara otomatis menjadi [Serverless Functions](https://vercel.com/docs/v2/serverless-functions/introduction) yang terisolasi. Ini memungkinkan rendering halaman dan permintaan API untuk skala secara tak terbatas.

Vercel memiliki lebih banyak fitur, seperti:

- **Custom Domains**: Setelah melakukan deploy di Vercel, Anda dapat menetapkan domain khusus untuk aplikasi Next.js Anda. Lihatlah dokumentasi [di sini](https://vercel.com/docs/v2/custom-domains).
- **Environment Variables**: Anda juga dapat mengatur environment variables di Vercel. Lihatlah [dokumentasi di sini](https://vercel.com/docs/v2/build-step#environment-variables). Anda kemudian dapat menggunakan environment variables tersebut di aplikasi Next.js Anda.
- **Automatic HTTPS**: HTTPS diaktifkan secara default (termasuk domain khusus) dan tidak memerlukan konfigurasi tambahan. Kami memperbarui sertifikat SSL secara otomatis.

### Preview Deployment for Every Push

:::note
Langkah-langkah di bawah ini **opsional** - Anda dapat mencobanya atau hanya membacanya.
:::

Setelah menggunakan Vercel , coba lakukan hal berikut jika Anda dapat:

- Buat **branch** baru di aplikasi Anda.
- Buat beberapa perubahan dan push ke GitHub.
- Buat **pull request** baru ( [halaman bantuan GitHub](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) ).

Anda akan melihat komentar `vercel` bot di halaman pull request.

![](https://nextjs.org/static/images/learn/deploying-nextjs-app/vercel-bot.png)

Coba klik pada **Preview** URL di dalam komentar ini. Anda akan melihat perubahan yang baru saja Anda buat.

Ketika Anda memiliki pull request terbuka, Vercel secara otomatis membuat **preview deployment** untuk branch tersebut di setiap push. Preview URL akan selalu mengarah ke preview deployment terbaru.

Anda dapat membagikan Preview URL ini dengan kolaborator Anda dan mendapatkan umpan balik langsung.

Jika preview deployment Anda terlihat bagus, **gabungkan/merge** menjadi `master`. Ketika Anda melakukan ini, Vercel secara otomatis membuat *production deployment*.

### Develop, Preview, Ship

Kita baru saja melewati alur kerja yang kami sebut DPS: Develop, Preview, and Ship.

- **Develop**: Kita telah menulis kode di Next.js dan menggunakan development server Next.js untuk memanfaatkan fitur hot reloading.
- **Preview**: Kita telah melakukan perubahan push ke branch di GitHub, dan Vercel membuat preview deployment yang tersedia melalui URL. Kita dapat membagikan preview URL ini dengan orang lain untuk mendapat umpan balik. Selain melakukan **code reviews**, Anda dapat melakukan *deployment previews*.
- **Ship**: Kita telah menggabungkan pull request `master` untuk mengirim ke produksi.

Kami sangat menyarankan untuk menggunakan alur kerja ini ketika mengembangkan aplikasi Next.js - ini akan membantu Anda beralih ke aplikasi Anda lebih cepat.

### Opsi Hosting Lainnya

Next.js dapat digunakan untuk penyedia hosting yang mendukung Node.js.

Jika Anda telah mengikuti instruksi sejauh ini, `package.json` Anda harus memiliki skrip `build` dan `start`:

```javascript
{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
}
```

Di penyedia hosting Anda sendiri, jalankan skrip `build` sekali, yang membangun aplikasi produksi di folder `.next`.

```bash
npm run build
```

Setelah membangun, skrip `start` memulai server Node.js yang mendukung halaman hybrid, melayani halaman yang dibuat secara statis dan yang diberikan sisi server. Server juga mendukung API Routes.

```bash
npm run start
```

:::note
Anda dapat menyesuaikan `start` pada script `package.json` untuk menerima parameter `PORT` dengan memperbarui sebagai: `"start": "next start -p $PORT"`.
:::