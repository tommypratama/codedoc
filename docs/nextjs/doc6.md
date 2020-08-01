---
id: doc6
title: API Routes
slug: api-routes
---

Next.js memiliki dukungan untuk API Routes, yang memungkinkan Anda dengan mudah membuat API endpoint sebagai Node.js function. Meskipun tidak diperlukan untuk aplikasi blog kita, kita akan secara singkat berbicara tentang cara menggunakannya dalam pelajaran ini.

## Apa yang akan Anda Pelajari dalam Pelajaran Ini

Dalam pelajaran ini, Anda akan belajar:

- Cara membuat API Routes.
- Beberapa informasi bermanfaat tentang API Routes.

## Membuat API Routes

API Routes memungkinkan Anda membuat API endpoint di dalam aplikasi Next.js. Anda dapat melakukannya dengan membuat **function** di dalam direktori `pages/api` yang memiliki format berikut:

```javascript
// req = request data, res = response data
export default (req, res) => {
  // ...
}
```

Mereka dapat digunakan sebagai Serverless Functions (juga dikenal sebagai Lambdas).

### Membuat API endpoint sederhana

Mari kita coba. Buat file bernama `hello.js` dalam `pages/api` dengan kode berikut:

```javascript
export default (req, res) => {
  res.status(200).json({ text: 'Hello' })
}
```

Coba akses di [http://localhost:3000/api/hello](http://localhost:3000/api/hello). Anda harus melihat `{"text":"Hello"}`. Perhatikan bahwa:

- `req` adalah instance dari [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage), ditambah beberapa middlewares yang sudah dibuat sebelumnya yang dapat Anda lihat [di sini](https://nextjs.org/docs/api-routes/api-middlewares).
- `res` adalah instance dari [http.ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse), ditambah beberapa helper functions yang dapat Anda lihat [di sini](https://nextjs.org/docs/api-routes/response-helpers).

## Detail API Routes

Anda dapat memperoleh informasi mendalam tentang API Routes di [dokumentasi](https://nextjs.org/docs/api-routes/dynamic-api-routes). Tapi di sini ada beberapa informasi penting yang harus Anda ketahui tentang API Routes.

### Jangan Fetch API Routes dari `getStaticProps` atau `getStaticPaths`

Anda **tidak** boleh mengambil API Routes dari `getStaticProps` atau `getStaticPaths`. Alih-alih, tulis kode server-side Anda langsung di `getStaticProps` atau `getStaticPaths` (atau panggil helper function).

Inilah sebabnya: `getStaticProps` dan `getStaticPaths` hanya berjalan di sisi server. Itu tidak akan pernah berjalan di sisi klien. Bahkan tidak akan disertakan dalam bundel JS untuk browser. Itu berarti Anda dapat menulis kode seperti query database langsung tanpa dikirim ke browser.

### Contoh penggunaaan yang baik: Handling Form Input

Kasus penggunaan yang baik untuk API Routes adalah menangani input formulir. Misalnya, Anda dapat membuat formulir di halaman Anda dan minta ia mengirim permintaan `POST` ke API Routes Anda. Anda kemudian dapat menulis kode untuk langsung menyimpannya ke database Anda. Kode API Routes tidak akan menjadi bagian dari bundel klien Anda, sehingga Anda dapat menulis kode sisi server dengan aman.

```javascript
export default (req, res) => {
  const email = req.body.email
  // Then save email to your database, etc...
}
```

### Preview Mode

Static Generation berguna ketika halaman Anda mengambil data dari headless CMS. Namun, itu tidak ideal ketika Anda menulis *draft** pada headless CMS dan ingin segera melihat **preview** draft di halaman Anda. Anda ingin Next.js membuat halaman-halaman ini pada saat **request time** alih-alih build time dan mengambil konten draft alih-alih konten yang diterbitkan. Anda ingin Next.js mem-bypass Static Generation hanya untuk kasus khusus ini.

Next.js memiliki fitur yang disebut **Preview Mode** yang menyelesaikan masalah ini, dan menggunakan API Routes. Untuk mempelajari lebih lanjut, lihat [Dokumentasi Preview mode](https://nextjs.org/docs/advanced-features/preview-mode).

### Dynamic API Routes

API Routes dapat digunakan secara dinamis, sama seperti halaman biasa. Lihatlah dokumentasi [Dynamic API Routes](https://nextjs.org/docs/api-routes/dynamic-api-routes) untuk mempelajari lebih lanjut.

Dalam pelajaran dasar berikutnya dan terakhir, kita akan berbicara tentang bagaimana menggunakan aplikasi Next.js Anda untuk produksi.
