import TeacherContentCoursesListItem from '@/components/TeacherInfoPage/TeacherContent/TeacherContentCourses/TeacherContentCoursesListItem';
import CourseCard from './CourseCard';

const MoreCoursesSidebar = ({ data, onClose, language, imageSize }) => {

    return (
        <div className="p-4 border rounded-lg shadow-md bg-white relative">
            <div className="flex justify-between items-center mb-4">
                <button onClick={onClose} className="text-gray-600 hover:text-red-500">
                    x
                </button>
            </div>
            <ul className="space-y-2">
                {data.map((item, index) => (
                    <TeacherContentCoursesListItem
                    item={item}
                    key={item?.id}
                    courseIndex={index}
                    language={language}
                    imageSize={imageSize}
                />
                    // <CourseCard
                    //     item={item}
                    //     key={item?.id}
                    //     courseIndex={index}
                    //     language={language}
                    //     imageSize={imageSize}
                    // />
                ))}
            </ul>
        </div>
    );
};

export default MoreCoursesSidebar;
