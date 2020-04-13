DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS dept_emp;
DROP TABLE IF EXISTS dept_manager;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS salaries;
DROP TABLE IF EXISTS titles;

CREATE TABLE departments(
  dept_no character varying(45) NOT NULL,
  dept_name character varying(45) NOT NULL
);

CREATE TABLE dept_emp (
  emp_no character varying(45) NOT NULL,
  dept_no character varying(45) NOT NULL,	
  from_date DATE NOT NULL,
  to_date DATE NOT NULL
);

CREATE TABLE dept_manager (
  dept_no character varying(45) NOT NULL,
  emp_no character varying(45) NOT NULL,
  from_date DATE NOT NULL,
  to_date DATE NOT NULL
);

CREATE TABLE employees (
  emp_no character varying(45) NOT NULL,
  birth_date DATE NOT NULL,
  first_name character varying(45) NOT NULL,	
  last_name character varying(45) NOT NULL,	
  gender character varying(45) NOT NULL,	
  hire_date DATE NOT NULL
);

CREATE TABLE salaries (
  emp_no character varying(45) NOT NULL,
  salary integer NOT NULL,
  from_date DATE NULL,
  to_date DATE NOT NULL
);

CREATE TABLE titles (
  emp_no character varying(45) NOT NULL,
  title character varying(45) NOT NULL,
  from_date DATE NOT NULL,
  to_date DATE NOT NULL
);

----importing CSV files easily.

Copy departments
From '/Users/amberan/repos/CU-NYC-DATA-PT-02-2020-U-C/09-SQL/homework/assignment/data/departments.csv'
With
(	Format CSV,
	Delimiter ',',
	Header True
);

Copy dept_emp
From '/Users/amberan/repos/CU-NYC-DATA-PT-02-2020-U-C/09-SQL/homework/assignment/data/dept_emp.csv'
With
(	Format CSV,
	Delimiter ',',
	Header True
);

Copy dept_manager
From '/Users/amberan/repos/CU-NYC-DATA-PT-02-2020-U-C/09-SQL/homework/assignment/data/dept_manager.csv'
With
(	Format CSV,
	Delimiter ',',
	Header True
);

Copy employees
From '/Users/amberan/repos/CU-NYC-DATA-PT-02-2020-U-C/09-SQL/homework/assignment/data/employees.csv'
With
(	Format CSV,
	Delimiter ',',
	Header True
);

Copy salaries
From '/Users/amberan/repos/CU-NYC-DATA-PT-02-2020-U-C/09-SQL/homework/assignment/data/salaries.csv'
With
(	Format CSV,
	Delimiter ',',
	Header True
);

Copy titles
From '/Users/amberan/repos/CU-NYC-DATA-PT-02-2020-U-C/09-SQL/homework/assignment/data/titles.csv'
With
(	Format CSV,
	Delimiter ',',
	Header True
);


----checking if importing & creating tables finished succesfully.
Select *
from employees