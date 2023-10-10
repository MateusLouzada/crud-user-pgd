import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import api from "../services/issuesType.api";
import ToHome from "../Components/ToHome";

export default function IssuesTypes() {
  const [issueTypes, setIssueTypes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [issueTypeDialog, setIssueTypeDialog] = useState(false);
  const [issueType, setIssueType] = useState();

  const [nameChange, setNameChange] = useState("");
  const [descriptionChange, setDescriptionChange] = useState("");

  const hideDialog = () => {
    setIssueTypeDialog(false);
  };

  const updateIssueType = async () => {
    await api
      .put("", {
        id: issueType.id,
        name: nameChange,
        description: descriptionChange,
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    await getIssueTypes();
    setIssueTypeDialog(false);
  };

  const editIssueType = (issueType) => {
    setIssueType(issueType);
    setNameChange(issueType.name);
    setDescriptionChange(issueType.description);
    setIssueTypeDialog(true);
  };

  const IssueTypeDialogFooter = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        outlined
        onClick={hideDialog}
      />
      <Button label="Alterar" icon="pi pi-check" onClick={updateIssueType} />
    </>
  );

  const deleteIssueType = async (issueTypeData) => {
    await api
      .delete(`/${issueTypeData.id}`)
      .then(() => {
        getIssueTypes();
      })
      .catch((error) => console.log(error));
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editIssueType(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => deleteIssueType(rowData)}
        />
      </>
    );
  };

  const getIssueTypes = async () => {
    await api
      .get()
      .then((res) => {
        setIssueTypes(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getIssueTypes();
  }, []);

  const registerIssueType = async () => {
    await api
      .post("", {
        name: name,
        description: description,
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    setVisible(false);
    await getIssueTypes();
    setIssueType("");
    setNameChange("");
    setDescriptionChange("");
  };

  return (
    <div className="card">
      <ToHome />
      <div className="card flex justify-content-center">
        <Sidebar visible={visible} onHide={() => setVisible(false)}>
          <h3>Tipo de tarefa</h3>
          <div className="flex flex-column gap-2">
            <label htmlFor="name">Nome</label>
            <InputText
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              aria-describedby="name"
            />
          </div>
          <div className="flex flex-column gap-2" style={{ marginTop: "10px" }}>
            <label htmlFor="description">Descrição</label>
            <InputText
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              aria-describedby="description"
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Button label="Enviar" onClick={() => registerIssueType()} />
          </div>
        </Sidebar>
        <Button icon="pi pi-plus" onClick={() => setVisible(true)} />
      </div>
      <DataTable value={issueTypes} tableStyle={{ width: "70%", margin: "auto" }}>
        <Column field="id" header="Id"></Column>
        <Column field="name" header="name"></Column>
        <Column field="description" header="description"></Column>
        <Column
          body={actionBodyTemplate}
          style={{ minWidth: "12rem" }}
        ></Column>
      </DataTable>

      <Dialog
        visible={issueTypeDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Product Details"
        modal
        className="p-fluid"
        footer={IssueTypeDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="name" className="font-bold">
            Nome
          </label>
          <InputText
            id="name"
            value={nameChange}
            onChange={(e) => setNameChange(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="field">
          <label htmlFor="description" className="font-bold">
            Description
          </label>
          <InputText
            id="description"
            value={descriptionChange}
            onChange={(e) => setDescriptionChange(e.target.value)}
            required
            rows={3}
            cols={20}
          />
        </div>
      </Dialog>
    </div>
  );
}
