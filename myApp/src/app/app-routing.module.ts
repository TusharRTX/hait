import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'home',loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  // EXTRAS
  {path: 'creacion', loadChildren: () => import('./creacion/creacion.module').then( m => m.CreacionPageModule)},
  {path: 'iniciosesion', loadChildren: () => import('./iniciosesion/iniciosesion.module').then( m => m.IniciosesionPageModule)},
  {path: 'registro', loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)},
  {path: 'banco', loadChildren: () => import('./banco/banco.module').then( m => m.BancoPageModule)},
  {path: 'success', loadChildren: () => import('./success/success.module').then( m => m.SuccessPageModule)},

  // Categorias Online
  {path: 'materiales', loadChildren: () => import('./materiales/materiales.module').then( m => m.MaterialesPageModule)},
  {path: 'herramientas', loadChildren: () => import('./herramientas/herramientas.module').then( m => m.HerramientasPageModule)},
  {path: 'equipos', loadChildren: () => import('./equipos/equipos.module').then( m => m.EquiposPageModule)},
  {path: 'tornillos', loadChildren: () => import('./tornillos/tornillos.module').then( m => m.TornillosPageModule)},
  {path: 'medicion', loadChildren: () => import('./medicion/medicion.module').then( m => m.MedicionPageModule)},
  {path: 'cart', loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)},

  // marcas Online
  { path: 'MARCAS/mamut', loadChildren: () => import('./MARCAS/mamut/mamut.module').then(m => m.MAMUTPageModule) },
  { path: 'MARCAS/bauker', loadChildren: () => import('./MARCAS/bauker/bauker.module').then(m => m.baukerPageModule) },
  { path: 'MARCAS/imporper', loadChildren: () => import('./MARCAS/imporper/imporper.module').then(m => m.imporperPageModule) },
  { path: 'MARCAS/redline', loadChildren: () => import('./MARCAS/redline/redline.module').then(m => m.redlinePageModule) },
  { path: 'MARCAS/stanley', loadChildren: () => import('./MARCAS/stanley/stanley.module').then(m => m.stanleyPageModule) },
  { path: 'MARCAS/vinilit', loadChildren: () => import('./MARCAS/vinilit/vinilit.module').then(m => m.vinilitPageModule) },
  { path: 'MARCAS/arauco', loadChildren: () => import('./MARCAS/arauco/arauco.module').then(m => m.araucoPageModule) },

  // Sección 2 HTML Especial (Actores)

  // PAGINAS PRINCIPALES (home) cada actor
  {path: 'ACTORES/VENDEDOR/home',loadChildren: () => import('./ACTORES/VENDEDOR/home/home.module').then( m => m.HomePageModule)},
  
  // Categorias tienda

  {path: 'ACTORES/CATEGORIAS/materiales', loadChildren: () => import('./ACTORES/CATEGORIAS/materiales/materiales.module').then( m => m.MaterialesPageModule)},
  {path: 'ACTORES/CATEGORIAS/herramientas', loadChildren: () => import('./ACTORES/CATEGORIAS/herramientas/herramientas.module').then( m => m.HerramientasPageModule)},
  {path: 'ACTORES/CATEGORIAS/equipos', loadChildren: () => import('./ACTORES/CATEGORIAS/equipos/equipos.module').then( m => m.EquiposPageModule)},
  {path: 'ACTORES/CATEGORIAS/tornillos', loadChildren: () => import('./ACTORES/CATEGORIAS/tornillos/tornillos.module').then( m => m.TornillosPageModule)},
  {path: 'ACTORES/CATEGORIAS/medicion', loadChildren: () => import('./ACTORES/CATEGORIAS/medicion/medicion.module').then( m => m.MedicionPageModule)},
  {path: 'ACTORES/cart', loadChildren: () => import('./ACTORES/cart/cart.module').then( m => m.CartPageModule)},

  // marcas tienda

  { path: 'ACTORES/MARCAS/mamut', loadChildren: () => import('./ACTORES/MARCAS/mamut/mamut.module').then(m => m.MAMUTPageModule) },
  { path: 'ACTORES/MARCAS/bauker', loadChildren: () => import('./ACTORES/MARCAS/bauker/bauker.module').then(m => m.baukerPageModule) },
  { path: 'ACTORES/MARCAS/imporper', loadChildren: () => import('./ACTORES/MARCAS/imporper/imporper.module').then(m => m.imporperPageModule) },
  { path: 'ACTORES/MARCAS/redline', loadChildren: () => import('./ACTORES/MARCAS/redline/redline.module').then(m => m.redlinePageModule) },
  { path: 'ACTORES/MARCAS/stanley', loadChildren: () => import('./ACTORES/MARCAS/stanley/stanley.module').then(m => m.stanleyPageModule) },
  { path: 'ACTORES/MARCAS/vinilit', loadChildren: () => import('./ACTORES/MARCAS/vinilit/vinilit.module').then(m => m.vinilitPageModule) },
  { path: 'ACTORES/MARCAS/arauco', loadChildren: () => import('./ACTORES/MARCAS/arauco/arauco.module').then(m => m.araucoPageModule) },  {
    path: 'recuperar',
    loadChildren: () => import('./recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
