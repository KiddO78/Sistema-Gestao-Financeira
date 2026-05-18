import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TransactionService {

  apiUrl =
    'http://localhost:8000/routes';

  constructor(
    private http: HttpClient
  ) {}

  addTransaction(data: any) {

    return this.http.post(
      `${this.apiUrl}/add_transaction.php`,
      data
    );

  }

  getTransactions() {

    return this.http.get(
      `${this.apiUrl}/get_transactions.php`
    );

  }

}