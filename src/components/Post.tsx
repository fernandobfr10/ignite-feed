import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'

interface Author {
  name: string
  role: string
  avatarUrl: string
}

interface Content {
  type: 'paragraph' | 'link'
  content: string
}

interface PostProps {
  author: Author
  publishedAt: Date
  content: Content[]
}

export function Post({ author, publishedAt, content }: PostProps) {
  const [comments, setComments] = useState(['Post muito bacana hein!'])
  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormated = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    { locale: ptBR }
  )

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  const isNewCommentEmpty = newCommentText.length === 0

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()
    setComments([...comments, newCommentText])
    setNewCommentText('')
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Este campo é obrigatório!')
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter(
      (comment) => comment !== commentToDelete
    )
    setComments(commentsWithoutDeletedOne)
  }

  return (
    <>
      <article className={styles.post}>
        <header className={styles.postHeader}>
          <div className={styles.author}>
            <Avatar src={author.avatarUrl} alt="Foto de Perfil do Usuário" />

            <div className={styles.authorInfo}>
              <strong className={styles.name}>{author.name}</strong>
              <span className={styles.role}>{author.role}</span>
            </div>
          </div>

          <time
            title={publishedDateFormated}
            dateTime={publishedAt.toISOString()}
          >
            {publishedDateRelativeToNow}
          </time>
        </header>

        <div className={styles.postContent}>
          {content.map((line) => {
            if (line.type === 'paragraph') {
              return <p key={line.content}>{line.content}</p>
            }
            return (
              <p key={line.content}>
                <a href="#">{line.content}</a>
              </p>
            )
          })}
        </div>

        <form className={styles.commentForm} onSubmit={handleCreateNewComment}>
          <strong className={styles.commentTitle}>Deixe seu Feedback</strong>
          <textarea
            className={styles.commentText}
            placeholder="Deixe um comentário"
            value={newCommentText}
            onChange={handleNewCommentChange}
            onInvalid={handleNewCommentInvalid}
            required
          />
          <footer className={styles.commentFooter}>
            <button
              className={styles.commentButton}
              type="submit"
              disabled={isNewCommentEmpty}
            >
              Publicar
            </button>
          </footer>
        </form>

        <div className={styles.commentList}>
          {comments.map((comment) => {
            return (
              <Comment
                key={comment}
                content={comment}
                onDeleteComment={deleteComment}
              />
            )
          })}
        </div>
      </article>
    </>
  )
}
