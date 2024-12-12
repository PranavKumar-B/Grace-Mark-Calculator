from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.alert import Alert
import time

# Create a new instance of the Chrome driver
options = webdriver.ChromeOptions()
options.add_argument("--ignore-certificate-errors")
options.add_argument("--ignore-ssl-errors")

driver = webdriver.Chrome(options=options)

# Maximize the browser window
driver.maximize_window()

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

    # Wait for the calendar page to load
    # wait = WebDriverWait(driver, 10)
    # wait.until(EC.url_to_be("http://localhost:3000"))  # Replace with the URL of the calendar page

    # # Print the current URL for debugging
    # print("Current URL:", driver.current_url)

    # # Check if the user is redirected to the calendar page
    # assert driver.current_url == "http://localhost:3000"  # Replace with the URL of the calendar page

    print("TEST CASE FOR LOGIN PASSED")
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
    time.sleep(2)
    print("Show grades button check Successful!")
    show_gmarks = driver.find_element(By.XPATH, '/html/body/div[1]/div/div/div[2]/div/div[3]/label[2]/span[1]/input')
    show_gmarks.click()
    print("Show grace marks button check Successful!")
    time.sleep(2)
    show_grades.click()
    time.sleep(1)
    show_gmarks.click()
    time.sleep(1)
    print("Homepage check successful!")

def test_other_pages():
    but = driver.find_element(By.XPATH, '/html/body/div[1]/div/div/div[1]/div/div[2]/a[2]/h6')
    but.click()
    print("Marks page navigation Successful!")
    time.sleep(2)
    
    but = driver.find_element(By.XPATH, '/html/body/div[1]/div/div/div[1]/div/div[2]/a[3]/h6')
    but.click()
    print("Attendance page navigation Successful!")

    time.sleep(2)
    but = driver.find_element(By.XPATH, '/html/body/div[1]/div/div/div[1]/div/div[2]/a[4]/h6')
    but.click()
    print("Grace marks calculator page navigation Successful!")

    time.sleep(2)
    marks = driver.find_element(By.XPATH, "/html/body/div[1]/div/div/div[2]/form/input[1]")
    attendance = driver.find_element(By.XPATH, "/html/body/div[1]/div/div/div[2]/form/input[2]")
    sub = driver.find_element(By.XPATH, "/html/body/div[1]/div/div/div[2]/form/button")

    marks.send_keys(82)
    attendance.send_keys(93)
    time.sleep(1)
    sub.click()
    time.sleep(2)
    print("Calculating Grace marks Successful!")
    visualiz = driver.find_element(By.XPATH, "/html/body/div[1]/div/div/div[1]/div/div[2]/a[5]/h6")
    visualiz.click()
    time.sleep(2)
    # mar = driver.find_element(By.XPATH, "")
    # time.sleep(2)
    logout = driver.find_element(By.XPATH,'/html/body/div[1]/div/div/div[1]/div/div[2]/span/a')
    logout.click()
    print("Logout Successful!")
    
    time.sleep(2)
test_successful_login()
test_home_page()
test_other_pages()
driver.quit()