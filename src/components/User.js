import { useEffect, useState, useRef, useCallback } from 'react';
import { getUserBoards } from './Services/api';
import { ProgressSpinner } from 'primereact/progressspinner';
import BoardView from './BoardView';
import { Button } from 'primereact/button';

const User = ({ idUser }) => {
  const [userBoards, setUserBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null); // para asegurar que no se superpongan

  const fetchBoards = useCallback(async () => {
    try {
      const response = await getUserBoards(idUser);
      setUserBoards(response || []);
      setError(null);
    } catch (e) {
      setError('Error al cargar los tableros');
    } finally {
      setLoading(false);
    }
  }, [idUser]);

  useEffect(() => {
    if (!idUser) return;

    setLoading(true);
    fetchBoards();

    // limpia intervalos viejos
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(fetchBoards, 10000);

    return () => clearInterval(intervalRef.current);
  }, [idUser, fetchBoards]);

  if (loading) {
    return (
      <div className='p-text-center'>
        <ProgressSpinner style={{ width: '2rem', height: '2rem' }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className='p-text-center p-mt-5'>
        <p className='p-text-danger'>{error}</p>
        <Button 
          label="Intentar nuevamente" 
          onClick={() => {
            setLoading(true);
            fetchBoards();
          }} 
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
