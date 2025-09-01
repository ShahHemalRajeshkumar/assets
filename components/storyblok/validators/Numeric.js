import { storyblokEditable } from "@storyblok/react";
export default function Numeric({ blok, errors }) {
  return (
    <div {...storyblokEditable(blok)}>
      {errors.phoneNumber?.type === "pattern" && blok.errorMessage}
    </div>
  );
}