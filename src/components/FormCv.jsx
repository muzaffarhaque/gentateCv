import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { InputBox } from '../common';
import { useNavigate } from 'react-router-dom';
// import Section from './Section'; // Import the Section component
export default function FormCv() {
  const navigate=useNavigate()
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    phoneNo: '',
    email: '',
    dob: '',
    profession:"",
    addrace: '',
    objective: '',
    profileUrl: '',
    Skills: [],
    interest: [],
  });

  const [education, setEducation] = useState([
    { institution: '', date: '', cgpa: '', id: 0 },
  ]);

  const [experience, setExperience] = useState([
    { company: '', date: '', details: '', id: 0 },
  ]);

  const updatePersonalInfo = ( value,field) => {
    setPersonalInfo({ ...personalInfo, [field]: value });
  };

  const submitEventHandler = (e) => {
    e.preventDefault();
    console.log('personalInfo:', personalInfo);
    console.log('education:', education);
    console.log('experience:', experience);
    navigate('/',{state:{"personalInfo":personalInfo,"education":education,"experience":experience}});
  };

  return (
    <section className='form-main-section'>
      <div className='container'>
        <h5 className='fs-28-18 fw-600 py-3 black-242'>Update Resume ...</h5>
        <form className='form-details' onSubmit={submitEventHandler}>
          <div className='form-detail-wrapper d-flex flex-wrap align-items-start'>
            {/* ... Personal Info InputBoxes ... */}

            <InputBox title="Enter Name" placeholder="Enter your name" onchange={(data) => updatePersonalInfo(data, "name")} />
            <InputBox title={"Phone No"} pattan="/[^0-9]/g" placeholder="Enter Phone No" onchange={(data) => updatePersonalInfo(data, "phoneNo")} />
            <InputBox title={"Email"} placeholder="email@gmail.com" onchange={(data) => updatePersonalInfo(data, "email")} />
            <InputBox title={"Date of Barth"} placeholder="Enter Phone No" onchange={(data) => updatePersonalInfo(data, "dob")} />
            <InputBox title={"Profession"} placeholder="Front End developer" onchange={(data) => updatePersonalInfo(data, "profession")} />
            <InputBox type={"textarea"} title={"Addrace"} placeholder="Enter you addrace" onchange={(data) => updatePersonalInfo(data, "addrace")} />
            <InputBox type="textarea" title={"Objective"} placeholder="Objective..." onchange={(data) => updatePersonalInfo(data, "objective")} />
            <InputBox type="uploadImage" title={"Uplad Image"} onchange={(data) => setPersonalInfo({ ...personalInfo, profileUrl: URL.createObjectURL(data) })} />


            <InputBox type="multipleText" title={"Add Skills"} placeholder="Html,css,js,React js..." onchange={(data) => updatePersonalInfo(data, "Skills")} />
            <InputBox type="multipleText" title={"Add Interests"} placeholder="music,games,..." onchange={(data) => updatePersonalInfo(data, "interest")} />
            {/* Education Section */}
            <Section
              data={education}
              setData={setEducation}
              sectionType='education'
              sectionTitle='Add Education'
              fields={['Institution', 'Date', 'CGPA']}
            />
            {/* Experience Section */}
            <Section
              data={experience}
              setData={setExperience}
              sectionType='experience'
              sectionTitle='Add Work Experience'
              fields={['Company', 'Date', 'Details']}
            />
            <div className='w-51'>
              <Button type='submit' className='btn-primary fs-16-14'>Submit</Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}



function Section({ data, setData, sectionType, sectionTitle, fields }) {
  const addSection = () => {
    setData([...data, { ...fields, id: Date.now() }]);
  };

  const removeSection = (id) => {
    const updatedSections = data.filter((section) => section.id !== id);
    setData(updatedSections);
  };

  const updateSection = (sectionId, field, value) => {
    const updatedSections = data.map((section) =>
      section.id === sectionId ? { ...section, [field]: value } : section
    );
    setData(updatedSections);
  };

  return (
    <div className='education-frame w-100'>
      <div className='d-flex align-items-center justify-content-between py-4'>
        <h6 className='fs-28-18 fw-700 mb-0 py-3 black-242'>{sectionTitle}</h6>
        <Button className='btn-primary fs-16-14' onClick={addSection}>Add More</Button>
      </div>
      {data.map((item, i) => (
        <div key={i} className='education-form-wrapper w-100 d-flex gap-4 align-items-start flex-wrap'>
          {fields.map((field) => (
            <InputBox
              key={field}
              title={field}
              placeholder={`Enter ${field}`}
              value={item[field.toLowerCase()]}
              onchange={(data) => updateSection(item.id, field.toLowerCase(), data)}
            />
          ))}
          {i >= 1 && <Button className='secondary-btn mb-3' onClick={() => removeSection(item.id)}>Remove</Button>}
        </div>
      ))}
    </div>
  );
}
