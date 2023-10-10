import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import api from "../services/issues.api";
import ToHome from "../Components/ToHome";

export default function Issues() {
  const [issues, setIssues] = useState([]);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedToUserId, setAssignedToUserId] = useState("");
  const [currentStageId, setCurrentStageId] = useState("");
  const [issueTypeId, setIssueTypeId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [creationDate, setCreationDate] = useState("2023-10-10T11:09:05.914Z");
  const [finishDate, setFinishDate] = useState("2023-10-10T11:09:05.914Z");

  const [issueDialog, setIssueDialog] = useState(false);
  const [issue, setIssue] = useState();

  const [titleChange, setTitleChange] = useState("");
  const [descriptionChange, setDescriptionChange] = useState("");
  const [assignedToUserIdChange, setAssignedToUserIdChange] = useState("");
  const [currentStageIdChange, setCurrentStageIdChange] = useState("");
  const [issueTypeIdChange, setIssueTypeIdChange] = useState("");
  const [projectIdChange, setProjectIdChange] = useState("");

  const hideDialog = () => {
    setIssueDialog(false);
  };

  const updateIssue = async () => {
    console.log(issueTypeIdChange)
    await api
      .put("", {
        title: titleChange,
        description: descriptionChange,
        assignedToUserId: assignedToUserIdChange,
        currentStageId: currentStageIdChange,
        issueTypeId: issueTypeIdChange,
        projectId: projectIdChange,
        creationDate: creationDate,
        finishDate: finishDate,
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    await getIssues();
    setIssueDialog(false);
  };

  const editIssue = (issue) => {
    setIssue(issue);
    setTitleChange(issue.title);
    setDescriptionChange(issue.description);
    setAssignedToUserIdChange(issue.assignedToUserId);
    setCurrentStageIdChange(issue.currentStageId);
    setIssueTypeIdChange(issue.issueTypeId);
    setProjectIdChange(issue.projectId);
    setIssueDialog(true);
  };

  const IssueDialogFooter = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        outlined
        onClick={hideDialog}
      />
      <Button label="Alterar" icon="pi pi-check" onClick={updateIssue} />
    </>
  );

  const deleteIssue = async (issueData) => {
    await api
      .delete(`/${issueData.id}`)
      .then(() => {
        getIssues();
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
          onClick={() => editIssue(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => deleteIssue(rowData)}
        />
      </>
    );
  };

  const getIssues = async () => {
    await api
      .get()
      .then((res) => {
        setIssues(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getIssues();
  }, []);

  const registerIssue = async () => {
    await api
      .post("", {
        id: issue.id,
        title: title,
        description: description,
        assignedToUserId: assignedToUserId,
        currentStageId: currentStageId,
        issueTypeId: issueTypeId,
        projectId: projectId,
        creationDate: creationDate,
        finishDate: finishDate,
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    setVisible(false);
    await getIssues();
    setIssue("");
    setTitleChange("");
    setDescriptionChange("");
    setAssignedToUserIdChange("");
    setCurrentStageIdChange("");
    setIssueTypeIdChange("");
    setProjectIdChange("");
  };

  return (
    <div className="card">
      <ToHome />
      <div className="card flex justify-content-center">
        <Sidebar visible={visible} onHide={() => setVisible(false)}>
          <h3>Adicionar Tarefa</h3>
          <div className="flex flex-column gap-2">
            <label htmlFor="title">Nome</label>
            <InputText
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              aria-describedby="title"
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
          <div className="flex flex-column gap-2" style={{ marginTop: "10px" }}>
            <label htmlFor="userId">Id do usuario</label>
            <InputText
              value={assignedToUserId}
              onChange={(e) => setAssignedToUserId(e.target.value)}
              id="userId"
              aria-describedby="userId"
            />
          </div>
          <div className="flex flex-column gap-2" style={{ marginTop: "10px" }}>
            <label htmlFor="stageId">Id do Estagio</label>
            <InputText
              value={currentStageId}
              onChange={(e) => setCurrentStageId(e.target.value)}
              id="stageId"
              aria-describedby="stageId"
            />
          </div>
          <div className="flex flex-column gap-2" style={{ marginTop: "10px" }}>
            <label htmlFor="issueTypeId">Issue Type Id</label>
            <InputText
              value={issueTypeId}
              onChange={(e) => setIssueTypeId(e.target.value)}
              id="issueTypeId"
              aria-describedby="issueTypeId"
            />
          </div>
          <div className="flex flex-column gap-2" style={{ marginTop: "10px" }}>
            <label htmlFor="projectId">Id do projeto</label>
            <InputText
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              id="projectId"
              aria-describedby="projectId"
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
            <Button label="Enviar" onClick={() => registerIssue()} />
          </div>
        </Sidebar>
        <Button icon="pi pi-plus" onClick={() => setVisible(true)} />
      </div>
      <DataTable value={issues} tableStyle={{ width: "70%", margin: "auto" }}>
        <Column field="id" header="Id"></Column>
        <Column field="title" header="Title"></Column>
        <Column field="description" header="description"></Column>
        <Column field="assignedToUserId" header="assignedToUserId"></Column>
        <Column field="currentStageId" header="currentStageId"></Column>
        <Column field="issueTypeId" header="issueTypeId"></Column>
        <Column field="projectId" header="projectId"></Column>
        <Column field="creationDate" header="creationDate"></Column>
        <Column field="finishDate" header="finishDate"></Column>
        <Column
          body={actionBodyTemplate}
          style={{ minWidth: "12rem" }}
        ></Column>
      </DataTable>

      <Dialog
        visible={issueDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Product Details"
        modal
        className="p-fluid"
        footer={IssueDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="title" className="font-bold">
            Titulo
          </label>
          <InputText
            id="title"
            value={titleChange}
            onChange={(e) => setTitleChange(e.target.value)}
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
        <div className="field">
          <label htmlFor="userId" className="font-bold">
            Id do usuário
          </label>
          <InputText
            id="userId"
            value={assignedToUserIdChange}
            onChange={(e) => setAssignedToUserIdChange(e.target.value)}
            required
            rows={3}
            cols={20}
          />
        </div>
        <div className="field">
          <label htmlFor="stageId" className="font-bold">
            Id do estágio
          </label>
          <InputText
            id="stageId"
            value={currentStageIdChange}
            onChange={(e) => setCurrentStageIdChange(e.target.value)}
            required
            rows={3}
            cols={20}
          />
        </div>
        <div className="field">
          <label htmlFor="idIssueType" className="font-bold">
            Id do tipo de tarefa
          </label>
          <InputText
            id="idIssueType"
            value={issueTypeIdChange}
            onChange={(e) => setIssueTypeIdChange(e.target.value)}
            required
            rows={3}
            cols={20}
          />
        </div>
        <div className="field">
          <label htmlFor="projectId" className="font-bold">
            Id do projeto
          </label>
          <InputText
            id="projectId"
            value={projectIdChange}
            onChange={(e) => setProjectId(e.target.value)}
            required
            rows={3}
            cols={20}
          />
        </div>
        <div className="field">
          <label htmlFor="creationDate" className="font-bold">
            Data de criação
          </label>
          <InputText
            disabled
            id="creationDate"
            value={creationDate}
            required
            rows={3}
            cols={20}
          />
        </div>{" "}
        <div className="field">
          <label htmlFor="finishDate" className="font-bold">
            Data da finalização
          </label>
          <InputText
            disabled
            id="finishDate"
            value={finishDate}
            required
            rows={3}
            cols={20}
          />
        </div>
      </Dialog>
    </div>
  );
}
