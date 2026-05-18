import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { SidebarComponent }
from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-transactions',

  standalone: true,

  imports: [
    CommonModule,
    SidebarComponent
  ],

  templateUrl: './transactions.html',

  styleUrl: './transactions.css'
})

export class TransactionsComponent {

  showModal = false;

  transactions = [

    {
      title: 'Salary',
      category: 'Income',
      type: 'Income',
      amount: 320000
    },

    {
      title: 'Internet',
      category: 'Bills',
      type: 'Expense',
      amount: 15000
    },

    {
      title: 'Food',
      category: 'Shopping',
      type: 'Expense',
      amount: 40000
    }

  ];

}