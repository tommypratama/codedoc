---
id: doc2
title: Working with Modules and Data
slug: working-with-modules-and-data
---

## Cleaning up and loading a modules

Hapus beberapa file yang tidak diperlukan:

- `src/assets`
- `src/components`

Kemudian pada `App.vue`, hapus beberapa code dan ubah `id="main-app"`, serta `name: "MainApp"` agar tidak membingungkan:

```vue title="src/App.vue"
<template>
  <div id="main-app">
    <h1>Hello World</h1>
  </div>
</template>

<script>
export default {
  name: "MainApp",
};
</script>
```

Berikut adalah contoh untuk menggunakan data pada component vue

```vue title="src/App.vue"
<template>
  <div id="main-app">
    // highlight-next-line
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: "MainApp",
  // highlight-start
  data: function() {
    return {
      title: "Hello Worlds"
    };
  }
  // highlight-end
};
</script>
```

Pada `main.js`, import bootstrap:

```javascript title="src/main.js"
import Vue from "vue";
import App from "./App.vue";
// highlight-start
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
// highlight-end

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
```

Lalu tambahkan `class="container"`

```vue title="src/App.vue"
<template>
  // highlight-next-line
  <div id="main-app" class="container">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: "MainApp",
  data: function() {
    return {
      title: "Hello Worlds"
    };
  }
};
</script>
```
