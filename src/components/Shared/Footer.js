// components/Footer.js
import React from "react";
import facebookLogo from '../../img/facebook.png';
import xLogo from '../../img/x.png';
import instagramLogo from '../../img/instagramLogo.svg';

const Footer = () => {
  return (
    <div className="page-container">
      <footer className="footer">
        <p className="copyright">
          © {new Date().getFullYear()} Gestor de Tareas por Agustín Gioia. Todos los derechos reservados.
        </p>
        <div className='columnaFooter'>
                <div className="logosRedes">
                    <a href="https://www.facebook.com/agus.gioia.3?locale=es_LA" target="_blank" rel="noopener noreferrer" className="logoRed" id="logoFB">
                        <img src={facebookLogo} alt="Facebook"/>
                    </a>
                    <a href="https://x.com/AgusGioia" target="_blank" rel="noopener noreferrer" className="logoRed">
                        <img src={xLogo} alt="X"/>
                    </a>
                    <a href="https://www.instagram.com/agusgioia/" target="_blank" rel="noopener noreferrer" className="logoRed">
                        <img src={instagramLogo} alt="Instagram"/>
                    </a>
                </div>
          </div>
      </footer>
    </div>
  );
};

export default Footer;
