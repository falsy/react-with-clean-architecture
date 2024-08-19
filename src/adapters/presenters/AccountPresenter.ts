import ILayerDTO from "adapters/dtos/interfaces/ILayerDTO"
import IAccountPresenter from "./interfaces/IAccountPresenter"
import IAccountUseCase from "adapters/domains/useCases/interfaces/IAccountUseCase"
import IAccount from "adapters/domains/entities/interfaces/IAccount"

export default class AccountPresenter implements IAccountPresenter {
  constructor(private accountUseCase: IAccountUseCase) {}

  getAccounts(): Promise<ILayerDTO<IAccount[]>> {
    return this.accountUseCase.getAccounts()
  }
}