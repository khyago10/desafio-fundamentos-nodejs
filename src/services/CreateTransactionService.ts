import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Request): Transaction {
    // TODO

    const total = this.transactionsRepository.getBalance().total;
    if(type === "outcome" && total < value) {
      throw new Error("Nao se pode criar uma transação se você não tem limite disponível");
    }


    const transaction = this.transactionsRepository.create({title, value, type});


    return transaction;
  }
}

export default CreateTransactionService;
