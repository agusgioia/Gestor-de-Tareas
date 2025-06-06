import { useState, useEffect, useContext } from 'react';
import { getBoardById, AddList, deleteBoard, updateBoard } from './Services/api';
import { Card } from 'primereact/card';
import ListView from './ListView';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { DeleteList } from './Services/api';
import { Toast } from 'primereact/toast';
import { ToastContext } from '../App'; 

const BoardView = ({ boardId }) => {
  const toast = useContext(ToastContext);
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showListForm, setShowListForm] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  const [editing, setEditing] = useState(false);
  const [editedBoard, setEditedBoard] = useState({ name: '', owner: '' });
  

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
    toast.current.show({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Lista agregada correctamente',
      life: 6000
    });
    setShowListForm(false);
    setNewListTitle('');
  };

  const handleEditBoard = () => {
    setEditing(true);
  };

  const handleSaveBoard = async () => {
    try {
      await updateBoard(boardId, {
        ...board,
        name: editedBoard.name,
        owner: editedBoard.owner
      });
      
      toast.current.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Tablero actualizado correctamente',
                life: 6000
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

  const HandleDeleteList = async (boardId, listTitle) => {
    try {
      await DeleteList(boardId, listTitle);
      toast.current.show({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Lista eliminada correctamente',
        life: 6000
      });
    } catch (error) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al eliminar la lista',
        life: 6000
      });
    }
  };


  if (loading) return <div className="p-text-center"><i className="pi pi-spinner pi-spin" style={{ fontSize: '2rem' }} /></div>;
  if (!board) return <div className="p-text-center">No se encontró el tablero</div>;

  return (
    
    <div className="p-m-3">
      <Toast ref={toast} position='top-right'/>
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
        style={{ 
          backgroundColor: '#f8f9fa',
          borderLeft: '5px solid #3B82F6',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
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
        
        <div className="p-d-flex shadow-4" style={{ overflowX: 'auto', gap: '1rem', padding: '1rem', backgroundColor: '#e9ecef', borderRadius: '6px' }}>
          {board.lists?.map((list, index) => (
            <div key={`list-${index}`} >
              <ListView 
                key={`list-${index}`}
                list={list}
                boardId={boardId}
              />
              <Button 
              className='p-button-danger'
              icon="pi pi-trash"
              label="Eliminar Lista"
              onClick={() => HandleDeleteList(boardId, list.title)}
              />
            </div>
          ))}
          
          <Button 
            className='p-button-success' 
            icon="pi pi-plus" 
            label="Agregar Lista" 
            onClick={() => setShowListForm(true)} 
          />
          
        </div>
        <Button className='p-button-danger p-mt-3' icon="pi pi-trash" label="Eliminar Tablero" onClick={() => {
          deleteBoard(boardId);
          toast.current.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Tablero eliminado correctamente',
                life: 3000
            });
          }} />
      </Card>

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