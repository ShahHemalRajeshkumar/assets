import { useMediaQuery } from 'react-responsive';

export const extractDeviceType = () => {
  const mobile = useMediaQuery({ maxWidth: 767 });
  const tab = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const smallLaptop = useMediaQuery({ minWidth: 1024, maxWidth: 1280 });
  const medLaptop = useMediaQuery({ minWidth: 1280, maxWidth: 1440 });
  const largeLaptop = useMediaQuery({ minWidth: 1440, maxWidth: 1824 });

  const device = [{ sm: mobile }, { md: tab }, { lg: smallLaptop }, { xl: medLaptop }, { xxl: largeLaptop }].find(
    (value) => {
      if (Object.values(value)[0]) {
        return value;
      }
    }
  );

  return device;
};
