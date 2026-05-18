import {
  Component,
  AfterViewInit
} from '@angular/core';

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
implements AfterViewInit {

  ngAfterViewInit(): void {

    new Chart('financeChart', {

      type: 'line',

      data: {

        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun'
        ],

        datasets: [

          {
            label: 'Income',

            data: [
              120,
              190,
              300,
              250,
              420,
              500
            ],

            borderColor: '#10b981',

            backgroundColor:
              'rgba(16,185,129,0.2)',

            tension: 0.4,

            fill: true
          },

          {
            label: 'Expenses',

            data: [
              80,
              100,
              180,
              170,
              210,
              260
            ],

            borderColor: '#ef4444',

            backgroundColor:
              'rgba(239,68,68,0.2)',

            tension: 0.4,

            fill: true
          }

        ]
      },

      options: {

        responsive: true,

        plugins: {

          legend: {

            labels: {

              color: 'white'

            }

          }

        },

        scales: {

          x: {

            ticks: {

              color: '#cbd5e1'

            }

          },

          y: {

            ticks: {

              color: '#cbd5e1'

            }

          }

        }

      }

    });

  }

}