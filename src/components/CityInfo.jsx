import React from 'react'
import EndTurnButton from './EndTurnButton.jsx'

export default props => {
  const {
    name,
    income,
    reputation,
    population,
    money,
    turn,
    maxTurn,
    turnHandler
  } = props

  return (
    <section class='city-info'>
      <div class='bit-card'>
        <h1>{name}</h1>
        <div class='bit-card'>
          <h3>Income</h3>
          <p>{income}</p>
        </div>
        <div class='bit-card'>
          <h3>Reputation</h3>
          <p>{reputation}</p>
        </div>
        <div class='bit-card'>
          <h3>Money</h3>
          <p>${money}</p>
        </div>
        <div class='bit-card'>
          <h3>Population</h3>
          <p>{population}</p>
        </div>
        <div class='bit-card'>
          <h3>Turn</h3>
          <p>{turn} / {maxTurn}</p>
        </div>
        <div>
          <EndTurnButton turnHandler={turnHandler} />
        </div>
      </div>
    </section>
  )
}
