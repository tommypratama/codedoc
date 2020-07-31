---
id: doc3
title: Assets, Metadata, and CSS
slug: assets-metadata-and-css
---

Halaman kedua yang kita tambahkan saat ini tidak memiliki *style*. Mari kita tambahkan beberapa CSS untuk menata halaman.

Next.js memiliki dukungan bawaan untuk CSS dan Sass. Untuk keperluan kursus ini, kita akan menggunakan CSS.

Pelajaran ini juga akan berbicara tentang bagaimana Next.js menangani aset statis seperti gambar dan metadata seperti tag `title`.

## Apa yang akan Anda Pelajari dalam Pelajaran Ini

Dalam pelajaran ini, Anda akan belajar:

- Bagaimana cara menambahkan file statis (gambar, dll) ke Next.js.
- Cara menyesuaikan apa yang ada di dalam `<head>` untuk setiap halaman.
- Cara membuat React Component yang dapat digunakan kembali yang ditata menggunakan CSS Modules.
- Bagaimana cara menambahkan CSS global `pages/_app.js`.
- Beberapa tips bermanfaat untuk *styling* di Next.js.

:::note
Jika Anda mencari dokumentasi terperinci tentang Next.js *styling*, lihat [Dokumentasi CSS](https://nextjs.org/docs/basic-features/built-in-css-support).
:::

## Assets

Pertama, mari kita bicara tentang bagaimana Next.js menangani **aset statis** seperti gambar.

Next.js dapat menyajikan file statis, seperti gambar, di bawah **direktori top-level** `public` . File di dalamnya publicdapat dirujuk dari root aplikasi yang mirip dengan `pages`.

Jika Anda membuka `pages/index.js` dan pada `<footer>`, kita merujuk ke gambar logo seperti:

```javascript
<img src="/vercel.svg" alt="Vercel Logo" className="logo" />
```

Gambar logo ada di dalam direktori `public`.

Direktori `public` juga untuk berguna `robots.txt`, Verifikasi Situs Google, dan aset statis lainnya. Lihat [dokumentasi penyajian file statis](https://nextjs.org/docs/basic-features/static-file-serving) untuk mempelajari lebih lanjut.

## Metadata

Bagaimana jika kita ingin memodifikasi metadata halaman, seperti HTML tag `<title>` ?

`<title>` adalah bagian dari HTML tag `<head>`, jadi mari kita selami bagaimana kita dapat memodifikasi tag `<head>` di halaman Next.js.

Buka `pages/index.js` di editor Anda dan lihat baris berikut:

```javascript title="pages/index.js"
<Head>
  <title>Create Next App</title>
  <link rel="icon" href="/favicon.ico" />
</Head>
```

Perhatikan bahwa `<Head>` yang digunakan bukan huruf kecil `<head>`. `<Head>` adalah React Component yang dibangun ke dalam Next.js. Ini memungkinkan Anda untuk memodifikasi `<head>` halaman.

### Menambahkan `<Head>` ke `first-post.js`

Kita belum menambahkan `<title>` ke rute `/posts/first-post` . Mari kita tambahkan satu.

Buka file `pages/posts/first-post.js`.

Pertama, impor `Head` dari `next/head`:

```javascript title="pages/posts/first-post.js"
import Head from 'next/head'
```

Kemudian, tambahkan ke komponen `FirstPost`. Untuk saat ini, kami hanya akan menambahkan tag `title`:

```javascript title="pages/posts/first-post.js"
export default function FirstPost() {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>
      …
    </>
  )
}
```

Coba akses `http://localhost:3000/posts/first-post`, dengan menggunakan alat pengembang browser, Anda akan melihat bahwa tag `title` ditambahkan ke `<head>`.

:::note
Untuk mempelajari lebih lanjut tentang `next/head`, periksa [dokumentasi referensi API](https://nextjs.org/docs/api-reference/next/head).

Jika Anda ingin menyesuaikan `<html>`, misalnya untuk menambahkan atribut `lang`, Anda dapat melakukannya dengan membuat komponen `Document` khusus . Pelajari lebih lanjut dalam [dokumentasi dokumen khusus](https://nextjs.org/docs/advanced-features/custom-document).
:::

## CSS Styling

Sekarang mari kita bicara tentang **CSS style**.

Seperti yang Anda lihat, halaman indeks (http://localhost:3000) sudah memiliki beberapa style. Jika Anda melihatnya di `pages/index.js`, Anda akan melihat kode seperti ini:

```javascript title="pages/index.js"
<style jsx>{`
  …
`}</style>
```

Ini menggunakan library yang disebut [styled-jsx](https://github.com/vercel/styled-jsx). Ini adalah library "CSS-in-JS" - yang memungkinkan Anda menulis CSS dalam React Component, dan CSS Style akan *dicakup* (komponen lainnya tidak akan terpengaruh).

Next.js memiliki dukungan bawaan untuk [styled-jsx](https://github.com/vercel/styled-jsx), tetapi Anda juga dapat menggunakan library CSS-in-JS populer lainnya seperti [styled-components](https://github.com/vercel/next.js/tree/canary/examples/with-styled-components) atau [emotion](https://github.com/vercel/next.js/tree/canary/examples/with-emotion).

### Menulis dan Mengimpor CSS

Next.js memiliki dukungan bawaan untuk CSS dan Sass yang memungkinkan Anda untuk mengimpor file `.css` dan `.scss`.

Menggunakan library CSS populer seperti [Tailwind CSS](https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss) juga didukung.

Dalam pelajaran ini, kita akan berbicara tentang cara menulis dan mengimpor file CSS di Next.js. Kita juga akan berbicara tentang dukungan bawaan Next.js untuk [CSS Modules](https://github.com/css-modules/css-modules) dan [Sass](https://sass-lang.com/). Mari selami!

## Layout Component

Pertama, Mari kita membuat komponen **Layout** yang akan digunakan di semua halaman.

- Buat direktori top-level yang disebut `components`.
- Di dalamnya, buat file bernama `layout.js` dengan konten berikut:

```javascript title="pages/components/layout.js"
function Layout({ children }) {
  return <div>{children}</div>
}

export default Layout
```

Kemudian, masuk ke `pages/posts/first-post.js`, impor `Layout` dan jadikan itu komponen terluar.

```javascript title="pages/posts/first-post.js"
import Link from 'next/link'
// highlight-next-line
import Layout from '../../components/layout'

export default function FirstPost() {
  return (
    // highlight-next-line
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    // highlight-next-line
    </Layout>
  )
}
```

### Menambahkan CSS

Sekarang, mari kita tambahkan beberapa styles pada `Layout`. Untuk melakukannya, kita akan menggunakan [CSS Modules](https://github.com/css-modules/css-modules), yang memungkinkan Anda mengimpor file CSS dalam React Component.

Buat file yang disebut `layout.module.css` pada direktori `components` dengan konten berikut:

```css title="components/layout.module.css"
.container {
  max-width: 36rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
}
```

:::note
Penting untuk menggunakan CSS Modules, nama file CSS harus diakhiri dengan `.module.css`.
:::

Untuk menggunakan `Layout` ini, Anda perlu:

- Impor sebagai styles
- Gunakan `styles.<class-name>` sebagai `className`
- Dalam hal ini, nama kelasnya `container`, jadi kita akan gunakan `styles.container`

```javascript title="pages/components/layout.js"
// highlight-next-line
import styles from './layout.module.css'

export default function Layout({ children }) {
  return <div className={styles.container}>{children}</div>
}
```

Jika Anda masuk ke [http://localhost:3000/posts/first-post](http://localhost:3000/posts/first-post) sekarang, Anda akan melihat bahwa teks sekarang berada di dalam wadah terpusat.

### Secara otomatis Menghasilkan Nama Class Unik

Sekarang, jika Anda melihat HTML di devtools browser Anda, Anda akan melihat bahwa tag `div` tersebut memiliki nama class yang mirip `layout_container__...`.

Inilah yang dilakukan CSS Modules: *Secara otomatis menghasilkan nama class yang unik*. Selama Anda menggunakan CSS Modules, Anda tidak perlu khawatir tentang tabrakan nama class.

Selanjutnya, fitur code splitting Next.js juga berfungsi pada CSS Modules. Ini memastikan jumlah minimal CSS dimuat untuk setiap halaman. Ini menghasilkan ukuran bundel yang lebih kecil.

CSS Modules diekstraksi dari bundel JavaScript pada waktu pembuatan dan menghasilkan file `.css` yang dimuat secara otomatis oleh Next.js.

## Global Styles

CSS Modules berguna untuk *component-level styles*. Tetapi jika Anda ingin memuat beberapa CSS untuk dimuat oleh **setiap halaman**, Next.js juga memiliki dukungan untuk itu.

Untuk memuat file CSS global, **buat file bernama** `_app.js` di bawah `pages` dan tambahkan konten berikut:

```javascript title="pages/_app.js"
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

Komponen `App` ini adalah komponen tingkat atas yang akan digunakan pada semua halaman yang berbeda. Anda dapat menggunakan komponen `App` ini untuk menyimpan *state* saat bernavigasi antar halaman, misalnya.

### Restart the Development Server

:::note
Anda perlu me-restart development server ketika menambahkan `_app.js`. Tekan `Ctrl + c` untuk menghentikan server dan jalankan:

```bash
npm run dev
```
:::

### Menambahkan Global CSS

Di Next.js, Anda dapat menambahkan file CSS global dengan mengimpornya dari `_app.js`. Anda tidak dapat mengimpor CSS global di tempat lain.

Alasan bahwa CSS global tidak dapat diimpor di luar `_app.js` adalah karena CSS global mempengaruhi semua elemen pada halaman.

Jika Anda akan menavigasi dari beranda ke halaman `/posts/first-post`, global styles dari beranda akan mempengaruhi `/posts/first-post` secara tidak sengaja.

Anda dapat menempatkan file CSS global di mana saja dan menggunakan nama apa pun. Jadi mari kita lakukan hal berikut:

- Buat direktori top-level `styles` dan buat `global.css` di dalamnya.
- Tambahkan konten berikut. Ini mengatur ulang beberapa style dan mengubah warna tag `a`.

```css title="styles/global.css"
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
    Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  line-height: 1.6;
  font-size: 18px;
}

* {
  box-sizing: border-box;
}

a {
  color: #0070f3;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  max-width: 100%;
  display: block;
}
```

Akhirnya, impor dari `_app.js`:

```javascript title="_app.js"
import '../styles/global.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

Sekarang, jika Anda mengakses [http://localhost:3000/posts/first-post](http://localhost:3000/posts/first-post), Anda akan melihat bahwa style diterapkan.

:::note
Jika tidak berhasil : Pastikan Anda me-restart development server ketika Anda menambahkan `_app.js`.
:::

Untuk meringkas apa yang telah kita pelajari sejauh ini:

- Untuk menggunakan CSS Modules, impor file CSS dengan nama `*.module.css` dari komponen apa pun.
- Untuk menggunakan CSS global, impor file CSS di `pages/_app.js`.