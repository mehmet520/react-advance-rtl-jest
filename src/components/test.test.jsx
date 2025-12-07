import { test, expect } from '@jest/globals';

test("toplama islemi dogru sonucu vermeli", () => {
  const sonuc = 2 + 3;
  expect(sonuc).toBe(5);
});
