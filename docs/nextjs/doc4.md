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

```markdown title="posts/pre-rendering.md"
---
title: "Two Forms of Pre-rendering"
date: "2020-01-01"
---

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

- **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.

Importantly, Next.js lets you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.
```

Salin kode berikut ke `ssg-ssr.md`:

```markdown title="posts/ssg-ssr.md"
---
title: "When to Use Static Generation v.s. Server-side Rendering"
date: "2020-01-02"
---

We recommend using **Static Generation** (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

You can use Static Generation for many types of pages, including:

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

You should ask yourself: "Can I pre-render this page **ahead** of a user's request?" If the answer is yes, then you should choose Static Generation.

On the other hand, Static Generation is **not** a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

In that case, you can use **Server-Side Rendering**. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate data.
```

:::note
Anda mungkin telah memperhatikan bahwa setiap file markdown memiliki metadata di bagian atas yang berisi `title` dan `date`. Ini disebut YAML Front Matter, yang dapat diurai menggunakan library yang disebut [gray-matter](https://github.com/jonschlinkert/gray-matter).
:::

### Parsing Data Blog di `getStaticProps`

Sekarang, mari perbarui halaman indeks ( `pages/index.js` ) menggunakan data ini. Kami ingin:

- Parsing setiap file markdown dan dapatkan `title`, `date` dan nama file (yang akan digunakan `id` untuk URL posting).
- Daftar data pada halaman indeks, diurutkan berdasarkan tanggal.

Untuk melakukan ini pada pra-render, kita perlu menerapkan `getStaticProps`.

![](https://nextjs.org/static/images/learn/data-fetching/index-page.png)

Mari kita lakukan di halaman selanjutnya!

## Terapkan `getStaticProps`

Pertama, instal [grey-matter](https://github.com/jonschlinkert/gray-matter) yang memungkinkan kita mengurai metadata di setiap file markdown.

```bash
npm install gray-matter
```

Selanjutnya, kita akan membuat library sederhana untuk mengambil data dari sistem file.

- Buat direktori top-level yang disebut `lib`, dan ...
- Buat file bernama `posts.js` di dalamnya dengan konten berikut:

```javascript title="lib/posts.js"
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
```

Dan dalam `pages/index.js`, impor fungsi ini:

```javascript title="pages/index.js"
import { getSortedPostsData } from "../lib/posts";
```

Kemudian panggil fungsi ini di `getStaticProps`. Anda harus mengembalikan hasilnya di dalam `props` key:

```javascript title="pages/index.js"
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  };
}
```

Setelah ini diatur, `allPostsData` _props_ akan diteruskan ke komponen `Home`. Untuk melihat ini, modifikasi definisi komponen untuk diambil `{ allPostsData }`:

```javascript title="pages/index.js"
export default function Home ({ allPostsData }) { ... }
```

Untuk menampilkan data, tambahkan tag `<section>` di bagian bawah komponen ini:

```javascript title="pages/index.js"
return (
    <Layout home>
      <Head>…</Head>
      <section className={utilStyles.headingMd}>…</section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
```

Anda sekarang akan melihat data blog jika Anda mengakses [http://localhost:3000](http://localhost:3000).

Selamat! Kita telah berhasil mengambil data eksternal (dari sistem file) dan melakukan pra-render halaman indeks dengan data ini.

![](https://nextjs.org/static/images/learn/data-fetching/index-page.png)

Mari kita bicara tentang beberapa tips untuk digunakan `getStaticProps` di halaman selanjutnya.

## Rincian getStaticProps

Anda bisa mendapatkan informasi mendalam tentang `getStaticProps` di [dokumentasi data fetching](https://nextjs.org/docs/basic-features/data-fetching). Tetapi di sini ada beberapa informasi penting yang harus Anda ketahui untuk `getStaticProps`.

### Fetch External API atau Query Database

Pada `lib/posts.js`, kita telah mengimplementasikan `getSortedPostsData` yang mengambil data dari sistem file. Tetapi Anda dapat mengambil data dari sumber lain, seperti _external API endpoint_, dan itu akan berfungsi dengan baik:

```javascript
import fetch from "node-fetch";

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch("..");
  return res.json();
}
```

Anda juga dapat query database secara langsung:

```javascript
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from a database
  return databaseClient.query('SELECT posts...')
}
```

Ini dimungkinkan karena **hanya** `getStaticProps` berjalan **di sisi server** . Itu tidak akan pernah berjalan di sisi klien. Bahkan tidak akan disertakan dalam bundel JS untuk browser. Itu berarti Anda dapat menulis kode seperti permintaan basis data langsung tanpa dikirim ke browser.

### Development vs. Production

- Dalam **development** ( `npm run` dev atau `yarn dev` ), `getStaticProps` berjalan pada _setiap permintaan_.
- Dalam **production** , `getStaticProps` berjalan pada saat **build time**.

Karena ini dimaksudkan untuk dijalankan pada saat **build time**, Anda tidak akan dapat menggunakan data yang hanya tersedia selama waktu permintaan, seperti query parameters atau HTTP headers.

### Hanya Diizinkan dalam Halaman

`getStaticProps` hanya dapat diekspor dari satu **page**. Anda tidak dapat mengekspornya dari file non-page.

Salah satu alasan pembatasan ini adalah React perlu memiliki semua data yang diperlukan sebelum halaman diberikan.

### Bagaimana Jika Saya Perlu Fetch Data Saat Request Time?

Static Generation **bukan** ide yang baik jika Anda tidak dapat melakukan pra-render halaman sebelum permintaan pengguna. Mungkin halaman Anda menunjukkan data yang sering diperbarui, dan konten halaman berubah pada setiap permintaan.

Dalam kasus seperti ini, Anda dapat mencoba **Server-side Rendering** atau melewatkan pra-rendering. Mari kita bicara tentang strategi ini sebelum kita melanjutkan ke pelajaran selanjutnya.

## Fetching Data at Request Time

Jika Anda perlu mengambil data pada saat **request time** alih-alih saat build time, Anda dapat mencoba **Server-side Rendering**:

![](https://nextjs.org/static/images/learn/data-fetching/server-side-rendering-with-data.png)

Untuk menggunakan Server-side Rendering, Anda perlu mengekspor `getServerSideProps` alih-alih dari `getStaticProps` pada halaman Anda.

### Menggunakan `getServerSideProps`

Ini starter code untuk `getServerSideProps`. Itu tidak perlu untuk contoh blog kita, jadi kita tidak akan menerapkannya.

```javascript
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    }
  }
}
```

Karena `getServerSideProps` dipanggil pada waktu permintaan, parameternya ( `context` ) berisi parameter permintaan khusus. Anda dapat mempelajari lebih lanjut di [dokumentasi kami](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering).

Anda harus menggunakan `getServerSideProps` hanya jika Anda perlu pra-render halaman yang datanya harus diambil pada waktu permintaan. Waktu ke byte pertama (TTFB) akan lebih lambat daripada `getStaticProps` karena server harus menghitung hasilnya pada setiap permintaan, dan hasilnya tidak dapat di-cache oleh CDN tanpa konfigurasi tambahan.

### Client-side Rendering

Jika Anda **tidak** perlu melakukan pra-render data, Anda juga dapat menggunakan strategi berikut (disebut **Client-side Rendering** ):

- Menghasilkan secara statis (pra-render) bagian halaman yang tidak memerlukan data eksternal.
- Saat halaman dimuat, ambil data eksternal dari klien menggunakan JavaScript dan isi bagian yang tersisa.

![](https://nextjs.org/static/images/learn/data-fetching/client-side-rendering.png)

Pendekatan ini berfungsi baik untuk halaman dasbor pengguna, misalnya. Karena dasbor adalah halaman pribadi, khusus pengguna, SEO tidak relevan, dan halaman itu tidak perlu dirender sebelumnya. Data sering diperbarui, yang membutuhkan pengambilan data pada saat request-time.

### SWR

Tim di belakang Next.js telah membuat **React hooks** untuk pengambilan data yang disebut [SWR](https://swr.now.sh/). Kami sangat merekomendasikannya jika Anda mengambil data di sisi klien. Ini menangani *caching, revalidation, focus tracking, refetching on interval*, dan banyak lagi. Kami tidak akan membahas detailnya di sini, tetapi berikut ini contoh penggunaannya:

```javascript
import useSWR from 'swr'

function Profile() {
  const { data, error } = useSWR('/api/user', fetch)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
```

[Lihatlah dokumentasi SWR untuk mempelajari lebih lanjut](https://swr.now.sh/).

Dalam pelajaran berikutnya, kita akan membuat halaman untuk setiap posting blog menggunakan **dynamic routes**.

:::note
Sekali lagi, Anda dapat memperoleh informasi mendalam tentang `getStaticProps` dan `getServerSideProps` dalam [dokumentasi ini](https://nextjs.org/docs/basic-features/data-fetching).
:::
