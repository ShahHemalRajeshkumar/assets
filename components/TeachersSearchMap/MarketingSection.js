import cx from "classnames";
import Image from "next/image";
import { useState, useCallback } from "react";
import { translateENtoDE } from "../../functions/translator";
import ChevronDownIcon from "../icons/ChevronDown.svg";
import EmailIcon from "../icons/Email.svg";

const MarketingSection = ({ language, seoActions }) => {
  const [visible, setVisible] = useState(true);

  const toggleHandle = useCallback(() => {
    if (seoActions?.showHideContact) {
      seoActions?.showHideContact(!visible ? "unhide" : "hide");
    }

    setVisible(!visible);
  }, [visible, seoActions]);

  const dropdownClasses = `marketing-section-dropdown flex items-center 
  justify-between cursor-pointer text-[13px] font-[600] tx-secondary pb-2.5`;

  return (
    <div
      id="marketing-section-seo"
      className={cx("marketing-section p-4 marketing-bg rounded-lg", {
        "border-b-0 pb-0 pt-2": !visible,
      })}
    >
      <p className={dropdownClasses} onClick={toggleHandle}>
        {translateENtoDE("Need support?", language)}
        <ChevronDownIcon
          className={cx("transform duration-300", { "rotate-180": !visible })}
        />
      </p>
      {visible && (
        <div className="h-14 mt-4 flex justify-between">
          <div className="flex [&>span]:!w-[45px] lg:[&>span]:!w-[56px] [&>span]:!h-[45px] lg:[&>span]:!h-[56px]">
            <Image
              width={56}
              height={56}
              layout="fixed"
              alt="Cláudia Carneiro"
              className="rounded-full"
              src="https://a.storyblok.com/f/121094/500x500/e8b5572fbb/profile-image-claudia-carneiro.png"
            />
            <div className="ml-2.5 h-14 flex flex-col justify-center">
              <h2 className="text-[17px] font-[700]">Cláudia Carneiro</h2>
              <div className="text-14px font-[400] mb-2.5 tx-secondary">
                {translateENtoDE("Customer Success", language)}
              </div>
            </div>
          </div>
          <div className="flex flex-col pt-[5px] font-[500] text-14px text-primary">
            {/* <div className='flex justify-end mb-2'>
              <a target='_blank' rel='noreferrer' href='tel:+41442039551' className='ml-3'>
              +41 44 203 95 51
              </a>
            </div> */}
            <div className="flex items-center ">
              <EmailIcon />
              <a
                target="_blank"
                rel="noreferrer"
                className="ml-[9px] text-[12.5px] lg:text-[14px]"
                href={`mailto:lessons@matchspace.com?subject=${translateENtoDE(
                  "I need help finding a teacher",
                  language
                )}`}
              >
                {translateENtoDE("SEND US AN E-MAIL", language)}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingSection;
