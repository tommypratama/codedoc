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

## Polishing Layout

Sejauh ini, kami hanya menambahkan kode React dan CSS minimal hanya untuk menggambarkan konsep seperti CSS Modules. Sebelum kita melanjutkan ke pelajaran kita berikutnya (data fetching), mari kita poles styling dan kode halaman kita.

### Unduh Gambar Profil Anda

Pertama, kami akan menggunakan gambar profil Anda untuk desain akhir.

- **Unduh** gambar profil Anda dari GitHub, Twitter, LinkedIn atau di tempat lainnya.
- Buat direktori `images` di dalam direktori `public`.
- Simpan gambar seperti `profile.jpg` dalam direktori `public/images`.
- Ukuran gambar bisa sekitar 400px x 400px.
- Anda dapat menghapus file logo SVG yang tidak digunakan langsung di dalam direktori `public`.

### Memperbarui `components/layout.module.css`

Kedua, kita akan menggunakan kode berikut untuk `components/layout.module.css` - cukup salin dan tempel. Ini menambahkan beberapa style yang lebih halus.

```css title="components/layout.module.css"
.container {
  max-width: 36rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.headerImage {
  width: 6rem;
  height: 6rem;
}

.headerHomeImage {
  width: 8rem;
  height: 8rem;
}

.backToHome {
  margin: 3rem 0 0;
}
```

### Membuat `styles/utils.module.css`

Ketiga, mari kita buat satu set class utilitas CSS untuk tipografi dan lainnya yang akan berguna di banyak komponen.

Mari menambahkannya sebagai CSS Modules di `styles/utils.module.css`.

```css title="styles/utils.module.css"
.heading2Xl {
  font-size: 2.5rem;
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: -0.05rem;
  margin: 1rem 0;
}

.headingXl {
  font-size: 2rem;
  line-height: 1.3;
  font-weight: 800;
  letter-spacing: -0.05rem;
  margin: 1rem 0;
}

.headingLg {
  font-size: 1.5rem;
  line-height: 1.4;
  margin: 1rem 0;
}

.headingMd {
  font-size: 1.2rem;
  line-height: 1.5;
}

.borderCircle {
  border-radius: 9999px;
}

.colorInherit {
  color: inherit;
}

.padding1px {
  padding-top: 1px;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.listItem {
  margin: 0 0 1.25rem;
}

.lightText {
  color: #999;
}
```

### Memperbarui `components/layout.js`

Keempat, salin kode berikut ke `components/layout.js` dan **ubah** `Your Name` di bagian atas nama Anda. Inilah yang baru:

- `meta` tag (seperti `og:image`)
- Boolean `home` prop yang akan menyesuaikan ukuran judul dan gambar
- Link "Back to home" di bagian bawah jika `home` adalah `false`

```javascript title="components/layout.js"
import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'Your Name'
export const siteTitle = 'Next.js Sample Website'

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/images/profile.jpg"
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img
                  src="/images/profile.jpg"
                  className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
```

### Memperbarui `pages/index.js`

Akhirnya, mari perbarui beranda.

Ubah `pages/index.js` sebagai berikut:

```javascript title="pages/index.js"
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  )
}
```

Kemudian gantilah `[Your Self Introduction]` dengan pengenalan diri Anda.

## Tips Styling

Berikut adalah beberapa tip styling yang mungkin bisa membantu.

:::note
Anda bisa membaca bagian berikut. Tidak perlu melakukan perubahan pada aplikasi sebelumnya!
:::

### Menggunakan library `classnames` untuk beralih class

`classnames` adalah library sederhana yang memungkinkan Anda beralih nama class dengan mudah. Anda dapat menginstalnya menggunakan 

```bash
npm install classnames
```

atau 

```bash
yarn add classnames
```

Silakan lihat [README](https://github.com/JedWatson/classnames) untuk detailnya, tapi inilah penggunaan dasar:

- Misalkan Anda ingin membuat komponen `Alert` yang menerima `type`, yang bisa `'success'` atau `'error'`.
- Jika itu `'success'`, Anda ingin warna teks menjadi hijau. Jika itu `'error'`, Anda ingin warna teks menjadi merah.

Pertama-tama Anda dapat menulis CSS Modules (misalnya `alert.module.css`) seperti ini:

```css
.success {
  color: green;
}
.error {
  color: red;
}
```

Dan gunakan `classnames` seperti ini:

```css
import styles from './alert.module.css'
import cn from 'classnames'

export default function Alert({ children, type }) {
  return (
    <div
      className={cn({
        [styles.success]: type === 'success',
        [styles.error]: type === 'error'
      })}
    >
      {children}
    </div>
  )
}
```

### Menyesuaikan Konfigurasi PostCSS

Di luar kotak, tanpa konfigurasi, Next.js mengkompilasi CSS menggunakan [PostCSS](https://postcss.org/) .

Untuk mengkustomisasi konfigurasi PostCSS, Anda dapat membuat file top-level bernama `postcss.config.js`. Ini berguna jika Anda menggunakan library seperti [Tailwind CSS](https://tailwindcss.com/).

Berikut adalah instruksi untuk menggunakan [CSS Tailwind](https://tailwindcss.com/). Sebaiknya gunakan `postcss-preset-env` dan `postcss-flexbugs-fixes` untuk mencocokkan [perilaku default Next.js ini](https://nextjs.org/docs/advanced-features/customizing-postcss-config#default-behavior). Pertama, instal paket:

```bash
npm install tailwindcss postcss-preset-env postcss-flexbugs-fixes
```

Kemudian tulis kode berikut ini pada `postcss.config.js`:

```javascript title="postcss.config.js"
module.exports = {
  plugins: [
    'tailwindcss',
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009'
        },
        stage: 3,
        features: {
          'custom-properties': false
        }
      }
    ]
  ]
}
```

Disarankan untuk menghapus CSS yang tidak digunakan dengan menetapkan opsi `purge` pada `tailwind.config.js`:

```javascript title="tailwind.config.js"
module.exports = {
  purge: [
    // Use *.tsx if using TypeScript
    './pages/**/*.js',
    './components/**/*.js'
  ]
  // ...
}
```

:::note
Untuk mempelajari lebih lanjut tentang konfigurasi PostCSS khusus, [lihat dokumentasi](https://nextjs.org/docs/advanced-features/customizing-postcss-config).
:::

### Menggunakan Sass

Di luar kotak, Next.js memungkinkan Anda mengimpor [Sass](https://sass-lang.com/) menggunakan ekstensi `.scss` dan `.sass`. Anda dapat menggunakan component-level Sass melalui CSS Modules dan ekstensi `.module.scss` atau `.module.sass`.

Sebelum Anda dapat menggunakan dukungan Sass Next.js yang terintegrasi, pastikan untuk menginstal sass:

```bash
npm install sass
```

:::note
Untuk mempelajari lebih lanjut tentang Dukungan CSS dan CSS Modules bawaan Next.js, [lihat dokumentasi](https://nextjs.org/docs/basic-features/built-in-css-support).
:::