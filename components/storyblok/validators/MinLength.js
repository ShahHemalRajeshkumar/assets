import { storyblokEditable } from "@storyblok/react";
export default function MinLength({ blok, errors }) {
  return (
    <div {...storyblokEditable(blok)}>
      {errors.phoneNumber?.type === "minLength" && blok.errorMessage}
    </div>
  );
}