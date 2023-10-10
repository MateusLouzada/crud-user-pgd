import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Dialog } from "primereact/dialog";
import api from "../services/users.api"

export default function Users() {
 
    const [users, setUsers] = useState([]);
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userDialog, setUserDialog] = useState(false);
    const [user, setUser] = useState();
    const [nameChange, setNameChange] = useState();
    const [emailChange, setEmailChange] = useState();
    const [passwordChange, setPasswordChange] = useState();
  
    const hideDialog = () => {
      setUserDialog(false);
    };
  
    const updateUser = async () => {
      await api
        .put("" , {
          id: user.id,
          name: nameChange ? nameChange : user.name,
          email: emailChange ? emailChange : user.email,
          password: passwordChange ? passwordChange : user.password,
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
      await getUsers();
      setUserDialog(false);
    };
  
    const header = <div className="font-bold mb-3">Escolha uma senha</div>;
    const footer = (
      <>
        <Divider />
        <p className="mt-2">Sugestão</p>
        <ul className="pl-2 ml-2 mt-0 line-height-3">
          <li>Uma letra minúscula</li>
          <li>Uma letra maiúscula</li>
          <li>Um número</li>
          <li>Mínimo de 8 caracteres</li>
        </ul>
      </>
    );
  
    const editProduct = (user) => {
      setUser(user);
      setNameChange(user.name);
      setEmailChange(user.email);
      setPasswordChange(user.password);
      setUserDialog(true);
    };
  
    const UserDialogFooter = (
      <>
        <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDialog} />
        <Button label="Alterar" icon="pi pi-check" onClick={updateUser} />
      </>
    );
  
    const deleteUser = async (userdata) => {
      await api
        .delete(`/${userdata.id}`)
        .then(() => {
          getUsers();
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
            onClick={() => editProduct(rowData)}
          />
          <Button
            icon="pi pi-trash"
            rounded
            outlined
            severity="danger"
            onClick={() => deleteUser(rowData)}
          />
        </>
      );
    };
  
    const getUsers = async () => {
      await api
        .get()
        .then((res) => {
          setUsers(res.data);
        })
        .catch((error) => console.log(error));
    };
  
    useEffect(() => {
      getUsers();
    }, []);
  
    const registerUser = async () => {
      await api
        .post("", {
          name: name,
          email: email,
          password: password,
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
      setVisible(false);
      await getUsers();
      setUser("");
      setNameChange("");
      setEmailChange("");
      setPasswordChange("");
    };
  
    return (
      <div className="card">
        <div className="card flex justify-content-center">
          <Sidebar visible={visible} onHide={() => setVisible(false)}>
            <h3>Adicionar Usuário</h3>
            <div className="flex flex-column gap-2">
              <label htmlFor="username">Nome</label>
              <InputText
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="username"
                aria-describedby="username"
              />
            </div>
            <div className="flex flex-column gap-2" style={{ marginTop: "10px" }}>
              <label htmlFor="email">Email</label>
              <InputText
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                aria-describedby="email"
              />
            </div>
            <div className="flex flex-column gap-2" style={{ marginTop: "10px" }}>
              <label htmlFor="password">Senha</label>
              <Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                header={header}
                footer={footer}
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
              <Button label="Enviar" onClick={() => registerUser()} />
            </div>
          </Sidebar>
          <Button icon="pi pi-plus" onClick={() => setVisible(true)} />
        </div>
        <DataTable value={users} tableStyle={{ width: "70%", margin: "auto" }}>
          <Column field="id" header="Id"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="password" header="Password"></Column>
          <Column
            body={actionBodyTemplate}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
  
        <Dialog
          visible={userDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Product Details"
          modal
          className="p-fluid"
          footer={UserDialogFooter}
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
              Email
            </label>
            <InputText
              id="description"
              value={emailChange}
              onChange={(e) => setEmailChange(e.target.value)}
              required
              rows={3}
              cols={20}
            />
          </div>
          <div className="field">
            <label htmlFor="description" className="font-bold">
              Password
            </label>
            <InputText
              id="description"
              value={passwordChange}
              onChange={(e) => setPasswordChange(e.target.value)}
              required
              rows={3}
              cols={20}
            />
          </div>
        </Dialog>
      </div>
    );
}
