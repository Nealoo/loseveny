# Description

- pubdate: 2017-01-15 12:00

Technical description and explanation of design and programming techniques utilized

----------------

## Summary
This a single web page to display pictures and their corresponding introductions. It didn't use that normal tab's model which will generate all the introduction divs in advance and set display: none, then according to user's operation to change it. This page only stored data in a global variable which is the only global variable in this page. And only generate the needed introduction for users after they click.  
This is a responsive page based on CSS3's `@media` property.  
And most of the animation is made by CSS, js only to set time to add or remove CSS classes to those object. So this page is strict to the browser.  
Since there is no limitation of browser's version, I just chose to give up those old browsers and did some effect really cool. But in fact, I have lots of experience to deal with those browsers, because I had had to compat `ie6` in my last work.  
Because of the limitation of time, some features are actually not fully finished. But all the finished parts have been tested.

If there are any problems on this page, please try to visit [Online Version](http://kioo.cn/portfolio/works/test_for_cucumber_Neal/src/index.html).
Or directly connect me via `loseveny@gmail.com`

## techniques selection

### Selection
All the techniques are here:

- HTML
- CSS3
- JS
- jQuery
- SASS
- Bootstrap
- Handlebars

In the beginning, I considered using AngularJS to make the router function, however, limited to the file protocol, there would be some problems if I chose AngularJS. So I gave up.  

As for the Sass, because there are many CSS3 features, so I use its `@mixin` to automatically generate some code like this:

```
@mixin transition($param...) {
  -webkit-transition:$param;
   -moz-transition:$param;
   -ms-transition:$param;
   -o-transition:$param;
   transition:$param;
}
```
And calculate some distance between two pictures based on the Grid system, like this:
```
         @media (max-width: 768px){
                &:after{
                     left: $gap-before/$length-col-2;
                     width: 100% - 2*($gap-before/$length-col-2);
                }
            }
```

As for Handlerbars, it's a template engine like `Jade`, but it doesn't have logic.  
I use it to generate menu, picture area, info area according to different data.  

### Techniques details
#### The animation of clicked picture
This animation mainly generates by the CSS, the only js code for the animation is to calculate the distance between current big picture and the grid.  
After clicking, it will add a class`.active`, after 1.5s, it will add another class `.active2`.  
This is the `transition` of the moving object:
```
 @include transition(left 0.5s, width 1s ease 0.5s, transform 1.5s, height 0.5s ease 0.5s, opacity 1s ease 1s);
```
This is `.active`:
```
 &.active{
              width: 19.253125vw;
              left: -135%;
              z-index: 25;
              @include transform(scale(1.2));
}
```
This is `.active2`
```
&.active2{
                height: 180%;
                border: none;
                @include transform(scale(1));
                opacity: 0;
            }
```
#### After hovering a picture, other change to dark
I'd like to explain this, because I think it's a tricky one in my mind. It's I have added a Pseudo-Classes `:after` to the picture like this:
```
         &:after{
                content: "";
                z-index: 1;
                position: absolute;
                left: $gap-before/$length-col-1;
                top: 0;
                width: 100% - ($gap-before/$length-col-1);
                height: 100%;
                background: rgba(0, 0, 0, 0.6);
                opacity: 0.5;
                @include transition(opacity 0.5s);
            }
```
Because of the Grid system, I can't use `margin`, I used `padding` to make the gap between pictures, so in this case, I need to caculate the left of `:after` in case of it shown on the gap.  

After hovering on the picture, the opacity will change to `0`, like this:
```
           &:hover:after{
                opacity: 0;
            }
```
And hovering on the picture's parents node will change it to `1`, like this:
```
&:hover>.pics-container .pics-inner:after{
        opacity: 1;
    }
```
So other picture will be darker.
### Compatibility
Because of there are lots of animation on this page, only the modern web browser can experience the full effect on this page.
However, because this is only a simple function on this page, even in an old browser, you can still check all the introductions without animation effects.

IE  |Firefox|Chrome|Safari|Opera
----|----------|-----------|-------|--------
9.0+ | 4.0+  | 10.0+ | 5.1+ | Opera10.5+

In the mobile browser, I didn't test, but there are few Andriod browsers can't support `vw` property properly.  Considering change `vw` to `rem`.

## UX design
To be honest, I don't have too much experience in UI design, because, in my last work, there were some excellent UI designer and interaction designer, who would provide all the UI design and interaction design to me. What I need to do is just implement its every pixel exactly, which is what I really good at.  
However, after worked with those designers for few years, I have got some basic skill of web design, especially in interaction design.   Although in color matching aspect, there are some flaws, I did my best.  

Because it's a personal work, so I didn't use Axure to make the prototype. And in order to save time, I used my language to make the design, it will let me concentrate and think faster.  Apologise.  

Here is my design draft:
![design1](img/design1.jpg)
![design2](img/design2.jpg)