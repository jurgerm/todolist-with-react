/**
 * @author Jurgita Germanavičienė
 */
import React from "react";

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.count = 0;

    this.state = {
      items: [],
      text: ""
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.markItemCompleted = this.markItemCompleted.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }
  handleTextChange(event) {
    this.setState({
      text: event.target.value
    });
  }
  handleAddItem(event) {
    event.preventDefault();

    var newItem = {
      id: Date.now(),
      text: this.state.text,
      done: false
    };

    this.setState((prevState) => ({
      items: prevState.items.concat(newItem),
      text: ""
    }));
  }
  markItemCompleted(itemId) {
    var updatedItems = this.state.items.map(item => {
      if (itemId === item.id)
        item.done = !item.done;

      return item;
    });

    // State Updates are Merged
    this.setState({
      items: [].concat(updatedItems)
    });
  }
  handleDeleteItem(itemId) {
    var updatedItems = this.state.items.filter(item => {
      return item.id !== itemId;
    });

    this.setState({
      items: [].concat(updatedItems)
    });
  }
  render() {
    return (
      <div>
        <h3 className="apptitle">You have {this.state.items.length} Todos</h3>
        <div className="todolist-container">
            <TodoList items={this.state.items} onItemCompleted={this.markItemCompleted} onDeleteItem={this.handleDeleteItem} />
        </div>
        <form className="row">
          <div className="col-md-8">
            <input type="text" className="form-control" placeholder="Enter item" onChange={this.handleTextChange} value={this.state.text} />
          </div>
          <div className="col-md-4">
            <button className="btn btn-outline-secondary" onClick={this.handleAddItem} disabled={!this.state.text} 
              title="{'Submit #' + (this.state.items.length + 1)}"
            >Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.markCompleted = this.markCompleted.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  markCompleted(event) {
    this.props.onItemCompleted(this.props.id);
  }
  deleteItem(event) {
    this.props.onDeleteItem(this.props.id);
  }
  // Highlight newly added item for several seconds.
  componentDidMount() {
    if (this._listItem) {
      // 1. Add highlight class.
      this._listItem.classList.add("highlight");

      // 2. Set timeout.
      setTimeout((listItem) => {
        // 3. Remove highlight class.
        listItem.classList.remove("highlight");
      }, 500, this._listItem);
    }
  }
  render() {
    var itemClass = "form-check todoitem " + (this.props.completed ? "done" : "undone");
    return (
      <div className={itemClass} ref={li => this._listItem = li}>
        <label className="form-check-label">
          {/* <input type="checkbox" className="form-check-input" onChange={this.markCompleted} />  */}
          {this.props.text}
        </label>
        <button type="button" className="btn btn-secondary btn-sm float-end" onClick={this.deleteItem}>x</button>
      </div>
    );
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <div className="todolist">
        {this.props.items.map(item => (
          <TodoItem key={item.id} id={item.id} text={item.text} completed={item.done} onItemCompleted={this.props.onItemCompleted} onDeleteItem={this.props.onDeleteItem} />
        ))}
      </div>
    );
  }
}

export default TodoApp;