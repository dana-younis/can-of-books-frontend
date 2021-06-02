import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Card from 'react-bootstrap/Card';
import BookFormModal from './BookFormModal';
import Update from './Update';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showBestBooksComponent: false,
      server: process.env.REACT_APP_SERVER_URL,
      showFormModal: false,
      email: '',
      bookName: '',
      bookDescription: '',
      bookStatus: '',
      showUpdateForm: false,
      index: 0
    }
  }

  getBooks = async () => {
    const { user } = this.props.auth0;
    try {

      const paramsObj = {
        email: user.email
      }
      const books = await axios.get(`${this.state.server}/books`, { params: paramsObj });

      console.log(books);


      this.setState({        
        books: books.data[0].books,
        showBestBooksComponent: true,
        emeil: user.email
      });
    } catch (error) {
      console.log(error);
    }
   
  }




  updateBookName = (e) => this.setState({ bookName: e.target.value });
  updateBookDescription = (e) => this.setState({ bookDescription: e.target.value });
  updatebookStatus = (e) => this.setState({ bookStatus: e.target.value });

  getNewBook = async () => {
    const { user } = this.props.auth0;
    try {
      const bodyData = {
        email: user.email,
        bookName: this.state.bookName,
        bookDescription: this.state.bookDescription,
        bookStatus: this.state.bookStatus
      }
      const books = await axios.post(`${this.state.server}/books`, bodyData);
      console.log(books.data);
      this.setState({
        books: books.data
      });
      this.state.closeForm();

    } catch (error) {
      console.log(error);
    }

   }
  deleteBook = async (index) => {
    // console.log(index);
    const { user } = this.props.auth0;
    const newArrayOfBooks = this.state.books.filter((books, idx) => {
      return idx !== index;
    });

    console.log(newArrayOfBooks);
    this.setState({
      books: newArrayOfBooks
    });

    const query = {
      email: user.email
    }

    await axios.delete(`${this.state.server}/books/${index}`, { params: query });

  }
  


  update11 = (idx) => {

    const newUpdateArr = this.state.books.filter((value, index) => {
      return idx === index
    });

    console.log(newUpdateArr);
    this.setState({
      index: idx,
      bookName: newUpdateArr[0].name,
      bookDescription: newUpdateArr[0].description,
      bookStatus: newUpdateArr[0].status,
      showUpdateForm: true,
    });
  }

  updateBook = async (e) => {
    e.preventDefault();
    const reqBody = {
      bookName: this.state.bookName,
      bookDescription: this.state.bookDescription,
      bookStatus: this.state.bookStatus,
      email: this.state.email
    }
    const books = await axios.put(`${this.state.server}/books/${this.state.index}`, reqBody);

    this.setState({
      books: books.data
    });

  }

  componentDidMount = async () => {
    try {
      let serverURL = await axios.get(`${this.state.server}/books?email=${this.props.auth0.user.email}`);
      console.log(serverURL);
      console.log(serverURL.data)
      this.setState({
        books: serverURL.data,
        showBestBooksComponent: true
      });
    } catch (error) {
      console.log(error);
    }
  }
  showForm = () => {
    this.setState({
      showFormModal: true,
    });

  }

  closeForm = () => {
    this.setState({
      showFormModal: false,
    });
  }

















  render() {
    console.log(this.state.books);
    return (
      <>

        <Jumbotron> 

          <button onClick={this.showForm}>Add Books</button>
          {this.state.showFormModal &&
            <>
              <BookFormModal
                getBookName={this.updateBookName}
                getBookDescription={this.updateBookDescription}
                getBookStatus={this.updatebookStatus}
                ShowForm={this.state.showFormModal}
                closeForm={this.closeForm}
                getNewBook={this.getNewBook}

              />
            </>

            
          }
 <>
            {this.state.showUpdateForm &&
              <Update
                updateBookName = {this.updateBookName}
                updateBookDescription = {this.updateBookDescription}
                updatebookStatus = {this.updatebookStatus}
                bookName={this.state.bookName}
                bookDescription={this.state.bookDescription}
                bookStatus={this.state.bookStatus}
                updateBook = {this.updateBook}
                
              />
            }
          </>
          {this.state.showBestBooksComponent &&
            <>

              {this.state.books.map((data, index) => {
                return (
                  <>
                    <Card style={{ width: '18rem' }} key={index}>
                      <Card.Body>
                        <Card.Title>Name: {data.name}</Card.Title>
                        <Card.Text>Description: {data.description}</Card.Text>
                        <Card.Text>Status: {data.status}</Card.Text>
                        <button onClick={() => { this.deleteBook(index) }}>Delete</button>
                        <button onClick={() => {this.update11(index)}}>Update</button>    
                      </Card.Body>
                    </Card>


                  </>
                );

              })
              }
            </>
          }
       </Jumbotron> 
      </>
    )
  }
}

export default withAuth0(BestBooks);