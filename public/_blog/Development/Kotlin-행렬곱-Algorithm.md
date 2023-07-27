---
title: Kotlin 행렬곱 Algorithm
date: '2019-10-22 00:00:11'
draft: false
category: 'Development'
---

Kotlin 관련 알고리즘 문제 진행중 행렬곱 관련 Boilerplate를 발견해서 메모해둔다.

```kotlin

private fun matrixMulti(arr1: Array<IntArray>, arr2: Array<IntArray>): Array<IntArray>{

    val width = arr1.size

    val height = arr2[0].size

    val multiSize = arr2.size

    val result = Array(width) {IntArray(height)}



    for (i in 0 until width){

        for (j in 0 until height){

            for (k in 0 until multiSize){

                result[i][j] += arr1[i][k] * arr2[k][j]

            }

        }

    }



    return result

}

```
