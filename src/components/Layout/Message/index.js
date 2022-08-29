import { useState, useEffect } from 'react'
import { Container } from './styled'

function Message({ type, msg }) {
  const [visible, setVisible] = useState(false)
  //se não tiver mensagem é visibilidade falsa, se tiver exibe uma mensagem, e começa um timer de 3 segundos
  useEffect(() => {
    if (!msg) {
      setVisible(false)
      return
    }
    setVisible(true)

    const timer = setTimeout(() => {
      setVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [msg])

  return (
    <Container>
      {visible && <div className={`message , ${type}`}>{msg}</div>}
    </Container>
  )
}

export default Message
