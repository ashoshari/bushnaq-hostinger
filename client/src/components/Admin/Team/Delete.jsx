import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

function Delete({
  deleteTeamDialog,
  setDeleteTeamDialog,
  setTeams,
  teams,
  team,
  emptyTeam,
  setTeam,
  toast,
}) {
  const { t } = useTranslation();
  const [disableBtn, setDisableBtn] = useState(false);

  const hideDeleteTeamDialog = () => {
    setDeleteTeamDialog(false);
  };

  const deleteTeam = async () => {
    setDisableBtn(true);
    await fetch(
      `https://bunaq-api.vercel.app/api/delete-team-member/${team.id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    let _teams = teams.filter((val) => val.id !== team.id);

    setTeams(_teams);
    setDeleteTeamDialog(false);
    setTeam(emptyTeam);
    setDisableBtn(false);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: t("adminTeamPage.delete.toastDeleted"),
      life: 5000,
    });
  };

  const deleteTeamDialogFooter = (
    <React.Fragment>
      <Button
        label={t("adminTeamPage.delete.no")}
        icon="pi pi-times"
        className="mr-2 ml-2 rounded"
        outlined
        onClick={hideDeleteTeamDialog}
      />
      <Button
        label={t("adminTeamPage.delete.yes")}
        icon="pi pi-check"
        severity="danger"
        className="rounded bg-danger text-white border-danger "
        onClick={deleteTeam}
        disabled={disableBtn}
      />
    </React.Fragment>
  );

  return (
    <Dialog
      visible={deleteTeamDialog}
      style={{ width: "32rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      header={t("adminTeamPage.delete.title")}
      modal
      footer={deleteTeamDialogFooter}
      onHide={hideDeleteTeamDialog}
    >
      <div className="confirmation-content">
        <i
          className="pi pi-exclamation-triangle mr-3"
          style={{ fontSize: "2rem" }}
        />
        {team && (
          <span>
            &nbsp;&nbsp;{t("adminTeamPage.delete.par")} <b>{team.fullname}</b>{" "}
            {t("adminTeamPage.delete.questionMark")}
          </span>
        )}
      </div>
    </Dialog>
  );
}

Delete.propTypes = {
  deleteTeamDialog: PropTypes.bool.isRequired,
  setDeleteTeamDialog: PropTypes.func.isRequired,
  setTeams: PropTypes.func.isRequired,
  teams: PropTypes.array,
  team: PropTypes.object.isRequired,
  emptyTeam: PropTypes.object.isRequired,
  setTeam: PropTypes.func.isRequired,
  toast: PropTypes.object.isRequired,
};

export default Delete;
