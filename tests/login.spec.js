// @ts-check
import { test, expect } from '@playwright/test';

test('successful login to system', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  const usernameInput = page.locator('#user-name');
  await usernameInput.fill('standard_user');

  const passwordInput=page.locator('#password')
  await passwordInput.fill('secret_sauce');

  const loginButton=page.locator('#login-button');
  await loginButton.click();
  
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
});

test('failed login to system', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  const usernameInput = page.locator('#user-name');
  await usernameInput.fill('locked_out_user');

  const passwordInput=page.locator('#password')
  await passwordInput.fill('secret_sauce');

  const loginButton=page.locator('#login-button');
  await loginButton.click();
  
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});


