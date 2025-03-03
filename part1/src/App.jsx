import './App.css'
import Message from './Message.jsx';
import { useState } from 'react';

function App() {
  const [contador, setContador] = useState(0)

  const handleClick = () => {
    // setContador(contador + 1)

    setContador(prevState => {
      return prevState + 1
    })
  }

  const isEven = contador % 2 === 0

  return (
    <div className='App'>
      <Message color='red' message='Iniciando en' />
      <Message color='green' message='React' />

      <p>El valor del contador es:</p>
      <h1>{contador}</h1>
      <p>{isEven ? 'Es par' : 'Es impar'}</p>
      <button onClick={handleClick}>Incrementar</button>
    </div>
  )
}

export default App
