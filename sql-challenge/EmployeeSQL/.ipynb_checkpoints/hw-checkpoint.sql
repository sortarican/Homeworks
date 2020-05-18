-- employee salary details
SELECT "Employees".emp_no, "Employees".last_name, "Employees".first_name, "Employees".sex, "Salaries".salary 
FROM "Employees"
INNER JOIN "Salaries" ON "Employees".emp_no = "Salaries".emp_no

--employees hired in '86
SELECT first_name, last_name, hire_date FROM "Employees"
WHERE hire_date >= '19860101' AND
	hire_date < '19870101'

-- manager details
SELECT "Departments".dept_no, "Departments".dept_name, "Dept_manager".emp_no, "Employees".first_name, "Employees".last_name   
FROM "Departments"
INNER JOIN "Dept_manager" ON "Departments".dept_no = "Dept_manager".dept_no
INNER JOIN "Employees" ON "Dept_manager".emp_no = "Employees".emp_no

--emp dept details
SELECT "Employees".emp_no, "Employees".last_name, "Employees".first_name, "Departments".dept_name 
FROM "Employees"
INNER JOIN "Dept_emp" ON "Employees".emp_no = "Dept_emp".emp_no
INNER JOIN "Departments" ON "Dept_emp".dept_no = "Departments".dept_no

--Hercules
SELECT first_name, last_name, sex FROM "Employees"
WHERE first_name = 'Hercules' AND
	last_name LIKE 'B%'
	
--sales employees
SELECT "Employees".emp_no, "Employees".last_name, "Employees".first_name, "Departments".dept_name 
FROM "Employees"
INNER JOIN "Dept_emp" ON "Employees".emp_no = "Dept_emp".emp_no
INNER JOIN "Departments" ON "Dept_emp".dept_no = "Departments".dept_no
WHERE dept_name = 'Sales'

--sales and development employees
SELECT "Employees".emp_no, "Employees".last_name, "Employees".first_name, "Departments".dept_name 
FROM "Employees"
INNER JOIN "Dept_emp" ON "Employees".emp_no = "Dept_emp".emp_no
INNER JOIN "Departments" ON "Dept_emp".dept_no = "Departments".dept_no
WHERE dept_name = 'Sales' OR
	dept_name = 'Development'
	
--last name frequencies
SELECT last_name, COUNT(*) FROM "Employees"
GROUP BY last_name
ORDER BY COUNT(*) DESC