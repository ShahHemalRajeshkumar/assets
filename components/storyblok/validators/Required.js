import { storyblokEditable } from "@storyblok/react";
export default function Required({ blok, errors, inputName }) {
    console.log("blok equired: ", blok, )
    console.log("blok Errros: ", errors, )
  return (
    <div {...storyblokEditable(blok)}>
     <p style={{color: 'red', paddingTop: 10}}> 
      {
        errors?.companyname?.type === "required" &&
        inputName === inputName &&
        blok.errorMessage
      }
      </p>
    </div>
  );
}