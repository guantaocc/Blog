#### 浏览器行为

1.useEventListener

```
export function useEventListener(
    target: HTMLElement | Window | string, 
    event: keyof HTMLElementEventMap, 
    callback: (this: HTMLElement, ev: any) => any){
    onMounted(() => {
      (typeof target === 'string' ? document.querySelector(target) as HTMLElement : target).addEventListener(event, callback)
      }
    )
    onUnmounted(() =>(typeof target === 'string' ? document.querySelector(target) as HTMLElement : target).removeEventListener(event, callback))
}
```

2.useMouse






