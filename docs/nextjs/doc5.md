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
  const postData = getPostData(params.id)
  return {
    props: {
      postData
    }
  }
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
  )
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
import remark from 'remark'
import html from 'remark-html'
```

Dan perbarui `getPostData()` sebagai berikut untuk digunakan `remark`.

```javascript
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}
```

:::note
Kita menambahkan keyword **`async`** ke **`getPostData`** karena kita perlu menggunakan **`await`** untuk **`remark`**.
:::

Itu berarti kita perlu pembaruan `getStaticProps` dalam `pages/posts/[id].js` pada penggunaan `await` saat memanggil `getPostData`:

```javascript
export async function getStaticProps({ params }) {
  // Add the "await" keyword like this:
  const postData = await getPostData(params.id)
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
  )
}
```

Coba kunjungi url ini lagi:

- [http://localhost:3000/posts/ssg-ssr](http://localhost:3000/posts/ssg-ssr)
- [http://localhost:3000/posts/pre-rendering](http://localhost:3000/posts/pre-rendering)

Anda sekarang harus melihat konten blog. Kita hampir selesai! Mari kita memoles setiap halaman berikutnya.
