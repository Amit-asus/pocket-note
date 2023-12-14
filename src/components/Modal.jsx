import React, { useState, useEffect } from "react";
import styles from "./Modal.module.css";

export default function Modal(props) {
  //this is used to store the form data
  const [formData, setFormData] = useState({ grpName: "", color: "" });
  // we have passed the groups and setgroups in  the props
  const setGroups = props.setGroups;
  const groups = props.groups;
  //this is the colors array
  const color = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  //function to get the screen size
  const getScreen = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  //state to store the screen size
  const [screenSize, setScreenSize] = useState(getScreen());

  //everyTime the screen gets loaded the  we set the screen size
  useEffect(() => {
    const Screen = () => {
      setScreenSize(getScreen());
    };
    window.addEventListener("resize", Screen);
  }, []);

  //for setting the group name
  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData.grpName);
  };

  //for setting the  group of the color
  const handleChangeColor = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.getAttribute("color"),
    });
    console.log(formData.color);
  };

  //for the submission of the form
  const handleSubmit = (e) => {
    if (formData.color === "") {
      alert("Please select a color");
      return;
    }
    let newGroup = [
      ...groups,
      {
        groupName: formData.grpName,
        color: formData.color,
        notes: [],
        id: groups.length,
      },
    ];
    setGroups(newGroup);
    localStorage.setItem("groups", JSON.stringify(newGroup));
    props.closeModal(false);
  };

  return (
    <>
      {screenSize.width < 989 ? (
        <>
          <div className={styles.modalBackgroundMobile}>
            <div className={styles.modalContainerMobile}>
              <span>
                <button
                  className={styles.closeButtonMobile}
                  onClick={() => props.closeModal(false)}
                >
                  X
                </button>
              </span>
              <h2 className={styles.modalHeading}>Create New Group</h2>
              <label className={styles.modalGrp}>Group Name</label>
              <input
                type="text"
                className={styles.modalTextMobile}
                name="grpName"
                placeholder="Enter your group name"
                onChange={handleChange}
              />
             
              <label className={styles.modalColor}>Choose Color</label>
              <br />
              {color.map((color, index) => (
                <button
                  className={`${styles.colorButton} ${
                    formData.color === color ? "selected" : ""
                  }`}
                  name="color"
                  color={color}
                  key={index}
                  id={color}
                  style={{
                    height: "40px",
                    width: "40px",
                    background: color,
                    borderRadius: "25px",
                    border: "none",
                    marginRight: "10px",
                  }}
                  onClick={handleChangeColor}
                ></button>
              ))}
              <br />
              <button
                className={styles.modalCreateMobile}
                onClick={handleSubmit}
              >
                Create
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.modalBackground}>
          <div className={styles.modalContainer}>
            <span>
              <button
                className={styles.closeButton}
                onClick={() => props.closeModal(false)}
              >
                X
              </button>
            </span>
            <h2 className={styles.modalHeading}>Create New Group</h2>
            <label className={styles.modalGrp}>Group Name</label>
            <input
              type="text"
              className={styles.modalText}
              name="grpName"
              placeholder="Enter your group name"
              onChange={handleChange}
            />
            <label className={styles.modalColor}>Choose Color</label>
            {color.map((color, index) => (
              <button
                className={`${styles.colorButton}  ${
                  formData.color === color ? "selected" : ""
                }`}
                name="color"
                color={color}
                key={index}
                id={color}
                style={{
                  background: color,
                  border: formData.color === color ? "2px solid black" : "none",
                }}
                onClick={handleChangeColor}
              ></button>
            ))}
            <button className={styles.modalCreate} onClick={handleSubmit}>
              Create
            </button>
          </div>
        </div>
      )}
    </>
  );
}
