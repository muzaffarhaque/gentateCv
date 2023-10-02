import React, { useState } from 'react'
import { Button } from 'react-bootstrap';

export default function InputBox({ type, title, placeholder, onchange, pattan = "",value="" }) {
  const [text, setText] = useState("");
  function changHandler(e) {
    setText(e.target.value);
    onchange(e.target.value);
  }
  switch (type) {
    case "multipleText":
      const [show, setShow] = useState(false);
      const [text1, setText1] = useState("");
      const [timeoutId, setTimeoutId] = useState(null);
      const [text1Arr, setText1Arr] = useState([]);
      function changeHandler(e) {
        setText1(e.target.value);
        console.log(text1Arr.length);
      }
      function addText1Dropdoewn() {
        if (text1 == "") {
          setShow(true);
          const timeoutId = setTimeout(() => {
            setShow(false);
          }, 1300);
          setTimeoutId(timeoutId);
        } else {
          setText1Arr([...text1Arr, text1]);
          setText1("");
        }
      }

      return (
        <div className="input-box-frame position-relative w-100">
          <p className="fs-24-18 fw-500 text-start d-block mb-3">{title} <span className='fs-10-7 text-danger'>(add by clicking + and Done)</span></p>
          <div className="position-relative d-flex align-items-stretch">
            <input
              type="text"
              required
              className={
                show
                  ? "input-box fs-16-14 w-100 red-border"
                  : "input-box fs-16-14 w-100"
              }
              value={text1}
              name={title}
              placeholder={placeholder}
              onChange={changeHandler}
              // disabled={disabled}
            />
            <Button onClick={addText1Dropdoewn} className="mult-text-Submit bg-primary  fs-14-12">
              +
            </Button>
          </div>
          {text1Arr.length != 0 && (
            <div className="muiltiple-text-select-dropdoen  position-absolute z-1  w-100">
              <ul>
                {text1Arr?.map((item, i) => {
                  return (
                    <li key={i} className="fs-14-12 fw-400">
                      {item}
                    </li>
                  );
                })}
              </ul>
              <button
                onClick={() => {
                  setText1(text1Arr.join(" , "));
                  setText1Arr([]);
                  onchange(text1Arr);
                }}
                className="primary-btn fx-12 fw-400"
              >
                Done
              </button>
            </div>
          )}
        </div>
      );
    
    case "uploadImage":
      return(
        <div className="mw-340">
        <label className='fs-18-16 fw-500 text-start d-block mb-3' htmlFor={title}>{title}</label>
        <input type='file' name="" id={title} value={text} onChange={(e)=>onchange(e.target.files[0])}></input>
      </div>
      )
    case "textarea":
      return (
        <div className="mw-340">
          <label className='fs-18-16 fw-500 text-start d-block mb-2' htmlFor={title}>{title}</label>
          <textarea name="" id={title} value={value || text} onChange={changHandler} placeholder={placeholder} className='input-box w-100 fw-400 fs-16-14' cols="30" rows="3"></textarea>
        </div>
      )
    default:
      return (
        <div className='mw-340'>
          {title!=="Na" &&  <label className='fs-18-16 fw-500 w-100 text-start d-block mb-2' htmlFor={title}>{title}</label>}
          <input type="text" pattan={pattan} id={title} value={value || text} onChange={changHandler} placeholder={placeholder} className='input-box w-100 fw-400 fs-16-14' />
        </div>
      )
  }

}
