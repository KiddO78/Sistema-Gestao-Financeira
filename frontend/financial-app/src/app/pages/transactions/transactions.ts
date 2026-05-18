import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

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

export class TransactionsComponent implements OnInit {

  showModal = false;

  transactions: any[] = [];

  title = '';
  category = '';
  amount = 0;
  type = 'Income';
  editingId: number | null = null;

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit() {

    this.loadTransactions();

  }

  testModal() {

    this.showModal = true;

  }

  addTransaction() {

    if(this.editingId) {

      this.updateTransaction();

      return;

    }

    const transaction = {

      title: this.title,

      amount: this.amount,

      type: this.type,

      category: this.category

    };

    this.http.post(

      'http://localhost:8000/routes/add_transaction.php',

      transaction

    ).subscribe({

      next: () => {

        this.loadTransactions();

        this.clearForm();

        this.showModal = false;

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  loadTransactions() {

    this.http.get<any[]>(
      'http://localhost:8000/routes/get_transactions.php'
    ).subscribe({

      next: (data) => {

        console.log(data);

        this.transactions = [...data];

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  clearForm() {

    this.title = '';

    this.category = '';

    this.amount = 0;

    this.type = 'Income';

  }

  deleteTransaction(id: number) {

    this.http.post(

      'http://localhost:8000/routes/delete_transaction.php',

      { id }

    ).subscribe({

      next: () => {

        this.loadTransactions();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  editTransaction(transaction: any) {

    this.editingId = transaction.id;

    this.title = transaction.title;

    this.category = transaction.category;

    this.amount = transaction.amount;

    this.type = transaction.type;

    this.showModal = true;

  }

  updateTransaction() {

    const transaction = {

      id: this.editingId,

      title: this.title,

      category: this.category,

      amount: this.amount,

      type: this.type

    };

    this.http.post(

      'http://localhost:8000/routes/update_transaction.php',

      transaction

    ).subscribe({

      next: () => {

        this.loadTransactions();

        this.showModal = false;

        this.clearForm();

        this.editingId = null;

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

}