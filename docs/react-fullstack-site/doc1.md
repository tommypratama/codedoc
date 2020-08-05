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
	const article = articleContent.find((article) => article.name === name);

	if (!article) return <h1>Article does not exist</h1>;

  // highlight-start
	const otherArticles = articleContent.filter(
		(article) => article.name !== name
  );
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
