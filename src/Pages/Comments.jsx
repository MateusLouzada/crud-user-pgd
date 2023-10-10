import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import api from "../services/comments.api";
import ToHome from "../Components/ToHome";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [visible, setVisible] = useState(false);

  const [issueId, setIssueId] = useState("");
  const [userId, setUserId] = useState("");
  const [content, setContent] = useState("");

  const [commentDialog, setCommentDialog] = useState(false);
  const [comment, setComment] = useState();

  const [issueIdChange, setIssueIdChange] = useState("");
  const [userIdChange, setUserIdChange] = useState("");
  const [contentChange, setContentChange] = useState("");

  const hideDialog = () => {
    setCommentDialog(false);
  };

  const updateComment = async () => {
    await api
      .put("", {
        id: comment.id,
        issueId: issueIdChange,
        userId: userIdChange,
        content: contentChange,
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    await getComments();
    setCommentDialog(false);
  };

  const editComment = (comment) => {
    setComment(comment);
    setIssueIdChange(comment.issueId);
    setUserIdChange(comment.userId);
    setContentChange(comment.content);
    setCommentDialog(true);
  };

  const CommentDialogFooter = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        outlined
        onClick={hideDialog}
      />
      <Button label="Alterar" icon="pi pi-check" onClick={updateComment} />
    </>
  );

  const deleteComment = async (CommentData) => {
    await api
      .delete(`/${CommentData.id}`)
      .then(() => {
        getComments();
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
          onClick={() => editComment(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => deleteComment(rowData)}
        />
      </>
    );
  };

  const getComments = async () => {
    await api
      .get()
      .then((res) => {
        setComments(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getComments();
  }, []);

  const registerComment = async () => {
    await api
      .post("", {
        issueId: issueId,
        userId: userId,
        content: content
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    setVisible(false);
    await getComments();
    setComment("");
    setIssueIdChange("");
    setUserIdChange("");
    setContentChange("");
  };

  return (
    <div className="card">
      <ToHome />
      <div className="card flex justify-content-center">
        <Sidebar visible={visible} onHide={() => setVisible(false)}>
          <h3>Tipo de tarefa</h3>
          <div className="flex flex-column gap-2">
            <label htmlFor="issueId">Id da tarefa</label>
            <InputText
              value={issueId}
              onChange={(e) => setIssueId(e.target.value)}
              id="issueId"
              aria-describedby="issueId"
            />
          </div>
          <div className="flex flex-column gap-2" style={{ marginTop: "10px" }}>
            <label htmlFor="userId">Id do Usuário</label>
            <InputText
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              id="userId"
              aria-describedby="userId"
            />
          </div>
          <div className="flex flex-column gap-2" style={{ marginTop: "10px" }}>
            <label htmlFor="content">Conteúdo</label>
            <InputText
              value={content}
              onChange={(e) => setContent(e.target.value)}
              id="content"
              aria-describedby="content"
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
            <Button label="Enviar" onClick={() => registerComment()} />
          </div>
        </Sidebar>
        <Button icon="pi pi-plus" onClick={() => setVisible(true)} />
      </div>
      <DataTable value={comments} tableStyle={{ width: "70%", margin: "auto" }}>
        <Column field="id" header="Id"></Column>
        <Column field="issueId" header="Id da Tarefa"></Column>
        <Column field="userId" header="Id do usuário"></Column>
        <Column field="content" header="Conteúdo"></Column>
        <Column
          body={actionBodyTemplate}
          style={{ minWidth: "12rem" }}
        ></Column>
      </DataTable>

      <Dialog
        visible={commentDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Product Details"
        modal
        className="p-fluid"
        footer={CommentDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="issueId" className="font-bold">
            Id da tarefa
          </label>
          <InputText
            id="issueId"
            value={issueIdChange}
            onChange={(e) => setIssueIdChange(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="field">
          <label htmlFor="userId" className="font-bold">
            Id do usuário
          </label>
          <InputText
            id="userId"
            value={userIdChange}
            onChange={(e) => setUserIdChange(e.target.value)}
            required
            rows={3}
            cols={20}
          />
        </div>
        <div className="field">
          <label htmlFor="content" className="font-bold">
            Conteúdo
          </label>
          <InputText
            id="content"
            value={contentChange}
            onChange={(e) => setContentChange(e.target.value)}
            required
            rows={3}
            cols={20}
          />
        </div>
      </Dialog>
    </div>
  );
}
