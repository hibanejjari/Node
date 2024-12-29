import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchQuery = '';
  filterCriteria = 'all';
  selectedGenre = 'all';
  selectedCategory = 'all';
  selectedType = 'all';
  sortCriteria = 'default';

  genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi'];
  categories = ['Seinen', 'Shounen', 'Shoujo', 'Josei', 'Kids'];
  types = ['Manga', 'Manhwa', 'Webtoon', 'Novel', 'Light Novel', 'One Shot'];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.filteredProducts = products; // Initialize filteredProducts
    });
  }

  // Add filtering logic
  filterProducts(): void {
    this.filteredProducts = this.products.filter((product) => {
      let matchesSearch =
        this.searchQuery === '' ||
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (product.authors &&
          product.authors.some((author: string) =>
            author.toLowerCase().includes(this.searchQuery.toLowerCase())
          ));

      let matchesGenre =
        this.selectedGenre === 'all' ||
        (product.genres && product.genres.includes(this.selectedGenre));

      let matchesCategory =
        this.selectedCategory === 'all' ||
        product.category === this.selectedCategory;

      let matchesType =
        this.selectedType === 'all' ||
        product.type === this.selectedType;

      return matchesSearch && matchesGenre && matchesCategory && matchesType;
    });

    this.sortProducts();
  }

  // Sorting logic
  sortProducts(): void {
    switch (this.sortCriteria) {
      case 'name':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-asc':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'score':
        this.filteredProducts.sort((a, b) => (b.score || 0) - (a.score || 0));
        break;
      default:
        break;
    }
  }
}
