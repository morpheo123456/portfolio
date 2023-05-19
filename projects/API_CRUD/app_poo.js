import ControladorMuebles from './ControladorMuebles.js';
import VistaMuebles from './VistaMuebles.js';
import ModeloMuebles from './ModeloMuebles.js';

const modelo=new ModeloMuebles();
const vista=new VistaMuebles();
const controlador= new ControladorMuebles(modelo,vista);
vista.setControlador(controlador);
controlador.iniciar();
