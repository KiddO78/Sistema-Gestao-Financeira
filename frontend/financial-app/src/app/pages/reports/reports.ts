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

  selector: 'app-reports',

  standalone: true,

  imports: [SidebarComponent],

  templateUrl: './reports.html',

  styleUrl: './reports.css'

})

export class ReportsComponent
implements OnInit, AfterViewInit {

  totalIncome = 0;

  totalExpense = 0;

  totalBalance = 0;

  chart: any;

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

        this.createChart();

      }

    });

  }

  createChart() {

    if(this.chart) {

      this.chart.destroy();

    }

    this.chart = new Chart(

      'reportChart',

      {

        type: 'bar',

        data: {

          labels: [

            'Income',

            'Expense',

            'Balance'

          ],

          datasets: [

            {

              data: [

                this.totalIncome,

                this.totalExpense,

                this.totalBalance

              ],

              backgroundColor: [

                '#10b981',

                '#ef4444',

                '#8b5cf6'

              ],

              borderRadius: 12

            }

          ]

        },

        options: {

          responsive: true,

          plugins: {

            legend: {

              display: false

            }

          },

          scales: {

            y: {

              ticks: {

                color: 'white'

              },

              grid: {

                color:
                'rgba(255,255,255,0.08)'

              }

            },

            x: {

              ticks: {

                color: 'white'

              },

              grid: {

                display: false

              }

            }

          }

        }

      }

    );

  }

}