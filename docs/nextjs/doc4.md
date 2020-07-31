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

## Dua Bentuk Pre-rendering

Next.js memiliki dua bentuk pre-rendering: **Static Generation** dan **Server-side Rendering**. Perbedaannya adalah **ketika** ia menghasilkan HTML untuk sebuah halaman.

- Static Generation adalah metode pre-rendering yang menghasilkan HTML saat **build time**. HTML yang dirender sebelumnya kemudian _digunakan kembali_ pada setiap permintaan.
- **Server-side Rendering** adalah metode pre-rendering yang menghasilkan HTML pada **setiap permintaan**.

![](https://nextjs.org/static/images/learn/data-fetching/static-generation.png)

![](https://nextjs.org/static/images/learn/data-fetching/server-side-rendering.png)

:::note
Dalam mode pengembangan (saat Anda menjalankan `npm run dev` atau `yarn dev`), setiap halaman di pra-render pada setiap permintaan - bahkan untuk halaman yang menggunakan Static Generation.
:::

### Dasar per halaman

Next.js memungkinkan Anda **memilih** formulir pra-render yang akan digunakan untuk setiap halaman. Anda dapat membuat aplikasi Next.js "hybrid" dengan menggunakan Static Generation untuk sebagian besar halaman dan menggunakan Rendering Server-side untuk yang lain.

![](https://nextjs.org/static/images/learn/data-fetching/per-page-basis.png)

### Kapan Menggunakan Static Generation v.s. Server-side Rendering

Kami menyarankan untuk menggunakan **Static Generation** (dengan dan tanpa data) kapan pun dimungkinkan karena halaman Anda dapat dibangun satu kali dan dilayani oleh CDN, yang membuatnya jauh lebih cepat daripada server membuat halaman untuk setiap permintaan.

Anda dapat menggunakan Static Generation untuk banyak jenis halaman, termasuk:

- Halaman pemasaran
- Posting blog
- Daftar produk e-commerce
- Bantuan dan dokumentasi

Anda harus bertanya pada diri sendiri: "Dapatkah saya melakukan pra-render halaman ini **sebelum** permintaan pengguna?" Jika jawabannya ya, maka Anda harus memilih Static Generation.

Di sisi lain, Static Generation **bukanlah** ide yang baik jika Anda tidak dapat membuat halaman sebelum permintaan pengguna. Mungkin halaman Anda menunjukkan data yang sering diperbarui, dan konten halaman berubah pada setiap permintaan.

Dalam hal ini, Anda dapat menggunakan Server-Side Rendering. Ini akan lebih lambat, tetapi halaman yang dirender sebelumnya akan selalu terkini. Atau Anda dapat melewati pra-rendering dan menggunakan JavaScript sisi klien untuk mengisi data.

### Kita akan Fokus pada Static Generation

Dalam pelajaran ini, kita akan fokus pada Static Generation. Pada halaman berikutnya, kita akan berbicara tentang Static Generation **dengan dan tanpa data**.

## Static Generation dengan dan tanpa Data

Static Generation dapat dilakukan dengan dan tanpa **data**.

Sejauh ini, semua halaman yang kita buat tidak memerlukan pengambilan data eksternal. Halaman-halaman itu akan secara otomatis dihasilkan secara statis ketika aplikasi dibuat untuk produksi.

![](https://nextjs.org/static/images/learn/data-fetching/static-generation-without-data.png)

Namun, untuk beberapa halaman, Anda mungkin tidak dapat merender HTML tanpa terlebih dahulu mengambil beberapa data eksternal. Mungkin Anda perlu mengakses sistem file, mengambil API eksternal, atau query database Anda saat membangun. Next.js mendukung kasus ini - Static Generation **dengan data** - di luar kotak.

![](https://nextjs.org/static/images/learn/data-fetching/static-generation-with-data.png)

### Static Generation dengan Data menggunakan `getStaticProps`

Bagaimana cara kerjanya? Nah, di Next.js, ketika Anda mengekspor komponen halaman, Anda juga dapat mengekspor `async` fungsi yang disebut `getStaticProps`. Jika Anda melakukan ini, maka:

`getStaticProps` berjalan pada waktu pembuatan dalam produksi, dan ...
Di dalam fungsi, Anda dapat mengambil data eksternal dan meneruskannya sebagai _props_ halaman.

```javascript
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```

Pada dasarnya, `getStaticProps` memungkinkan Anda untuk memberi tahu Next.js: _"Hei, halaman ini memiliki beberapa dependensi data - jadi ketika Anda melakukan pra-render halaman ini saat build time, pastikan untuk menyelesaikannya terlebih dahulu!"_

:::note
Dalam mode pengembangan, `getStaticProps` sebaliknya berjalan pada setiap permintaan.
:::

### Mari kita gunakan `getStaticProps`

Lebih mudah dipelajari dengan melakukan, jadi kita akan gunakan `getStaticProps` untuk mengimplementasikan blog kita.

## Data Blog

Kita sekarang akan menambahkan data blog ke aplikasi kita menggunakan sistem file. Setiap posting blog akan menjadi file _markdown_.

- Buat direktori top-level baru yang disebut `posts` (ini tidak sama dengan `pages/posts`).
- Di dalamnya, buat dua file: `pre-rendering.md` dan `ssg-ssr.md`.

Salin konten berikut ke `pre-rendering.md`:

```markdown
---
title: "Two Forms of Pre-rendering"
date: "2020-01-01"
---

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

- **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.

Importantly, Next.js lets you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.
```
