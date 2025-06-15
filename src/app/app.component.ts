import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoffeeApiService } from './services/coffee-api.service';
import { Subscription } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Coffee } from './types/coffee';
import { CurrencyPipe, NgClass, NgFor, NgIf, SlicePipe } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, NgIf, NgFor, SlicePipe, CurrencyPipe, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'httpClientModule';
  products: Coffee[] = [];
  isLoading = true;

  sub$ !:Subscription;
  constructor(private coffeeApiService: CoffeeApiService) {}

  ngOnInit() {
    this.sub$ = this.coffeeApiService.getCoffees().subscribe({
      next: (data) => {
        console.log('Coffees data:', data);
        this.products = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching coffees:', error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub$) {
      this.sub$.unsubscribe();
      console.log('Subscription to coffee API service has been unsubscribed.');
    }
  }
}
