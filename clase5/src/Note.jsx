export const Note = ({ content, date }) => {
    return (
        <li>
            <p>{content}</p>
            <p>{date}</p>
        </li>
    )
}