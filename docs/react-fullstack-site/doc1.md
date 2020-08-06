---
id: doc1
title: Creating a React Front End
slug: creating-a-react-front-end
---

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

```javascript title="src/pages/article-content.js"
const articles = [
  {
    name: "learn-react",
    title: "The Fastest Way to Learn React",
    content: [
      `Welcome! Today we're going to be talking about the fastest way to
            learn React. We'll be discussing some topics such as proin congue
            ligula id risus posuere, vel eleifend ex egestas. Sed in turpis leo. 
            Aliquam malesuada in massa tincidunt egestas. Nam consectetur varius turpis, 
            non porta arcu porttitor non. In tincidunt vulputate nulla quis egestas. Ut 
            eleifend ut ipsum non fringilla. Praesent imperdiet nulla nec est luctus, at 
            sodales purus euismod.`,
      `Donec vel mauris lectus. Etiam nec lectus urna. Sed sodales ultrices dapibus. 
            Nam blandit tristique risus, eget accumsan nisl interdum eu. Aenean ac accumsan 
            nisi. Nunc vel pulvinar diam. Nam eleifend egestas viverra. Donec finibus lectus 
            sed lorem ultricies, eget ornare leo luctus. Morbi vehicula, nulla eu tempor 
            interdum, nibh elit congue tellus, ac vulputate urna lorem nec nisi. Morbi id 
            consequat quam. Vivamus accumsan dui in facilisis aliquet.`,
      `Etiam nec lectus urna. Sed sodales ultrices dapibus. 
            Nam blandit tristique risus, eget accumsan nisl interdum eu. Aenean ac accumsan 
            nisi. Nunc vel pulvinar diam. Nam eleifend egestas viverra. Donec finibus lectus 
            sed lorem ultricies, eget ornare leo luctus. Morbi vehicula, nulla eu tempor 
            interdum, nibh elit congue tellus, ac vulputate urna lorem nec nisi. Morbi id 
            consequat quam. Vivamus accumsan dui in facilisis aliquet.`
    ]
  },
  {
    name: "learn-node",
    title: "How to Build a Node Server in 10 Minutes",
    content: [
      `In this article, we're going to be talking looking at a very quick way
            to set up a Node.js server. We'll be discussing some topics such as proin congue
            ligula id risus posuere, vel eleifend ex egestas. Sed in turpis leo. 
            Aliquam malesuada in massa tincidunt egestas. Nam consectetur varius turpis, 
            non porta arcu porttitor non. In tincidunt vulputate nulla quis egestas. Ut 
            eleifend ut ipsum non fringilla. Praesent imperdiet nulla nec est luctus, at 
            sodales purus euismod.`,
      `Donec vel mauris lectus. Etiam nec lectus urna. Sed sodales ultrices dapibus. 
            Nam blandit tristique risus, eget accumsan nisl interdum eu. Aenean ac accumsan 
            nisi. Nunc vel pulvinar diam. Nam eleifend egestas viverra. Donec finibus lectus 
            sed lorem ultricies, eget ornare leo luctus. Morbi vehicula, nulla eu tempor 
            interdum, nibh elit congue tellus, ac vulputate urna lorem nec nisi. Morbi id 
            consequat quam. Vivamus accumsan dui in facilisis aliquet.`,
      `Etiam nec lectus urna. Sed sodales ultrices dapibus. 
            Nam blandit tristique risus, eget accumsan nisl interdum eu. Aenean ac accumsan 
            nisi. Nunc vel pulvinar diam. Nam eleifend egestas viverra. Donec finibus lectus 
            sed lorem ultricies, eget ornare leo luctus. Morbi vehicula, nulla eu tempor 
            interdum, nibh elit congue tellus, ac vulputate urna lorem nec nisi. Morbi id 
            consequat quam. Vivamus accumsan dui in facilisis aliquet.`
    ]
  },
  {
    name: "my-thoughts-on-resumes",
    title: "My Thoughts on Resumes",
    content: [
      `Today is the day I talk about something which scares most people: resumes.
            In reality, I'm not sure why people have such a hard time with proin congue
            ligula id risus posuere, vel eleifend ex egestas. Sed in turpis leo. 
            Aliquam malesuada in massa tincidunt egestas. Nam consectetur varius turpis, 
            non porta arcu porttitor non. In tincidunt vulputate nulla quis egestas. Ut 
            eleifend ut ipsum non fringilla. Praesent imperdiet nulla nec est luctus, at 
            sodales purus euismod.`,
      `Donec vel mauris lectus. Etiam nec lectus urna. Sed sodales ultrices dapibus. 
            Nam blandit tristique risus, eget accumsan nisl interdum eu. Aenean ac accumsan 
            nisi. Nunc vel pulvinar diam. Nam eleifend egestas viverra. Donec finibus lectus 
            sed lorem ultricies, eget ornare leo luctus. Morbi vehicula, nulla eu tempor 
            interdum, nibh elit congue tellus, ac vulputate urna lorem nec nisi. Morbi id 
            consequat quam. Vivamus accumsan dui in facilisis aliquet.`,
      `Etiam nec lectus urna. Sed sodales ultrices dapibus. 
            Nam blandit tristique risus, eget accumsan nisl interdum eu. Aenean ac accumsan 
            nisi. Nunc vel pulvinar diam. Nam eleifend egestas viverra. Donec finibus lectus 
            sed lorem ultricies, eget ornare leo luctus. Morbi vehicula, nulla eu tempor 
            interdum, nibh elit congue tellus, ac vulputate urna lorem nec nisi. Morbi id 
            consequat quam. Vivamus accumsan dui in facilisis aliquet.`
    ]
  }
];

export default articles;
```

