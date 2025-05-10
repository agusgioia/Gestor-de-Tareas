import { useState, useEffect } from 'react';
import { getBoardById, AddList } from './Services/api';
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

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const data = await getBoardById(boardId);
        setBoard(data);
      } catch (error) {
        console.error('Error loading board:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBoard();
  }, [boardId]);

  const handleAddList = async() => {
    // Lógica para agregar la nueva lista
    await AddList(boardId, newListTitle);
    setShowListForm(false);
    setNewListTitle('');
  };

  if (loading) return <div className="p-text-center"><i className="pi pi-spinner pi-spin" style={{ fontSize: '2rem' }} /></div>;
  if (!board) return <div className="p-text-center">No se encontró el tablero</div>;

  return (
    <div className="p-m-3">
      <Card 
        title={board.name} 
        subTitle={`Propietario: ${board.owner}`}
        className="p-mb-3"
      >
        <div className="p-d-flex" style={{ overflowX: 'auto', gap: '1rem' }}>
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