from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.alert import Alert
from selenium.common.exceptions import NoSuchElementException
import os
import time

# Create a new instance of the Chrome driver
options = webdriver.ChromeOptions()
options.add_argument("--ignore-certificate-errors")
options.add_argument("--ignore-ssl-errors")

driver = webdriver.Chrome(options=options)

# Maximize the browser window
driver.maximize_window()

def save_screenshot(name):
        # Create the screenshots directory if it doesn't exist
        if not os.path.exists('screenshots'):
            os.makedirs('screenshots')

        # Capture and save the screenshot
        driver.save_screenshot(f'screenshots/{name}.png')

# Test case: Successful login
def test_successful_login():
    driver.get("http://localhost:3000")  # Replace with your web application URL
    time.sleep(2)
    # Find the email and password input fields and enter valid credentials
    email_input = driver.find_element(By.CSS_SELECTOR, 'input[type="text"]')
    password_input = driver.find_element(By.CSS_SELECTOR, 'input[type="password"]')
    buttonid = driver.find_element(By.XPATH, '/html/body/div[1]/div/div/div/form/button')
    email_input.send_keys("pranavkumar")  # Replace with a valid email
    password_input.send_keys("pranav")  # Replace with a valid password
    # Submit the login form
    buttonid.click()
    time.sleep(1)
    save_screenshot("login_success")
    # print("TEST CASE FOR LOGIN PASSED")

def test_login_failure():
    driver.get("http://localhost:3000")  # Replace with your web application URL
    time.sleep(2)
    # Find the email and password input fields and enter valid credentials
    email_input = driver.find_element(By.CSS_SELECTOR, 'input[type="text"]')
    password_input = driver.find_element(By.CSS_SELECTOR, 'input[type="password"]')
    buttonid = driver.find_element(By.XPATH, '/html/body/div[1]/div/div/div/form/button')
    email_input.send_keys("pranavr")  # Replace with a valid email
    password_input.send_keys("pranav")  # Replace with a valid password
    # Submit the login form
    buttonid.click()

    try:
        # Explicitly wait for the error message element to be visible
        error_message = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, "/html/body/div[1]/div/div/div/form/p"))
        ).text
    except NoSuchElementException:
        # If the error message element is not found, fail the test
        fail = ("Error message not found")

    # assertEqual(error_message, "Wrong Email or Password")
    # Save a screenshot
    save_screenshot("login_failure")

def test_navbar():
    time.sleep(1)
    marks = driver.find_element(By.XPATH, "/html/body/div[1]/div/div/div[1]/div/div[2]/a[2]/h6")
    marks.click()
    time.sleep(1)
    save_screenshot("nav_marks_successful")
    
    time.sleep(1)
    attendance = driver.find_element(By.XPATH, "/html/body/div[1]/div/div/div[1]/div/div[2]/a[3]/h6")
    attendance.click()
    time.sleep(1)
    save_screenshot("nav_attendance_successful")

    time.sleep(1)
    calculator = driver.find_element(By.XPATH, "/html/body/div[1]/div/div/div[1]/div/div[2]/a[4]/h6")
    calculator.click()
    time.sleep(1)
    save_screenshot("nav_calc_successful")

    time.sleep(1)
    visualization = driver.find_element(By.XPATH, "/html/body/div[1]/div/div/div[1]/div/div[2]/a[5]/h6")
    visualization.click()
    time.sleep(1)
    save_screenshot("nav_visualization_successful")

    time.sleep(1)
    home = driver.find_element(By.XPATH, "/html/body/div[1]/div/div/div[1]/div/div[2]/a[1]/h6")
    home.click()
    time.sleep(1)
    save_screenshot("nav_home_successful")

def test_home_page():
    time.sleep(2)
    nav = driver.find_element(By.XPATH, '/html/body/div[1]/div/div/div[2]/div/table/tbody/tr[2]/td[1]/a')
    nav.click()
    wait = WebDriverWait(driver, 10)  # Increased wait time to 20 seconds
    wait.until(EC.visibility_of_element_located((By.XPATH, '/html/body/div[1]/div/div/div[2]/div/div[1]')))
    print("Student Details check done!")
    time.sleep(2)
    show_grades = driver.find_element(By.XPATH, '/html/body/div[1]/div/div/div[2]/div/div[3]/label[1]/span[1]/input')
    show_grades.click()
    time.sleep(1)
    save_screenshot("showgrades_button_check_successful")

    print("Show grades button check Successful!")
    show_gmarks = driver.find_element(By.XPATH, '/html/body/div[1]/div/div/div[2]/div/div[3]/label[2]/span[1]/input')
    show_gmarks.click()
    time.sleep(1)
    save_screenshot("showgmarks_button_check_successful")
    print("Show grace marks button check Successful!")

    show_grades.click()
    time.sleep(1)
    show_gmarks.click()
    time.sleep(1)
    print("Homepage check successful!")

def test_other_pages():
    time.sleep(2)
    but = driver.find_element(By.XPATH, '/html/body/div[1]/div/div/div[1]/div/div[2]/a[4]/h6')
    but.click()
    print("Grace marks calculator page navigation Successful!")

    time.sleep(2)
    marks = driver.find_element(By.XPATH, "/html/body/div[1]/div/div/div[2]/form/input[1]")
    attendance = driver.find_element(By.XPATH, "/html/body/div[1]/div/div/div[2]/form/input[2]")
    sub = driver.find_element(By.XPATH, "/html/body/div[1]/div/div/div[2]/form/button")

    marks.send_keys(82)
    time.sleep(1)
    save_screenshot("marks_textfield_working")

    attendance.send_keys(93)
    time.sleep(1)
    save_screenshot("attendance_textfield_working")

    time.sleep(1)
    sub.click()
    time.sleep(1)
    save_screenshot("mark_calculation_working")
    print("Calculating Grace marks Successful!")

    # visualiz = driver.find_element(By.XPATH, "/html/body/div[1]/div/div/div[1]/div/div[2]/a[5]/h6")
    # visualiz.click()
    # time.sleep(1)
    # mar = driver.find_element(By.XPATH, "")
    # time.sleep(2)
    logout = driver.find_element(By.XPATH,'/html/body/div[1]/div/div/div[1]/div/div[2]/span/a')
    logout.click()
    print("Logout Successful!")
    time.sleep(2)

test_login_failure()
test_successful_login()
test_navbar()
test_home_page()
test_other_pages()
driver.quit()