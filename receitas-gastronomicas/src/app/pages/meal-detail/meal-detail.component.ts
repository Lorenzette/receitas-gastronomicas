import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; //
import { MealService } from '../../services/meal.service';

@Component({
  selector: 'app-meal-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meal-detail.component.html',
})
export class MealDetailComponent implements OnInit {
  meal: any;
  ingredients: string[] = [];

  constructor(private route: ActivatedRoute, private mealService: MealService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mealService.getMealById(id).subscribe((response) => {
        this.meal = response.meals[0];
        this.extractIngredients();
      });
    }
  }

  extractIngredients() {
    for (let i = 1; i <= 20; i++) {
      const ingredient = this.meal[`strIngredient${i}`];
      const measure = this.meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        this.ingredients.push(`${ingredient} - ${measure}`);
      }
    }
  }
}
