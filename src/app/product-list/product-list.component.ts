import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';

  constructor(private productService: ProductService, private router: Router, public auth: AuthService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data) => {
      console.log('Loaded Products:', data);
      this.products = data;
      this.filteredProducts = data; // ✅ Initially, show all products
    });
  }

  filterProducts() {
    const lowerCaseSearch = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(lowerCaseSearch)
    );
  }

  deleteProduct(id: string) {
    if (!this.auth.isAuthenticated()) {
      this.redirectToLogin();
      return;
    }
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

  addProduct() {
    if (!this.auth.isAuthenticated()) {
      this.redirectToLogin();
      return;
    }
    this.router.navigate(['/add-product']);
  }

  editProduct(id: string) {
    if (!this.auth.isAuthenticated()) {
      this.redirectToLogin();
      return;
    }
    console.log(`Navigating to Edit Product with ID: ${id}`);
    this.router.navigate(['/edit-product', id]);
  }

  viewProduct(id: string) {
    console.log(`Navigating to View Product with ID: ${id}`); 
    this.router.navigate(['/product-detail', id]);
  }

  redirectToLogin() {
    alert('You need to log in to perform this action.');
    this.router.navigate(['/sign-in']);
  }
}