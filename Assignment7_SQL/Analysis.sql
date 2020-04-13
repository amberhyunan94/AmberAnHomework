--Question 1
SELECT e.emp_no, 
	e.first_name, 
	e.last_name, 
	e.gender, 
	s.salary
FROM employees AS e
JOIN salaries AS s
ON (e.emp_no = s.emp_no)

--Question 2
SELECT e.emp_no, 
	e.first_name, 
	e.last_name, 
	de.from_date
FROM employees AS e
JOIN dept_emp AS de
ON (e.emp_no = de.emp_no)
WHERE de.from_date between '1986/01/01' and '1986/12/31'

--Question 3
SELECT dept_manager.dept_no,
	departments.dept_name,
	dept_manager.emp_no,
	employees.last_name,
	employees.first_name,
	dept_emp.from_date,
	dept_emp.to_date
FROM dept_manager 
JOIN employees ON dept_manager.emp_no = employees.emp_no 
JOIN departments ON dept_manager.dept_no = departments.dept_no 
JOIN dept_emp ON dept_manager.emp_no = dept_emp.emp_no

--Question 4
SELECT de.emp_no,
	e.last_name,
	e.first_name,
	d.dept_name
FROM dept_emp de
JOIN departments d ON de.dept_no = d.dept_no
JOIN employees e ON de.emp_no = e.emp_no

--Question 5
SELECT *
FROM employees
WHERE first_name = 'Hercules' AND last_name LIKE 'B%'

--Question 6
SELECT de.emp_no,
	e.last_name,
	e.first_name,
	d.dept_name
FROM dept_emp de
JOIN departments d ON de.dept_no = d.dept_no
JOIN employees e ON de.emp_no = e.emp_no
WHERE d.dept_name = 'Sales'

--Question 7
SELECT de.emp_no,
	e.last_name,
	e.first_name,
	d.dept_name
FROM dept_emp de
JOIN departments d ON de.dept_no = d.dept_no
JOIN employees e ON de.emp_no = e.emp_no
WHERE d.dept_name IN ('Sales','Development')

--Question 8
SELECT last_name, COUNT(last_name) AS counts
FROM employees
GROUP BY last_name
ORDER BY counts DESC