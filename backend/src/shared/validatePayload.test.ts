// External
import Joi from 'joi'; // See: https://joi.dev/api/?v=17.12.0

// Internal
import { validatePayload } from './validatePayload';

describe('validatePayload', () => {
  // We should not couple to our domain so we can easily reuse
  const joiSchema = Joi.object<any>({
    someString: Joi.string().required(),
    someNumber: Joi.number().required(),
    someOptional: Joi.number(),
  });

  it('should return the payload', () => {
    const payload = {
      someString: 'Hello World',
      someNumber: 12345,
      someOptional: 54321,
    };
    const result = validatePayload(joiSchema, payload);
    expect(result.getValue()).toStrictEqual(payload);
  });

  it('should return the payload when the optional is not given', () => {
    const payload = {
      someString: 'Hello World',
      someNumber: 12345,
    };
    const result = validatePayload(joiSchema, payload);
    expect(result.getValue()).toStrictEqual(payload);
  });

  it('should return an error when the payload value types dont match the schema', () => {
    const payload = {
      someString: 'Hello World',
      someNumber: 'one two three',
    };
    const result = validatePayload(joiSchema, payload);
    expect(result.isError).toBe(true);
  });

  it('should return an error when a required field is missing', () => {
    const payload = {
      someString: 'Hello World',
    };
    const result = validatePayload(joiSchema, payload);
    expect(result.isError).toBe(true);
  });
});
