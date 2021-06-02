import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
// import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel'





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
        books: books.data,
        show: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <>
        {this.state.show &&
          <>
            <Carousel style={{ width: '20rem' }} >
              {this.state.books.map((data, idx) => {
                return (
                  <Carousel.Item interval={1000} key={idx}>
                    <img
                      className="d-block w-100"
                      src="https://i.pinimg.com/originals/d4/32/89/d43289c071866276d5f3148a77a9de7c.jpg"
                      alt="Second slide"
                      height= '80%'
                    />
                    <Carousel.Caption>
                      <h1>Name: {data.name} </h1>
                      {console.log(data.name)}
                      <p>Description: {data.description}</p>
                      {console.log(data.description)}
                      <p>Status: {data.status} </p>
                      {console.log(data.status)}
                    </Carousel.Caption>
                  </Carousel.Item>
                )
              })
              }
            </Carousel>
          </>
        }
      </>
    )
  }
}
export default withAuth0(MyFavoriteBooks);