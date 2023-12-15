import React, { useState, useEffect } from "react";
import sendIcon from "../assets/send.png";
import back from "../assets/back.png";
import styles from "./NotesArea.module.css";

export default function NotesArea(props) {
  //using the props
  let groupSelect = props.groupSelect;
  let notes = groupSelect.notes;
  let groups = props.groups;
  let setGroups = props.setGroups;

  //state for storing the note
  const [note, setNote] = useState("");
  //for setting the screen size
  const getScreen = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };
  //state to store the screen size
  const [screenSize, setScreenSize] = useState(getScreen());

  //every time screen renders this function will run
  useEffect(() => {
    const Screen = () => {
      setScreenSize(getScreen());
    };
    window.addEventListener("resize", Screen);
  }, []);

  //for handling the input in the text
  const handleChange = (e) => {
    setNote(e.target.value);
  };
  // On pressing enter means send
  const keypress = (e) => {
    if (e.code === "Enter") {
      handleSubmit();
      setNote("");
    }
  };

  //to handle the submission of the form
  const handleSubmit = () => {
    let newGroup = [...groups];

    let Cgroup = newGroup[groupSelect.id];

    let time = `${new Date().toLocaleTimeString("en-us", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;

    let date = ` ${new Date().toLocaleDateString([], {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}`;

    Cgroup["notes"].push({ date, time, note });
    localStorage.setItem("groups", JSON.stringify(newGroup));
    setGroups(newGroup);
    setNote("");
  };

  return (
    <>
      {screenSize.width < 989 ? (
        <div className={styles.notesContainer}>
          <div className={styles.notesHeader}>
            <img
              src={back}
              alt={back}
              onClick={() => {
                window.location.reload();
              }}
              className={styles.notesBackImg}
            />
            <div
              className={styles.notesGroup}
              style={{ background: groupSelect.color }}
            >
              {groupSelect.groupName?.slice(0, 2)?.toUpperCase()}
            </div>
            <h2 className={styles.groupName}>{groupSelect.groupName}</h2>
          </div>
          <div className={styles.NotesAndDateMobile}>
            {notes.map((note) => (
              <div className={styles.DateAndText}>
                <div className={styles.DateAndTime}>
                  <p className={styles.TimeMobile}>{note.time}</p>
                  <p className={styles.DateMobile}>{note.date}</p>
                </div>
                <p className={styles.TextMobile}>{note.note}</p>
              </div>
            ))}
          </div>

          <div className={styles.TextareaMobile}>
            <textarea
              className={styles.TextInputMobile}
              type="text"
              value={note}
              onChange={handleChange}
              placeholder="Enter your text here..."
              onKeyDown={keypress}
            ></textarea>
            <img
              src={sendIcon}
              className={styles.SendImgMobile}
              alt="SendImg"
              onClick={handleSubmit}
            />
          </div>
        </div>
      ) : (
        <div className={styles.notesContainer}>
          <div className={styles.notesHeader}>
            <div
              className={styles.notesGroup}
              style={{ background: groupSelect.color }}
            >
              {groupSelect.groupName?.slice(0, 2)?.toUpperCase()}
            </div>
            <h2 className={styles.groupName}>{groupSelect.groupName}</h2>
          </div>
          <div className={styles.NotesAndDate}>
            {notes.map((note) => (
              <div className={styles.DateAndText}>
                <div className={styles.DateAndTime}>
                  <p className={styles.Time}>{note.time}</p>
                  <p className={styles.Date}>{note.date}</p>
                </div>
                <p className={styles.Text}>{note.note}</p>
              </div>
            ))}
          </div>
          <div className={styles.Textarea}>
            <textarea
              className={styles.TextInput}
              type="text"
              value={note}
              onChange={handleChange}
              placeholder="Enter your text here..."
              onKeyDown={keypress}
            ></textarea>
            <img
              src={sendIcon}
              className={styles.SendImg}
              alt="SendImg"
              onClick={handleSubmit}
            />
          </div>
        </div>
      )}
    </>
  );
}
