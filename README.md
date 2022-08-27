# 2022-Portfolio

[www.iabrahamson.com](https://iabrahamson.com)

## Features
- Sections fade in on load
- Animated portfolio boxes
- CSS variables and JavaScript to get exact animation height for each portfolio box
- Unhide portfolio sections on touch and JavaScript disabled devices

## Design

I created the design using Figma. I was originally going to have colored sections on hover, but I did not like the way this looked when I actually implemented it.

![image](https://user-images.githubusercontent.com/17521691/186301604-440392e9-6d79-454a-a3e0-4f72f991469e.png)

## Problem Solving

The trickiest part of this project was animating the hover effect on the portfolio boxes. Setting the title and description at the bottom is easy enough using flexbox, but it is not simple to hide and animate the description.

I tried a number of different techniques including setting max-heights and visibility, but each solution either did not position the elements correctly, or the animation was janky because the exact heights were off.

To get a perfect animation, I had to set the exact heights for the title and description using JavaScript. I found that the best way to do this was to create a CSS variable with the exact height and give CSS the control of when to use it.
```javascript
function calcHeights(boxes) {
  boxes.forEach(box => {
    const titleHeight = box.children[0].offsetHeight + 'px'
    const descHeight = box.children[1].offsetHeight + 'px'
    box.style.setProperty('--titleHeight', titleHeight)
    box.style.setProperty('--descHeight', descHeight)
  })
}
```
I could then use the variable in a CSS transform to push the elments down to the bottom by calculating 100% minus the exact element height:
```css
.innerBox {
  transition: 400ms ease;
  transform: translateY(calc(100% - var(--titleHeight)));
}

.outerBox:hover .innerBox {
  transform: translateY(calc(100% - var(--titleHeight) - var(--descHeight)));
}
```

The next tricky part was figuring out how to deal with two problem cases:
- mobile devices that couldn't hover the cards
- devices that had JavaScript disabled and the heights wouldn't be set

After some research, I discovered that you can detect the hover pseudoclass using this media query selector:
```
@media (hover: hover) and (pointer: fine) { ... }
```

Using that approach, I set all the boxes to display normally using flexbox, and if the user has hover capabilities then I added the animation styles.

```css
.innerBox {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

@media (hover: hover) and (pointer: fine) {
  /* Translate the title and description to bottom */
  .innerBox {
    display: block;
    transition: 400ms ease;
    transform: translateY(calc(100% - var(--titleHeight)));
  }
  .outerBox:hover .innerBox {
    transform: translateY(calc(100% - var(--titleHeight) - var(--descHeight)));
  }
  
  /* Hide the description */
  .innerBox .boxDesc {
    opacity: 0;
  }
  .outerBox:hover .boxDesc {
    opacity: 1;
  }
  
  /* Hide background image */
  .overlayBox .fill {
    opacity: 1;
  }
  .outerBox:hover .overlayBox .fill {
    transition: opacity 800ms ease;
    opacity: 0;
  }
}
```

This worked well, but the case of a desktop device with JavaScript disabled still existed. My first approach was using the `<noscript></noscript>` tags to hide the page and show a message if JavaScript was disabled. However, this approach was a lazy solution that ignored good UX. After trying several things, I discovered that the most practical way to detect if JavaScript was enabled was to just add a class to the body element:
```javascript
document.querySelector('body').classList.add('js')
```
Then in my CSS animation code, I could use CSS inheritance to only add animations if the body had the js class:
```css
body.js .outerBox:hover .innerBox {
  transform: translateY(calc(100% - var(--titleHeight) - var(--descHeight)));
}
```
This approach proved to be the simplest way to give each user the best user experience possible.
