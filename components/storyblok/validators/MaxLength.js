import { storyblokEditable } from "@storyblok/react";
export default function MaxLength({ blok, errors }) {
  return (
    <div {...storyblokEditable(blok)}>
      {errors.phoneNumber?.type === "maxLength" && blok.errorMessage}
    </div>
  );
}