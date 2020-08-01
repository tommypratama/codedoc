---
id: doc5
title: Dynamic Routes
slug: dynamic-routes
---

Kita telah mengisi halaman indeks dengan data blog, tetapi masih belum membuat halaman blog individual (inilah hasil [yang diinginkan](https://next-learn-starter.now.sh/) ). Kita ingin URL untuk halaman-halaman ini bergantung pada data blog, yang berarti kita perlu menggunakan rute dinamis.

## Apa yang akan Anda Pelajari dalam Pelajaran Ini

Dalam pelajaran ini, Anda akan belajar:

- Cara menghasilkan halaman secara statis dengan menggunakan rute dinamis `getStaticProps`.
- Cara menulis `getStaticProps` untuk mengambil data pada setiap posting blog.
- Cara membuat markdown menggunakan `remark`.
- Cara cantik mencetak string tanggal.
- Cara menautkan ke halaman dengan rute dinamis.
- Beberapa informasi bermanfaat tentang rute dinamis.

## Path Halaman Tergantung pada Data Eksternal

Dalam pelajaran sebelumnya, kami membahas kasus di mana **konten halaman** tergantung pada data eksternal. Kami menggunakan `getStaticProps` untuk mengambil data yang diperlukan untuk merender halaman indeks.

Dalam pelajaran ini, kita akan berbicara tentang kasus di mana setiap **jalur halaman** tergantung pada data eksternal. Next.js memungkinkan Anda menghasilkan halaman secara statis dengan jalur yang bergantung pada data eksternal. Ini memungkinkan **URL dinamis** di Next.js.

![](https://nextjs.org/static/images/learn/dynamic-routes/page-path-external-data.png)

### Cara Menghasilkan Halaman secara Statis dengan Rute Dinamis

Dalam kasus ini, kita ingin membuat halaman dinamis untuk posting blog:

- Kita ingin setiap posting memiliki path `/posts/<id>`, di mana nama file markdown `<id>` di bawah direktori top-level `posts`.
- Karena kita memiliki `ssg-ssr.md` dan `pre-rendering.md`, kita ingin pathnya menjadi `/posts/ssg-ssr` dan `/posts/pre-rendering`.

### Langkah

Kita dapat melakukan ini dengan mengambil langkah-langkah berikut. **Anda belum harus melakukan perubahan ini** - kita akan melakukan semuanya di halaman berikutnya.

Pertama, kita akan membuat halaman yang disebut `[id].js` di bawah `pages/posts`. Halaman yang dimulai dengan `[` dan diakhiri dengan `]` adalah halaman dinamis di Next.js.

Di `pages/posts/[id].js`, kita akan menulis kode yang akan membuat halaman posting - sama seperti halaman lain yang kita buat.

```javascript
import Layout from "../../components/layout";

export default function Post() {
  return <Layout>...</Layout>;
}
```

Sekarang, inilah yang baru: Kita akan mengekspor fungsi async yang dipanggil `getStaticPaths` dari halaman ini. Dalam fungsi ini, kita perlu mengembalikan daftar **nilai yang mungkin** untuk `id`.

```javascript
import Layout from "../../components/layout";

export default function Post() {
  return <Layout>...</Layout>;
}

export async function getStaticPaths() {
  // Return a list of possible value for id
}
```

Akhirnya, kita perlu menerapkan `getStaticProps` lagi - kali ini, untuk mengambil data yang diperlukan untuk posting blog dengan yang diberikan `id`. `getStaticProps` diberikan `params`, yang berisi `id`.

```javascript
import Layout from "../../components/layout";

export default function Post() {
  return <Layout>...</Layout>;
}

export async function getStaticPaths() {
  // Return a list of possible value for id
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
}
```

Berikut ringkasan grafis dari apa yang baru saja kita bicarakan:

![](https://nextjs.org/static/images/learn/dynamic-routes/how-to-dynamic-routes.png)

## Terapkan `getStaticPaths`

Pertama, mari atur file:

- Buat file yang disebut `[id].js` di dalam direktori `pages/posts`.
- Juga, **menghapus** `first-post.js` dalam direktori `pages/posts` - kita tidak lagi akan menggunakan ini.

Kemudian, tambahkan kode berikut ke `pages/posts/[id].js`. Kita akan mengisi `...` nanti.

```javascript
import Layout from "../../components/layout";

export default function Post() {
  return <Layout>...</Layout>;
}
```

Kemudian, buka `lib/posts.js` dan tambahkan fungsi berikut. Ini akan mengembalikan daftar nama file (tidak termasuk `.md`) di direktori `posts`:

```javascript
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, "")
      }
    };
  });
}
```

:::note
Daftar yang dikembalikan _bukan_ hanya array string - itu **harus** berupa array objek yang terlihat seperti komentar di atas. Setiap objek harus memiliki key `params` dan berisi objek dengan key `id` (karena kita menggunakan nama file `[id]`). Kalau tidak, `getStaticPaths` akan gagal.
:::

````

Kemudian, pada `pages/posts/[id].js`, impor fungsi berikut:

```javascript
import { getAllPostIds } from '../../lib/posts'
````

Dan buat `getStaticPaths` yang memanggil fungsi ini:

```javascript
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  };
}
```

- Array nilai yang mungkin untuk `id` harus menjadi nilai kunci `paths` dari objek yang dikembalikan. Inilah yang `getAllPostIds()` hasilkan.
- Abaikan `fallback: false` untuk sekarang - kami akan menjelaskannya nanti.

Kita hampir selesai - tetapi masih perlu menerapkan `getStaticProps`. Mari kita lakukan!

## Terapkan `getStaticProps`

Kita perlu mengambil data yang diperlukan untuk membuat posting dengan yang diberikan `id`.

Untuk melakukannya, buka `lib/posts.js` dan tambahkan fungsi berikut. Ini akan mengembalikan data posting berdasarkan `id`:

```javascript
export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the id
  return {
    id,
    ...matterResult.data
  };
}
```

Kemudian, dalam `pages/posts/[id].js`, ganti baris ini:

```javascript
import { getAllPostIds } from "../../lib/posts";
```

…dengan ini:

```javascript
import { getAllPostIds, getPostData } from "../../lib/posts";
```

Dan buat `getStaticProps` yang memanggil fungsi ini:

```javascript
export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);
  return {
    props: {
      postData
    }
  };
}
```

Kemudian perbarui komponen `Post` untuk menggunakan `postData`:

```javascript
export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  );
}
```

Sekarang, coba lihat url ini:

- [http://localhost:3000/posts/ssg-ssr](http://localhost:3000/posts/ssg-ssr)
- [http://localhost:3000/posts/pre-rendering](http://localhost:3000/posts/pre-rendering)

Anda harus dapat melihat data blog untuk setiap halaman. Dan kita telah berhasil membuat halaman dinamis.

### Ada yang salah?

Jika Anda menemukan kesalahan, pastikan file Anda memiliki kode yang benar:

- `pages/posts/[id].js` akan [terlihat seperti ini](https://github.com/vercel/next-learn-starter/blob/master/dynamic-routes-step-1/pages/posts/%5Bid%5D.js).
- `lib/posts.js` akan [terlihat seperti ini](https://github.com/vercel/next-learn-starter/blob/master/dynamic-routes-step-1/lib/posts.js).
- (Jika masih tidak berfungsi) Kode yang tersisa harus [terlihat seperti ini](https://github.com/vercel/next-learn-starter/tree/master/dynamic-routes-step-1).

Jika Anda masih macet, jangan ragu untuk bertanya kepada komunitas di [Diskusi GitHub](https://github.com/vercel/next.js/discussions). Akan sangat membantu jika Anda bisa mendorong kode Anda ke GitHub dan menautkannya sehingga orang lain dapat melihatnya.

### Ringkasan

Sekali lagi, inilah ringkasan grafis dari apa yang telah kita lakukan:

![](https://nextjs.org/static/images/learn/dynamic-routes/how-to-dynamic-routes.png)

Tetapi, kita masih belum menampilkan **konten markdown** pada blog. Jadi mari kita lakukan ini selanjutnya.

### Render Markdown

Untuk membuat konten markdown, kita akan menggunakan library `remark`. Pertama, mari kita instal:

```bash
npm install remark remark-html
```

Lalu, impor di `lib/posts.js`:

```javascript
import remark from "remark";
import html from "remark-html";
```

Dan perbarui `getPostData()` sebagai berikut untuk digunakan `remark`.

```javascript
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  };
}
```

:::note
Kita menambahkan keyword **`async`** ke **`getPostData`** karena kita perlu menggunakan **`await`** untuk **`remark`**.
:::

Itu berarti kita perlu pembaruan `getStaticProps` dalam `pages/posts/[id].js` pada penggunaan `await` saat memanggil `getPostData`:

```javascript
export async function getStaticProps({ params }) {
  // Add the "await" keyword like this:
  const postData = await getPostData(params.id);
  // ...
}
```

Akhirnya, perbarui komponen `Post` untuk di render `contentHtml` menggunakan `dangerouslySetInnerHTML`:

```javascript
export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}
```

Coba kunjungi url ini lagi:

- [http://localhost:3000/posts/ssg-ssr](http://localhost:3000/posts/ssg-ssr)
- [http://localhost:3000/posts/pre-rendering](http://localhost:3000/posts/pre-rendering)

Anda sekarang harus melihat konten blog. Kita hampir selesai! Mari kita memoles setiap halaman berikutnya.

## Polishing the Post Page

### Menambahkan titleke Halaman Posting

Di `pages/posts/[id].js`, mari tambahkan tag `title` menggunakan post data. Impor `next/head` dan tambahkan tag `title`:

```javascript
import Head from "next/head";

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      ...
    </Layout>
  );
}
```

### Memformat Tanggal

Untuk memformat tanggal, kita akan menggunakan library `date-fns`. Pertama, instal:

```bash
npm install date-fns
```

Selanjutnya, buat komponen `Date` di `components/date.js`:

```javascript
import { parseISO, format } from "date-fns";

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
}
```

Dan gunakan di `pages/posts/[id].js`:

```javascript
// Add this line to imports
import Date from "../../components/date";

