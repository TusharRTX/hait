import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'creacion',
    loadChildren: () => import('./creacion/creacion.module').then( m => m.CreacionPageModule)
  },
  {
    path: 'iniciosesion',
    loadChildren: () => import('./iniciosesion/iniciosesion.module').then( m => m.IniciosesionPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'banco',
    loadChildren: () => import('./banco/banco.module').then( m => m.BancoPageModule)
  },
  {
    path: 'materiales',
    loadChildren: () => import('./materiales/materiales.module').then( m => m.MaterialesPageModule)
  },
  {
    path: 'herramientas',
    loadChildren: () => import('./herramientas/herramientas.module').then( m => m.HerramientasPageModule)
  },
  {
    path: 'equipos',
    loadChildren: () => import('./equipos/equipos.module').then( m => m.EquiposPageModule)
  },
  {
    path: 'tornillos',
    loadChildren: () => import('./tornillos/tornillos.module').then( m => m.TornillosPageModule)
  },
  {
    path: 'medicion',
    loadChildren: () => import('./medicion/medicion.module').then( m => m.MedicionPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./success/success.module').then( m => m.SuccessPageModule)
  },
  // marcas
  { path: 'mamut', loadChildren: () => import('./MARCAS/mamut/mamut.module').then(m => m.MAMUTPageModule) },
  { path: 'bauker', loadChildren: () => import('./MARCAS/bauker/bauker.module').then(m => m.baukerPageModule) },
  { path: 'imporper', loadChildren: () => import('./MARCAS/imporper/imporper.module').then(m => m.imporperPageModule) },
  { path: 'redline', loadChildren: () => import('./MARCAS/redline/redline.module').then(m => m.redlinePageModule) },
  { path: 'stanley', loadChildren: () => import('./MARCAS/stanley/stanley.module').then(m => m.stanleyPageModule) },
  { path: 'vinilit', loadChildren: () => import('./MARCAS/vinilit/vinilit.module').then(m => m.vinilitPageModule) },
  { path: 'arauco', loadChildren: () => import('./MARCAS/arauco/arauco.module').then(m => m.araucoPageModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
