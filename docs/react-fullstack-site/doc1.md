---
id: doc1
title: Draft
slug: draft
---

## Creating a React Front End

### Creating the app component

Buat folder `pages` pada direktori `src`.

Lalu buat file baru bernama `HomePage.js`, dan tambahkan kode berikut:

```javascript title="src/pages/HomePage.js"
import React from "react";

const HomePage = () => (
  <>
    <h1>Hello, welcome to my blog!</h1>
    <p>
      Welcome to my blog! Lorem ipsum, dolor sit amet consectetur adipisicing
      elit. Autem dolores similique ea perferendis quae repudiandae architecto
      totam laudantium et odio? Pariatur nihil modi repellendus atque reiciendis
      at accusantium dolore! Exercitationem voluptas rem sequi aperiam! Ratione
      explicabo vero numquam, dolores facilis consectetur autem nulla hic
      perferendis rerum aliquid. Placeat, exercitationem tempora.
    </p>
    <p>
      Autem dolores similique ea perferendis quae repudiandae architecto totam
      laudantium et odio? Pariatur nihil modi repellendus atque reiciendis at
      accusantium dolore! Exercitationem voluptas rem sequi aperiam! Ratione
      explicabo vero numquam, dolores facilis consectetur autem nulla hic
      perferendis rerum aliquid. Placeat, exercitationem tempora.
    </p>
  </>
);

export default HomePage;
```

Kemudian pada `App.js`, import component `HomePage`:

```javascript title="src/App.js"
import React from "react";
// highlight-next-line
import HomePage from "./pages/HomePage";

class App extends React.Component {
  render() {
    return (
      <>
        <div className="App">
          // highlight-next-line
          <HomePage />
        </div>
      </>
    );
  }
}

export default App;
```

Install React Router

```bash
npm install --save react-router-dom
```

Import React Router di `App.js`

```javascript title="src/App.js"
import React from "react";
// highlight-next-line
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

class App extends React.Component {
  render() {
    return (
      <>
        // highlight-start
        <Router>
          <div clasname="App">
            <Route path="/" component={HomePage} exact />
          </div>
        </Router>
        // highlight-end
      </>
    );
  }
}

export default App;
```

### Creating blog pages

Buat 3 component baru

```bash
cd src/pages
touch AboutPage.js ArticlePage.js ArticlesList.js
```

Lalu tambahkan kode berikut:

<Tabs
groupId="code"
defaultValue="code1"
values={[
{label: 'AboutPage.js', value: 'code1'},
{label: 'ArticlesList.js', value: 'code2'},
{label: 'ArticlePage.js', value: 'code3'},
]
}>

<TabItem value="code1">
```javascript
import React from "react";

const AboutPage = () => (
<>
<h1>About Me</h1>
<p>
Welcome to my blog! Lorem ipsum, dolor sit amet consectetur adipisicing
elit. Autem dolores similique ea perferendis quae repudiandae architecto
totam laudantium et odio? Pariatur nihil modi repellendus atque reiciendis
at accusantium dolore! Exercitationem voluptas rem sequi aperiam! Ratione
explicabo vero numquam, dolores facilis consectetur autem nulla hic
perferendis rerum aliquid. Placeat, exercitationem tempora.
</p>
<p>
Autem dolores similique ea perferendis quae repudiandae architecto totam
laudantium et odio? Pariatur nihil modi repellendus atque reiciendis at
accusantium dolore! Exercitationem voluptas rem sequi aperiam! Ratione
explicabo vero numquam, dolores facilis consectetur autem nulla hic
perferendis rerum aliquid. Placeat, exercitationem tempora.
</p>
</>
);

export default AboutPage;

```
</TabItem>

<TabItem value="code2">
```javascript
import React from "react";

const ArticlesList = () => (
  <>
    <h1>Articles</h1>
  </>
);

export default ArticlesList;

```
</TabItem>

<TabItem value="code3">
```javascript
import React from "react";

const ArticlePage = () => (
  <>
    <h1>This is an article</h1>
  </>
);

export default ArticlePage;
```
</TabItem>
</Tabs>
