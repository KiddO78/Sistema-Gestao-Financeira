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

import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';

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

  transactions: any[] = [];

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    this.loadStats();
    this.loadTransactions();

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

  loadTransactions() {

    this.http.get<any[]>(

      'http://localhost:8000/routes/get_transactions.php'

    ).subscribe({

      next: (data) => {

        this.transactions = data;

      }

    });

  }

  exportCSV() {

    let csvContent =

  `Title;Category;Type;Amount\n`;

    this.transactions.forEach(

      (transaction) => {

        csvContent +=

  `${transaction.title};${transaction.category};${transaction.type};${transaction.amount}\n`;

      }

    );

    const blob = new Blob(

      [csvContent],

      {

        type: 'text/csv;charset=utf-8;'

      }

    );

    const link =
    document.createElement('a');

    const url =
    URL.createObjectURL(blob);

    link.href = url;

    link.download =
    'financial-report.csv';

    link.click();

  }

  exportPDF() {

    const doc = new jsPDF();

    /* TITLE */

    doc.setFontSize(24);

    doc.text(

      'HATinFinance Financial Report',

      20,

      25

    );

    /* DATE */

    doc.setFontSize(12);

    doc.text(

      `Generated: ${new Date().toLocaleString()}`,

      20,

      35

    );

    /* SUMMARY */

    doc.setFontSize(18);

    doc.text(

      'Financial Summary',

      20,

      55

    );

    autoTable(doc, {

      startY: 65,

      head: [

        ['Description', 'Value']

      ],

      body: [

        [

          'Total Income',

          `AOA ${this.totalIncome}`

        ],

        [

          'Total Expense',

          `AOA ${this.totalExpense}`

        ],

        [

          'Balance',

          `AOA ${this.totalBalance}`

        ]

      ]

    });

    /* TRANSACTIONS */

    doc.setFontSize(18);

    doc.text(

      'Transactions',

      20,

      120

    );

    autoTable(doc, {

      startY: 130,

      head: [

        [

          'Title',

          'Category',

          'Type',

          'Amount'

        ]

      ],

      body:

        this.transactions.map(

          (transaction) => [

            transaction.title,

            transaction.category,

            transaction.type,

            transaction.amount

          ]

        )

    });

    /* SAVE */

    doc.save(

      'financial-report.pdf'

    );

  }

}