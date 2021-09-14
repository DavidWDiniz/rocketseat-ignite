import {RepositoryItem} from "./RepositoryItem";

const repository = {
    name: 'Google',
    description: 'Search Engine',
    link: 'https://www.google.com/'
}

export function RepositoryList () {
    return (
        <section className="repository-list">
            <h1>Lista de repositórios</h1>
            <ul>
                <RepositoryItem repository={repository} />
                <RepositoryItem repository={repository} />
                <RepositoryItem repository={repository} />
                <RepositoryItem repository={repository} />
            </ul>
        </section>
    )
}
