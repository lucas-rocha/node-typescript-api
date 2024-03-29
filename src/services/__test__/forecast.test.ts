import { StormGlass } from '@src/clients/stormGlass';
import stormGlassNormalizedResponseFixture from '@test/fixtures/stormglass_normalized_response_3_hours.json';
import {
  Forecast,
  Beach,
  BeachPosition,
  ForecastProcessingInternalError,
} from '../forecast';

jest.mock('@src/clients/stormGlass');

describe('Forecast Service', () => {
  const mockedStormGlassService = new StormGlass() as jest.Mocked<StormGlass>;
  it('should return the forecast for a list of beaches', async () => {
    mockedStormGlassService.fetchPoints.mockResolvedValue(
      stormGlassNormalizedResponseFixture,
    );
    const beaches: Beach[] = [
      {
        lat: -33.792726,
        lng: 151.289824,
        name: 'Manly',
        position: BeachPosition.E,
        // user: 'some-id'
      },
    ];
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
            windSpeed: 6.56,
          },
        ],
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
            windSpeed: 6.27,
          },
        ],
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
            windSpeed: 5.98,
          },
        ],
      },
    ];
    const forecast = new Forecast(mockedStormGlassService);
    const beachesWithRating = await forecast.processForecastForBeaches(beaches);
    expect(beachesWithRating).toEqual(expectedResponse);
  });

  it('should return an empty list when the beaches array is empty', async () => {
    const forecast = new Forecast();
    const response = await forecast.processForecastForBeaches([]);
    expect(response).toEqual([]);
  });

  it('should throw internal processing error when something goes wrong during the rating process', async () => {
    const beaches: Beach[] = [
      {
        lat: -33.792726,
        lng: 151.289824,
        name: 'Manly',
        position: BeachPosition.E,
        // user: 'some-id'
      },
    ];
    mockedStormGlassService.fetchPoints.mockRejectedValue(
      'Error fetching data',
    );
    const forecast = new Forecast(mockedStormGlassService);
    await expect(forecast.processForecastForBeaches(beaches)).rejects.toThrow(
      ForecastProcessingInternalError,
    );
  });
});
