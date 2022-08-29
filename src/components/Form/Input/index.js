import { Container } from './styled'

function Input({ type, text, name, placeholder, handlerOnChange, value }) {
  return (
    <Container>
      <label htmlFor={name}>{text}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handlerOnChange}
        value={value}
      />
    </Container>
  )
}

export default Input
