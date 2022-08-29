import { Container } from './styled'

function Select({ text, name, options, handlerOnChange, value }) {
  return (
    <Container>
      <label htmlFor={name}>{text}</label>
      <select
        name={name}
        id={name}
        onChange={handlerOnChange}
        value={value || ''}
      >
        <option>Opções</option>
        {options?.map(option => (
          <option value={option.id} key={option.id}>
            {option.tipo || option.name || option.setor || option.unidade}
          </option>
        ))}
      </select>
    </Container>
  )
}

export default Select
