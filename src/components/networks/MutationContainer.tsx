import { cloneElement } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import ILayerDTO from "adapters/dtos/interfaces/ILayerDTO"

export default function MutationContainer<TData, TVariables>({
  children,
  mutationFn,
  loadingComponent = <></>,
  errorComponent = <></>,
  invalidateQueryKeys = []
}: {
  children: JSX.Element
  mutationFn: (variables: TVariables) => Promise<ILayerDTO<TData>>
  loadingComponent?: JSX.Element
  errorComponent?: JSX.Element
  invalidateQueryKeys?: string[]
}) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (params: TVariables) => mutationFn(params),
    onSuccess: () => {
      if (invalidateQueryKeys.length > 0) {
        queryClient.invalidateQueries({ queryKey: invalidateQueryKeys })
      }
    }
  })

  const action = (requestParams: TVariables) => {
    mutation.mutate(requestParams)
  }

  const response =
    mutation.data?.isError === false ? mutation.data.data : undefined

  return (
    <>
      {cloneElement(children, { response: response, action })}
      {mutation.status === "pending" && loadingComponent}
      {mutation.status === "error" && errorComponent}
    </>
  )
}