Dan, gunakan data tersebut pada component `ArticlePage`

```javascript title="src/pages/ArticlePage.js"
import React from "react";
// highlight-next-line
import articleContent from "./article-content";

// highlight-start
const ArticlePage = ({ match }) => {
  const name = match.params.name;
  const article = articleContent.find(article => article.name === name);

  if (!article) return <h1>Article does not exist</h1>;

  return (
    <>
      <h1>{article.title}</h1>
      {article.content.map((paragraph, key) => (
        <p key={key}>{paragraph}</p>
      ))}
      // highlight-end
    </>
  );
};

export default ArticlePage;
```

### Creating and linking the articles list

Tampilkan list article

```javascript title="src/pages/ArticlesList.js"
import React from "react";
// highlight-next-line
import { Link } from "react-router-dom";
import articleContent from "./article-content";

const ArticlesList = () => (
  <>
    <h1>Articles</h1>
    // highlight-start
    {articleContent.map((article, key) => (
      <Link
        className="article-list-item"
        key={key}
        to={`/article/${article.name}`}
      >
        <h3>{article.title}</h3>
        <p>{article.content[0].substring(0, 150)}...</p>
      </Link>
    ))}
    // highlight-end
  </>
);

export default ArticlesList;
```

### Making the articles list modular

- Pertama, rename nama file `ArticlesList.js` menjadi `ArticlesListPage.js`
- Ubah nama component `ArticlesList` menjadi `ArticlesListPage`

Kemudian pada `App.js`, ubah juga nama component dan pathnya

```javascript title="src/App.js"
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ArticlesListPage from "./pages/ArticlesListPage";
import ArticlePage from "./pages/ArticlePage";
import NavBar from "./NavBar";

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <div clasname="App">
            <NavBar />
            <div id="page-body">
              <Route path="/" component={HomePage} exact />
              <Route path="/about" component={AboutPage} />
              <Route path="/articles-list" component={ArticlesListPage} />
              <Route path="/article/:name" component={ArticlePage} />
            </div>
          </div>
        </Router>
      </>
    );
  }
}

export default App;
```

Buat folder dengan nama `components` dan buat file baru `ArticlesList.js`:

```javascript title="src/components/ArticlesList.js"
import React from "react";
import { Link } from "react-router-dom";

const ArticlesList = ({ articles }) => (
  <>
    {articles.map((article, key) => (
      <Link
        className="article-list-item"
        key={key}
        to={`/article/${article.name}`}
      >
        <h3>{article.title}</h3>
        <p>{article.content[0].substring(0, 150)}...</p>
      </Link>
    ))}
  </>
);

export default ArticlesList;
```

Lalu import component tersebut ke `ArticlesListPage.js`

```javascript title="src/pages/ArticlesListPage.js"
import React from "react";
// highlight-next-line
import ArticlesList from "../components/ArticlesList";
import articleContent from "./article-content";

const ArticlesListPage = () => (
  <>
    <h1>Articles</h1>
    // highlight-next-line
    <ArticlesList articles={articleContent} />
  </>
);

export default ArticlesListPage;
```

Buat related article

