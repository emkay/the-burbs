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
    addIncome,
    addPopulation,
    addReputation,
    subReputation,
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
          hex.modifiers = selected.modifiers

          hex.modifiers.forEach(m => {
            if (m.type === 'self') {
              if (!hex.played) {
                m.action()
              }
              hex.played = true
            }

            if (m.type === 'adjacent') {
              const neighbours = HexUtils.neighbours(hex)
              m.action(neighbours)
            }
          })
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
      {
        type: 'housing',
        price: 10,
        modifiers: [
          {
            type: 'self',
            action: () => addPopulation(10)
          },
          {
            type: 'adjacent',
            action: (neighbours, modifier) => {
              console.log('adjacent modifier')
              console.log(neighbours)
              neighbours.forEach(n => {
                console.log(n)
                const matches = gridHexagons
                  .filter(hex => {
                    if (hex.played) {
                      console.log(hex)
                      console.log(n)
                      console.log('this neighbor was played')
                    }
                    //console.log(hex.played)
                    //console.log(HexUtils.equals(hex, n))
                    return hex.played && HexUtils.equals(hex, n)
                  })
                console.log('there are ', matches.length, ' matches')
              })
            }
          }
        ]
      }
    ],
    commercial: [
      {
        type: 'offices',
        price: 15,
        modifiers: [
          {
            type: 'self',
            action: () => addIncome(1)
          }
        ]
      }
    ],
    industrial: [
      {
        type: 'factory',
        price: 5,
        modifiers: [
          {
            type: 'self',
            action: () => {
              addIncome(1)
              subReputation(1)
            }
          }
        ]
      }
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

            hex.modifiers = item.modifiers

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
