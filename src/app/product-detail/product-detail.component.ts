import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: any = null;
  productId: string | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router // ✅ Keep it private, but create a method for navigation
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');

    if (this.productId) {
      this.productService.getProduct(this.productId).subscribe(
        (product) => {
          if (product) {
            this.product = product;
          } else {
            alert('Product not found!');
            this.navigateToInventory(); // Use the method for navigation
          }
        },
        (error) => {
          console.error('Error fetching product:', error);
          alert('Error loading product data. Please try again.');
          this.navigateToInventory();
        }
      );
    }
  }

  // ✅ Public method for navigation
  navigateToInventory() {
    this.router.navigate(['/']);
  }
}