```javascript title="src/pages/ArticlePage.js"
import React from "react";
// highlight-next-line
import ArticlesList from "../components/ArticlesList";
import articleContent from "./article-content";

const ArticlePage = ({ match }) => {
  const name = match.params.name;
  const article = articleContent.find(article => article.name === name);

  if (!article) return <h1>Article does not exist</h1>;

  // highlight-start
  const otherArticles = articleContent.filter(article => article.name !== name);
  // highlight-end

  return (
    <>
      <h1>{article.title}</h1>
      {article.content.map((paragraph, key) => (
        <p key={key}>{paragraph}</p>
      ))}
      // highlight-start
      <h3>Other Articles:</h3>
      <ArticlesList articles={otherArticles} />
      // highlight-end
    </>
  );
};

export default ArticlePage;
```

### Creating a 404 page in React

Buat component baru untuk menampilkan halaman 404 di dalam folder `pages`

```javascript title="src/pages/NotFoundPage.js"
import React from "react";

const NotFoundPage = () => <h1>404: Page Not Found</h1>;

export default NotFoundPage;
```

Kemudian tambahkan `Route` baru ke `App.js`

```javascript title="src/App.js"
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ArticlesListPage from "./pages/ArticlesListPage";
import ArticlePage from "./pages/ArticlePage";
// highlight-next-line
import NotFoundPage from "./pages/NotFoundPage";
import NavBar from "./NavBar";

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <div clasname="App">
            <NavBar />
            <div id="page-body">
              // highlight-next-line
              <Switch>
                <Route path="/" component={HomePage} exact />
                <Route path="/about" component={AboutPage} />
                <Route path="/articles-list" component={ArticlesListPage} />
                <Route path="/article/:name" component={ArticlePage} />
                // highlight-next-line
                <Route component={NotFoundPage} />
                // highlight-next-line
              </Switch>
            </div>
          </div>
        </Router>
      </>
    );
  }
}

export default App;
```

Dan import juga pada `ArticlePage.js`

```javascript title="src/pages/NotFoundPage"
import React from "react";
import ArticlesList from "../components/ArticlesList";
// highlight-next-line
import NotFoundPage from "./NotFoundPage";
import articleContent from "./article-content";

const ArticlePage = ({ match }) => {
  const name = match.params.name;
  const article = articleContent.find(article => article.name === name);

  // highlight-next-line
  if (!article) return <NotFoundPage />;

  const otherArticles = articleContent.filter(article => article.name !== name);

  return (
    <>
      <h1>{article.title}</h1>
      {article.content.map((paragraph, key) => (
        <p key={key}>{paragraph}</p>
      ))}
      <h3>Other Articles:</h3>
      <ArticlesList articles={otherArticles} />
    </>
  );
};

export default ArticlePage;
```

## Creating a Node Back End

### Setting up an Express server

- Buat direktori baru dengan nama `backend`. Jadi sekarang kita memiliki dua direktori, yaitu `my-blog` dan `backend`.

Cd ke direktori `backend`, dan init npm.

```bash
npm init -y
```

Install Express

```bash
npm i --save express
```

Buat folder dan file baru `src/server.js`.

Install Babel:

```bash
npm i --save-dev @babel/core @babel/node @babel/preset-env
```

Buat file baru pada direktori top-level : `.babelrc`

```javascript title=".babelrc"
{
  "presets": ["@babel/preset-env"]
}
```

Kemudian pada file `server.js` tambahkan kode berikut:

```javascript title="src/server.js"
import express from "express";

const app = express();

app.get("/hello", (req, res) => res.send("Hello!"));

app.listen(8000, () => console.log("Listening on port 8000"));
```

Kemudian run pada terminal

```bash
npx babel-node src/server.js
```

Buka browser, lihat pada url berikut

```bash
http://localhost:800/hello
```

### Testing an Express server with Postman

Gunakan aplikasi Insomnia atau Postman untuk mengetest response api dengan url di atas yang baru saja dibuat.

Buat route untuk `post` data pada `server.js`

```javascript title="src/server.js"
import express from "express";

const app = express();

app.get("/hello", (req, res) => res.send("Hello!"));
// highlight-next-line
app.post("/hello", (req, res) => res.send("Hello!"));

app.listen(8000, () => console.log("Listening on port 8000"));
```

Testing dengan postman

- Ganti method post
- Untuk mengirim data, gunakan `Body` dan text pilih JSON.

Buat data dengan format JSON untuk mengirimkan post

```javascript
{
  "name": "Tommy"
}
```

Untuk dapat mengirimkan data dalam format json, Install NPM Module `body-parser`

```bash
npm install --save body-parser
```

Import `body-parser` pada `server.js`

```javascript title="src/server.js"
import express from "express";
// highlight-next-line
import bodyParser from "body-parser";

const app = express();
// highlight-next-line
app.use(bodyParser.json());

app.get("/hello", (req, res) => res.send("Hello!"));
// highlight-next-line
app.post("/hello", (req, res) => res.send(`Hello ${req.body.name}!`));

app.listen(8000, () => console.log("Listening on port 8000"));
```

