import React, { useState, useEffect, useRef } from "react";
import "./profile.css";
import probg from "./pro1.jpg";
import InfoIcon from "@material-ui/icons/Info";
import PersonIcon from "@material-ui/icons/Person";
import EditIcon from "@material-ui/icons/Edit";
import { useStateValue } from "../../context";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { db, storage } from "../../firebase";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Profile() {
  const [{ id, photoUrl, name, about }, dispatch] = useStateValue();
  const inputFile = useRef(null);
  const [openToast, setOpenToast] = React.useState(false);

  const handleToastClick = () => {
    setOpenToast(true);
  };

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenToast(false);
  };

  const [open, setOpen] = React.useState(false);
  const [fname, setfname] = useState(name);
  const [fabout, setfabout] = useState(about);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setfabout(about);
  }, [about]);

  const onChangeFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var image = event.target.files[0];
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
    // console.log(image);
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progrss function ....
      },
      (error) => {
        // // error function ....
        // console.log(error);
      },
      () => {
        // complete function ....
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("users").doc(id).update({ photoUrl: url });
          })
          .then(() => {
            handleToastClick();
            dispatch({
              type: "SET_LOADING",
              loading: false,
            });
          });
      }
    );

    /// if you want to upload latter
  };

  const updateProfile = () => {
    if (fname !== name || fabout !== about) {
      db.collection("users")
        .doc(id)
        .update({
          name: fname,
          about: fabout,
        })
        .then(() => {
          handleToastClick();
        });
    }
    // if (fabout !== about) {
    //   db.collection("users")
    //     .doc(id)
    //     .update({
    //       about: fabout,
    //     })
    //     .then(() => {
    //       handleToastClick();
    //     });
    // }
    //update profile in firebase???????????????????????
    handleClose();
  };

  return (
    <div className="prof_container">
      <div className="bg_holder"></div>
      <img className="prof_img" src={photoUrl}></img>
      <div className="cam_icon" onClick={() => inputFile.current.click()}>
        <CameraAltIcon />
      </div>

      <div className="pro_details">
        <div className="pro_item">
          <PersonIcon />
          <div className="item_det">
            <div className="sub_header">Name</div>
            <div className="content">{name}</div>
          </div>
          <div className="edit_icon" onClick={handleClickOpen}>
            <EditIcon />
          </div>
        </div>
        <div className="pro_item">
          <InfoIcon />
          <div className="item_det">
            <div className="sub_header">About</div>
            <div className="content">{about}</div>
          </div>
          <div className="edit_icon" onClick={handleClickOpen}>
            <EditIcon />
          </div>
        </div>
      </div>
      <input
        type="file"
        id="file"
        ref={inputFile}
        onChange={onChangeFile}
        style={{ display: "none" }}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            onChange={(e) => setfname(e.target.value)}
            value={fname}
          />
          <TextField
            autoFocus
            margin="dense"
            id="about"
            label="About"
            type="text"
            value={fabout}
            onChange={(e) => setfabout(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={updateProfile} color="primary">
            Save
          </Button>
          <Button variant="outlined" onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openToast}
        autoHideDuration={6000}
        onClose={handleToastClose}
      >
        <Alert onClose={handleToastClose} severity="success">
          Profile Successfully updated
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Profile;
