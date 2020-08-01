---
id: doc2
title: Navigate Between Pages
slug: navigate-between-pages
---

Sejauh ini, aplikasi Next.js yang kita buat hanya memiliki satu halaman. Secara umum situs web dan aplikasi web dapat memiliki banyak halaman berbeda.

Mari kita menjelajahi cara menambahkan lebih banyak halaman ke aplikasi kita.

## Apa yang akan Anda Pelajari dalam Pelajaran Ini

Dalam pelajaran ini, Anda akan:

- Buat halaman baru menggunakan fitur _file system routing_.
- Pelajari cara menggunakan `Link` component untuk mengaktifkan navigasi client-side di antara halaman.
- Pelajari tentang dukungan bawaan untuk _code splitting_ dan _prefetching_.

:::note
Jika Anda mencari dokumentasi terperinci tentang Next.js routing, lihat [routing documentation](https://nextjs.org/docs/routing/introduction).
:::

## Halaman di Next.js

Di Next.js, halaman adalah React Component yang diekspor dari file pada direktori `pages`.

Halaman diasosiasikan dengan rute berdasarkan **nama file** mereka. Misalnya, dalam pengembangan:

- `pages/index.js` dikaitkan dengan rute `/`.
- `pages/posts/first-post.js` dikaitkan dengan rute `/posts/first-post`.

Kita sudah memiliki file `pages/index.js`, jadi mari kita buat `pages/posts/first-post.js` untuk melihat cara kerjanya.

## Buat Halaman Baru

Buat direktori `posts` di dalam `pages`

Buat file dengan nama `first-post.js` di dalam direktori `posts` dengan konten berikut ini:

```javascript title="pages/posts/first-post.js"
export default function FirstPost() {
  return <h1>First Post</h1>;
}
```

Komponen dapat memiliki nama apa saja, tetapi Anda harus mengekspornya sebagai ekspor `default`.

Lihat perubahannya pada url `http://localhost:3000/posts/first-post`.

Ini adalah bagaimana Anda dapat membuat halaman yang lainnya di Next.js.

Cukup buat file JS di dalam direktori `pages`, dan path ke file menjadi URL path.

Di satu sisi, ini mirip dengan membangun situs web menggunakan file HTML atau PHP. Alih-alih menulis HTML dengan JSX dan menggunakan React Components.

Mari menambahkan tautan ke halaman yang baru ditambahkan, sehingga kita bisa menavigasi dari beranda.

## Link Component

Saat menghubungkan antar halaman di situs web, Anda biasanya menggunakan tag HTML `<a>`.

Di Next.js, Anda menggunakan React Component `<Link>` yang membungkus tag `<a>`. `<Link>` memungkinkan Anda melakukan navigasi client-side ke halaman berbeda di aplikasi.

### Menggunakan `<Link>`

Pertama, dalam `pages/index.js`, impor komponen `Link` dari `next/link` dengan menambahkan baris ini di bagian paling atas:

```javascript title="pages/index.js"
import Link from "next/link";
```

Kemudian modifikasi baris ini di tag `h1`:

```javascript title="pages/index.js"
Learn <a href="https://nextjs.org">Next.js!</a>
```

Menjadi ini:

```javascript title="pages/posts/first-post.js"
Read <Link href="/posts/first-post"><a>this page!</a></Link>
```

Selanjutnya, ganti konten `pages/posts/first-post.js` dengan kode berikut:

```javascript title="pages/posts/first-post.js"
import Link from "next/link";

export default function FirstPost() {
  return (
    <>
      <h1>First Post</h1>
      // highlight-start
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
      // highlight-end
    </>
  );
}
```

Seperti yang Anda lihat, komponen `Link` mirip dengan menggunakan tag `<a>`, tetapi alih-alih `<a href="…">`, Anda menggunakan `<Link href="…">` dan memasukkan tag `<a>` ke dalamnya.
