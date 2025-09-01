import { translateENtoDE } from "functions/translator";

export function getKidsAndAdultsLabel(lowestAndHighest, language) {
  return lowestAndHighest?.age?.includes('kids') && lowestAndHighest?.age.includes('adults')
    ? translateENtoDE('for all ages', language)
    : lowestAndHighest?.age?.includes('kids')
    ? translateENtoDE('for kids and young adults', language)
    : lowestAndHighest?.age?.includes('adults')
    ? translateENtoDE('for adults', language)
    : null;
}
