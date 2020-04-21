import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionRepository = await getCustomRepository(
      TransactionsRepository,
    );

    const checkTrasitionExist = await transactionRepository.findOne(id);

    if (!checkTrasitionExist) {
      throw new AppError('Transaction not found');
    }

    await transactionRepository.remove(checkTrasitionExist);
  }
}

export default DeleteTransactionService;
