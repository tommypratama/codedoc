---
id: doc4
title: Pre-rendering and Data Fetching
slug: pre-rendering-and-data-fetching
---

Sejauh ini kita belum menambahkan konten blog. Dalam pelajaran ini, kita akan belajar cara mengambil data blog eksternal ke dalam aplikasi kita. Kita akan menyimpan konten blog dalam sistem file, tetapi akan berfungsi jika konten disimpan di tempat lain (mis. database atau Headless CMS).

### Apa yang akan Anda Pelajari dalam Pelajaran Ini

Dalam pelajaran ini, Anda akan belajar tentang:

- Fitur pre-rendering Next.js.
- Dua bentuk pre-rendering: Static Generation dan Server-side Rendering.
- Static Generation dengan dan tanpa data.
- `getStaticProps` dan bagaimana menggunakannya untuk mengimpor data blog eksternal ke halaman indeks.
- Beberapa informasi bermanfaat tentang `getStaticProps`.

## Pre-rendering

Sebelum kita berbicara tentang **data fetching**, mari kita bicara tentang salah satu konsep paling penting di Next.js: **Pre-rendering**.

Secara default, Next.js melakukan pre-renders setiap halaman. Ini berarti bahwa Next.js menghasilkan HTML untuk setiap halaman di muka, alih-alih semuanya dilakukan oleh JavaScript pada sisi klien. Pre-rendering dapat menghasilkan kinerja dan SEO yang lebih baik.

Setiap HTML yang dihasilkan dikaitkan dengan kode JavaScript minimal yang diperlukan untuk halaman itu. Ketika sebuah halaman dimuat oleh browser, kode JavaScript-nya berjalan dan membuat halaman itu sepenuhnya interaktif. (Proses ini disebut **hydration**.)

### Periksa Pre-rendering Sedang Terjadi

Anda dapat memeriksa bahwa pra-rendering sedang terjadi dengan mengambil langkah-langkah berikut:

- Nonaktifkan JavaScript di browser Anda (begini caranya di [Chrome](https://developers.google.com/web/tools/chrome-devtools/javascript/disable) ) dan ...
- [Coba akses halaman ini](https://next-learn-starter.now.sh/) (hasil akhir dari tutorial ini).

Anda akan melihat bahwa aplikasi Anda di-render tanpa JavaScript. Itu karena Next.js telah merender aplikasi menjadi HTML statis, memungkinkan Anda untuk melihat UI aplikasi tanpa menjalankan JavaScript.

:::note
Anda juga dapat mencoba langkah-langkah di atas `localhost`, tetapi CSS tidak akan dimuat jika Anda menonaktifkan JavaScript.
:::

Jika aplikasi Anda adalah aplikasi React.js biasa (tanpa Next.js), tidak ada pre-rendering, sehingga Anda tidak akan dapat melihat aplikasi jika Anda menonaktifkan JavaScript. Sebagai contoh:

- Aktifkan JavaScript di browser Anda dan [lihat halaman ini](https://create-react-app.now-examples.now.sh/). Ini adalah aplikasi React.js polos yang dibuat dengan [Create React App](https://create-react-app.dev/).
- Sekarang, nonaktifkan JavaScript dan akses [kembali halaman yang sama](https://create-react-app.now-examples.now.sh/).
- Anda tidak akan melihat aplikasi lagi - sebagai gantinya, ia akan mengatakan "Anda harus mengaktifkan JavaScript untuk menjalankan aplikasi ini." Ini karena aplikasi tidak dirender menjadi HTML statis.

### Ringkasan: Pre-rendering vs Tanpa Pre-rendering

Berikut ringkasan dalam grafis:

![](https://nextjs.org/static/images/learn/data-fetching/pre-rendering.png)

![](https://nextjs.org/static/images/learn/data-fetching/no-pre-rendering.png)

Selanjutnya, mari kita bicara tentang **dua bentuk** pre-rendering di Next.js.