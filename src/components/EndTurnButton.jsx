import React from 'react'

export default props => {
  const { turnHandler } = props
  return (
    <section style={{ marginTop: '30px' }}>
      <button onClick={turnHandler} type='button' class='bit-button'>End Turn</button>
    </section>
  )
}
