import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { deleteBook, updateAuthor } from '../../../api'
import { getBooks } from '../../../redux/actions/books'
import { Author, User } from '../../../types'

const DeleteBookPopup = ({
  modalOpen,
  setModalOpen,
  bookTitle,
  bookId,
  authors,
  dbUser,
}: {
  modalOpen: boolean
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  bookTitle: string
  bookId: string
  authors: Author[]
  dbUser: User
}) => {
  const dispatch = useDispatch()

  const showModal = {
    display: 'flex',
  }

  const closeModal = () => {
    modalOpen === true && setModalOpen(false)
  }

  const deleteThisBook = async () => {
    closeModal()

    authors.map((author) => {
      const newBooks = author.authorBooks.filter(
        (thisBookId) => thisBookId !== bookId
      )
      const newAuthor = { ...author, authorBooks: newBooks }
      updateAuthor(author._id, newAuthor)
    })
    console.log('this is the user Im passing', dbUser)
    await deleteBook(bookId, dbUser)
    dispatch(getBooks())
  }

  let authorNames: string[] = []
  authors.map((author) => authorNames.push(author.authorName))

  return (
    <Modal style={modalOpen ? showModal : {}}>
      <CloseBtn onClick={closeModal}>X</CloseBtn>
      <Text>
        This will permanently delete <Title>{bookTitle}</Title> by{' '}
        <AuthorName>
          {authorNames.length === 1
            ? authorNames[0]
            : authorNames.length === 2
            ? `${authorNames[0]} and ${authorNames[1]}`
            : `${authorNames[0]}, ${authorNames[1]}, and ${authorNames[2]}`}
        </AuthorName>
        . Are you sure you wish to proceed?
      </Text>
      <Buttons>
        <CancelBtn onClick={closeModal}>
          No, I'd like to keep the book
        </CancelBtn>
        <ConfirmBtn onClick={deleteThisBook}>
          Yes, I want to delete this book
        </ConfirmBtn>
      </Buttons>
    </Modal>
  )
}

export default DeleteBookPopup

const Modal = styled.div`
  position: absolute;
  height: 40%;
  width: 50%;
  background: #000000f0;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  display: none;
`
const CloseBtn = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  position: absolute;
  top: 2rem;
  right: 3rem;
`

const Text = styled.p`
  color: white;
  font-size: 2rem;
  margin: 0 2rem;
  font-weight: bold;
  text-align: center;
  margin-top: 2rem;
  width: 80%;
  line-height: 3rem;
`
const Title = styled.span`
  color: #ec8d2c;
`

const AuthorName = styled.span`
  color: #ec8d2c;
`

const Buttons = styled.div`
  margin-top: 4rem;
  display: flex;
  align-items: center;

  & button {
    margin: 0.7rem;
    padding: 1rem;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    font-weight: bold;
  }
`
const CancelBtn = styled.button`
  background: white;
`

const ConfirmBtn = styled.button`
  background: red;
  color: white;
`
