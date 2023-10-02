import React, { useRef } from 'react'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button, Image } from 'react-bootstrap';
import { BsInfoCircleFill, BsCalendar2DateFill, BsTelephonePlusFill } from "react-icons/bs"
import { MdEmail, MdCastForEducation } from "react-icons/md"
import { FaAddressCard, FaChess } from "react-icons/fa"
import { BsPersonWorkspace, } from "react-icons/bs"
import { GiSkills, } from "react-icons/gi"
import { useLocation, useNavigate } from 'react-router-dom';
import profilImage from '../assets/profile.png';
export default function Resume() {
  const location = useLocation();
  const navigate=useNavigate();
  const pdfref=useRef();
  console.log(location)
  const personalInfo = location.state?.personalInfo || [{}];
  const education = location.state?.education || [{}];
  const experience = location.state?.experience || [{}];
  console.log(personalInfo)

  const downloadPDF = () => {
    const input = pdfref.current;
  
    html2canvas(input, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('YourPDFName.pdf');
    });
  };
  
  return (
    <div>
    <section ref={pdfref}>
      <div className="container">
        <div className="main-section-resume">
          <div className="prfole-section-col">
            <div className="black-shad-profile">
              <div className="image-wrapper mx-auto">
                <Image src={personalInfo?.profileUrl || profilImage} className='w-100' alt="Profile-Photo" />
              </div>
              <p className='fs-28-18 fw-bold text-center text-white mt-4 mb-show'>{personalInfo?.name || "Alex Zander"}</p>
              <p className='fs-24-16 fw-500 text-center text-white mb-show'>{personalInfo?.profession || "Front-End Developer || React js Developer"}</p>

              <div className="green-ribbin-strip fs-16-14 fw-medium">
                <span> <MdEmail /> &nbsp;{personalInfo?.email || "alexendser@gmail.com"} </span>
                <span> <BsTelephonePlusFill /> &nbsp;{personalInfo?.phoneNo || "1231231234"} </span>
                <span> <BsCalendar2DateFill /> &nbsp;{personalInfo?.dob || "10/20/1001"} </span>
                <span> <FaAddressCard /> &nbsp;{personalInfo?.addrace || "Yongshon | londan"} </span>
              </div>
              <div className="objective-text">
                <h4 className='fs-24-16 pb-3 b-greeen text-white text-start'>   <BsInfoCircleFill /> &nbsp; Objective</h4>
                <p className='fs-16-14 text-white text-start'>{personalInfo?.objectiveLorem || "ipsum, dolor sit amet consectetur adipisicing elit. Quia vitae laudantium molestiae labore qui nesciunt corporis cumque fuga enim aut, nihil tempore veniam, ratione, culpa quam dolor modi obcaecati architecto."}</p>
              </div>
            </div>
            <div className="skill-add-wrapper">
              <h3 className='fs-28-18 fw-bold b-greeen pb-4 my-5'><GiSkills /> &nbsp; Skills</h3>
              {!personalInfo?.sills ?
                <span className='fs-24-16 fw-600'> HTML,CSS,React js</span>

                : personalInfo?.sills?.map((item, i) => {
                  return (
                    <span className='fs-24-16 fw-600 mb-3'>{item || "HTML,CSS,React js"}</span>
                  )
                })}
            </div>
            <div className="skill-add-wrapper">
              <h3 className='fs-28-18 fw-bold b-greeen pb-4 mb-4 my-5'><FaChess /> &nbsp;Interest</h3>
              {!personalInfo?.interest?
                <span className='fs-24-16 fw-600'>Gaming,Reading...</span>
                : personalInfo?.interest?.map((item, i) => {
                  return (
                    <span className='fs-24-16 fw-600 d-block'>{item || "Gaming,Reading..."}</span>
                  )
                })}
            </div>
          </div>
          <div className="content-section-col">
            <div className="name-right-box desk-show">
              <p className='fs-57-32 fw-bold text-start '>{personalInfo?.name || "Alex Zander"}</p>
              <p className='fs-24-16 fw-500 text-start '>{personalInfo?.profession || "Front-End Developer || React js Developer"}</p>
            </div>
            <div className="add-Education-section">
              <h3 className='fs-28-18 fw-bold b-greeen pb-4 mb-4'><MdCastForEducation /> &nbsp;Education</h3>
              {education?.map((item, i) => {
                return (<div className="">
                  <p className='fs-24-16 fw-600'>{item?.institution || "Institution Name"}</p>
                  <p className='fs-18-14 fw-500'>{item?.date || "jull 2023 to june 2025"}</p>
                  <p className='fs-18-14  fw-500'>{item?.cgpa || "8.2 cgpa"}</p>
                  <br />
                  <br />
                </div>
                )
              })
              }
            </div>
            <div className="add-Education-section">
              <h3 className='fs-28-18 fw-bold b-greeen pb-4 mb-4'><BsPersonWorkspace /> &nbsp; Work Experience</h3>
              {experience?.map((item, i) => {
                return (<div className="">
                  <p className='fs-24-16 fw-600'>{item?.company || "company Name"}</p>
                  <p className='fs-18-14 fw-500'>{item?.date || "jull 2023 to june 2025"}</p>
                  <p className='fs-18-14  fw-500'>{item?.details || "ipsum, dolor sit amet consectetur adipisicing elit. Quia vitae laudantium molestiae labore qui nesciunt corporis cumque fuga enim aut, nihil tempore veniam, ratione, culpa quam dolor modi obcaecati architecto."}</p>

                  <br />
                  <br />
                </div>
                )
              })
              }
            </div>
          </div>
        </div>
      </div>
     </section>
     <div className="d-flex justify-content-between container py-5">
     <Button className='fs-16-14  ' onClick={()=>{navigate("/update")}}>Edit Resume</Button>
   
    <Button className='fs-16-14  ' onClick={downloadPDF}>downloadPDF</Button>
    </div>
    </div>
  )
}
