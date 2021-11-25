import styled from 'styled-components'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAuthor } from '../../../redux/actions/authors'
import CancelIcon from '@mui/icons-material/Cancel'

const AddAuthorModal = ({
  showModal,
  setShowModal,
  text,
  setText,
  currentAuthorBox,
  dbUser,
}: {
  showModal: string
  setShowModal: any
  text: any
  setText: any
  currentAuthorBox: number
  dbUser: any
}) => {
  const dispatch = useDispatch()

  const [authorData, setAuthorData] = useState({
    firstName: '',
    lastName: '',
    picture: '',
    bio: '',
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const dataToSubmit = {
      authorName: `${authorData.firstName} ${authorData.lastName}`,
      authorPicture: `${authorData.picture}`,
      authorBio: `${authorData.bio}`,
    }

    switch (currentAuthorBox) {
      case 1:
        setText({ ...text, text1: dataToSubmit.authorName })
        break
      case 2:
        setText({ ...text, text2: dataToSubmit.authorName })
        break
      case 3:
        setText({ ...text, text3: dataToSubmit.authorName })
        break

      default:
        break
    }

    dispatch(createAuthor(dataToSubmit, dbUser))
  }

  const containerLineStyle = {
    display: `${showModal}`,
  }

  const closeModal = () => {
    setShowModal('none')
    setTimeout(() => {
      setAuthorData({
        firstName: '',
        lastName: '',
        picture: '',
        bio: '',
      })
    }, 100)
  }

  return (
    <Container style={containerLineStyle}>
      <CloseBtn
        onClick={() => {
          closeModal()
        }}
      >
        <CancelIcon fontSize="large" />
      </CloseBtn>
      <PageHeader>Add a new author</PageHeader>
      <FormWrapper>
        <form
          autoComplete="off"
          onSubmit={(e) => handleSubmit(e)}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <Label htmlFor="firstName">First Name:</Label>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            value={authorData.firstName}
            onChange={(e) =>
              setAuthorData({ ...authorData, firstName: e.target.value })
            }
          ></Input>
          <Label htmlFor="lastName">Last Name:</Label>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            value={authorData.lastName}
            onChange={(e) =>
              setAuthorData({ ...authorData, lastName: e.target.value })
            }
          ></Input>
          <Label htmlFor="picture">Picture:</Label>
          <Input
            type="text"
            id="picture"
            name="picture"
            value={authorData.picture}
            onChange={(e) =>
              setAuthorData({ ...authorData, picture: e.target.value })
            }
          ></Input>
          <Label htmlFor="bio">Biography:</Label>
          <Textarea
            id="bio"
            name="bio"
            value={authorData.bio}
            onChange={(e) =>
              setAuthorData({ ...authorData, bio: e.target.value })
            }
          ></Textarea>
          <SubmitBtn
            type="submit"
            value="Add Author"
            onClick={() => closeModal()}
          ></SubmitBtn>
        </form>
      </FormWrapper>
    </Container>
  )
}

export default AddAuthorModal

const Container = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background: black;
  width: 80%;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  margin-top: 13rem;
`
const PageHeader = styled.h1`
  margin-top: 6rem;
  text-align: center;
  font-size: 2.5rem;
  text-transform: capitalize;
`

const FormWrapper = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
`

const Label = styled.label`
  font-size: 1.8rem;
  margin-top: 1.4rem;
  display: block;
`

const Input = styled.input`
  display: block;
  width: 36rem;
  height: 3rem;
  margin-top: 0.5rem;
  font-size: 2rem;
  padding-left: 0.6rem;
`

const Textarea = styled.textarea`
  width: 36rem;
  height: 3rem;
  margin-top: 0.5rem;
  padding: 0.6rem;
  height: 15rem;
  font-size: 1.2rem;
  resize: none;

  ::-webkit-scrollbar {
    width: 1rem;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #130912;
    border-radius: 10px;
  }
`

const CloseBtn = styled.button`
  color: white;
  background: transparent;
  border: none;
  font-weight: bold;
  position: absolute;
  left: 5rem;
  top: 3rem;
  font-size: 2rem;
  &:hover {
    cursor: pointer;
  }
`
const SubmitBtn = styled.input`
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  color: white;
  background: none;
  border: none;
  align-self: center;
  font-size: 1.7rem;

  &:hover {
    cursor: pointer;
  }
`
