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

```javascript title="src/App.vue"
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

```javascript title="src/App.vue"
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

```javascript title="src/App.vue"
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

## Importing Font Awesome icons

```javascript title="src/main.js"

import Vue from "vue";
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
// highlight-start
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faMinus,
  faTrash,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
library.add(faPlus, faMinus, faTrash, faCheck);
// highlight-end

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
```

Kemudian gunakan component tersebut pada vue

```javascript title="src/App.vue"
<template>
  <div id="main-app" class="container">
    <h1>{{ title }}</h1>
    <font-awesome-icon icon="plus" class="mr-2" />Add Appointment
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "MainApp",
  data: function() {
    return {
      title: "Appointment List"
    };
  },
  components: {
    FontAwesomeIcon
  }
};
</script>
```

## Looping through data with directives

```json title="Data Appoinments"
[
  {
    "petName": "Spot",
    "petOwner": "Constance Smith",
    "aptDate": "2017-07-24 08:30",
    "aptNotes": "This German Shepherd is having some back pain"
  },
  {
    "petName": "Goldie",
    "petOwner": "Barot Bellingham",
    "aptDate": "2017-07-22 15:50",
    "aptNotes": "This Goldfish has some weird spots in the belly"
  },
  {
    "petName": "Mitten",
    "petOwner": "Hillary Goldwyn",
    "aptDate": "2017-07-21 9:15",
    "aptNotes": "Cat has excessive hairballs"
  },
  {
    "petName": "Buffy",
    "petOwner": "Hassum Harrod",
    "aptDate": "2017-07-20 15:30",
    "aptNotes": "This Chihuahua has not eaten for three days and is lethargic"
  }
]
```

Tambahkan data di atas

```javascript title="src/App.vue"
<template>
  <div id="main-app" class="container">
    <h1>{{ title }}</h1>
    <font-awesome-icon icon="plus" class="mr-2" />Add Appointment
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "MainApp",
  data: function() {
    return {
      title: "Appointment List",
      // highlight-next-line
      appointments: paste disini
    };
  },
  components: {
    FontAwesomeIcon
  }
};
</script>
```

Kemudian tampilkan data tersebut dengan loop

```javascript title="src/App.vue"
<template>
  <div id="main-app" class="container">
    <h4>{{ title }}</h4>
    <font-awesome-icon icon="plus" class="mr-2" />Add Appointment
    <div v-for="(item, i) in appointments" :key="i">
      <h4>{{ item.petName }}</h4>
      <p>{{ item.aptNotes }}</p>
    </div>
  </div>
</template>

......
```

## Using Axios to import data

Pindahkan data appointments ke folder `public/data/appoinments.json`

```json title="public/data/appoinments.json"
[
  {
    "petName": "Spot",
    "petOwner": "Constance Smith",
    "aptDate": "2017-07-24 08:30",
    "aptNotes": "This German Shepherd is having some back pain"
  },
  {
    "petName": "Goldie",
    "petOwner": "Barot Bellingham",
    "aptDate": "2017-07-22 15:50",
    "aptNotes": "This Goldfish has some weird spots in the belly"
  },
  {
    "petName": "Mitten",
    "petOwner": "Hillary Goldwyn",
    "aptDate": "2017-07-21 9:15",
    "aptNotes": "Cat has excessive hairballs"
  },
  {
    "petName": "Buffy",
    "petOwner": "Hassum Harrod",
    "aptDate": "2017-07-20 15:30",
    "aptNotes": "This Chihuahua has not eaten for three days and is lethargic"
  }
]
```

Lalu pada `App.vue` gunakan library axios untuk mengimport data

```javascript title="src/App.vue"
<template>
  <div id="main-app" class="container">
    <h4>{{ title }}</h4>
    <font-awesome-icon icon="plus" class="mr-2" />Add Appointment
    <div v-for="(item, i) in appointments" :key="i">
      <h4>{{ item.petName }}</h4>
      <p>{{ item.aptNotes }}</p>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from "axios";

export default {
  name: "MainApp",
  data: function() {
    return {
      title: "Appointment List",
      appointments: []
    };
  },
  components: {
    FontAwesomeIcon
  },
  // highlight-start
  mounted() {
    axios
      .get("./data/appointments.json")
      .then(response => (this.appointments = response.data));
  }
  // highlight-end
};
</script>
```
