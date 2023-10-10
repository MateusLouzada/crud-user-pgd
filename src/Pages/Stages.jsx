import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import stagesApi from '../services/stages.api'; // Importe o serviço de API de estágios

export default function Stages() {
  const [stage,setStage] = useState();
  const [stages, setStages] = useState([]);
  const [stageDialogVisible, setStageDialogVisible] = useState(false);
  const [selectedStage, setSelectedStage] = useState(null);
  const [stageDescription, setStageDescription] = useState('');
  const [stageName, setStageName] = useState('');
  const [visible, setVisible] = useState(false);

  const hideDialog = () => {
    setStageDialogVisible(false);
  };

  // Get Stages
  const getStages = async () => {
    try {
      const response = await stagesApi.get(); // Substitua pelo serviço de API de estágios
      setStages(response.data);
    } catch (error) {
      console.error('Ocorreu um erro ao buscar os estágios da API:', error);
    }
  };

  useEffect(() => {
    getStages();
  }, []);

  // Delete Stage by ID
  const deleteStageById = async (stageData) => {
    try {
      await stagesApi.delete(`/${stageData.id}`); // Substitua pelo serviço de API de estágios
      getStages(); // Atualize a lista de estágios após a exclusão
    } catch (error) {
      throw error;
    }
  };

  const editStage = async (stage) => {
    setStage(stage)
    setStageName(stage.name);
    setStageDescription(stage.description);
    setStageDialogVisible(true);
  };

  const updateStage = async () => {
    try {
      await stagesApi.put("", {
        id: stage.id,
        name: stageName ? stageName : stage.name,
        description: stageDescription ? stageDescription : stage.description,
      });
      await getStages(); 
      setStageDialogVisible(false);
    } catch (error) {
      console.error('Erro ao atualizar o estágio:', error);
    }
    await getStages();
    setStageDialogVisible(false);
  };

  const registerStage = async () => {
    try {
      await stagesApi.post('', {
        name: stageName,
        description: stageDescription,
      }); 
      await getStages(); 
      setStage("")
      setStageName('');
      setStageDescription('');
    } catch (error) {
      console.error('Erro ao criar o estágio:', error);
    }
  };

  const stageDialogFooter = (
    <div>
      <Button label="Cancelar" icon="pi pi-times" onClick={hideDialog} className="p-button-text" />
      <Button label="Salvar" icon="pi pi-check" onClick={updateStage} className="p-button-text" />
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
          onClick={() => editStage(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => deleteStageById(rowData)}
        />
      </>
    );
  };

  return (
    <div className="card">
      <div className="card flex justify-content-center">
        <Sidebar visible={visible} onHide={() => setVisible(false)}>
          <h3>Adicionar Estágio</h3>
          <div className="flex flex-column gap-2">
            <label htmlFor="stage">Nome do Estágio</label>
            <InputText
              value={stageName}
              onChange={(e) => setStageName(e.target.value)}
              id="name"
              aria-describedby="name"
            />
          </div>
          <div className="flex flex-column gap-2">
            <label htmlFor="stage">Descrição</label>
            <InputText
              value={stageDescription}
              onChange={(e) => setStageDescription(e.target.value)}
              id="description"
              aria-describedby="description"
            />
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10px',
            }}
          >
            <Button label="Enviar" onClick={() => registerStage()} />
          </div>
        </Sidebar>
        <Button icon="pi pi-plus"  onClick={() => setVisible(true)}  />
      </div>
      <DataTable value={stages} tableStyle={{ width: '70%', margin: 'auto' }}>
        <Column field="id" header="Id" />
        <Column field="name" header="Nome" />
        <Column field="description" header="Descrição" />
        <Column body={actionBodyTemplate} style={{ minWidth: '12rem' }}></Column>
      </DataTable>
      <Dialog
        visible={stageDialogVisible}
        style={{ width: "30rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Project Details"
        modal
        className="p-fluid"
        footer={stageDialogFooter}
        onHide={hideDialog}
      >
        
          <div className="p-field">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              value={stageName}
              onChange={(e) => setStageName(e.target.value)}
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
              value={stageDescription}
              onChange={(e) => setStageDescription(e.target.value)}
              required
              rows={3}
              cols={20}
            />
          </div>
        
      </Dialog>
    </div>
  );
}
