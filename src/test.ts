import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// Inicia el entorno de prueba de Angular
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Cargar manualmente los archivos de prueba
const testModules = [
  './app.component.spec',
  './app.service.spec', 
  'C:\Users\jcifu\OneDrive\Documentos\GitHub\SGSE2.0\src\app\pages\agregar-pedido\agregar-pedido.page.spec.ts' // agrega todos los archivos .spec.ts que tienes
  // otros archivos de prueba...
];

testModules.forEach((module) => {
  import(module)
    .then(() => {
      console.log(`${module} cargado`);
    })
    .catch((err) => {
      console.error(`Error al cargar ${module}:`, err);
    });
});
