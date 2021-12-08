import { Component } from 'react';

import './app.css';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: 'John J.', salary: 800, increase: true, rise: true, id: 1 },
        { name: 'Mark M.', salary: 1200, increase: false, rise: false, id: 2 },
        {
          name: 'Alice A.',
          salary: 15000,
          increase: false,
          rise: false,
          id: 3,
        },
      ],
      term: '',
      filter: 'all',
    };
    this.maxId = 4;
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter((item) => item.id !== id),
      };
    });
  };

  addItem = (name, salary) => {
    if (name.length > 3 && salary !== '') {
      const newEmployee = {
        name,
        salary,
        increase: false,
        rise: false,
        id: this.maxId++,
      };
      this.setState(({ data }) => {
        return {
          data: [...data, newEmployee],
        };
      });
    }
  };

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] };
        }
        return item;
      }),
    }));
  };

  searchEmployees = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.name.indexOf(term) > -1;
    });
  };

  filterEmployees = (items, filter) => {
    switch (filter) {
      case 'rise':
        return items.filter((item) => item.rise);
      case 'more-then':
        return items.filter((item) => item.salary > 1000);
      default:
        return items;
    }
  };

  onUpdateSearch = (term) => {
    this.setState({ term });
  };

  onUpdateFilter = (filter) => {
    this.setState({ filter });
  };

  getEmployeesIncrease = () => {
    return this.state.data.filter((item) => item.increase).length;
  };

  getEmployees = () => {
    return this.state.data.length;
  };
  render() {
    const { data, term, filter } = this.state;

    const visibleData = this.filterEmployees(
      this.searchEmployees(data, term),
      filter
    );
    return (
      <div className="app">
        <AppInfo
          employees={this.getEmployees()}
          employeesIncrease={this.getEmployeesIncrease()}
        />
        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter filter={filter} onUpdateFilter={this.onUpdateFilter} />
        </div>
        <EmployeesList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
        />
        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
