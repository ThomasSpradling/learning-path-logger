'use client';

import { Schedule, SubjectPreview } from '@/types/LearningPathTypes';
import { nodesWithZeroIndegree } from '@/utils';
import { Unit, useStore } from '@/zustand/store';
import { Menu, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

export default function UnitItem({
  unit,
  schedule,
}: {
  unit: {
    id: string;
    title: string;
    order: number;
  };
  schedule: Schedule;
}) {
  const changeUnitTitle = useStore((state) => state.changeUnitTitle);

  const preview = useStore((state) => state.subjects);

  const addSubjectToUnit = useStore((state) => state.addSubjectToUnit);
  const deleteSubjectFromUnit = useStore(
    (state) => state.deleteSubjectFromUnit
  );

  const [selected, setSelected] = useState({
    id: '',
    title: 'Select an option',
  });

  let subjects: Schedule[0]['subjects'] = [];
  for (let i = 0; i < schedule.length; i++) {
    if (schedule[i].id === unit.id) {
      subjects = schedule[i].subjects;
    }
  }

  const allowedSubjects = nodesWithZeroIndegree(
    preview,
    (u) => u.unit.order < unit.order
  );

  const handleAddItem = () => {
    if (selected.id) {
      addSubjectToUnit(selected.id, unit.id);
    }
  };

  const handleDeleteItem = (subjectId: string) => {
    deleteSubjectFromUnit(subjectId, unit.id);
  };

  return (
    <div className='w-2/3'>
      <div className='flex flex-row gap-4 items-center w-full'>
        <input
          className='text-2xl border-b-2 border-b-thisle flex-grow outline-none focus:border-b-roseQuartz'
          placeholder='Example Unit'
          value={unit.title}
          onChange={(e) => changeUnitTitle(unit.id, e.target.value)}
        />
        <Select
          className='w-40'
          value={selected.title || ''}
          onChange={(event) => {
            const title = event.target.value;
            const id =
              preview.find((subject) => subject.title === title)?.id || '';
            setSelected({ id, title });
          }}
        >
          <MenuItem value={'Select an option'}>Select an option</MenuItem>
          {allowedSubjects.map((id) => {
            let title = '';
            for (let i = 0; i < preview.length; i++) {
              if (id === preview[i].id) {
                title = preview[i].title;
              }
            }
            return (
              <MenuItem key={id} value={title}>
                {title}
              </MenuItem>
            );
          })}
        </Select>
        <button
          className='text-gray-500 hover:text-roseQuartz'
          onClick={handleAddItem}
        >
          Add Subject
        </button>
      </div>
      <div>
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className='bg-gray-100 py-2 px-10 rounded-lg my-2 relative'
          >
            {subject.title}
            {/* <button
              className='bg-red-100 p-2 rounded-lg text-red-500 absolute right-1 top-1/2 -translate-y-1/2 hover:bg-red-200 hover:text-red-600'
              onClick={() => handleDeleteItem(subject.id)}
            >
              <FaTrash />
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
}
