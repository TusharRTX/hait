from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()

try:
    driver.get("http://localhost:8100/registro")
    time.sleep(5)  

    username_field = driver.find_element(By.XPATH, "//ion-input[@name='username']//input")
    username_field.send_keys("lushone")

    time.sleep(8)  

finally:
    driver.quit()
