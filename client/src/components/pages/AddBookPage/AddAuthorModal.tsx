import styled from 'styled-components'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAuthor } from '../../../redux/actions/authors'

const AddAuthorModal = ({
  showModal,
  setShowModal,
  text,
  setText,
  currentAuthorBox,
}: {
  showModal: string
  setShowModal: any
  text: any
  setText: any
  currentAuthorBox: number
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

    console.log('author data to submit', dataToSubmit)
    dispatch(createAuthor(dataToSubmit))
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
        X
      </CloseBtn>
      <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
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
        <Input
          type="text"
          id="bio"
          name="bio"
          value={authorData.bio}
          onChange={(e) =>
            setAuthorData({ ...authorData, bio: e.target.value })
          }
        ></Input>
        <SubmitBtn
          type="submit"
          value="Add Author"
          onClick={() => closeModal()}
        ></SubmitBtn>
      </form>
    </Container>
  )
}

export default AddAuthorModal

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  rigth: 0;
  bottom: 0;
  background: black;
  opacity: 0.75;
  height: 100%;
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Label = styled.label`
  font-size: 1.8rem;
`

const Input = styled.input`
  display: block;
  width: 16rem;
`
const CloseBtn = styled.button`
  color: white;
  background: transparent;
  border: none;
  font-weight: bold;
  position: relative;
  right: 8rem;
  margin-bottom: 3rem;
  font-size: 2rem;
  &:hover {
    cursor: pointer;
  }
`
const SubmitBtn = styled.input`
  margin-top: 2rem;
  padding: 0.5rem 1rem;

  &:hover {
    cursor: pointer;
  }
`
