import FooterListItem from './FooterListItem';

const FooterList = ({ linkData }) => {
  const { internal_link, name } = linkData;

  return (
    <>
      <h2 className='my-8 mb-3 font-bold uppercase text-18px text-primary md:mt-0'>{name}</h2>
      <ul>
        {internal_link.map((link) => (
          <FooterListItem key={link._uid} link={link} />
        ))}
      </ul>
    </>
  );
};

export default FooterList;
