import { useState } from "react"
import { css } from "styled-system/css"
import { GET_ALL_POSTS } from "constants/queries"
import useDependencies from "hooks/useDependencies"
import ErrorContainer from "containers/ErrorContainer"
import MutationContainer from "containers/MutationContainer"
import Button from "components/commons/Button"
import Input from "components/commons/Input"
import Title from "components/commons/Title"

export default function CreatePostSection() {
  const { presenters } = useDependencies()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  return (
    <section>
      <Title text="Create Posts" />
      <div>
        <Input
          label="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          label="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div
        className={css({
          margin: "10px 0"
        })}
      >
        <ErrorContainer>
          <MutationContainer
            mutationFn={() => {
              return presenters.post.createPost({ title, content })
            }}
            loadingComponent={<div>Loading...</div>}
            invalidateQueryKeys={[[GET_ALL_POSTS]]}
          >
            <Button text="Create" />
          </MutationContainer>
        </ErrorContainer>
      </div>
    </section>
  )
}
