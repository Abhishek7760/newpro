import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [], 
      newItem: '', 
    };
  }

  componentDidMount() {
    
    fetch('/api/items')
      .then((response) => response.json())
      .then((data) => this.setState({ items: data }));
  }

  handleAddItem = () => {
    const { newItem } = this.state;

 
    fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newItem }),
    })
      .then((response) => response.json())
      .then((data) => {
        
        this.setState((prevState) => ({
          items: [...prevState.items, data],
          newItem: '',
        }));
      });
  }

  handleDeleteItem = (itemId) => {
    // Make a DELETE request to remove an item
    fetch(`/api/items/${itemId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 200) {
          // Item deleted successfully, update the state
          this.setState((prevState) => ({
            items: prevState.items.filter((item) => item._id !== itemId),
          }));
        }
      });
  }

  render() {
    const { items, newItem } = this.state;

    return (
      <div>
        <h1>Items</h1>
        <ul>
          {items.map((item) => (
            <li key={item._id}>
              {item.name}
              <button onClick={() => this.handleDeleteItem(item._id)}>Delete</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newItem}
          onChange={(e) => this.setState({ newItem: e.target.value })}
        />
        <button onClick={this.handleAddItem}>Add Item</button>
      </div>
    );
  }
}

export default App;
