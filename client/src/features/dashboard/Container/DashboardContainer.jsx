import React from 'react';
import Experience from './Experience';
import Education from './Education';

function DashboardContainer({
  experience,
  education,
  addExperience,
  addEducation,
  deleteExperience,
  deleteEducation,
  exDeleteLoading,
  edDeleteLoading,
  elmId,
}) {
  return (
    <div className='dashboard-container'>
      <Experience
        experience={experience}
        addExperience={addExperience}
        deleteExperience={deleteExperience}
        loading={exDeleteLoading}
        exId={elmId}
      />

      <Education
        education={education}
        addEducation={addEducation}
        deleteEducation={deleteEducation}
        loading={edDeleteLoading}
        edId={elmId}
      />
    </div>
  );
}

export default DashboardContainer;
