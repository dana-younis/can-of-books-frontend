import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
import Card from 'react-bootstrap/Card';






class MyFavoriteBooks extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        books: [],
        show: false,
        server: process.env.REACT_APP_SERVER_URL
      }
    }
  
    componentDidMount() {
      this.setState({
        show: true,
      });
  
      this.getBooks();
      console.log(this.getBooks);
    }
  
    getBooks = async () => {
      const { user } = this.props.auth0;
      try {
  
        const obj = {
          email: user.email
      
        }
        const books = await axios.get(`${this.state.server}/books`, { params: obj });
        console.log(books);
        this.setState({
          books:books.data,
          show: true
        });
      } catch (error) {
        console.log(error);
      }
    }
  
    render() {
      console.log(this.state.books);
      return (
        <>
  
  
  
            {this.state.show &&
           
              <>
                {this.state.books.map((data, index) => {
                  return (
                    <>
                      <Card style={{ width: '18rem' }} key={index}>
                        <Card.Body>
                          <Card.Title>Name: {data.name}</Card.Title>
                          <Card.Text>Description: {data.description}</Card.Text>
                          <Card.Text>Status: {data.status}</Card.Text>                         
                        </Card.Body>
                      </Card>
                    
                    </>
                  );
  
                })
                }
              </>
            }
  
  
          
        </>
  
  
  
      )
    }
  }
  
  export default withAuth0(MyFavoriteBooks);