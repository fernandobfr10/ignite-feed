import { useState } from 'react'
import { ThumbsUp, Trash } from 'phosphor-react'

import { Avatar } from './Avatar'

import styles from './Comment.module.css'

interface CommentProps {
  content: string
  onDeleteComment: (comment: string) => void
}

export function Comment({ content, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0)

  function handleDeleteComment() {
    onDeleteComment(content)
  }

  function handleLikeComment() {
    setLikeCount((state) => {
      return state + 1
    })
  }

  return (
    <>
      <div className={styles.comment}>
        <Avatar
          src="https://github.com/inando85.png"
          alt="Foto de Perfil do Usuário"
          hasBorder={false}
        />

        <div className={styles.commentBox}>
          <div className={styles.commentContent}>
            <header className={styles.commentHeader}>
              <div className={styles.authorAndTime}>
                <strong className={styles.name}>Fernando Junior</strong>
                <time
                  className={styles.time}
                  title="06 de Junho às 10:13:40"
                  dateTime="2022-05-06 10:13:40"
                >
                  Cerca de 1h atrás
                </time>
              </div>

              <button
                onClick={handleDeleteComment}
                title="Deletar comentário"
                className={styles.deleteButton}
              >
                <Trash size={24} />
              </button>
            </header>
            <p className={styles.commentText}>{content}</p>
          </div>
          <footer className={styles.commentFooter}>
            <button className={styles.thumbsButton} onClick={handleLikeComment}>
              <ThumbsUp />
              Aplaudir <span>{likeCount}</span>
            </button>
          </footer>
        </div>
      </div>
    </>
  )
}
