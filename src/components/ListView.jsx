import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import CardView from './CardView';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useContext, useState } from 'react';
import { Chips } from 'primereact/chips';
import { AddCard } from './Services/api';
import { deleteCard } from './Services/api';
import { ToastContext } from '../App';

const ListView = ({ list, boardId }) => {
  const toast = useContext(ToastContext);
  const [showCardForm, setShowCardForm] = useState(false);
  const [newCard, setNewCard] = useState({
    title: '',
    description: '',
    assignedUsers: []
  });

  const handleAddCard = async () => {
    try {
      console.log('Agregando tarjeta:', newCard);
      await AddCard(boardId, list.title, newCard);
      setShowCardForm(false);
      setNewCard({ title: '', description: '', assignedUsers: [] });
    } catch (error) {
      console.error('Error al agregar tarjeta:', error);
    }
  };

  const HandleDeleteCard = async (boardId, listTitle, cardTitle) => {
    try {
      await deleteCard(boardId, listTitle, cardTitle);
      toast.current.show({
        severity: 'success',
        summary: 'Tarjeta eliminada',
        detail: `La tarjeta ${cardTitle} ha sido eliminada.`,
        life: 3000
      });
    } catch (error) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: `No se pudo eliminar la tarjeta ${cardTitle}.`,
        life: 3000
      });
    }
  }  
  return (
    <>
      <Panel 
        header={list.title || 'Sin título'}
        className="p-mr-3"
        style={{ 
          minWidth: '300px',
          backgroundColor: '#f1f3f5',
          borderLeft: '4px solid #6c757d',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}
      >
        {list.cards?.map((card, index) => (
          <div key={`card-${index}`} className="p-mb-2">
            <CardView key={`card-${index}`} card={card} />
            <Button
              label="Eliminar tarjeta"
              icon="pi pi-trash"
              className="p-button-danger p-button-text p-button-sm"
              onClick={() => HandleDeleteCard(boardId,list.title,card.title)}
            />
          </div>
        ))}
        
        <Button 
          label="Añadir tarjeta" 
          icon="pi pi-plus" 
          className="p-button-text p-button-sm" 
          onClick={() => setShowCardForm(true)}
        />
      </Panel>

      <Dialog 
        header="Nueva Tarjeta" 
        visible={showCardForm} 
        style={{ width: '50vw' }}
        onHide={() => setShowCardForm(false)}
      >
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="cardTitle">Título</label>
            <InputText
              id="cardTitle"
              value={newCard.title}
              onChange={(e) => setNewCard({...newCard, title: e.target.value})}
              className="p-mt-2"
            />
          </div>
          <div className="p-field p-mt-3">
            <label htmlFor="cardDescription">Descripción</label>
            <InputText
              id="cardDescription"
              value={newCard.description}
              onChange={(e) => setNewCard({...newCard, description: e.target.value})}
              className="p-mt-2"
            />
          </div>
          <div className="p-field p-mt-3">
            <label htmlFor="assignedUsers">Usuarios asignados</label>
            <Chips
              id="assignedUsers"
              value={newCard.assignedUsers}
              onChange={(e) => setNewCard({...newCard, assignedUsers: e.value})}
              className="p-mt-2"
              placeholder="Escribe y presiona enter"
              separator=","
            />
            <small className="p-text-secondary">
              Escribe nombres de usuario y presiona enter para agregar
            </small>
          </div>
          <Button 
            label="Guardar Tarjeta" 
            icon="pi pi-check" 
            className="p-mt-3"
            onClick={handleAddCard}
          />
        </div>
      </Dialog>
    </>
  );
};

export default ListView;