import { translateENtoDE } from "functions/translator";
import { formatPrice } from "./formatPrice";

export const CourseDetailsDesktopPriceCard = ({ priceData, label, language }) => {
  if (!priceData?.price) return null;

  return (
    <div className='w-full max-w-full sm:max-w-[287px] border-[1px] border-[#E4E7EC] rounded-xl p-[16px]'>
      <div className='flex items-start gap-1'>
        <p className='text-[32px] font-Roboto leading-[72%] text-[#002D3B]'>
          {formatPrice(Math.floor(priceData?.price?.toFixed(2)), language)}
        </p>
        <div>
          <p className='text-[10px] font-Roboto leading-[97%] text-[#000000DE]'>{translateENtoDE('CHF', language)}</p>
          <p className='text-[12px] font-Roboto leading-[97%] text-[#000000DE] mt-[4px]'>
            {translateENtoDE('for', language)} {priceData?.quantity} x {priceData?.duration}{' '}
            {translateENtoDE('mins.', language)}
          </p>
        </div>
      </div>
      <p className='text-[12px] font-Roboto leading-[80%] text-[#002D3B] font-semibold mt-[8px]'>
        {translateENtoDE(label, language)}
      </p>
    </div>
  );
};