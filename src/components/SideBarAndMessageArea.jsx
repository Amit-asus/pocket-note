import React, { useState, useEffect } from "react";
import banner from "../assets/Banner.png";
import lock from "../assets/lock.png";
import styles from "./SideBarAndMessageArea.module.css";
import Modal from "./Modal";
import NotesArea from "./NotesArea";
export default function SideBarAndMessageArea() {
  //if we press create note button  then this state will  be used
  const [openModal, setOpenModal] = useState(false);
  //function for getting the screen size
  const getScreen = () => {
    return {
      height: window.innerHeight,
      width: window.innerWidth,
    };
  };
  //hooks storing the screenSize
  const [screenSize, setScreenSize] = useState(getScreen());
  useEffect(() => {
    const Screen = () => {
      setScreenSize(getScreen());
    };
    window.addEventListener("resize", Screen);

    const fetchGroup = async () => {
      let storedGroups = localStorage.getItem("groups");
      if (storedGroups) {
        let groups = await JSON.parse(storedGroups);
        setGroups(groups);
      }
    };
    fetchGroup();
  }, []);
  //Groups is the Array of the Group of notes
  const [groups, setGroups] = useState([]);
  //groupSelect is the indication if the group is selected or note
  const [groupSelect, setGroupSelect] = useState(null);
  //on clicking the on the group
  const handleClick = (group) => {
    setGroupSelect(group);
  };
  return (
    <>
      {screenSize.width < 989 ? (
        <div className={styles["sideBarContainerMobile"]}>
          {groupSelect ? (
            <NotesArea
              groupSelect={groupSelect}
              groups={groups}
              setGroups={setGroups}
            />
          ) : (
            <>
              <h1 className={styles.headingMobile} >Pocket Notes</h1>
              <button
               className={styles.CreateButtonMobile}
                onClick={() => setOpenModal(true)}
              >
                + Create Notes group
              </button>
              <div className={styles.GroupList} >
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className={`${styles.groupItem} ${
                      groupSelect === group ? styles.selected : ""
                    }`}
                    onClick={() => handleClick(group)}
                  >
                    <div
                      className={styles.groupIcon}
                      style={{ background: group.color }}
                    >
                      {group.groupName?.slice(0, 2)?.toUpperCase()}
                    </div>
                    <h2 className={styles.groupName} >{group.groupName}</h2>
                  </div>
                ))}
              </div>
            </>
          )}
          {openModal && (
            <Modal
              closeModal={setOpenModal}
              setGroups={setGroups}
              groups={groups}
            />
          )}
        </div>
      ) : (
        <>
          <div className={styles["sideBarContainer"]}>
            <h1 className={styles["heading"]}>Pocket Note</h1>
            <button
              className={styles["createNoteButton"]}
              onClick={() => setOpenModal(true)}
            >
              Create Notes
            </button>
            <div className={styles["GroupList"]}>
              {groups.map((group) => (
                <div
                  key={group.id}
                  className={`${styles.groupItem} ${
                    groupSelect === group ? styles.selected : ""
                  }`}
                  onClick={() => handleClick(group)}
                >
                  <div
                    className={styles["groupIcon"]}
                    style={{ background: group.color }}
                  >
                    {group.groupName?.slice(0, 2)?.toUpperCase()}
                  </div>
                  <h2 className={styles["groupName"]}>{group.groupName}</h2>
                </div>
              ))}
            </div>
          </div>
          {openModal && (
            <Modal
              closeModal={setOpenModal}
              setGroups={setGroups}
              groups={groups}
            />
          )}
          <div className={styles["MessageAreaContainer"]}>
            {groupSelect ? (
              <NotesArea
                groupSelect={groupSelect}
                groups={groups}
                setGroups={setGroups}
              />
            ) : (
              <>
                <div className={styles["MessageAreaText"]}>
                  <img src={banner} alt={styles["banner"]}></img>
                  <h2 className={styles["MessageAreaHeading"]}>PocketNotes</h2>
                  <p
                    className={styles["MessageAreaDescription"]}
                    style={{ fontFamily: "cursive" }}
                  >
                    Send and receive messages without keeping your phone online.
                    <br /> Use Pocket Notes on up to 4 linked devices and 1
                    mobile phone
                  </p>
                </div>
                <footer className={styles["MessageAreaFooter"]}>
                  <img src={lock} alt="lock"></img>
                  <span style={{ marginLeft: "15px" }}></span>
                  end-to-end encrypted
                </footer>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
