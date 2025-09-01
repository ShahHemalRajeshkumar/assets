import { useMemo } from 'react';
import TeacherProfile from './TeacherProfile';
import TeacherFilterField from './TeacherFilterField';
import CloseIcon from '@/components/icons/closeIcon';
import { translateENtoDE } from 'functions/translator';
import { FixedSizeGrid as Grid } from 'react-window';

const TeacherSectionSidebar = ({
  data,
  teacherFilterdData = [],
  onClose,
  language,
  showTeacherDetails,
  teacherFilterQuery,
  handleInstrumentChange,
}) => {
  const teachersLabel = useMemo(() => translateENtoDE('Teachers', language), [language]);
  const resultsLabel = useMemo(() => translateENtoDE('results', language), [language]);
  const notFoundLabel = useMemo(() => translateENtoDE('Teacher Not Found', language), [language]);
  const columnCount = 3; 
  const rowCount = Math.ceil(teacherFilterdData.length / columnCount);

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const teacher = teacherFilterdData[rowIndex * columnCount + columnIndex];
    if (!teacher) return null;

    return (
      <div style={style} className="p-2">
        <TeacherProfile
          key={teacher.id}
          teacher={teacher}
          showTeacherDetails={showTeacherDetails}
          language={language}
        />
      </div>
    );
  };

  return (
    <div className="bg-white relative">
      <div className="flex justify-between items-center py-[20px] px-[20px] sticky top-0 z-20 bg-white">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-[19px] text-[#000000DE] font-Roboto">
            {teachersLabel}
          </h3>
        </div>
        <button onClick={onClose} className="text-gray-600 hover:text-red-500">
          <CloseIcon />
        </button>
      </div>

      <hr />

      <div className="px-4 sm:px-[24px]">
        <div className="flex sm:flex-row flex-col items-start sm:items-center gap-[16px] justify-between mt-[16px] sm:mt-[24px]">
          <p className="font-bold text-[17px] sm:text-[19px] text-[#000000DE] font-Roboto whitespace-nowrap">
            {`${teacherFilterdData.length} ${resultsLabel}`}
          </p>
          <TeacherFilterField
            data={data}
            teacherFilterQuery={teacherFilterQuery}
            handleInstrumentChange={handleInstrumentChange}
            language={language}
          />
        </div>

        {teacherFilterdData.length > 0 ? (
          <Grid
            columnCount={columnCount}
            columnWidth={300} 
            height={600}     
            rowCount={rowCount}
            rowHeight={350}  
            width={1000}     
          >
            {Cell}
          </Grid>
        ) : (
          <p className="mt-4 text-center text-gray-500">{notFoundLabel}</p>
        )}
      </div>
    </div>
  );
};
export default TeacherSectionSidebar;
