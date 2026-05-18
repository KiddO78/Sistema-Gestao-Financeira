import {
  Component,
  OnInit,
  AfterViewInit
} from '@angular/core';

import { HttpClient }
from '@angular/common/http';

import { SidebarComponent }
from '../../components/sidebar/sidebar';

import {
  Chart,
  registerables
} from 'chart.js';

Chart.register(...registerables);

@Component({

  selector: 'app-dashboard',

  standalone: true,

  imports: [SidebarComponent],

  templateUrl: './dashboard.html',

  styleUrl: './dashboard.css'

})

export class DashboardComponent
implements OnInit, AfterViewInit {

  totalIncome = 0;

  totalExpense = 0;

  totalBalance = 0;

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    this.loadStats();

  }

  ngAfterViewInit(): void {

    this.createChart();

  }

  loadStats() {

    this.http.get<any>(

      'http://localhost:8000/routes/dashboard_stats.php'

    ).subscribe({

      next: (data) => {

        this.totalIncome = data.income;

        this.totalExpense = data.expense;

        this.totalBalance = data.balance;

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  createChart() {

    new Chart('financeChart', {

      type: 'doughnut',

      data: {

        labels: [
          'Income',
          'Expense'
        ],

        datasets: [

          {

            data: [
              this.totalIncome,
              this.totalExpense
            ],

            backgroundColor: [
              '#10b981',
              '#ef4444'
            ]

          }

        ]

      }

    });

  }

}