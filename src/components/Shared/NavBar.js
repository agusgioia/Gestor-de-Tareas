import { useState, useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { logoutUser } from '../Auth/auth';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
const Navbar = ({user}) => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            setCurrentUser(user);
            setLoading(false);
        }else{
            setCurrentUser(null);
            setLoading(true);
        }
    },[user]);
    
    const handleLogout = async () => {
        try {
            
            await logoutUser();
            setCurrentUser(null);
            navigate('/login');
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    // Items comunes
    const commonItems = [
        {
            label: 'Inicio',
            icon: 'pi pi-home',
            command: () => navigate('/')
        }
    ];

    // Items para vendedores
    const sellerItems = [
        {
            label: 'Tableros',
            icon: 'pi pi-file',
            items: [
                {
                    label: 'Nuevo Tablero',
                    icon: 'pi pi-plus',
                    command: () => navigate('/user/boardform',{state:{user}})
                },
                {
                    label: 'Mis Tableros',
                    icon: 'pi pi-list',
                    command: () => navigate('/')
                }
            ]
        }
    ];

    // Items para administradores
    const adminItems = [
        {
            label: 'Gestión',
            icon: 'pi pi-users',
            items: [
                {
                    label: 'Todos los Tableros',
                    icon: 'pi pi-folder-open',
                    command: () => navigate('/administrator/')
                }
            ]
        }
    ];

    if (loading) {
        return <div>Cargando...</div>;
    }

    const roleSpecificItems = currentUser?.role === 'administrator' ? adminItems : sellerItems;
    const items = [...commonItems, ...roleSpecificItems];

    const endItems = currentUser ? (
        <div className="flex align-items-center gap-2">
            <Button 
                label={currentUser || 'Perfil'} 
                icon="pi pi-user" 
                className="p-button-text p-button-plain" 
            />
            <Button 
                icon="pi pi-sign-out" 
                className="p-button-danger" 
                tooltip="Cerrar sesión"
                tooltipOptions={{ position: 'bottom' }}
                onClick={handleLogout}
            />
        </div>
    ) : (
        <div className="flex align-items-center gap-2">
            <Button 
                label="Iniciar sesión" 
                className="p-button-text" 
                onClick={() => navigate('/login')}
            />
            <Button 
                label="Registrarse" 
                className="p-button-outlined" 
                onClick={() => navigate('/register')}
            />
        </div>
    );

    return (
        <Menubar 
            model={items} 
            end={endItems}
            className="navbar-custom"
            style={{ 
                border: 'none',
                borderBottom: '1px solid #e5e7eb',
                borderRadius: 0,
                padding: '0.5rem 2rem'
            }}
        />
    );
};

export default Navbar;