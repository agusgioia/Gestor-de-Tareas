import { useEffect, useState } from 'react';
import { getUserBoards } from './Services/api';
import {  collection, onSnapshot } from 'firebase/firestore';
import { ProgressSpinner } from 'primereact/progressspinner';
import BoardView from './BoardView';
import { Button } from 'primereact/button';
import { db } from './Services/firebase';

const User = ({ idUser }) => {
  const [userBoards, setUserBoards] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  useEffect(() => {
    if (!idUser) return;
    setLoading(true);
    setError(null);

    const unsubscribe = onSnapshot(
      collection(db, 'boards'),
      () => {
        getUserBoards(idUser)
          .then(boards => {
            setUserBoards(boards || []);
            setLoading(false);
          })
          .catch(() => {
            setError('Error al cargar los tableros');
            setLoading(false);
          });
      },
      err => {
        console.error(err);
        setError('Error en la suscripción');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [idUser]);

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
          label="Reintentar" 
          onClick={() => {
            setError(null);
            setLoading(true);
          }} 
        />
      </div>
    );
  }

  return (
    <div className='p-m-3'>
      <h1 className='p-text-center'>Tableros de {idUser}</h1>
      <div className='p-d-flex p-flex-wrap p-jc-center p-gap-3'>
        {userBoards.map(board => (
          <BoardView 
            key={board.id} 
            boardId={board.id} 
          />
        ))}
      </div>
    </div>
  );
};

export default User;
