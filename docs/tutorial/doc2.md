---
id: doc2
title: Sass
slug: sass
---

## Nesting

### Apa itu Sass ?

**Sass** adalah bahasa scripting yang memudahkan Anda untuk menulis CSS dengan lebih mudah dan efisien. Ada 2 cara untuk menulis Sass, sintaksis SASS dan sintaksis SCSS. Kita akan menggunakan **sintaksis SCSS**, yang mana adalah sintaksis yang lebih umum. File ekstensinya adalah `.scss` dan bukan `.css`.

### Mengapa Sass?

- Lebih singkat dari CSS
- Code dapat digunakan ulang

### Struktur Nesting (Sarang)

Pertama, mari kita lihat struktur **nesting** yang sering digunakan dalam Sass. Dengan nesting, Anda dapat menulis ulang CSS seperti dicontohkan di bawah. Dengan cara ini, Sass memungkinkan Anda untuk nesting (menyarang) selector pada selector lain. Jadi, dengan Sass, Anda **tidak perlu untuk menulis selector yang sama berulang kali**.

```html
<div class="header">
  <ul>
    ...
  </ul>
</div>
```

```css title="CSS"
.header {
  width: 100%;
}

.header ul {
  padding: 10px;
}
```

```css title="Sass"
.header {
  width: 100%;

  ul {
    padding: 10px;
  }
}
```

### Keuntungan Nesting

Semakin besar website, makin berguna nesting. Terutama **ketika melakukan perubahan pada nama class**. Jika Anda ingin mengubah nama class header pada contoh di bawah, Anda harus melakukan perubahan di 3 lokasi dengan CSS normal, namun dengan Sass Anda hanya perlu melakukan satu perubahan.

```css title="CSS"
.header {
  width: 100%;
}

.header ul {
  padding: 10px;
}

.header ul li {
  font-size: 15px;
}
```

```css title="Sass"
.header {
  width: 100%;

  ul {
    padding: 10px;

    li {
      font-size: 15px;
    }
  }
}
```

### Demo

Mari memulai dengan menambahkan beberapa HTML.

Menambah HTML untuk menampilkan judul dan deskripsi di dalam `<div class="main">`.

- Judul
  - `<h1>Apa itu Sass?</h1>`
- Deskripsi
  - `<p>Sass adalah bahasa untuk membuat CSS menjadi lebih mudah dan efisien.</p>`

```html title="index.html"
<div class="main">
  <!-- Tambahkan code HTML untuk menampilkan judul -->

  <!-- Tambahkan code HTML untuk menampilkan deskripsi -->
</div>
```

Selanjutnya, mari mengubah file Sass.

- Heading `h1`
  - Warna teks: `#f8f8f8`
  - Ukuran teks: `34px`
- Paragraph `p`
  - Warna teks: `#efefef`
  - Ukuran teks: `16px`

```css title="stylesheet.scss"
.main {
  margin: 20px;
  padding: 20px;
  border-radius: 5px;
  background-color: #f567ae;

  // Tambahkan code untuk h1 dibawah

  // Tambahkan code untuk tag p dibawah
}
```
