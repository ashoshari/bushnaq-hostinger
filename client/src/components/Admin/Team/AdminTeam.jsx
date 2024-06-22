import React, { useState, useEffect, useRef } from "react";
import CreateUpdate from "./CreateUpdate";
import Delete from "./Delete";
import NotFound404 from "../../NotFound/NotFound404";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";

// import yep from "../../../../../API/public/images/1713785833452_Petra.jpg";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./AdminTeam.css";

import "primereact/resources/themes/arya-orange/theme.css";
function AdminTeam() {
  let emptyTeam = {
    id: "",
    fullname: "",
    position: "",
    image: null,
    url: "",
  };

  const [teams, setTeams] = useState(null);
  const [teamDialog, setTeamDialog] = useState(false);
  const [deleteTeamDialog, setDeleteTeamDialog] = useState(false);
  const [team, setTeam] = useState(emptyTeam);
  // const [selectedTeam, setselectedTeam] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  // const [edit, setEdit] = useState();
  // const [news, setNews] = useState();
  const dt = useRef(null);
  const toast = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const getTeamUsers = async () => {
      const res = await fetch("https://bunaq-api.vercel.app/api/team");

      const data = await res.json();
      setTeams(data.teamUsers);
    };
    getTeamUsers();
  }, []);

  const openNew = () => {
    // setNews(true);
    setTeam(emptyTeam);
    setSubmitted(false);
    setTeamDialog(true);
  };

  const editTeam = (team) => {
    // setEdit(true);
    setTeam({ ...team });
    setTeamDialog(true);
  };

  const confirmDeleteTeam = (team) => {
    setTeam(team);
    setDeleteTeamDialog(true);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label={t("adminTeamPage.new.title")}
          icon="pi pi-plus ml-1"
          className="rounded"
          severity="success"
          onClick={openNew}
        />
      </div>
    );
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={rowData.url || rowData.image}
        className="shadow-2 border-round"
        style={{ width: "64px", height: "64px", objectFit: "cover" }}
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2 ml-2 rounded-circle "
          onClick={() => editTeam(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          className="rounded-circle text-danger"
          onClick={() => confirmDeleteTeam(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0 colorOrangish">{t("adminTeamPage.title")}</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search pl-2" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder={t("search")}
          className="pl-5"
        />
      </span>
    </div>
  );

  return (
    <div>
      {localStorage.getItem("isAdmin") == 1 ? (
        <div className="bg py-3 py-md-5 py-xl-8" data-aos="fade-up">
          <Toast ref={toast} style={{ zIndex: "100000" }} />
          <div className="card w-75 mx-auto" style={{ marginTop: "150px" }}>
            <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

            <DataTable
              ref={dt}
              value={teams}
              // selection={selectedTeam}
              // onSelectionChange={(e) => setselectedTeam(e.value)}
              dataKey="id"
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Members"
              globalFilter={globalFilter}
              header={header}
            >
              <Column
                field="fullname"
                header={t("adminTeamPage.new.fullName")}
                sortable
                style={{ minWidth: "12rem" }}
              ></Column>
              <Column
                field="position"
                header={t("adminTeamPage.new.position")}
                sortable
                style={{ minWidth: "16rem" }}
              ></Column>
              <Column
                field="url"
                header={t("adminTeamPage.new.image")}
                body={imageBodyTemplate}
              ></Column>
              <Column
                body={actionBodyTemplate}
                exportable={false}
                style={{ minWidth: "12rem" }}
              ></Column>
            </DataTable>
          </div>
          <CreateUpdate
            team={team}
            teamDialog={teamDialog}
            setSubmitted={setSubmitted}
            submitted={submitted}
            setTeam={setTeam}
            teams={teams}
            setTeamDialog={setTeamDialog}
            emptyTeam={emptyTeam}
            setTeams={setTeams}
            toast={toast}
          />

          <Delete
            setDeleteTeamDialog={setDeleteTeamDialog}
            setTeams={setTeams}
            teams={teams}
            team={team}
            emptyTeam={emptyTeam}
            setTeam={setTeam}
            deleteTeamDialog={deleteTeamDialog}
            toast={toast}
          />
        </div>
      ) : (
        <NotFound404 />
      )}
    </div>
  );
}

export default AdminTeam;
