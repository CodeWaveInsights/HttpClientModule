import { CurrencyPipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CoffeeApiService } from '../../services/coffee-api.service';
import { Coffee } from '../../types/coffee';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe, SlicePipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  products: Coffee[] = [];
  isLoading = true;

  sub$!: Subscription;
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
      },
    });
  }

  ngOnDestroy(): void {
    if (this.sub$) {
      this.sub$.unsubscribe();
      console.log('Subscription to coffee API service has been unsubscribed.');
    }
  }
}
