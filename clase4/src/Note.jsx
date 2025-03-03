export const Note = ({ content, date }) => {
    return (
        <li>
            <p>{content}</p>
            <time>{date}</time>
        </li>
    )
}
