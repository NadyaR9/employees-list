import './app-info.css';

const AppInfo = (props) => {
  const { employees, employeesIncrease } = props;
  return (
    <div className="app-info">
      <h1>Учет сотрудников в компании</h1>
      <h2>Общее число сотрудников: {employees}</h2>
      <h2>Премию получат: {employeesIncrease}</h2>
    </div>
  );
};

export default AppInfo;
