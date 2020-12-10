import { StormGlass } from '@src/clients/stormGlass'
import stormGlassNormalizedResponseFixture from '@test/fixtures/stormglass_normalized_response_3_hours'
import { Forecast, Beach, BeachPosition } from '../forecast'

jest.mock('@src/clients/stormGlass')

describe('Forecast Service', () => {
  it('should return the forecast for a list of beaches', async () => {
    StormGlass.prototype.fetchPoints = jest.fn().mockResolvedValue(stormGlassNormalizedResponseFixture)
    const beaches: Beach[] = [
      {
        lat: -33.792726,
        lng: 151.289824,
        name: 'Manly',
        position: BeachPosition.E,
        user: 'some-id'
      }
    ]
    const expectedResponse = [
      {
        time: '2020-12-05T00:00:00+00:00',
        forecast: [
          {
            lat: -33.792726,
            lng: 151.289824,
            name: 'Manly',
            position: 'E',
            rating: 1,
            swellDirection: 174.91,
            swellHeight: 0.51,
            swellPeriod: 6.7,
            time: '2020-12-05T00:00:00+00:00',
            waveDirection: 151.02,
            waveHeight: 1.94,
            windDirection: 169.48,
            windSpeed: 6.56
          }
        ]
      },
      {
        time: '2020-12-05T01:00:00+00:00',
        forecast: [
          {
            lat: -33.792726,
            lng: 151.289824,
            name: 'Manly',
            position: 'E',
            rating: 1,
            swellDirection: 175.23,
            swellHeight: 0.49,
            swellPeriod: 6.72,
            time: '2020-12-05T01:00:00+00:00',
            waveDirection: 151.12,
            waveHeight: 1.88,
            windDirection: 168.71,
            windSpeed: 6.27
          }
        ]
      },
      {
        time: '2020-12-05T02:00:00+00:00',
        forecast: [
          {
            lat: -33.792726,
            lng: 151.289824,
            name: 'Manly',
            position: 'E',
            rating: 1,
            swellDirection: 175.54,
            swellHeight: 0.46,
            swellPeriod: 6.75,
            time: '2020-12-05T02:00:00+00:00',
            waveDirection: 151.23,
            waveHeight: 1.81,
            windDirection: 167.95,
            windSpeed: 5.98
          }
        ]
      }
    ]
    const forecast = new Forecast(new StormGlass())
    const beachesWithRating = await forecast.processForecastForBeaches(beaches)
    expect(beachesWithRating).toEqual(expectedResponse)
  })
})
