import React, { useEffect, useState, useRef } from "react";
import { auth, db, provider, storage } from "../../../firebase";
import firebase from "firebase";
import { useStateValue } from "../../../context";
import "./chatbox.css";
import { Avatar, Input } from "@material-ui/core";
import bg4 from "./chatbg.jpg";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import Messagetext from "./MessageText/Messagetext";
import ImageIcon from "@material-ui/icons/Image";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";

function Chatbox() {
  const [
    {
      usersList,
      id,
      combinedId,
      selectedUser: { name, sid, about, photoUrl },
      isLoading,
    },
    dispatch,
  ] = useStateValue();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [type, setType] = useState(0);
  const [showEmojis, setshowEmojis] = useState(false);
  const inputImage = useRef(null);
  const divRef = useRef(null);
  const emojis = [
    0x1f600,
    0x1f601,
    0x1f602,
    0x1f603,
    0x1f604,
    0x1f923,
    0x1f924,
    0x1f925,
    0x1f926,
    0x1f60d,
    0x1f60e,
    0x1f60f,
    0x1f605,
    0x1f606,
    0x1f607,
    0x1f608,

    0x1f37f,
    0x1f363,
    0x1f370,
    0x1f355,
    0x1f354,
    0x1f35f,
    0x1f6c0,
    0x1f48e,
    0x1f5fa,
    0x23f0,
    0x1f579,
    0x1f4da,
    0x1f431,
    0x1f42a,
    0x1f439,
    0x1f424,
    0x1f44c,
    0x1f446,
    0x1f447,
    0x1f448,
    0x1f449,
    0x1f44a,
    0x1f44b,
    0x1f44d,
    0x1f44e,
    0x1f44f,
    0x1f4a5,
    0x1f4a6,
    0x1f4aa,
    0x1f525,
    0x270c,
  ];

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  useEffect(() => {
    if (combinedId) {
      db.collection("groups")
        .doc(combinedId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
          );
        });
    }
  }, [combinedId]);

  const sendMessage = (e) => {
    db.collection("groups").doc(combinedId).collection("messages").add({
      content: input,
      fromId: id,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      type: 0,
    });
    setInput("");

    e.preventDefault();
  };
  // console.log(messages);

  const onChangeImage = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var image = event.target.files[0];
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
    // console.log(image);
    const uploadTask = storage.ref(`ImageMsg/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progrss function ....
      },
      (error) => {
        // error function ....
        // console.log(error);
      },
      () => {
        // complete function ....
        storage
          .ref("ImageMsg")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("groups").doc(combinedId).collection("messages").add({
              content: url,
              fromId: id,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              type: 1,
            });
          })
          .then(() => {
            // handleToastClick();
            dispatch({
              type: "SET_LOADING",
              loading: false,
            });
          });
      }
    );
  };

  return (
    <div className="chat_box">
      <div className="chat_header">
        <div className="chat_avatar">
          <Avatar alt={name} src={photoUrl} />
        </div>
        <div className="header_name">{name}</div>
      </div>
      {messages.length > 0 ? (
        <div className="chat_area">
          {messages.map((msg) => (
            <Messagetext
              key={msg.id}
              content={msg.message.content}
              mid={msg.message.fromId}
              timestamp={msg.message.timestamp}
              type={msg.message.type}
            ></Messagetext>
          ))}
          <div ref={divRef} className="div_gap"></div>
        </div>
      ) : (
        <div className="say_hi">
          <div ref={divRef}>Say hi to new friend</div>
          <img
            src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/waving-hand_1f44b.png"
            className="say_img"
          ></img>
        </div>
      )}

      {showEmojis ? (
        <div className="emoji_cont">
          {emojis.map((em) => (
            <span
              className="emoji"
              onClick={() =>
                setInput(
                  (prevInput) => `${prevInput}${String.fromCodePoint(em)}`
                )
              }
            >
              {String.fromCodePoint(em)}
            </span>
          ))}
        </div>
      ) : null}

      <form className="send_container">
        <IconButton onClick={() => inputImage.current.click()}>
          <ImageIcon />
        </IconButton>
        <IconButton onClick={() => setshowEmojis(!showEmojis)}>
          <EmojiEmotionsIcon />
        </IconButton>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setshowEmojis(false)}
          className="send_input"
          placeholder="Write something ..."
        ></input>
        <div className="icon_wrap">
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={sendMessage}
            disabled={!input}
            type="submit"
          >
            <SendIcon className="send_btn" />
          </IconButton>
        </div>
      </form>
      <input
        type="file"
        id="file"
        ref={inputImage}
        onChange={onChangeImage}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default Chatbox;
