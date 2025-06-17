import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CoffeeApiService } from './services/coffee-api.service';
import { Subscription } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Coffee } from './types/coffee';
import { CurrencyPipe, NgClass, NgFor, NgIf, SlicePipe } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductListComponent } from "./components/product-list/product-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, NavbarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'httpClientModule';
  
}
