import { Component } from '@angular/core';

import { CommonModule }
from '@angular/common';

import { FormsModule }
from '@angular/forms';

import { SidebarComponent }
from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-transactions',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent
  ],

  templateUrl: './transactions.html',

  styleUrl: './transactions.css'
})

export class TransactionsComponent {

  showModal = false;

  transactions: any[] = [];

  title = '';
  category = '';
  amount = 0;
  type = 'Income';

  testModal() {

    console.log('BUTTON CLICKED');

    this.showModal = true;

  }

  addTransaction() {

    const newTransaction = {

      title: this.title,
      category: this.category,
      amount: this.amount,
      type: this.type

    };

    this.transactions.push(newTransaction);

    this.showModal = false;

    this.clearForm();

  }

  clearForm() {

    this.title = '';
    this.category = '';
    this.amount = 0;
    this.type = 'Income';

  }

  testButton() {

    alert('BUTTON WORKING');

  }

}