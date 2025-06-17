import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomesComponent } from './components/homes/homes.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { MenscollectionComponent } from './components/menscollection/menscollection.component';
import { WomenComponent } from './components/women/women.component';
import { KidsComponent } from './components/kids/kids.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  {path: '', component: HomesComponent,  title: 'Home Page'},
  {path: 'home', component: HomesComponent, title: 'Home Page'},
  {path: 'products', component: ProductListComponent, title: 'Product Page'},
  {path: 'mens', component: MenscollectionComponent, title: 'Men\'s Collection'},
  {path: 'womens', component: WomenComponent, title: 'Women\'s Collection'},
  {path: 'kids', component: KidsComponent, title: 'Kids Collection'},
  {path: '**', component: NotFoundComponent, title: 'Page Not Found'}
];
