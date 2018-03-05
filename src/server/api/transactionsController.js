const express = require('express');
const router = express.Router();

const session = require('../session');
const config = require('../config');

const { transactions, users } = require('../lib');
const Controller = require('./Controller');

class TransactionsController extends Controller {
  async createTransaction(req, res) {
    const { xdr } = req.body;
    const ipAddress = req.ip;
    const transaction = new transactions.Transaction({ xdr, ipAddress });
    const newTransaction = await transactions.transactionService.createTransaction(
      transaction
    );

    return res.json(newTransaction);
  }

  async getTransaction(req, res, next) {
    const { id } = req.params;
    const transaction = await transactions.transactionService.getTransaction(
      id
    );

    if (!transaction || transaction.userId !== req.user.id) {
      return res.status(404).json({
        error: 'Transaction not found or you are not authorized to view it.'
      });
    }

    return res.json(transaction);
  }

  async authorizeTransaction(req, res, next) {
    const { id } = req.params;
    const { code } = req.body;
    const transaction = await transactions.transactionService.getTransaction(
      id
    );

    const result = await transactions.transactionService.authorizeTransaction({
      transaction,
      user: req.user,
      code
    });

    res.json(result);
  }

  async denyTransaction(req, res) {
    const { id } = req.params;
    const transaction = await transactions.transactionService.getTransaction(
      id
    );

    const result = await transactions.transactionService.denyTransaction({
      user: req.user,
      transaction
    });

    res.json(result);
  }
}

const controller = new TransactionsController();
// open route, no csrf or login required
router.post('/', controller.createTransaction);

// logged in routes
router.use(session.csrf);
router.use(session.ensureLoggedIn());
router.get('/:id', controller.getTransaction);

// scenarios to test
// public key matches to no accounts
// current user does not have any accounts with source public key
router.post('/:id/authorize', controller.authorizeTransaction);
router.post('/:id/deny', controller.denyTransaction);

module.exports = router;
