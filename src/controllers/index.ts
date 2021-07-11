import { Response } from 'express';
import Mongoose from 'mongoose';

export abstract class BaseController {
  protected sendCreateUpdateErrorResponse(
    res: Response,
    error: Mongoose.Error.ValidationError | Error,
  ): Response {
    if (error instanceof Mongoose.Error.ValidationError) {
      return res.status(422).send({ code: 422, error: error.message });
    } else {
      console.error(error);
      return res
        .status(500)
        .send({ code: 500, error: 'Something went wrong!' });
    }
  }
}
