import ILayerDTO from "adapters/dtos/interfaces/ILayerDTO"
import LayerDTO from "adapters/dtos/LayerDTO"
import IClientHTTP from "adapters/infrastructures/interfaces/IClientHTTP"
import { API_URI } from "constants/networks"
import ITransactionRepository from "./interfaces/ITransactionRepository"
import ITxnCategoryDTO, {
  ITxnCategoryDTOParams
} from "adapters/dtos/interfaces/ITxnCategoryDTO"
import TxnCategoryDTO from "adapters/dtos/TxnCategoryDTO"
import { validateOrReject } from "class-validator"
import ITransactionDTO, {
  ITransactionDTOParams
} from "adapters/dtos/interfaces/ITransactionDTO"
import TransactionDTO from "adapters/dtos/TransactionDTO"

export default class TransactionRepository implements ITransactionRepository {
  constructor(private clientHttp: IClientHTTP) {}

  async getTransactions(): Promise<ILayerDTO<ITransactionDTO[]>> {
    try {
      const res = await this.clientHttp.get(`${API_URI}/api/transactions`)
      const { isError, message, data } = res.data

      if (isError || !data) {
        return new LayerDTO({
          isError,
          message
        })
      }

      const transactionDTOs = await Promise.all(
        data.map(async (transaction: ITransactionDTOParams) => {
          const transactionDTO = new TransactionDTO(transaction)
          await validateOrReject(transactionDTO)
          return transactionDTO
        })
      )

      return new LayerDTO({
        data: transactionDTOs
      })
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "Unknown error type"
      )
      throw error
    }
  }

  async getTxnCateogries(): Promise<ILayerDTO<ITxnCategoryDTO[]>> {
    try {
      const res = await this.clientHttp.get(`${API_URI}/api/txnCategories`)
      const { isError, message, data } = res.data

      if (isError || !data) {
        return new LayerDTO({
          isError,
          message
        })
      }

      const txnCategoryDTOs = await Promise.all(
        data.map(async (txnCategory: ITxnCategoryDTOParams) => {
          const txnCategoryDTO = new TxnCategoryDTO(txnCategory)
          await validateOrReject(txnCategoryDTO)
          return txnCategoryDTO
        })
      )

      return new LayerDTO({
        data: txnCategoryDTOs
      })
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "Unknown error type"
      )
      throw error
    }
  }
}