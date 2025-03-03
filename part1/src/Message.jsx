const Message = ({ color, message }) => {
    return (
        <h1 style={{ color: color }}>
            {message}
        </h1>
    )
}

export default Message