# Manual

- pubdate: 2017-01-15 18:00

Detail of this page's interaction

----------------

##  Responsive design
This page can automatically adapt the different size of the screen.  


## picture area
This is the main area in this page. Nearly every functions are in here.  
Because of the design, there would display up to 10 pictures. More than 10, it will only be listed in the menu.
### click effect
1. Click the picture in the picture area, it will play an animation then change the current picture and introduction.  
2. The user can only click one picture at the same time.  
3. If the user clicks the current picture, the picture will be enlarged.  

### hover effect
1. Hover on the picture in the picture area more than 3s, the picture will extend and show the corresponding name. 
***
## menu area
1. This is a less functioned area, because picture's area can do most of the functions of the menu.  
1. However, if there are more than 10 pictures, the user can only use the menu to check them.  
1. Click items in the menu is same as click picture in the picture area.  
1. If the text is too long, then it will show `...` in the end of the text.
***
## introduction area
1. There is a vibration problem when users change the picture, it caused by the different size of those pictures. 
***
## could be optimized
Every feature needs design, code and test, because of the limited time, there are some features I didn't implement. But I still want to write my thought about how to solve them here.
### UI
If there was a UI designer who can give me some suggestions about the color, this page would look better.
### picture area
This is an uncomfortable interaction now, which is after clicking an item in the menu, the user needs to wait for 3.5s for the animation. During this period, the user cannot click another item. Because if allow user click the menu during the play of animation, there would be a confusion. [See the effect](quick-click-version.html)(please click different pictures quickly, then you can see)  
There are considerable solutions:
> First one  
> This one is relatively easy to do.   
> Make a queue, store all the menu items in the queue, then do them in turn after the previous animation.  

> Second one  
> This one will be much complex  
> Add a new CSS class `.stop`, after clicking a new menu item, add `.stop` to the current moving picture, let it disappeared and move back.