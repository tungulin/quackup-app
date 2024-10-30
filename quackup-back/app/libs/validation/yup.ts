import * as Yup from 'yup';

declare module 'yup' {
  interface StringSchema {
    minLength(min: number): StringSchema;
    maxLength(max: number): StringSchema;
  }
}

Yup.setLocale({
  mixed: {
    notType: 'The ${path} is incorrect ${type}',
    required: 'The ${path} is required',
  },
  string: {
    email: 'The ${path} should be a email',
  },
});

Yup.addMethod<Yup.StringSchema>(Yup.string, 'minLength', function (this: Yup.StringSchema, min) {
  return this.test(
    'minLen',
    `Must be less than ${min} characters`,
    (val) => !val || (typeof val === 'string' && val.length >= min)
  );
});

Yup.addMethod<Yup.StringSchema>(Yup.string, 'maxLength', function (this: Yup.StringSchema, max) {
  return this.test(
    'maxLen',
    `Must be less than ${max} characters`,
    (val) => !val || (typeof val === 'string' && val.length <= max)
  );
});

export const yup = Yup;

export const validate = (schema: any) => async (req: any, res: any, next: any) => {
  try {
    // initTelegramData
    const data = await yup
      .object({
        query: schema.query,
        body: schema.body,
        params: schema.params,
        headers: schema.headers,
      })
      .validate({
        query: req.query,
        params: req.params,
        body: req.body,
        headers: req.headers,
      });

    req.query = data.query;
    req.params = data.params;
    req.body = data.body;
    req.headers.authorization = data.headers.authorization;

    return next();
  } catch (err: any) {
    return res.status(403).json({
      type: err.name,
      message: err.message,
      path: err.path,
    });
  }
};
