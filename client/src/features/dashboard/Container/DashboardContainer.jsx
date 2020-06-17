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
  exLoadingTypes,
  edLoadingTypes,
}) {
  return (
    <div className='dashboard-container'>
      <Experience
        experience={experience}
        addExperience={addExperience}
        deleteExperience={deleteExperience}
        exLoadingTypes={exLoadingTypes}
      />

      <Education
        education={education}
        addEducation={addEducation}
        deleteEducation={deleteEducation}
        edLoadingTypes={edLoadingTypes}
      />
    </div>
  );
}

export default DashboardContainer;
