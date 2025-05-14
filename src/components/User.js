import { useEffect, useState } from 'react';
import { getUserBoards } from './Services/api';
import { ProgressSpinner } from 'primereact/progressspinner';
import BoardView from './BoardView';
import { Button } from 'primereact/button';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './Services/firebase'; 

const User = ({ idUser }) => {
  const [userBoards, setUserBoards] = useState([]); // Inicializar como array vacío
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  if (!idUser) return;

  setLoading(true);
  
  // Carga inicial
  getUserBoards(idUser).then(response => {
    setUserBoards(response || []);
    console.log('Tableros del usuario:', response);
  }).catch(err => {
    setError('Error al cargar los tableros');
  }).finally(() => {
    setLoading(false);
  });

  // Listener en tiempo real
  const unsubscribe = onSnapshot(collection(db, "boards"), (snapshot) => {
    const updatedBoards = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(board => board.owner === idUser);
    
    setUserBoards([...updatedBoards]); // Spread operator para nueva referencia
  });

  return () => unsubscribe();
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
            key={`${board.id}-${JSON.stringify(board)}`} 
            boardId={board.id} 
            forceUpdate={Date.now()}/>
        ))}
      </div>
    </div>
  );
};

export default User;