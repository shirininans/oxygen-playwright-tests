import { test, expect } from '@playwright/test';

test('Проверка содержания кислорода в атмосфере Земли ≈ 20,95 %', async ({ page }) => {
  // Переход сразу на статью "Земля"
  await page.goto('https://ru.wikipedia.org/wiki/Земля', { waitUntil: 'domcontentloaded' });

  // Проверка заголовка
  const heading = page.locator('#firstHeading');
  await expect(heading).toHaveText(/Земля/i);

  // Получаем весь текст страницы
  const bodyText = await page.locator('body').innerText();

  // Гибкая проверка: допускаем точку или запятую, пробел или его отсутствие
  const oxygenRegex = /20[.,]\s?95\s?%/;
  expect(bodyText).toMatch(oxygenRegex);
});

test('Негативный тест: содержание кислорода не 50 %', async ({ page }) => {
  await page.goto('https://ru.wikipedia.org/wiki/Земля', { waitUntil: 'domcontentloaded' });

  const bodyText = await page.locator('body').innerText();

  // Проверяем, что 50 % не указано
  expect(bodyText).not.toMatch(/50\s?%/);
});
