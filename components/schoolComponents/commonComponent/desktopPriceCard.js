import { translateENtoDE } from "functions/translator";
import { formatPrice } from "./formatPrice";
import { getKidsAndAdultsLabel } from "./getKidsAndAdultsLabel";

export function desktopPriceCard(item, lowestAndHighest, language) {
  return (
    <>
      <div className='flex items-start gap-1 '>
        <p className='text-[22px] lg:text-[32px] font-Roboto leading-[80%] text-[#002D3B] '>
          {formatPrice(Math.floor(item?.price?.toFixed(2)), language)}{' '}
        </p>
        <div className=''>
          <p className='text-[10px] font-Roboto leading-[100%] text-[#000000DE]'>{translateENtoDE('CHF', language)}</p>
          <p className='text-[12px] font-Roboto leading-[100%] text-[#000000DE] mt-[4px]'>
            {item?.quantity}x{item?.duration}{' '}
            {translateENtoDE('mins.', language)}
          </p>
        </div>
      </div>
    </>
  );
}
