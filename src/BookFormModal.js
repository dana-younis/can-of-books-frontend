import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
class BookFormModal extends Component {



    render() {
        return (
            <div>
                <Modal show={this.props.ShowForm} onHide={this.props.closeForm} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <label>Book Name: </label>
                            <input type="text" onChange={(e) => { this.props.getBookName(e) }} />
                            <br />
                            <label>Book Description: </label>
                            <input type="text" onChange={(e) => { this.props.getBookDescription(e) }} />
                            <br />
                            <label>Book Status: </label>
                            <input type="text" onChange={(e) => { this.props.getBookStatus(e) }} />
                            <br />
                          
                        </form>
                    </Modal.Body>

                    <Modal.Footer> {console.log(this.props.getNewBook)}
                        <Button variant="primary" onClick={this.props.getNewBook}>
                            Add
          </Button>
                        <Button variant="secondary" onClick={this.props.closeForm}>
                            Close
          </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
export default BookFormModal;