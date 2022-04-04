import React, { useState } from 'react';
import './PPT.css';
import piedra from '../../shared/imgs/piedra.png';
import papel from '../../shared/imgs/papel.png';
import tijeras from '../../shared/imgs/tijeras.png';
import vs from '../../shared/imgs/VS.png';
let jugadorJugada = 0;
  let jugadorPuntaje = 0;
  let iaJugada = 0;
  let iaPuntaje = 0;

const PPT = () => {

  
  
  const [jugada, setJugada] = useState(piedra)
  const [IA, setIA] = useState(papel)
  const [marcadorJugador, setMarcadorJugador] = useState(jugadorPuntaje)
  const [marcadorIA, setMarcadorIA] = useState(iaPuntaje)
  const [displayStart, setDisplayStart] = useState('visible');
  const [displayGanaste, setDisplayGanaste] = useState('hidden');
  const [displayPerdiste, setDisplayPerdiste] = useState('hidden');

  const iniciarJuego = () => {
      setDisplayStart('hidden');
      console.log("iniciar");
  }
  const elegirJugada = e => {
    if( e.target.classList.contains('piedra') )
    {
        jugadorJugada = 1;
        setJugada(e.target.src);
       
    } else if( e.target.classList.contains('papel') ) 
    {
        jugadorJugada = 2;
        setJugada(e.target.src);
    } else if( e.target.classList.contains('tijeras') )
    {
        jugadorJugada = 3;
        setJugada(e.target.src);
    }

    const random = Math.floor( Math.random() * (4 - 1)) + 1;
    
    console.log(random)
    switch( random ) {
        case 1: 
            iaJugada = 1;
            setIA(piedra);
            break;
        
        case 2: 
            iaJugada = 2;
            setIA(papel);
            break;
        
        case 3: 
            iaJugada = 3;
            setIA(tijeras);
            break;
        default: break;
    }

    verificarGanador();

  }

  function verificarGanador() {
    if( jugadorJugada !== iaJugada)
    {
        if(jugadorJugada == 1 && iaJugada == 3)
        {
            jugadorPuntaje++;
        } else if( jugadorJugada == 2 && iaJugada == 1)
        {
            jugadorPuntaje++;
        } else if( jugadorJugada == 3 && iaJugada == 2)
        {
            jugadorPuntaje++;
        } else {
            iaPuntaje++;
        }
    }

    actualizarMarcador();
}

function actualizarMarcador() {
    
    if( jugadorPuntaje <= 2 || iaPuntaje <= 2 ) {
        jugadorPuntaje = ( jugadorPuntaje > 2) ? 2 : jugadorPuntaje; 
        iaPuntaje = ( iaPuntaje > 2) ? 2 : iaPuntaje; 
        setMarcadorJugador(jugadorPuntaje) ;
        setMarcadorIA(iaPuntaje);
    }

    if( jugadorPuntaje == 2) setDisplayGanaste('visible');
    if( iaPuntaje == 2) setDisplayPerdiste('visible');
}

  return (
    <>
        <div className="start" classID="start" onClick={ iniciarJuego } style={{'visibility': displayStart}}>
            <button>
                <h1>Start</h1>
                
            </button>
        </div>
        <div className="start" classID="ganaste" 
            onClick={ () => {
              setDisplayGanaste('hidden');
              jugadorPuntaje = 0;
              iaPuntaje = 0
              actualizarMarcador();
            }} 
            style={{'visibility': displayGanaste}}
        >
            <button>
                <h1>Ganaste</h1>
                
            </button>
        </div>
        <div className="start" classID="perdiste"
          onClick={ () => {
            setDisplayPerdiste('hidden');
            jugadorPuntaje = 0;
            iaPuntaje = 0
            actualizarMarcador();
          }} 
          style={{'visibility': displayPerdiste}}>
            <button>
                <h1>Perdiste</h1>
            </button>
        </div>
        <div className="marcador">
            <div className="izquierdo">
                <h1>Player</h1>
                <h3>{marcadorJugador}</h3>
            </div>
            <div className="derecho">
                <h1>IA</h1>
                <h3>{marcadorIA}</h3>
            </div>
        </div>
        <h1 className="titulo">Piedra Papel y Tijera</h1>
        <div className="vs">
            <div className="jugador">
                <h1 style={ {color: "yellow"}}>Player</h1>
                <img src={ jugada } alt="Jugada jugador" width="150px" height="150px" classID="jugada" />
            </div>
            <img src={ vs } alt="" width="50px" height="50px" />
            <div className="jugador">
                <h1 style={ {color: "red"}}>IA</h1>
                <img src={ IA } alt="Jugada IA" width="150px" height="150px" classID="ia" />
            </div>
        </div>
        <div className="eleccion">
            <h1>Elige tu jugada</h1>
            <div className="btns">
                <button type="button" onClick={ elegirJugada }>
                    <img src= {piedra } alt="boton piedra" classID="piedra" className="piedra" />
                </button>
                <button type="button" onClick={ elegirJugada }>
                    <img src={ papel }
                    alt="boton papel" classID="papel" className="papel" />
                </button>
                <button type="button" onClick={ elegirJugada }>
                    <img src={ tijeras } alt="boton piedra" classID="tijeras" className="tijeras" />
                </button>
            </div>
        </div>
    </>
  )
}

export default PPT;
