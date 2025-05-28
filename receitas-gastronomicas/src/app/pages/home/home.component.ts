import { Component, OnInit } from '@angular/core';
import { MealService } from '../../services/meal.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MealCardComponent } from '../../components/meal-card/meal-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MealCardComponent],
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {
  meals: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 6;
  alphabeticalOrder: boolean = true;

  constructor(private mealService: MealService, private router: Router) {}

  ngOnInit() {
    this.searchMeals();
  }

  searchMeals() {
    this.mealService.getMealsByName(this.searchTerm).subscribe((response) => {
      this.meals = response.meals || [];
      this.sortMeals();
      this.currentPage = 1;
    });
  }

  sortMeals() {
    this.meals.sort((a, b) => {
      const comp = a.strMeal.localeCompare(b.strMeal);
      return this.alphabeticalOrder ? comp : -comp;
    });
  }

  toggleOrder() {
    this.alphabeticalOrder = !this.alphabeticalOrder;
    this.sortMeals();
  }

  paginatedMeals() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.meals.slice(start, start + this.pageSize);
  }

  totalPages() {
    return Math.ceil(this.meals.length / this.pageSize);
  }

  previousPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) this.currentPage++;
  }

  viewDetails(id: string) {
    this.router.navigate(['/meal', id]);
  }
}
