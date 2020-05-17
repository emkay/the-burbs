import React from 'react'
import hexgrid from 'react-hexgrid'
import './grid.css'

const { HexGrid, Layout, Hexagon, HexUtils, Text } = hexgrid
export default props => {
  const {
    hexagons,
    setHexagons,
    realEstate,
    money,
    setMoney,
    setRealEstate,
    setSelected,
    selected
  } = props

  const hexagonSize = { x: 6, y: 6 }

  const classes = ['residential', 'commercial', 'industrial']

  const canBuy = price => money >= price

  const onClick = (e, source) => {
    const hexs = hexagons.map((hex, i) => {
      if (HexUtils.equals(source.state.hex, hex)) {
        if (selected && canBuy(selected.price)) {
          hex.className = selected.className
          hex.type = selected.type
          hex.price = selected.price
          setMoney(money + (hex.price * -1))
        }
      }
      return hex
    })

    setHexagons(hexs)
  }
  const gridHexagons = hexagons.map((hex, i) => {
    return <Hexagon key={i} onClick={onClick} {...hex} />
  })

  const realEstateHexTypes = {
    residential: [
      { type: 'housing', price: 10 }
    ],
    commercial: [
      { type: 'offices', price: 15 }
    ],
    industrial: [
      { type: 'factory', price: 5 }
    ]
  }

  return (
    <section>
      <HexGrid width={1200} height={600} viewBox='0 -10 100 100'>
        <Layout size={hexagonSize} flat spacing={1.1} origin={{ x: 0, y: 0 }}>
          {gridHexagons}
        </Layout>

        <Layout size={{ x: 6, y: 6 }} flat spacing={1.1} origin={{ x: 125, y: 0 }}>
          {realEstate.map((hex, i) => {
            const type = classes[i]
            hex.className = type
            hex.type = type

            const item = realEstateHexTypes[type][Math.floor(Math.random() * realEstateHexTypes[type].length)]
            hex.price = item.price

            const realEstateOnClick = () => {
              setSelected(hex)
            }
            return (
              <Hexagon key={i} onClick={realEstateOnClick} {...hex}>
                <Text>${hex.price}</Text>
              </Hexagon>
            )
          })}
        </Layout>
      </HexGrid>
    </section>
  )
}
