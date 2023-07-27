---
title: Android Soft Keyboard 적용 여부 Detect
date: 2020-02-25 14:02:45
category: Android
draft: false
---

## 들어가기 전에

Android 개발을 하다가 Edit Text가 있는 화면을 마주하게 되면, 필연적으로 WindowSoftInputMode, 즉 Soft Keyboard와의 머리싸움을 하게 된다. 이번 Post에서는 Soft Keyboard가 현재 올라왔는지 여부를 Detect하는 모듈을 예시와 함께 정리해보겠다.

## KeyboardVisiblilityUtils 구현

해당 기능을 위한 전용 모듈을 *KeyboardVisiblilityUtils*라는 이름으로 구현한다.

> KeyboardVisibilityUtils.kt

```kotlin
/**
 * visibleDecorViewHeight : 현재 화면의 높이
 */
class KeyboardVisibilityUtils(
        private val window: Window,
        private val onShowKeyboard: ((keyboardHeight: Int, visibleDisplayFrameHeight: Int) -> Unit)? = null,
        private val onHideKeyboard: (() -> Unit)? = null
) {

    private val MIN_KEYBOARD_HEIGHT_PX = 150

    private val windowVisibleDisplayFrame = Rect()
    private var lastVisibleDecorViewHeight: Int = 0


    private val onGlobalLayoutListener = ViewTreeObserver.OnGlobalLayoutListener {
        window.decorView.getWindowVisibleDisplayFrame(windowVisibleDisplayFrame)
        val visibleDecorViewHeight = windowVisibleDisplayFrame.height()

        // Decide whether keyboard is visible from changing decor view height.
        if (lastVisibleDecorViewHeight != 0) {
            if (lastVisibleDecorViewHeight > visibleDecorViewHeight + MIN_KEYBOARD_HEIGHT_PX) {
                // Calculate current keyboard height (this includes also navigation bar height when in fullscreen mode).
                val currentKeyboardHeight = window.decorView.height - windowVisibleDisplayFrame.bottom
                // Notify listener about keyboard being shown.
                onShowKeyboard?.invoke(currentKeyboardHeight, windowVisibleDisplayFrame.height())
            } else if (lastVisibleDecorViewHeight + MIN_KEYBOARD_HEIGHT_PX < visibleDecorViewHeight) {
                // Notify listener about keyboard being hidden.
                onHideKeyboard?.invoke()
            }
        }
        // Save current decor view height for the next call.
        lastVisibleDecorViewHeight = visibleDecorViewHeight
    }

    init {
        window.decorView.viewTreeObserver.addOnGlobalLayoutListener(onGlobalLayoutListener)
    }

    fun detachKeyboardListeners() {
        window.decorView.viewTreeObserver.removeOnGlobalLayoutListener(onGlobalLayoutListener)
    }
}
```

해당 클래스를 구현해두면, 이제 Activity 클래스에서 해당 모듈을 활용할 수 있다.

## 키보드 존재 여부에 따른 동작 구현

Android Project의 Activity 클래스 하위의 **onCreate** 함수 내에 다음과 같이 구현한다.

> LoginActivity.kt

```kotlin
keyboardVisibilityUtils = KeyboardVisibilityUtils(window,
        onShowKeyboard = {keyboardHeight, visibleDisplayFrameHeight ->
            // 키보드가 올라올 때의 동작
            Timber.v("diver:/keyboard up")
        },
        onHideKeyboard = {
            // 키보드가 내려갈 때의 동작
            Timber.v("diver:/keyboard down")
        }
)
```

해당 클래스는 Boilerplate로써 필요할 때, 활용하면 편리할 듯 하다.

## 참고

해당 구현의 원본 블로그 게시물은 다음과 같다.

- https://googry.tistory.com/43
