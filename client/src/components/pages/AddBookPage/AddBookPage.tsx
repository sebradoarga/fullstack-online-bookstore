import styled from 'styled-components'
import { Link } from 'react-router-dom'

const AddBookPage = () => {
  return (
    <Container>
      <Link to="/">Go back</Link>
      <form action="">
        <Label htmlFor="title">Book Title:</Label>
        <Input type="text" id="title" name="title"></Input>
        <Label htmlFor="genres">Genres:</Label>
        <Input type="text" id="genres" name="genres"></Input>
        <Label htmlFor="description">Description:</Label>
        <Input type="textarea" id="description" name="description"></Input>
        <Label htmlFor="price">Price:</Label>
        <Input type="number" id="price" name="price"></Input>
        <Label htmlFor="image">Image:</Label>
        <Input type="text" id="image" name="image"></Input>
        <SubmitBtn type="submit" value="Add Book"></SubmitBtn>
      </form>
    </Container>
  )
}

export default AddBookPage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 8rem auto;
`
const Label = styled.label`
  font-size: 1.8rem;
`

const Input = styled.input`
  display: block;
`
const SubmitBtn = styled.input`
  margin-top: 2rem;
  padding: 0.5rem 1rem;

  &:hover {
    cursor: pointer;
  }
`
