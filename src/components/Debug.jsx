import React from 'react'

export default props => {
  const { addIncome, subIncome, addReputation, subReputation } = props
  return (
    <section class='bit-card'>
      <h1>Debug</h1>
      <section>
        <h2>Income</h2>
        <button onClick={addIncome} type='button' class='bit-button'>+</button>
        <button onClick={subIncome} style={{ marginLeft: '10px' }} type='button' class='bit-button'>-</button>
      </section>
      <section>
        <h2>Reputation</h2>
        <button onClick={addReputation} type='button' class='bit-button'>+</button>
        <button onClick={subReputation} style={{ marginLeft: '10px' }} type='button' class='bit-button'>-</button>
      </section>
    </section>
  )
}
