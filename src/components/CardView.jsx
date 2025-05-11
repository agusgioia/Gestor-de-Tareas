import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';

const CardView = ({ card }) => {
  if (!card || !card.title) return null;

  return (
    <Card
      title={card.title}
      className="p-mb-3"
      style={{ 
        cursor: 'pointer',
        backgroundColor: '#ffffff',
        borderLeft: '3px solid #adb5bd',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
      }}
    >
      <p className="p-m-0">{card.description || 'Sin descripción'}</p>
      {card.assignedUsers?.length > 0 && (
        <div className="p-d-flex p-flex-wrap p-gap-1 p-mt-2">
          {card.assignedUsers.map((user, index) => (
            <Tag
              key={`user-${index}`}
              value={user}
              icon="pi pi-user"
              className="p-mr-1"
              severity="info"
            />
          ))}
        </div>
      )}
    </Card>
  );
};

export default CardView;