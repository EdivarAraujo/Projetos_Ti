import styles from './Input.module.css'

function Select({ text, name, options, handlerOnChange, value }) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <select
        name={name}
        id={name}
        onChange={handlerOnChange}
        value={value || ''}
      >
        <option>Selecione um opção</option>
        {options.map(option => (
          <option value={option.id} key={option.id}>
            {option.tipo || option.name || option.setor}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select