import { useState, useEffect,useRef } from 'react';
import { getBoardById, AddList, deleteBoard, updateBoard } from './Services/api';
import { Card } from 'primereact/card';
import ListView from './ListView';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';

const BoardView = ({ boardId }) => {
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showListForm, setShowListForm] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  const [editing, setEditing] = useState(false);
  const [editedBoard, setEditedBoard] = useState({ name: '', owner: '' });
  const toast = useRef(null);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const data = await getBoardById(boardId);
        setBoard(data);
        setEditedBoard({ name: data.name, owner: data.owner });
      } catch (error) {
        console.error('Error loading board:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBoard();
  }, [boardId]);

  const handleAddList = async() => {
    await AddList(boardId, newListTitle);
    setShowListForm(false);
    setNewListTitle('');
  };

  const handleEditBoard = () => {
    setEditing(true);
  };

  const handleSaveBoard = async () => {
    try {
      // Actualizar el tablero en la API
      await updateBoard(boardId, {
        ...board,
        name: editedBoard.name,
        owner: editedBoard.owner
      });
      
      toast.current.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Tablero actualizado correctamente',
                life: 3000
            });
      
      setEditing(false);
    } catch (error) {
      console.error('Error updating board:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditedBoard({ name: board.name, owner: board.owner });
    setEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBoard(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return <div className="p-text-center"><i className="pi pi-spinner pi-spin" style={{ fontSize: '2rem' }} /></div>;
  if (!board) return <div className="p-text-center">No se encontró el tablero</div>;

  return (
    <div className="p-m-3">
      <Card 
        title={
          editing ? (
            <InputText
              name="name"
              value={editedBoard.name}
              onChange={handleInputChange}
              className="p-mb-2"
              style={{ width: '100%' }}
            />
          ) : (
            board.name
          )
        } 
        subTitle={
          editing ? (
            <InputText
              name="owner"
              value={editedBoard.owner}
              onChange={handleInputChange}
              className="p-mt-2"
              style={{ width: '100%' }}
            />
          ) : (
            `Propietario: ${board.owner}`
          )
        }
        className="p-mb-3"
      >
        {editing ? (
          <div className="p-d-flex p-mb-3">
            <Button 
              className='p-button-success p-mr-2' 
              icon="pi pi-check" 
              label="Guardar" 
              onClick={handleSaveBoard} 
            />
            <Button 
              className='p-button-secondary' 
              icon="pi pi-times" 
              label="Cancelar" 
              onClick={handleCancelEdit} 
            />
          </div>
        ) : (
          <Button 
            className='p-button-info p-mb-3' 
            icon="pi pi-pencil" 
            label="Editar Tablero" 
            onClick={handleEditBoard} 
          />
        )}
        
        <div className="p-d-flex shadow-4" style={{ overflowX: 'auto', gap: '1rem' }}>
          {board.lists?.map((list, index) => (
            <ListView 
              key={`list-${index}`}
              list={list}
              boardId={boardId}
              onAddCard={() => {/* Lógica para añadir tarjeta */}}
            />
          ))}
          
          <Button 
            className='p-button-success' 
            icon="pi pi-plus" 
            label="Agregar Lista" 
            onClick={() => setShowListForm(true)} 
          />
        </div>
        <Button className='p-button-danger' icon="pi pi-trash" label="Eliminar Tablero" onClick={() => {
          deleteBoard(boardId);
          toast.current.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Tablero eliminado correctamente',
                life: 3000
            });
          }} />
      </Card>

      {/* Diálogo para agregar lista */}
      <Dialog 
        header="Nueva Lista" 
        visible={showListForm} 
        style={{ width: '50vw' }}
        onHide={() => setShowListForm(false)}
      >
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="listTitle">Título de la lista</label>
            <InputText
              id="listTitle"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              className="p-mt-2"
            />
          </div>
          <Button 
            label="Guardar" 
            icon="pi pi-check" 
            className="p-mt-3"
            onClick={handleAddList}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default BoardView;