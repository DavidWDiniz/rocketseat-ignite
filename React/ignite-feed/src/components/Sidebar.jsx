import {PencilLine} from "phosphor-react";

import styles from "./Sidebar.module.css";
import {Avatar} from "./Avatar";

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <img
        className={styles.cover}
        src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50"
        alt="Background image"
      />
      <div className={styles.profile}>
        <Avatar src="https://avatars.githubusercontent.com/u/20936380?v=4" />

        <strong>David Diniz</strong>
        <span>Web Developer</span>
      </div>

      <footer>

        <a href="#">
          <PencilLine size={20} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  )
}