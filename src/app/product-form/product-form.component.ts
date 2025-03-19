import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  product = { name: '', description: '', manufacturer: '', price: 0, quantity: 0 };
  isEditMode = false;
  productId: number | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    
    console.log(`Product ID from route: ${this.productId}`); // ✅ Debugging: Ensure ID is retrieved

    if (this.productId) {
      this.isEditMode = true;
      this.productService.getProduct(this.productId).subscribe(
        (product) => {
          if (product) {
            this.product = product;
          } else {
            alert('Product not found!');
            this.router.navigate(['/']);
          }
        },
        (error) => {
          console.error('Error fetching product:', error);
          alert('Error loading product data. Please try again.');
          this.router.navigate(['/']);
        }
      );
    }
  }

  submitProduct() {
    if (this.isEditMode) {
      this.productService.updateProduct(this.productId!, this.product).subscribe(() => {
        alert('Product updated successfully!');
        this.router.navigate(['/']);
      });
    } else {
      this.productService.addProduct(this.product).subscribe(() => {
        alert('Product added successfully!');
        this.router.navigate(['/']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}