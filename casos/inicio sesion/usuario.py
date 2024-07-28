from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By 
from selenium.webdriver.support.ui import WebDriverWait
import time

driver = webdriver.Chrome()

driver.get("http://localhost:8100/iniciosesion")


time.sleep(3)

try:
    
    username_field = driver.find_element(By.XPATH, "//ion-input[@name='username']//input")
    username_field.send_keys("lushone")
    
    time.sleep(8)

finally:
    
    driver.quit()