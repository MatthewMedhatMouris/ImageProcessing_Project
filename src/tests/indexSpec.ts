import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endpoint responses', () : void => {
  it('Using the endpoint without providing the fileName parameter returns 400', async () : Promise<void> => {
    const response = await request.get('/api/images?width=200&height=200');
    expect(response.status).toBe(400);
  });

  it('Using the endpoint without providing the width parameter returns 400', async () : Promise<void> => {
    const response = await request.get(
      '/api/images?fileName=icelandwaterfall&height=200'
    );
    expect(response.status).toBe(400);
  });

  it('Using the endpoint without providing the height parameter returns 400', async () : Promise<void> => {
    const response = await request.get(
      '/api/images?fileName=icelandwaterfall&width=200'
    );
    expect(response.status).toBe(400);
  });

  it('Using the endpoint with a non-existent image returns 404', async () : Promise<void> => {
    const response = await request.get(
      '/api/images?fileName=OPPO&width=200&height=200'
    );
    expect(response.status).toBe(404);
  });

  it('gets the api endpoint', async () : Promise<void> => {
    const response = await request.get(
      '/api/images?fileName=icelandwaterfall&width=200&height=200'
    );
    expect(response.status).toBe(200);
  });
});
