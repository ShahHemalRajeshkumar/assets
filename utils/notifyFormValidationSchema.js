import * as yup from 'yup';

export const getValidationSchema = (props) =>
  yup.object({
    ZIP: yup.string().required(`${props.requiredError || ''}`),
    Email: yup
      .string()
      .email(`${props.emailError}`)
      .required(`${props.requiredError || ''}`),
    FirstName: yup.string().required(`${props.requiredError || ''}`),
    LastName: yup.string().required(`${props.requiredError || ''}`),
    Message: yup.string().required(`${props.requiredError || ''}`),
  });
