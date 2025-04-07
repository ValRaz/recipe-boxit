import { Component } from '@angular/core';
import { RecipeService, SpoonacularRecipe } from '../../services/recipe.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  standalone: false
})
export class SearchComponent {
  ingredientsQuery: string = '';
  searchResults: SpoonacularRecipe[] = [];
  errorMessage: string = '';

  constructor(private recipeService: RecipeService) {}

  onSearch(): void {
    this.errorMessage = '';
    if (!this.ingredientsQuery.trim()) return;
    this.recipeService.searchRecipesByIngredients(this.ingredientsQuery)
      .subscribe({
        next: (results) => this.searchResults = results,
        error: (err) => {
          this.errorMessage = 'Error fetching recipes. Please try again.';
          console.error('Search error', err);
        }
      });
  }

  // Save recipe to favorites
  onSaveRecipe(recipe: SpoonacularRecipe): void {
    const favoriteData = {
      spoonacularId: recipe.id,
      title: recipe.title,
      image: recipe.image
    };
    this.recipeService.addFavorite(favoriteData).subscribe({
      next: () => alert(`${recipe.title} saved to favorites.`),
      error: (err) => console.error('Save error', err)
    });
  }
}
