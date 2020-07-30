---
id: doc1
title: Create a Next.js App
slug: create-a-nextjs-App
---

Untuk membangun aplikasi web lengkap dengan Bereaksi dari awal, ada banyak detail penting yang perlu Anda pertimbangkan:

- Kode harus dibundel menggunakan bundler seperti webpack dan ditransformasikan menggunakan kompiler seperti Babel.
- Anda perlu melakukan optimasi produksi seperti **code splitting**.
- Anda mungkin ingin membuat pra-render secara statis beberapa halaman untuk kinerja dan SEO.
- Anda mungkin juga ingin menggunakan rendering _server-side_ atau rendering _client-side_.
- Anda mungkin harus menulis beberapa kode _server-side_ untuk menghubungkan aplikasi React Anda ke penyimpanan data Anda.

Sebuah _framework / kerangka kerja_ dapat memecahkan masalah ini. Tetapi _framework_ seperti itu harus memiliki tingkat abstraksi yang tepat - jika tidak, itu tidak akan berguna. Itu juga harus memiliki _"Pengembang Berpengalaman"_ yang hebat, memastikan Anda dan tim Anda memiliki pengalaman yang luar biasa saat menulis kode.

## Next.js: The React Framework

Next.js memberikan solusi untuk semua masalah di atas. Tetapi yang lebih penting, ini menempatkan Anda dan tim Anda di jurang kesuksesan ketika membangun aplikasi Bereaksi.

Next.js memiliki _"Pengembang Berpengalaman"_ terbaik di kelasnya dan banyak fitur bawaan; contoh dari mereka adalah:

- Routing system berbasis halaman yang intuitif (dengan dukungan untuk dynamic routes)
- Pra-rendering, baik static generation (SSG) dan server-side rendering (SSR) didukung pada basis per halaman
- Code splitting otomatis untuk memuat halaman lebih cepat
- Client-side routing dengan prefetching yang dioptimalkan
- Dukungan CSS dan Sass bawaan, dan dukungan untuk perpustakaan CSS-in-JS apa pun
- Lingkungan pengembangan yang mendukung _Hot Module Replacement_
- API routes untuk membangun API endpoints dengan Serverless Functions
- Fully extendable

Next.js digunakan di puluhan ribu situs web dan aplikasi web yang sudah produksi, termasuk banyak merek terbesar di dunia.

## Tentang Tutorial Ini

Kursus interaktif gratis ini akan memandu Anda bagaimana cara memulai dengan Next.js.

Dalam tutorial ini, Anda akan mempelajari dasar-dasar Next.js dengan membuat aplikasi blog yang sangat sederhana . Berikut ini contoh hasil akhirnya:

https://next-learn-starter.now.sh ( [sumber](https://github.com/vercel/next-learn-starter/tree/master/demo) )

Ayo mulai!

:::note
Tutorial ini mengasumsikan pengetahuan dasar tentang JavaScript dan React. Jika Anda belum pernah menulis kode React, Anda harus melalui [tutorial React dari website resminya](https://reactjs.org/tutorial/tutorial.html) terlebih dahulu.

Jika Anda mencari dokumentasi Next.js, klik [di sini](https://nextjs.org/docs/getting-started) .
:::

## Buat aplikasi Next.js

Untuk membuat aplikasi Next.js, buka terminal Anda, `cd` ke direktori tempat Anda ingin membuat aplikasi, dan jalankan perintah berikut:

```bash
npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn-starter/tree/master/learn-starter"
```

## Jalankan development server

Anda sekarang memiliki direktori baru bernama `nextjs-blog`. Mari kita `cd` ke dalamnya:

```bash
cd nextjs-blog
```

Kemudian, jalankan perintah berikut:

```bash
npm run dev
```

Lalu, buka url http://localhost:3000 pada browser.

## Mengedit halaman

Mari kita coba edit halaman starter.

- Pastikan server pengembangan Next.js masih berjalan.
- Buka pages/index.jsdengan editor teks Anda.
- Temukan teks yang bertuliskan **"Welcome to"** di bawah tag `<h1>` dan ubah menjadi **"Learn"** .
- Simpan file.

Server pengembangan Next.js memiliki fitur **Hot Reloading**. Ketika Anda membuat perubahan pada file Next.js secara otomatis menerapkan perubahan di browser. Tidak perlu memuat ulang! Ini akan membantu Anda beralih di aplikasi dengan cepat.
