from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()

try:
    driver.get("http://localhost:8100/registro")
    time.sleep(5)  

   
    username_field = driver.find_element(By.XPATH, "//ion-input[@name='username']//input")
    username_field.send_keys("carlitos1234")

    password_field = driver.find_element(By.XPATH, "//ion-input[@name='password']//input")
    password_field.send_keys("Carlos")

    nombre_field = driver.find_element(By.XPATH, "//ion-input[@name='nombre']//input")
    nombre_field.send_keys("Nombre")

    apellido_field = driver.find_element(By.XPATH, "//ion-input[@name='apellido']//input")
    apellido_field.send_keys("Apellido")

    correo_field = driver.find_element(By.XPATH, "//ion-input[@name='correo']//input")
    correo_field.send_keys("carlospaloma@gmail.com")

    direccion_field = driver.find_element(By.XPATH, "//ion-input[@name='direccion']//input")
    direccion_field.send_keys("Dirección")

    rut_field = driver.find_element(By.XPATH, "//ion-input[@name='rut']//input")
    rut_field.send_keys("12345678-9")

    telefono_field = driver.find_element(By.XPATH, "//ion-input[@name='telefono']//input")
    telefono_field.send_keys("123456789")

    register_button = driver.find_element(By.XPATH, "//ion-button[@type='submit']")
    register_button.click()

    time.sleep(8)  

finally:
    driver.quit()
