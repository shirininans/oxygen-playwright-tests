import { test, expect } from '@playwright/test';

test('Проверка содержания кислорода в атмосфере Земли = 20,95 %', async ({ page }) => {
  await page.goto('https://ru.wikipedia.org/');
  await page.waitForLoadState('domcontentloaded');

  // Поиск статьи "Земля"
  await page.locator('input[name="search"]').fill('Земля');
  await page.keyboard.press('Enter');

  // Ожидаем заголовок страницы
  await page.waitForSelector('#firstHeading');
  await expect(page.locator('#firstHeading')).toContainText('Земля');

  // Получаем весь текст страницы
  const bodyText = await page.locator('body').innerText();

  // Проверяем наличие точного значения кислорода
  expect(bodyText).toContain('20,95 %');
});

test('Негативный тест: содержание кислорода не 50 %', async ({ page }) => {
  await page.goto('https://ru.wikipedia.org/');
  await page.waitForLoadState('domcontentloaded');

  await page.locator('input[name="search"]').fill('Земля');
  await page.keyboard.press('Enter');

  await page.waitForSelector('#firstHeading');
  const bodyText = await page.locator('body').innerText();

  expect(bodyText).not.toContain('50 %');
});