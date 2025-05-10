import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Services/firebase';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Message } from 'primereact/message';
import { Divider } from 'primereact/divider';
import { Password } from 'primereact/password';
import { updateProfile } from "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, {
      displayName: username
    }); 
      console.log("✅ Usuario registrado en Firebase Auth:", user.uid);
    } catch (err) {
      setError(err.message);
    }
  };

  const footer = (
    <div className="p-text-center">
      <Divider />
      <p className="p-text-secondary">¿Ya tienes cuenta? <a href="/login" className="p-text-primary">Inicia sesión</a></p>
    </div>
  );

  return (
    <div className="h-screen flex align-items-center justify-content-center p-4" style={{ minHeight: '80vh', padding: '5rem' }}>
      <Card title="Registro" footer={footer} className="w-25rem" style={{ width: '400px',margin: '0 auto' }}>
        <form onSubmit={handleRegister}>
          <div className="p-field">
            <label htmlFor="email" className="p-d-block">Correo Electrónico</label>
            <InputText
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-mb-3 p-d-block"
              style={{ width: '100%' }}
              placeholder="tu@email.com"
              required
            />
          </div>
          
          <div className="p-field">
            <label htmlFor="password" className="p-d-block">Contraseña</label>
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              toggleMask
              className="p-mb-3 p-d-block"
              style={{ width: '100%' }}
              placeholder="Crea una contraseña"
              required
            />
          </div>

          <div className="p-field">
            <label htmlFor="Nombre de Usuario" className="p-d-block">Nombre de Usuario</label>
           <InputText
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-mb-3 p-d-block"
              style={{ width: '100%' }}
              placeholder="Nombre de Usuario"
              required
           />
          </div>

          {error && <Message severity="error" text={error} className="p-mb-3" />}

          <Button 
            label="Registrarse" 
            type="submit" 
            icon="pi pi-user-plus" 
            className="p-button-raised p-button-success p-d-block"
            style={{ width: '100%' }}
          />
        </form>
      </Card>
    </div>
  );
};

export default Register;
