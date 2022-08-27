import ITransaction from "../../../core/interfaces/ITransaction";
import sequelizeConnection from "../sequelize.connection";
import TTransaction from "sequelize/types/transaction";

export default class Transaction implements ITransaction {
  private t: TTransaction | null = null;
  async initialize(): Promise<TTransaction> {
    const t = await sequelizeConnection.transaction();
    this.t = t;
    return t;
  }
  getTransactionInstance(): TTransaction {
    if (this.t === null) {
      throw new Error('Transaction must be initialized');
    }
    return this.t;
  }
  async commit(): Promise<void> {
    const t = this.getTransactionInstance();
    await t.commit();
  }
  async rollback(): Promise<void> {
    const t = this.getTransactionInstance();
    await t.rollback();
  }
}