Restart server, dan jalankan kembali

```bash
npx babel-node src/server.js
```

Buat request dengan postman dengan data json yang sudah dibuat. Pilih **send**.

Maka muncul output:

```javascript
Hello Tommy!
```

### Route parameters in Express

Untuk dapat menggunakan route parameters pada url, tambahkan kode berikut:

```javascript title="src/server.js"
import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.get("/hello", (req, res) => res.send("Hello!"));
// highlight-next-line
app.get("/hello:name", (req, res) => res.send(`Hey! ${req.params.name}`));
app.post("/hello", (req, res) => res.send(`Hello ${req.body.name}!`));

app.listen(8000, () => console.log("Listening on port 8000"));
```

Restart server.

Kembali ke postman, dan kirim get request dengan url berikut:

```bash
http://localhost:8000/hello/Tommy
```

Maka akan muncul output seperti berikut

```bash
Hey! Tommy
```

### Upvoting articles

Buat fake data dengan json object

```javascript
const articlesInfo = {
  "learn-react": {
    upvotes: 0
  },
  "learn-node": {
    upvotes: 0
  },
  "learn-api": {
    upvotes: 0
  }
};
```

Buat endpoint baru untuk mengupdate upvote pada arrticle.

```javascript title="src/server.js"
import express from "express";
import bodyParser from "body-parser";

// highlight-start
const articlesInfo = {
  "learn-react": {
    upvotes: 0
  },
  "learn-node": {
    upvotes: 0
  },
  "learn-api": {
    upvotes: 0
  }
};
// highlight-end

const app = express();
app.use(bodyParser.json());

app.post("/api/articles/:name/upvote", (req, res) => {
  const articleName = req.params.name;

  articlesInfo[articleName].upvotes += 1;
  res
    .status(200)
    .send(
      `${articleName} now has ${articlesInfo[articleName].upvotes} upvotes`
    );
});

app.listen(8000, () => console.log("Listening on port 8000"));
```

Restart server.

Kembali ke postman, dan kirimkan post request dengan url:

```bash
http://localhost:8000/api/articles/learn-react/upvote
```

Pilih send, maka akan muncul output seperti berikut:

```bash
learn-react now has 1 upvotes
```

Coba kirimkan beberapa kali, maka nilai upvotes akan berubah.

Coba kirimkan request dengan url lainnya:

```bash
http://localhost:8000/api/articles/learn-node/upvote
```

### Automatically updating with nodemon

Setiap kali membuat perubahan pada code, kita harus me-restart server. Untuk mengatasi ini, install paket `nodemon`:

```bash
npm install --save-dev nodemon
```

Lalu pada `package.json`, tambahkan script berikut di atas `test`

```javascript title="package.json"
"start": "npx nodemon --exec npx babel-node src/server.js", 
```

Kemudian jalankan `npm start`

### Adding comments functionality

- Untuk dapat menggunakan fungsionalitas komentar, tambahkan properti `comments` pada data `articlesInfo`
- Tambahkan route

```javascript title="src/server.js"
import express from "express";
import bodyParser from "body-parser";

const articlesInfo = {
  "learn-react": {
    upvotes: 0,
    comments: [],
  },
  "learn-node": {
    upvotes: 0,
    comments: [],
  },
  "learn-api": {
    upvotes: 0,
    comments: [],
  }
};

const app = express();
app.use(bodyParser.json());

app.post("/api/articles/:name/upvote", (req, res) => {
  const articleName = req.params.name;

  articlesInfo[articleName].upvotes += 1;
  res
    .status(200)
    .send(
      `${articleName} now has ${articlesInfo[articleName].upvotes} upvotes`
    );
});

// highlight-start
app.post('/api/articles/:name/add-comment', (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;

  articlesInfo[articleName].comments.push({ userrname, text });

  res.status(200).send(articlesInfo[articleName]);
})
// highlight-end

app.listen(8000, () => console.log("Listening on port 8000"));
```

Lalu test endpoint yang baru saja dibuat dengan postman:

Url

```bash
http://localhost:8000/api/articles/learn-node/add-comment
```

Lalu pada `Body`, Pilih format `raw` dan `JSON`.

Kemudian isikan data berikut untuk mengirimkan post request

```javascript
{
  "username": "me",
  "text": "I love this article!"
}
```

Lalu tambahkan isikan komentar dengan data lainnya

```javascript
{
  "username": "tommy",
  "text": "This is second comment"
}
```

Lihat hasilnya, dan data akan terupdate.
