import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  getStorage,
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { app } from "../../firebase";

const CreateUpdate = ({
  team,
  setTeam,
  teams,
  setTeams,
  teamDialog,
  setSubmitted,
  submitted,
  setTeamDialog,
  emptyTeam,
  toast,
}) => {
  const [preview, setPreview] = useState();
  const { t } = useTranslation();
  const storage = getStorage();
  const [disableBtn, setDisableBtn] = useState(false);

  useEffect(() => {
    if (!(team.image instanceof File)) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(team.image);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [team.image]);

  const onInputChange = (e, variable) => {
    const val = (e.target && e.target.value) || "";
    let _team = { ...team };
    _team[`${variable}`] = val;

    setTeam(_team);
  };

  const findIndexById = (id) => {
    let index = -1;

    for (let i = 0; i < teams.length; i++) {
      if (teams[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const hideDialog = () => {
    // setNews(false);
    // setEdit(false);
    setSubmitted(false);
    setTeamDialog(false);
  };

  // const uploadImage = async () => {
  //   if (!team.image || !team.fullname || !team.position) {
  //     return;
  //   }

  //   // let formData = new FormData();
  //   // formData.append("image", team.image);

  //   // const res = await fetch("https://bunaq-api.vercel.app/api/upload", {
  //   //   method: "POST",
  //   //   body: formData,
  //   // });
  //   const data = await res.json();
  //   setTeam({ ...team, path: data.data.path || team.image });

  //   return { ...team, path: data.data || team.image };
  // };

  const uploadFile = async () => {
    setDisableBtn(true);

    if (
      !team.image ||
      !team.fullname ||
      !team.position ||
      !(team.image instanceof File)
    ) {
      return { ...team, url: team.image };
    }
    const imageRef = storageRef(storage, `images/${Date.now()}`);
    const snapshot = await uploadBytes(imageRef, team.image);
    const url = await getDownloadURL(snapshot.ref);
    setTeam({ ...team, url: url || team.image });
    return { ...team, url: url || team.image };

    // return { ...team, url: url || team.image };

    // .then((snapshot) => {s
    //   getDownloadURL(snapshot.ref)
    //     .then((url) => {
    //       setTeam({ ...team, url: url || team.image });
    //       return { ...team, url: url || team.image };
    //     })
    //     .catch((error) => {
    //       console.log(error.message);
    //     });
    // })
    // .catch((error) => {
    //   console.log(error.message);
    // });
  };

  const saveTeam = async (teamMember = team) => {
    setSubmitted(true);
    if (!teamMember.image || !teamMember.fullname || !teamMember.position) {
      return;
    }
    let _teams = [...teams];
    let _team = { ...teamMember };
    if (teamMember.id) {
      await fetch("https://bunaq-api.vercel.app/api/edit-team-member", {
        method: "PUT",
        body: JSON.stringify(teamMember),
        headers: { "Content-Type": "application/json" },
      });
      const index = findIndexById(teamMember.id);
      _teams[index] = _team;
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: t("adminTeamPage.new.toastUpdated"),
        life: 5000,
      });
    } else {
      await fetch("https://bunaq-api.vercel.app/api/new-team-member", {
        method: "POST",
        body: JSON.stringify(teamMember),
        headers: { "Content-Type": "application/json" },
      });
      _teams.unshift(_team);
      location.reload();
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: t("adminTeamPage.new.toastCreated"),
        life: 5000,
      });
    }
    setTeams(_teams);
    setTeamDialog(false);
    setTeam(emptyTeam);
    setDisableBtn(false);
  };

  const saveTeamMain = async () => {
    const team = await uploadFile();
    saveTeam(team);
  };

  const teamDialogFooter = (
    <React.Fragment>
      <Button
        label={t("adminTeamPage.new.cancel")}
        icon="pi pi-times"
        className="mr-2 ml-2 rounded"
        outlined
        onClick={hideDialog}
      />
      <Button
        label={t("adminTeamPage.new.save")}
        icon="pi pi-check"
        className="rounded bgOrangish"
        onClick={saveTeamMain}
        disabled={disableBtn}
      />
    </React.Fragment>
  );
  return (
    <Dialog
      visible={teamDialog}
      style={{ width: "32rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      header={t("adminTeamPage.new.title")}
      modal
      className="p-fluid"
      footer={teamDialogFooter}
      onHide={hideDialog}
    >
      <div className="field">
        <label htmlFor="fullname" className="font-bold">
          {t("adminTeamPage.new.fullName")}
        </label>
        <InputText
          id="fullname"
          value={team.fullname}
          onChange={(e) => onInputChange(e, "fullname")}
          required
          autoFocus
          className={classNames({
            "p-invalid": submitted && !team.fullname,
          })}
        />
        {submitted && !team.fullname && (
          <small className="p-error">{t("adminTeamPage.new.errName")}</small>
        )}
      </div>
      <div className="field">
        <label htmlFor="position" className="font-bold">
          {t("adminTeamPage.new.position")}
        </label>
        <InputText
          id="position"
          value={team.position}
          onChange={(e) => onInputChange(e, "position")}
          required
          autoFocus
          className={classNames({
            "p-invalid": submitted && !team.position,
          })}
        />
        {submitted && !team.position && (
          <small className="p-error">
            {t("adminTeamPage.new.errPosition")}
          </small>
        )}
      </div>
      <div className="field">
        <label htmlFor="image" className="font-bold">
          {t("adminTeamPage.new.image")}
        </label>
        <InputText
          className="cursor-pointer"
          type="file"
          onChange={(e) => {
            setTeam({ ...team, image: e.target.files[0] });
          }}
          accept="image/*"
          required
        />
        {submitted && !team.image && (
          <small className="p-error">{t("adminTeamPage.new.errImage")}</small>
        )}
      </div>
      {/* {team.image && news && (
    <img src={preview} width="100" height="100" />
  )} */}

      {team.image && (
        // <img
        //   src={`http://localhost:5173/bushnaq-group/public/${
        //     team.path || team.image
        //   }`}
        //   width="100"
        //   height="100"
        // />
        <img
          src={team.image instanceof File ? preview : team.image}
          width="100"
          height="100"
          className="rounded"
        />
      )}
    </Dialog>
  );
};

CreateUpdate.propTypes = {
  team: PropTypes.object.isRequired,
  setTeam: PropTypes.func.isRequired,
  teams: PropTypes.array,
  setTeams: PropTypes.func.isRequired,
  teamDialog: PropTypes.bool.isRequired,
  setSubmitted: PropTypes.func.isRequired,
  submitted: PropTypes.bool.isRequired,
  setTeamDialog: PropTypes.func.isRequired,
  emptyTeam: PropTypes.object.isRequired,
  toast: PropTypes.object.isRequired,
};

export default CreateUpdate;
