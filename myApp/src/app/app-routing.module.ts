import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

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
  {path: 'recuperar', loadChildren: () => import('./recuperar/recuperar.module').then( m => m.RecuperarPageModule)},

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

  // PAGINAS PRINCIPALES (home) cada actor

  { path: 'comprador', loadChildren: () => import('./ACTORES/comprador/comprador.module').then(m => m.CompradorPageModule), canActivate: [AuthGuard], data: { requiredRole: 'comprador' } },
  { path: 'vendedor', loadChildren: () => import('./ACTORES/vendedor/vendedor.module').then(m => m.VendedorPageModule), canActivate: [AuthGuard], data: { requiredRole: 'vendedor' } },
  { path: 'bodeguero', loadChildren: () => import('./ACTORES/bodeguero/bodeguero.module').then(m => m.BodegueroPageModule), canActivate: [AuthGuard], data: { requiredRole: 'bodeguero' } },
  { path: 'contador', loadChildren: () => import('./ACTORES/contador/contador.module').then(m => m.ContadorPageModule), canActivate: [AuthGuard], data: { requiredRole: 'contador' } },
  {
    path: 'todoproductos',
    loadChildren: () => import('./todoproductos/todoproductos.module').then( m => m.TodoproductosPageModule)
  },  {
    path: 'pedidos',
    loadChildren: () => import('./pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },



  // PAGINAS PRINCIPALES (home) cada actor

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
