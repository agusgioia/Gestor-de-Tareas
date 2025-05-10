import React, { useEffect, useState } from 'react'
import { getBoards } from './Services/api';
import { ProgressSpinner } from 'primereact/progressspinner'
import BoardView from './BoardView';

const Administrator = ({adminData}) => {

  const [boards, setBoards]= useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    
    const fetchBoards = async () => {
      try{
        const response = await getBoards();
        setBoards(response);
        setLoading(false);
      }catch(error){
        console.error("Error fetching boards:", error);
        setLoading(true);
      }
    }
    fetchBoards();
  }
  , []);

  if (loading) return
  <div className='p-text-center'>
    <ProgressSpinner className="p-mt-5" style={{ width: '2rem', height: '2rem' }} />
  </div>;
  if (!boards) return <div className='p-text-center'>No se encontraron tableros</div>;

  return (
    <div>
      <h1>Administrator{adminData.owner}</h1>
      <h2>Board List</h2>
      <div className='p-d-flex p-flex-wrap p-jc-center p-gap-3'>
        {boards.map((board, index) => (
          <BoardView key={index} boardId={board.id} />
        ))}
      </div>
    </div>
  )
}

export default Administrator
