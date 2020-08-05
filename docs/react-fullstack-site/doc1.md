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

```javascript title="src/pages/AboutPage.js"
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

```javascript title="src/pages/ArticlePage.js"
import React from "react";

const ArticlesList = () => (
  <>
    <h1>Articles</h1>
  </>
);

export default ArticlesList;
```

```javascript title="src/pages/ArticlesList.js"
import React from "react";

const ArticlePage = () => (
  <>
    <h1>This is an article</h1>
  </>
);

export default ArticlePage;
```

Kemudian Import pada `App.js`, dan terapkan Router:

```javascript title="src/App.js"
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
// highlight-start
import AboutPage from "./pages/AboutPage";
import ArticlesList from "./pages/ArticlesList";
import ArticlePage from "./pages/ArticlePage";
// highlight-end

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <div clasname="App">
            // highlight-start
            <div id="page-body">
              <Route path="/" component={HomePage} exact />
              <Route path="/about" component={AboutPage} />
              <Route path="/articles-list" component={ArticlesList} />
              <Route path="/article" component={ArticlePage} />
            </div>
            // highlight-end
          </div>
        </Router>
      </>
    );
  }
}

export default App;
```

### Using react-router links

Buat Component `NavBar`

```javascript title="src/NavBar.js"
import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/articles-list">Articles</Link>
      </li>
    </ul>
  </nav>
);

export default NavBar;
```

Lalu Import pada `App.js`

```javascript title="src/App.js"
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ArticlesList from "./pages/ArticlesList";
import ArticlePage from "./pages/ArticlePage";
// highlight-next-line
import NavBar from "./NavBar";

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <div clasname="App">
            // highlight-next-line
            <NavBar />
            <div id="page-body">
              <Route path="/" component={HomePage} exact />
              <Route path="/about" component={AboutPage} />
              <Route path="/articles-list" component={ArticlesList} />
              <Route path="/article" component={ArticlePage} />
            </div>
          </div>
        </Router>
      </>
    );
  }
}

export default App;
```

### URL parameters with react-router

Tambahkan parameter `:name` pada path component `ArticlePage`:

```javascript title="src/App.js"
<Route path="/article/:name" component={ArticlePage} />
```

Lalu buat file `article-content.js` dan copy data berikut: