import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

//import commentsData from './commentsData';
let teste = ["Meu primeiro comentário"];
console.log(teste);

export default function Comments() {
  // const [comments, setComments] = useState(commentsData);
  const [comments, setComments] = useState();
  const [selectedComment, setSelectedComment] = useState(null);

  const addComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  const editComment = (updatedComment) => {
    const updatedComments = comments.map((comment) =>
      comment.id === updatedComment.id ? updatedComment : comment
    );
    setComments(updatedComments);
    setSelectedComment(null);
  };

  const deleteComment = () => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== selectedComment.id
    );
    setComments(updatedComments);
    setSelectedComment(null);
  };

  const renderCommentsTable = () => {
    return (
      <DataTable
        value={comments}
        selectionMode="single"
        selection={selectedComment}
        onSelectionChange={(e) => setSelectedComment(e.value)}
      >
        <Column field="id" header="ID" />
        <Column field="text" header="Texto" />
        <Column field="author" header="Autor" />
        <Column field="date" header="Data" />
      </DataTable>
    );
  };

  return (
    <div>
      <h2>Comentários</h2>
      {renderCommentsTable()}

      {}
      <Button label="Adicionar Comentário" onClick={() => addComment({})} />
      <Button
        label="Editar Comentário"
        onClick={() => editComment({})}
        disabled={!selectedComment}
      />
      <Button
        label="Deletar Comentário"
        onClick={deleteComment}
        disabled={!selectedComment}
      />
    </div>
  );
}

// export default Comments;
