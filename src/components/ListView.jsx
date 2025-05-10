import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import CardView from './CardView';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { Chips } from 'primereact/chips';
import { AddCard } from './Services/api';

const ListView = ({ list, boardId, onCardAdded }) => {
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

  return (
    <>
      <Panel 
        header={list.title || 'Sin título'}
        className="p-mr-3"
        style={{ minWidth: '300px' }}
      >
        {/* Renderizar todas las cards de la lista */}
        {list.cards?.map((card, index) => (
          <CardView key={`card-${index}`} card={card} />
        ))}
        
        <Button 
          label="Añadir tarjeta" 
          icon="pi pi-plus" 
          className="p-button-text p-button-sm" 
          onClick={() => setShowCardForm(true)}
        />
      </Panel>

      {/* Diálogo para agregar tarjeta */}
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