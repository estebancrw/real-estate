const cleanApartment = require('./clean-apartment')

describe('cleans apartment', () => {
  test('cleans bathrooms from result', () => {
    const result = {
      bathrooms: '2.5',
    }
    const { bathrooms } = cleanApartment(result)
    const expectedBathrooms = 2.5

    expect(bathrooms).toBe(expectedBathrooms)
  })

  test('cleans bedrooms from result', () => {
    const result = {
      bedrooms: '2',
    }
    const { bedrooms } = cleanApartment(result)
    const expectedBedrooms = 2

    expect(bedrooms).toBe(expectedBedrooms)
  })

  test('cleans build size from result', () => {
    const result = {
      buildSize: '120.00',
    }
    const { buildSize } = cleanApartment(result)
    const expectedBuildSize = 120

    expect(buildSize).toBe(expectedBuildSize)
  })

  test('cleans parking slots from result', () => {
    const result = {
      parkingSlots: '1',
    }
    const { parkingSlots } = cleanApartment(result)
    const expectedParkingSlots = 1

    expect(parkingSlots).toBe(expectedParkingSlots)
  })

  test('cleans plot size from result', () => {
    const result = {
      plotSize: '135.00',
    }
    const { plotSize } = cleanApartment(result)
    const expectedPlotSize = 135

    expect(plotSize).toBe(expectedPlotSize)
  })

  test('cleans price from result', () => {
    const result = {
      price: '$12,345',
    }
    const { price } = cleanApartment(result)
    const expectedPrice = 12345

    expect(price).toBe(expectedPrice)
  })
})
