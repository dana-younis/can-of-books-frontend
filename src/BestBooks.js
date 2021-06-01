import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
import Card from 'react-bootstrap/Card';
import bookForm from './bookForm.js';



class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showBestBooksComponent: false,
      server: process.env.REACT_APP_SERVER_URL,
      showFormPage: false,
      email: '',
      bookName: '',
      bookDescription: '',
      bookStatus: ''
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
      // console.log(typeof books.data[0].books);



      this.setState({        
        books: books.data,
        showBestBooksComponent: true,
        emeil: user.email

      });
      console.log('hi',this.state.books);
    } catch (error) {
      console.log(error);
    }
   
  }

  updateBookName = (e) => this.setState({ bookName: e.target.value });
  updateBookDescription = (e) => this.setState({ bookDescription: e.target.value });
  updatebookStatus = (e) => this.setState({ bookStatus: e.target.value });

  getNewBook = async (e) => {
    const { user } = this.props.auth0;
    e.preventDefault();
    try {

      const bodyData  = {
        email: user.email,
        bookName: this.state.bookName,
        bookDescription: this.state.bookName,
        bookStatus: this.state.bookStatus

      }
      const books = await axios.post(`${this.state.server}/books`, bodyData );
      console.log(books);
      this.setState ({
        books: books.data
      });
console.log(this.state.books);
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


  componentDidMount() {
    this.setState({
      showBestBooksComponent: true,
    });

    this.getBooks();
    console.log(this.getBooks);
  }

 
  showForm = () => {
    this.setState({
      showFormPage: true,
    });
   
  }

  closeForm = () => {
    this.setState({
      showFormPage: false,
    });
  }
  

  render() {
    console.log(this.state.books);
    return (
      <>

        <Jumbotron>
         
            <button onClick={this.showForm}>Add Books</button>
            {this.state.showFormPage &&
            <>
            <bookForm
              getBookName= {this.updateBookName}
              getBookDescription= {this.updateBookDescription}
              getBookStatus= {this.updatebookStatus}       
              ShowForm = {this.state.showFormPage}
              closeForm = {this.closeForm}
              getNewBook = {this.getNewBook}

            />
            </>
            }
          
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
                        <button onClick={() => {this.deleteBook(index)}}>Delete</button>                         
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

export default withAuth0(MyFavoriteBooks);