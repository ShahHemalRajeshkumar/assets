export function FieldBlock(item, idx) {
  return (
    <div
      key={idx}
      className='py-[8px] px-[10px] bg-[#F2F4F7] rounded-[4px] text-[14px] font-medium font-Roboto leading-[115%] text-[#000000AD] capitalize text-center'>
      <span>{item}</span>
    </div>
  );
}
