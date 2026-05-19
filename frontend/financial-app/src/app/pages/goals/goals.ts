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

  selector: 'app-goals',

  standalone: true,

  imports: [

    CommonModule,

    FormsModule,

    SidebarComponent

  ],

  templateUrl: './goals.html',

  styleUrl: './goals.css'

})

export class GoalsComponent
implements OnInit {

  goals: any[] = [];

  title = '';

  target_amount = 0;

  current_amount = 0;

  deadline = '';

  showModal = false;

  selectedColor = '#10b981';

  selectedIcon = 'bi-bullseye';

  today = '';

  editAmount = 0;

  editingGoalId: number | null = null;

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    this.today =

    new Date()

    .toISOString()

    .split('T')[0];

    this.loadGoals();

  }

  loadGoals() {

    this.http.get<any[]>(

      'http://localhost:8000/routes/get_goals.php'

    ).subscribe({

      next: (data) => {

        this.goals = data;

      }

    });

  }

  addGoal() {

    if(!this.title.trim()) {

      return;

    }

    const goal = {

      title: this.title,

      target_amount:
      this.target_amount,

      current_amount:
      this.current_amount,

      deadline: this.deadline,

      color: this.selectedColor,

      icon: this.selectedIcon

    };

    this.showModal = false;

    this.http.post(

      'http://localhost:8000/routes/add_goal.php',

      goal

    ).subscribe({

      next: () => {

        this.loadGoals();

        this.clearForm();

      }

    });

  }

  clearForm() {

    this.title = '';

    this.target_amount = 0;

    this.current_amount = 0;

    this.deadline = '';

  }

  getProgress(goal: any) {

    return (

      goal.current_amount

      /

      goal.target_amount

    ) * 100;

  }

  colors = [

    '#10b981',

    '#06b6d4',

    '#3b82f6',

    '#8b5cf6',

    '#d946ef',

    '#ec4899',

    '#f97316',

    '#ef4444'

  ];

  icons = [

    'bi-bullseye',

    'bi-shield',

    'bi-airplane',

    'bi-car-front',

    'bi-house',

    'bi-mortarboard',

    'bi-laptop',

    'bi-heart'

  ];

  deleteGoal(id: number) {

    if(

      confirm(

        'Delete this goal?'

      )

    ) {

      this.http.post(

        'http://localhost:8000/routes/delete_goal.php',

        { id }

      ).subscribe({

        next: () => {

          this.loadGoals();

        }

      });

    }

  }

  startEdit(goal: any) {

    this.editingGoalId =
    goal.id;

    this.editAmount =
    goal.current_amount;

  }

  saveEdit(goal: any) {

    const updatedAmount =

      Number(goal.current_amount)

      +

      Number(this.editAmount);

    /* BLOCK NEGATIVE */

    if(updatedAmount < 0) {

      alert(

        'Goal amount cannot be negative'

      );

      return;

    }

    this.http.post(

      'http://localhost:8000/routes/update_goal.php',

      {

        id: goal.id,

        current_amount:
        updatedAmount

      }

    ).subscribe({

      next: () => {

        this.editingGoalId = null;

        this.editAmount = 0;

        this.loadGoals();

      }

    });

  }

}