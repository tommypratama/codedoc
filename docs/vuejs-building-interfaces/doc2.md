---
id: doc2
title: Working with Modules and Data
slug: working-with-modules-and-data
---

## Cleaning up and loading a modules

Hapus beberapa file yang tidak diperlukan:

- `src/assets`
- `src/components`

Kemudian pada `App.vue`, hapus beberapa code:

```vue title="/src/App.vue"
<template>
  <div id="app">
    <h1>Hello World</h1>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
```

Berikut adalah contoh untuk menggunakan data pada component vue

```vue title="/src/App.vue"
<template>
  <div id="app">
    // highlight-next-line
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: "App",
  // highlight-next-line
  data: function() {
    return {
      title: "Hello Worlds"
    };
  }
  // highlight-end
};
</script>
```
