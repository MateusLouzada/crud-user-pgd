import React, { useState,useEffect } from 'react'
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Dialog } from "primereact/dialog";
import { InputText } from 'primereact/inputtext';
import projectsApi from '../services/projects.api';


export default function Projects() {
  const [project,setProject] =useState()
  const [projects,setProjects] = useState([])
  const [projectDialogVisible, setProjectDialogVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [description,setDescription] = useState();
  const [projectName,setProjectName]=useState();

  const userIdTest = "ba526a5f-3fc2-4651-9a33-4e5df4a04902"
  const hideDialog = () => {
    setProjectDialogVisible(false);
  };

  //Get Projects
  const getProjects = async () => {
    try {
      const response = await projectsApi.get();
      setProjects(response.data);
    } catch (error) {
      console.error('Ocorreu um erro ao buscar os projetos da API:', error);
    }
  };

  useEffect(() => {
    getProjects();
  },[])

  //Get Projects ID
  const getProjectById = async (projectId) => {
    try{
      await projectsApi.get(`/${projectId}`);
    } catch (error) {
      throw error;
    }
  }

  //Delete Projects ID
  const deleteProjectById = async(projectdata) => {
    try{
      await projectsApi.delete(`${projectdata.id}`);
      getProjects();
    } catch (error) {
      throw error;
    }
  } 



  const editProject = async (project) => {
    setProject(project);
    setProjectName(project.name);
    setDescription(project.description);
    setProjectDialogVisible(true);
  };
  const updateProject = async () => {
    debugger
    await projectsApi
      .put("" , {
        id: project.id,
        name: projectName ? projectName : project.name,
        description:description ? description : project.description,
        mainUserID:userIdTest,        
        
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    await getProjects();
    setProjectDialogVisible(false);
  };
    

  const registerProject = async () => {
    debugger
    await projectsApi
      .post("", {
        name:projectName,
        description:description,
        mainUserID:userIdTest,
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    setVisible(false);
    await getProjects();
    setProject("")
    setProjectName("");
    setDescription("");
  };
  console.log(registerProject)


  const projectDialogFooter = (
    <div>
      <Button label="Cancelar" icon="pi pi-times" onClick={hideDialog} className="p-button-text" />
      <Button label="Salvar" icon="pi pi-check" onClick={updateProject} className="p-button-text" />
    </div>
  );
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editProject(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => deleteProjectById(rowData)}
        />
      </>
    );
  };


  return (
    <div className="card">
          <div className="card flex justify-content-center">
          <Sidebar visible={visible} onHide={() => setVisible(false)}>
            <h3>Adicionar Projeto</h3>
            <div className="flex flex-column gap-2">
              <label htmlFor="project">Project</label>
              <InputText
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              id="name"
              aria-describedby="name"
            />
            </div>
            <div className="flex flex-column gap-2">
              <label htmlFor="project">Descrição</label>
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
              <Button label="Enviar" onClick={() => registerProject()} />
            </div>
          </Sidebar>
          <Button icon="pi pi-plus" onClick={() => setVisible(true)} />
        </div>
        <DataTable value={projects} tableStyle={{ width: "70%", margin: "auto" }}>
        <Column field="id" header="Id" />
        <Column field="name" header="Name" />
        <Column field="description" header="Description" />
        <Column
            body={actionBodyTemplate}
            style={{ minWidth: "12rem" }}
          ></Column>
      </DataTable>

      <Dialog
        visible={projectDialogVisible}
        style={{ width: "30rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Project Details"
        modal
        className="p-fluid"
        footer={projectDialogFooter}
        onHide={hideDialog}
      >
        
          <div className="p-field">
            <label htmlFor="name">Nome do Projeto</label>
            <input
              type="text"
              id="name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
              rows={3}
              cols={20}
            />
          </div>
          <div className="p-field">
            <label htmlFor="description">Descrição</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
              cols={20}
            />
          </div>
        
      </Dialog>
    </div>
  );
}
