import { useEffect, useState } from 'react';
import { getUserBoards } from './Services/api';
import { ProgressSpinner } from 'primereact/progressspinner';
import BoardView from './BoardView';
import { Button } from 'primereact/button';

const User = ({ idUser }) => {
  const [userBoards, setUserBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idUser) return;

    const fetchBoards = () => {
      setLoading(true);
      getUserBoards(idUser)
        .then(response => {
          setUserBoards(response || []);
          console.log('Tableros actualizados:', response);
        })
        .catch(() => {
          setError('Error al cargar los tableros');
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchBoards(); // carga inicial

    const interval = setInterval(fetchBoards, 10000); // actualizar cada 10 segundos

    return () => clearInterval(interval); // limpiar al desmontar
  }, [idUser]);

  if (loading) {
    return (
      <div className='p-text-center'>
        <ProgressSpinner className="p-mt-5" style={{ width: '2rem', height: '2rem' }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className='p-text-center p-mt-5'>
        <p className='p-text-danger'>{error}</p>
        <Button 
          label="Intentar nuevamente" 
          onClick={() => window.location.reload()} 
        />
      </div>
    );
  }

  return (
    <div className='p-m-3'>
      <h1 className='p-text-center'>Tableros de {idUser}</h1>
      <div className='p-d-flex p-flex-wrap p-jc-center p-gap-3'>
        {userBoards.map((board) => (
          <BoardView 
            key={board.id} 
            boardId={board.id} 
            forceUpdate={Date.now()} 
          />
        ))}
      </div>
    </div>
  );
};

export default User;
