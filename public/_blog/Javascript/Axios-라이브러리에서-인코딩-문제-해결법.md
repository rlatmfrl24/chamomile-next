---
title: Axios 라이브러리에서 인코딩 문제 해결법
date: '2019-09-16 00:00:11'
draft: false
category: 'Javascript'
---

Node.js로 웹 크롤러를 제작하다가 euc-kr으로 인코딩된 페이지에서는 글자가 깨지는 문제가 발생하여 해결법을 알아보았다.

1. `iconv-lite` 라이브러리를 설치한 후 import 한다.

```

npm i --save iconv-lite

```

```js
var iconv = require('iconv-lite')
```

2. 먼저 Axios의 responseType을 `arraybuffer`로 지정한다.

```js
let response = await axios.get(article.url, {
  responseType: 'arraybuffer',
})
```

3. Response로부터 Content-type을 가져와서 `charset` 파트만 파싱한다.

```js
let contentType = response.headers['content-type']

let charset = contentType.includes('charset=')
  ? contentType.split('charset=')[1]
  : 'UTF-8'
```

4. Response 데이터를 지정된 `charset`으로 파싱한다.

```js
let data = iconv.decode(responseData, charset)
```

마지막으로 해당 해결법을 활용한 예제코드 전체를 아래에 첨부한다.

```js
async function defaultParser(article: common.Article) {
  try {
    let response = await axios.get(article.url, {
      responseType: 'arraybuffer',
    })

    let contentType = response.headers['content-type']

    let charset = contentType.includes('charset=')
      ? contentType.split('charset=')[1]
      : 'UTF-8'

    let responseData = await response.data

    let data = iconv.decode(responseData, charset)

    let $ = await cheerio.load(data)

    let title = await $('title')
      .text()
      .trim()

    article.description = await article.title

    article.title = await title

    article.type = 'default'
  } catch (err) {
    console.log(err)
  }

  return article
}
```
