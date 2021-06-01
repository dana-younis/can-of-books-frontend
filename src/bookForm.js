import React, { Component } from 'react';

class bookForm extends Component {

    render() {
        return (
            <div>
                <form>
                    <label>Book Name: </label>
                    <input type="text" onChange={(e) => {this.props.getBookName(e)}}/>
                    <br />
                    <label>Book Description: </label>
                    <input type="text" onChange={(e) => {this.props.getBookDescription(e)}}/>
                    <br />
                    <label>Book Status: </label>
                    <input type="text" onChange={(e) => {this.props.getBookStatus(e)}}/>
                    <br />
                    <button onClick={this.props.getNewBook}>Add</button>
                    <button onClick={this.props.closeForm}>Close Form</button>
                </form>
            </div>
        )
    }
}

export default bookForm