import { expect, test } from 'vitest'
import { port } from './serve'
import { isBuild, page } from '~utils'

const url = `http://localhost:${port}/`

test.runIf(!isBuild)('optimize', async () => {
  await page.goto(url)
  // reload page to get optimized missing deps
  await page.reload()
  await expect.poll(() => page.textContent('div')).toMatch('Client')

  // raw http request
  const aboutHtml = await (await fetch(url)).text()
  expect(aboutHtml).toContain('Server')
})