export default function Post({ postData }) {
  return (
    <Layout>
      ...
      {/* Replace {postData.date} with this */}
      <Date dateString={postData.date} />
      ...
    </Layout>
  );
}
```

Jika Anda mengakses [http://localhost:3000/posts/pre-rendering](http://localhost:3000/posts/pre-rendering), sekarang Anda akan melihat tanggal yang ditulis sebagai **“January 1, 2020”**.

### Menambahkan CSS

Akhirnya, mari kita tambahkan beberapa CSS. Di `pages/posts/[id].js`, letakkan semuanya di bawah tag `article` dan gunakan CSS Modules seperti di bawah ini:

```javascript
// Add this line
import utilStyles from "../../styles/utils.module.css";

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
```

Jika Anda mengakses [http://localhost:3000/posts/pre-rendering](http://localhost:3000/posts/pre-rendering) sebelumnya, halaman tersebut sekarang akan terlihat sedikit lebih baik.

## Polishing the Index Page

Sebagai langkah terakhir, mari perbarui halaman indeks ( `pages/index.js` ).

Secara khusus, kita perlu menambahkan tautan ke setiap halaman posting. Kita akan menggunakan komponen `Link`, tetapi kita perlu melakukan sesuatu yang berbeda kali ini.

Untuk menautkan ke halaman dengan rute dinamis, Anda perlu menggunakan komponen `Link` secara berbeda. Dalam kasus ini, untuk ditautkan ke `/posts/ssg-ssr`, Anda harus menulis seperti ini:

```javascript
<Link href="/posts/[id]" as="/posts/ssg-ssr">
  <a>...</a>
