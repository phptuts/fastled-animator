# LED Animator

## TODO

- Generate Pattern Feature [x]
 - Toastify Message [x]
- Generate Code with Arduino [x]
- Upload Code to Arduino [x]
- Move Code Show to Another Page and move context to that global [x]
- Allow User Download and Upload Projects in JSON format [x]
- Save to local storage [x]
- Fix input to only allow json for opening a project file [x]

- Fix SEO STUFF
  - favicon [x]
  - Title [x]
  - Navigation Bar [x]
  - marketing video show on first visit [ ]
  - About Page
    - Origin Story [ ]
    - Thank yous [ ]
  - Tutorial Page
    - Advanced Tutorial [ ]
    - Arduino Upload Code [ ]
    - Wiring and rgb led strip [ ]
  - Contact Page [x]
  - Feedback Page [x]
- Deploy App to github [ ]
- Promote and Release LED Animator [ ]


## Future LED Object

```js
const frame = {
    // [1,2,4] are the leds that will be colored "#00AA00"
    colors: [{"#00AA00": [1,2,4], "#AA0000": [3,5]}],
    // These are the selected leds
    selected: [1,2,3]
} 
```