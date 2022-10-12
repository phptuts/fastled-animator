# FastLED Animator

My mission is to empower noncoders to make art with RGB-led light strips. Not knowing how to code should not stop you from creating. I want to enable artists, hobbyists, and the curious to build amazing things. If you have any feedback or use cases, please email me at glaserpower [] gmail.com.

## Thank You

The code used to run the rgb LEDs on the Arduino is [fastled](https://fastled.io/). It's a free, open-source project. I would not have been able to build the website without them. Thank you [focalintent](https://github.com/focalintent) and [kriegsman](https://github.com/kriegsman) for this making possible!


## Future LED Object

```js
const frame = {
    // [1,2,4] are the leds that will be colored "#00AA00"
    colors: [{"#00AA00": [1,2,4], "#AA0000": [3,5]}],
    // These are the selected leds
    selected: [1,2,3]
} 
```
