import React, { useState } from 'react'
import hexgrid from 'react-hexgrid'
import CityInfo from './components/CityInfo.jsx'
import Grid from './components/Grid.jsx'
import Debug from './components/Debug.jsx'
import './index.css'

const { GridGenerator } = hexgrid

const MAX_TURN = 50

export default () => {
  const [turn, setTurn] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const [income, setIncome] = useState(0)
  const [reputation, setReputation] = useState(1)
  const [population, setPopulation] = useState(2)
  const [money, setMoney] = useState(15)

  const [hexagons, setHexagons] = useState(GridGenerator.orientedRectangle(10, 6))
  const [realEstate, setRealEstate] = useState(GridGenerator.orientedRectangle(1, 3))

  const [selected, setSelected] = useState()

  const turnHandler = e => {
    const newMoney = money + income
    const newPopulation = population + reputation

    setMoney(newMoney)

    if (newPopulation >= 0) {
      setPopulation(newPopulation)
    } else {
      setPopulation(1)
    }

    const newTurn = turn + 1
    if (newTurn === MAX_TURN) {
      setGameOver(true)
    }

    setTurn(turn + 1)
  }

  const addIncome = () => {
    setIncome(income + 1)
  }
  const subIncome = () => {
    setIncome(income - 1)
  }

  const addReputation = () => {
    setReputation(reputation + 1)
  }

  const subReputation = () => {
    setReputation(reputation - 1)
  }

  const styles = {
    display: 'flex',
    margin: '10px'
  }

  const addPopulation = n => {
    setPopulation(population + n)
  }

  return (
    <main>
      {!gameOver &&

        <>
          <section style={styles}>
            <CityInfo
              name='Birdland'
              income={income}
              reputation={reputation}
              population={population}
              money={money}
              turn={turn}
              maxTurn={MAX_TURN}
              turnHandler={turnHandler}
            />

          <Debug
            addIncome={addIncome}
            subIncome={subIncome}
            addReputation={addReputation}
            subReputation={subReputation}
          />
        </section>
          <Grid
            hexagons={hexagons}
            setHexagons={setHexagons}
            realEstate={realEstate}
            setRealEstate={setRealEstate}
            selected={selected}
            setSelected={setSelected}
            addIncome={addIncome}
            addReputation={addReputation}
            subReputation={subReputation}
            addPopulation={addPopulation}
            money={money}
            setMoney={setMoney}
            size={10}
          />

        </>
      }
      {gameOver &&
          <section class="bit-card">
            <h1>Game Over</h1>
          </section>
      }
    </main>)
}
