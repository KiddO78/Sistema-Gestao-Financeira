import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { FormsModule }
from '@angular/forms';

import { HttpClient }
from '@angular/common/http';

import { SidebarComponent }
from '../../components/sidebar/sidebar';

@Component({

  selector: 'app-categories',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent
  ],

  templateUrl: './categories.html',

  styleUrl: './categories.css'

})

export class CategoriesComponent
implements OnInit {

  categories: any[] = [];

  name = '';

  type = 'Expense';

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    this.loadCategories();

  }

  loadCategories() {

    this.http.get<any[]>(

      'http://localhost:8000/routes/get_categories.php'

    ).subscribe({

      next: (data) => {

        this.categories = data;

      }

    });

  }

  addCategory() {

    const category = {

      name: this.name,

      type: this.type

    };

    this.http.post(

      'http://localhost:8000/routes/add_category.php',

      category

    ).subscribe({

      next: () => {

        this.loadCategories();

        this.name = '';

        this.type = 'Expense';

      }

    });

  }

}