import { Component, OnInit } from '@angular/core';
import { RecipeService, FavoriteRecipe } from '../../services/recipe.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  standalone: false
})
export class FavoritesComponent implements OnInit {
  favorites: FavoriteRecipe[] = [];
  errorMessage: string = '';

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.recipeService.getFavorites().subscribe({
      next: (data) => this.favorites = data,
      error: (err) => {
        this.errorMessage = 'Could not load favorites.';
        console.error('Load favorites error', err);
      }
    });
  }

  onDeleteFavorite(id: string): void {
    this.recipeService.deleteFavorite(id).subscribe({
      next: () => this.favorites = this.favorites.filter(r => r._id !== id),
      error: (err) => console.error('Delete error', err)
    });
  }
}
