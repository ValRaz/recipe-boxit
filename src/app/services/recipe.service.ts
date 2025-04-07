import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
}

export interface FavoriteRecipe {
  _id?: string;
  spoonacularId: number;
  title: string;
  image: string;
  notes?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private spoonacularUrl = environment.spoonacularBaseUrl;
  private apiKey = environment.spoonacularApiKey;
  // URL to your Express backend API
  private favoritesUrl = 'http://localhost:3000/api/recipes';

  constructor(private http: HttpClient) {}

  // Search for recipes using Spoonacular API
  searchRecipesByIngredients(ingredients: string): Observable<SpoonacularRecipe[]> {
    const params = encodeURIComponent(ingredients);
    const url = `${this.spoonacularUrl}/recipes/findByIngredients?ingredients=${params}&number=10&apiKey=${this.apiKey}`;
    return this.http.get<SpoonacularRecipe[]>(url);
  }

  // Get all favorite recipes
  getFavorites(): Observable<FavoriteRecipe[]> {
    return this.http.get<FavoriteRecipe[]>(this.favoritesUrl);
  }

  // Save a recipe as a favorite
  addFavorite(recipe: Partial<FavoriteRecipe>): Observable<FavoriteRecipe> {
    return this.http.post<FavoriteRecipe>(this.favoritesUrl, recipe);
  }

  // Update an existing favorite recipe (e.g., update notes)
  updateFavorite(id: string, updates: Partial<FavoriteRecipe>): Observable<FavoriteRecipe> {
    return this.http.put<FavoriteRecipe>(`${this.favoritesUrl}/${id}`, updates);
  }

  // Delete a favorite recipe
  deleteFavorite(id: string): Observable<void> {
    return this.http.delete<void>(`${this.favoritesUrl}/${id}`);
  }
}
