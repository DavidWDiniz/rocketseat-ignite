import {Post} from "./components/Post";
import {Header} from "./components/Header";

import styles from "./App.module.css";

import "./global.css";
import {Sidebar} from "./components/Sidebar";

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/davidwdiniz.png",
      name: "David Diniz",
      role: "Web developer"
    },
    content: [
      {type: "paragraph" as const, content: "Fala galeraa 👋"},
      {type: "paragraph" as const, content: "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀"},
      {type: "link" as const, content: "jane.design/doctorcare"}
    ],
    publishedAt: new Date("2022-06-12 12:00:00")
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/davidwdiniz.png",
      name: "David Diniz",
      role: "Web developer"
    },
    content: [
      {type: "paragraph" as const, content: "Fala galeraa 👋"},
      {type: "paragraph" as const, content: "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀"},
      {type: "link" as const, content: "jane.design/doctorcare"}
    ],
    publishedAt: new Date("2022-06-11 12:00:00")
  }
]

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => (
            <Post
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
            />
          ))}
        </main>
      </div>
    </div>
  )
}
