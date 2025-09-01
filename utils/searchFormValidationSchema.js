import * as yup from 'yup';

export const getValidationSchema = (props) =>
  yup
    .object()
    .shape({
      instrument: yup
        .array()
        .of(yup.string().required())
        .min(1, `${props.instrumentError || ''}`),
      location: yup
        .array()
        .of(yup.string())
        .min(0, `${props.locationError || ''}`),
    })
    .required();
