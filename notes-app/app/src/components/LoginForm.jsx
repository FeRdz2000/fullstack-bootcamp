import { Toggle } from './Toggle'

export const LoginForm = ({ username, password, handleUsernameChange, handlePasswordChange, handleSubmit }) => {

    return (
        <Toggle buttonLabel={'Show Login'}>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    onChange={handleUsernameChange}
                    name='username' value={username}
                    placeholder='Username' />

                <input type="password"
                    onChange={handlePasswordChange}
                    name='password' value={password}
                    placeholder='Password' />
                <button>Login</button>
            </form>
        </Toggle>
    )
}
