import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RecipeService, SpoonacularRecipe, FavoriteRecipe } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  standalone: false
})
export class RecipeCardComponent {
  @Input() recipe!: SpoonacularRecipe | FavoriteRecipe;
  @Input() isFavorite: boolean = false;
  @Output() save = new EventEmitter<SpoonacularRecipe>();
  @Output() delete = new EventEmitter<string>();

  constructor(private recipeService: RecipeService) {}

  onSaveClick(): void {
    if (!this.isFavorite) {
      this.save.emit(this.recipe as SpoonacularRecipe);
    }
  }

  onDeleteClick(): void {
    if (this.isFavorite) {
      const fav = this.recipe as FavoriteRecipe;
      if (fav._id) this.delete.emit(fav._id);
    }
  }

  onUpdateNote(newNote: string): void {
    const fav = this.recipe as FavoriteRecipe;
    if (fav._id) {
      this.recipeService.updateFavorite(fav._id, { notes: newNote }).subscribe(updated => {
        console.log('Notes updated');
      });
    }
  }
}
