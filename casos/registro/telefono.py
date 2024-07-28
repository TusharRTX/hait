from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()

try:
    driver.get("http://localhost:8100/registro")
    time.sleep(5)  

    telefono_field = driver.find_element(By.XPATH, "//ion-input[@name='telefono']//input")
    telefono_field.send_keys("123456789")


    time.sleep(8)  

finally:
    driver.quit()
