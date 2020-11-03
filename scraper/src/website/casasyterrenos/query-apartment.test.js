/**
 * @jest-environment jsdom
 */

/* eslint-env browser */

const queryApartment = require('./query-apartment')

describe('queries apartment from DOM', () => {
  // TODO: on queries, sibling elements are undefined
  test.skip('queries all', () => {
    const amenityText = {
      bathrooms: 'Baños',
      bedrooms: 'Habitaciones',
      parkingSlots: 'Estacionamientos',
    }
    const unitText = {
      buildSize: 'Construcción',
      plotSize: 'Terreno',
    }
    document.body.innerHTML = `
    <div>
      <div>
        <p>2.5</p>
        <p class="amenityName">${amenityText.bathrooms}</p>
      </div>
      <div>
        <p>2</p>
        <p class="amenityName">${amenityText.bedrooms}</p>
      </div>
      <div>
        <p>1</p>
        <p class="amenityName">${amenityText.parkingSlots}</p>
      </div>
    </div>
    <div>
      <div>
        <p class="unit">112.00m2 - 112.00m2</p>
        <p>${unitText.buildSize}</p>
      </div>
      <div>
        <p class="unit">135.00m2 - 135.00m2</p>
        <p>${unitText.plotSize}</p>
      </div>
    </div>
    <div class="primaryprice">$99,999</div>
    <ul>
      <a>
        <li></li>
      </a>
      <a>
        <li>la estancia</li>
      </a>
    </ul>
    `
    const expectedResult = {
      bathrooms: '2.5',
      bedrooms: '2',
      buildSize: '112.00',
      neighbourhood: 'la estancia',
      parkingSlots: '1',
      plotSize: '135.00',
      price: '$99,999',
    }

    expect(queryApartment()).toStrictEqual(expectedResult)
  })
})