</Link>
```

Seperti yang anda lihat, Anda perlu menggunakan `[id]` untuk `href` dan aktual path (`ssg-ssr`) untuk `as` prop.

Mari kita implementasikan. Pertama, impor `Link` dan `Date` di `pages/index.js`:

```javascript
import Link from "next/link";
import Date from "../components/date";
```

Kemudian, pada komponen `Home`, ganti `li` tag dengan kode berikut ini:

```javascript
<li className={utilStyles.listItem} key={id}>
  <Link href="/posts/[id]" as={`/posts/${id}`}>
    <a>{title}</a>
  </Link>
  <br />
  <small className={utilStyles.lightText}>
    <Date dateString={date} />
  </small>
</li>
```

Seharusnya sekarang memiliki tautan ke setiap artikel.

:::note
Jika ada yang tidak berfungsi, pastikan kode Anda [terlihat seperti ini](https://github.com/vercel/next-learn-starter/tree/master/api-routes-starter).
:::

Sebelum kita mengakhiri pelajaran ini, mari kita bicara tentang beberapa tips untuk menggunakan rute dinamis di halaman berikutnya.

### Detail Rute Dinamis

Anda dapat memperoleh informasi mendalam tentang rute dinamis dalam dokumentasi berikut:

- [Data Fetching](https://nextjs.org/docs/basic-features/data-fetching)
- [Dynamic Routes](https://nextjs.org/docs/routing/dynamic-routes)

Tapi di sini ada beberapa informasi penting yang harus Anda ketahui tentang rute dinamis.

### Fetch External API or Query Database

Seperti `getStaticProps`, `getStaticPaths` dapat mengambil data dari sumber data apa pun. Dalam contoh ini, `getAllPostIds` (yang digunakan oleh `getStaticPaths`) dapat mengambil dari API endpoint eksternal:

### Development v.s. Production

- Dalam **pengembangan** ( `npm run dev` atau `yarn dev` ), `getStaticPaths` berjalan pada _setiap permintaan_.
- Dalam **produksi**, `getStaticPaths` berjalan saat _build time_.

### Fallback

Ingat bahwa, kita mengembalikan `fallback: false` dari `getStaticPaths`. Apa artinya ini?

Jika `fallback` adalah `false`, maka setiap _path_ tidak dikembalikan oleh `getStaticPaths` akan menghasilkan **halaman 404**.

Jika `fallback` adalah `true`, maka perilaku `getStaticProps` berubah:

- Path yang dikembalikan dari `getStaticPaths` akan dirender ke HTML saat build time.
- Path yang belum dibuat pada build time **tidak** akan menghasilkan halaman 404. Sebagai gantinya, Next.js akan melayani versi “fallback” dari halaman pada permintaan pertama ke path tersebut.
- Di latar belakang, Next.js akan secara statis menghasilkan path yang diminta. Permintaan selanjutnya ke path yang sama akan melayani halaman yang dihasilkan, sama seperti halaman lain yang di rendered pada saat build time.

Ini adalah di luar lingkup pelajaran ini, tetapi Anda dapat mempelajari lebih lanjut tentang `fallback: true` di [dokumentasi fallback](https://nextjs.org/docs/basic-features/data-fetching#fallback-pages).

### Catch-all Routes

Rute dinamis dapat diperluas untuk catch semua path dengan menambahkan tiga titik ( `...` ) di dalam tanda kurung. Sebagai contoh:

- `pages/posts/[...id].js` cocok dengan `/posts/a`, tetapi juga `/posts/a/b`, `/posts/a/b/c` dan sebagainya.
- Jika Anda melakukan ini, dalam `getStaticPaths`, Anda harus mengembalikan array sebagai nilai dari kunci `id` seperti:

```javascript
return [
  {
    params: {
      // Statically Generates /posts/a/b/c
      id: ["a", "b", "c"]
    }
  }
  //...
];
```

Dan `params.id` akan menjadi array di `getStaticProps`:

```javascript
export async function getStaticProps({ params }) {
  // params.id will be like ['a', 'b', 'c']
}
```

Lihatlah dokumentasi [Rute Dinamis](https://nextjs.org/docs/routing/dynamic-routes) untuk mempelajari lebih lanjut.

### Router

Jika Anda ingin mengakses router Next.js, Anda dapat melakukannya dengan mengimpor `useRouter` hook dari `next/router`. Lihatlah [dokumentasi router](https://nextjs.org/docs/routing/dynamic-routes) untuk mempelajari lebih lanjut.

### Halaman 404

Untuk membuat halaman 404 khusus, buat `pages/404.js`. File ini dihasilkan secara statis saat build time.

```javascript
// pages/404.js
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>;
}
```

Lihatlah dokumentasi [Halaman Kesalahan](https://nextjs.org/docs/advanced-features/custom-error-page#404-page) untuk mempelajari lebih lanjut.

### Lebih banyak contoh

Kami telah membuat beberapa contoh untuk mengilustrasikan `getStaticProps` dan `getStaticPaths` - lihat kode sumbernya untuk mempelajari lebih lanjut:

- [Blog Starter using markdown files](https://github.com/vercel/next.js/tree/canary/examples/blog-starter) ([Demo](https://next-blog-starter.now.sh/))
- [DatoCMS Example](https://github.com/vercel/next.js/tree/canary/examples/cms-datocms) ([Demo](https://next-blog-datocms.now.sh/))
- [TakeShape Example](https://github.com/vercel/next.js/tree/canary/examples/cms-takeshape) ([Demo](https://next-blog-takeshape.now.sh/))
- [Sanity Example](https://github.com/vercel/next.js/tree/canary/examples/cms-sanity) ([Demo](https://next-blog-sanity.now.sh/))

Dalam pelajaran berikutnya, kita akan pelajari tentang fitur API Routes untuk Next.js.
