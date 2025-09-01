import { storyblokEditable } from "@storyblok/react";
export default function Email({ blok, errors }) {
  return (
    <div {...storyblokEditable(blok)}>
      {errors.email?.type === "pattern" && blok.errorMessage}
    </div>
  )
}