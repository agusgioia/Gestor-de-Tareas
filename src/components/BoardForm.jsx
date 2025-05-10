import { useState, useEffect } from 'react';
import { createBoard } from './Services/api';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BoardForm = () => {
    const toast = useRef(null);
    const [board, setBoard] = useState({
        name: '',
        owner: '',
        lists: [],
    });
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.user) {
            setBoard(prev => ({
                ...prev,
                owner: location.state.user
            }));
            console.log(location.state.user);
        }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createBoard(board);
            toast.current.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Tablero creado correctamente',
                life: 3000
            });
            setBoard({
                name: '',
                owner: '',
                lists: [],
            });
            navigate('/');
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo crear el tablero',
                life: 3000
            });
            console.error('Error creating board:', error);
        }
    };

    


    return (
        <div className="p-d-flex p-jc-center p-ai-center" style={{ minHeight: '100vh' }}>
            <Toast ref={toast} />
            <Card className="p-shadow-8" style={{ width: '450px' }}>
                <div className="p-text-center p-mb-4">
                    <i className="pi pi-table p-text-5xl p-d-block p-mb-2" style={{ color: 'var(--primary-color)' }} />
                    <h1 style={{ margin: 0 }}>Crear Nuevo Tablero</h1>
                    <p className="p-text-secondary p-mt-1">Completa los datos requeridos</p>
                </div>

                <Divider />

                <form onSubmit={handleSubmit} className="p-fluid">
                    <div className="p-field p-mb-4">
                        <label htmlFor="boardName" className="p-d-block p-mb-2">
                            Nombre del Tablero
                        </label>
                        <InputText
                            id="boardName"
                            value={board.name}
                            onChange={(e) => setBoard({...board, name: e.target.value})}
                            placeholder="Ej: Proyecto X"
                            className="p-inputtext-lg"
                            required
                        />
                    </div>

                    <Button 
                        type="submit" 
                        label="Crear Tablero" 
                        icon="pi pi-plus" 
                        className="p-button-raised p-button-lg"
                        style={{ width: '100%' }}
                    />
                </form>
            </Card>
        </div>
    );
};

export default BoardForm;