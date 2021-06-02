import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Update extends Component {

    render() {
        return (
            <div>
              <br />
              
              <h3>information</h3>

              <br />
              <br />

              <Form style={{ width: '20rem' }}>
                <Form.Group>
                  <Form.Label>Book Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Book Name" 
                  onChange={(e) => {this.props.updateBookName(e)}} value={this.props.bookName}
                  />
                </Form.Group>
                
                <Form.Group>
                  <Form.Label>Book Status</Form.Label>
                  <Form.Control type="text" placeholder="Password" 
                  onChange={(e) => {this.props.updatebookStatus(e)}} value={this.props.bookStatus}
                  />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Book Description</Form.Label>
                  <Form.Control as="textarea" rows={3} 
                   onChange={(e) => {this.props.updateBookDescription(e)}} value={this.props.bookDescription}
                  />
                </Form.Group>
                <Button onClick={this.props.updateBook}>Submit Update</Button>
              </Form>
             
                <br />
                <br />

            </div>
        )
    }
}

export default Update;