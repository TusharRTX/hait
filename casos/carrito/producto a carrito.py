from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import time


driver = webdriver.Chrome()

try:
    
    driver.get("http://localhost:8100/home")
    time.sleep(4) 

  
    herramientas_category = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "herramientas"))
    )
    herramientas_category.click()

    add_to_cart_button = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, 'ion-button.button.button-full'))
    )
    add_to_cart_button.click()

    print("Producto agregado al carrito con éxito.")
    time.sleep(3) 

    
    driver.get("http://localhost:8100/cart")


except Exception as e:
    print("Error:", e)

finally:
    time.sleep(3)
    driver.quit()


