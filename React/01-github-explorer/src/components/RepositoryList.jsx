const repositoryName = "Google"
export function RepositoryList () {
    return (
        <section className="repository-list">
            <h1>Lista de repositórios</h1>
            <ul>
                <li>
                    <strong>{repositoryName}</strong>
                    <p>Forms in React</p>
                    <a href="">
                        Acessar repositório
                    </a>
                </li>
                <li>
                    <strong>Facebook</strong>
                    <p>Forms in React</p>
                    <a href="">
                        Acessar repositório
                    </a>
                </li>
                <li>
                    <strong>Amazon</strong>
                    <p>Forms in React</p>
                    <a href="">
                        Acessar repositório
                    </a>
                </li>
            </ul>
        </section>
    )
}
