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

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {

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

      deadline: this.deadline

    };

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

}