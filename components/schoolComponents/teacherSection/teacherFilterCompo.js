import { MAPBOX_ACCESS_TOKEN } from '@/components/TeachersSearchMap/mapboxInfo';
import React from 'react'

function TeacherFilterCompo({ data, teacherFilterQuery, handleInstrumentChange }) {
    const allTeacherCommonInstrument = () => {
        const allInstruments = [... new Set(data?.flatMap(teacher =>
            teacher.instruments.map(instrument => instrument.key)
        ))] || [];

        return allInstruments
    };

    return (
        <div className="flex gap-4 p-4">
            <div>
                <select
                    value={teacherFilterQuery.instrument}
                    onChange={handleInstrumentChange}
                    name='instrument'
                    className="px-4 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-50 min-w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Instrument</option>
                    {allTeacherCommonInstrument().map(instrument => (
                        <option key={instrument} value={instrument}>
                            {instrument}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <select
                    name='age'
                    value={teacherFilterQuery.age}
                    onChange={handleInstrumentChange}
                    className="px-4 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-50 min-w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Age Group</option>
                    <option value="adults">Adults</option>
                    <option value="kids">Kids</option>
                </select>
            </div>
        </div>
    )
}

export default TeacherFilterCompo

