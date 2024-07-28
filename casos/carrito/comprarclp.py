from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
import time
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
    time.sleep(3)

    
    items = driver.find_elements(By.CLASS_NAME, 'cart-item')
    assert len(items) > 0, "No se encontraron productos en la lista"

    for item in items:
        image = item.find_element(By.TAG_NAME, 'img')
        assert image.get_attribute('src') != "", "La imagen del producto no se cargó correctamente"

        price = item.find_element(By.TAG_NAME, 'p')
        assert price.text != "", "El precio del producto no se muestra correctamente"


    checkout_clp_button = driver.find_element(By.XPATH, "//ion-button[contains(text(), 'Pagar en CLP')]")
    checkout_clp_button.click()


    time.sleep(3)

finally:
    
    driver.quit()