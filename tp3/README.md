# CG 2023/2024

## Group T09G01

## TP 1 Notes

In this theoretical-practical lesson, we learned about the basics of OpenGL.
We learned that to draw a simple geometric figure, we first need to specify a set of points that allows us to divide the respective figure into triangles. 
We worked with three classes: `CGFscene`, `CFGinterface` and `CGFobject`.

<hr />

### CFGscene

The `CFGscene` is the class responsible for creating the scene, displaying the objects in the axis and the camera position having the light source in mind. This is basically the main class of the program.

<center>
    <img src="screenshots/cgra-t09g01-tp1-1.png" width="500px">
</center>

<hr />

### CFGinterface

<table>
    <tr>
        <td width="500px">
            The <strong>CFGinterface</strong> is the class responsible for displaying an interface that allows the user to interact with the program. There already was a checkbox that toggled the axis display, and a slider to change the scale of the objects. For the second exercise, we had to add checkboxes to toggle the display of the objects we were to create. By curiosity, we found that we could add folders to the interface, which we did to organize the checkboxes:
        </td>
        <td>
            <img src="screenshots/cgra-t09g01-tp1-6.png"/>
        </td>
    </tr>
</table>

<hr />

### CGFobject

The `CGFobject` was the class that allowed us to create the objects we wanted to display. We had to create a class for each object, and in each class, as we said before, we had to specify the vertices and the indices of the object. By doing this we were able to create the following figures:

<table>
    <tr>
        <td><img src="screenshots/cgra-t09g01-tp1-2.png" width="300"/></td>
        <td>
            <h4>Parallelogram</h4>
            <code>
                this.vertices = [
                0, 0, 0,
                1, 0, 0,
                2, 0, 0,
                3, 1, 0,
                2, 1, 0,
                1, 1, 0,
                ]; <br />
                this.indices = [
                0, 1, 5,
                5, 1, 2,
                5, 2, 4,
                2, 3, 4 
                ];
            </code>
        </td>
    </tr>
    <tr>
        <td><img src="screenshots/cgra-t09g01-tp1-3.png" width="300"/></td>
        <td>
        <h4>Diamond</h4>
            <code>
                this.vertices = [
                -1, 0, 0,
                0, -1, 0,
                0, 1, 0, 
                1, 0, 0  
                ]; <br />
                this.indices = [
                0, 1, 2,
                1, 3, 2 
                ];
            </code>
        </td>
    </tr>
    <tr>
        <td><img src="screenshots/cgra-t09g01-tp1-4.png" width="300"/></td>
        <td>
        <h4>Small Triangle</h4>
            <code>
                this.vertices = [
                    -1, 0, 0,
                    1, 0, 0, 
                    0, 1, 0, 
                ]; <br />
                this.indices = [0, 1, 2];
            </code>
        </td>
    </tr>
    <tr>
        <td><img src="screenshots/cgra-t09g01-tp1-5.png" width="300"/></td>
        <td>
        <h4>Big Triangle</h4>
            <code>
                this.vertices = [
                    -2, 0, 0,
                    2, 0, 0, 
                    0, 2, 0, 
                ]; <br />
                this.indices = [0, 1, 2];
            </code>
        </td>
    </tr>
</table>

## TP 2 Notes
In this theoretical-practical lesson, we learned how to make the three basic transformations: translation, rotation and scaling. We also learned the importance of the order of the transformations, and how to apply the transformations to the objects we created in the previous lesson. 

### Tangram
For the first exercise on this class, we had to create a tangram figure by using the objects we created in the previous lesson and applying the transformations to them. 

This was the final result:

| Expected | Reality |
| -------- | ------- |
| <img src="screenshots/cg-t09g01tp2-2.png" width="500px"> | <img src="screenshots/cg-t09g01tp2-1.png" width="500px"> |

### Unit Cube
In the second exercise, we were supposed to create a Cube using a single mesh of connected triangles. This was our result:

<table>
    <tr>
        <td>
            <h4>Unit Cube</h4>
            <code>
                this.vertices = [<br />
                &nbsp;&nbsp;&nbsp;-0.5, -0.5, 0.5,   // bot left front<br />
                &nbsp;&nbsp;&nbsp;0.5,  -0.5, 0.5,   // bot right front<br />
                &nbsp;&nbsp;&nbsp;0.5,  -0.5, -0.5,  // bot right back<br />
                &nbsp;&nbsp;&nbsp;-0.5, -0.5, -0.5,  // bot left back<br />
                &nbsp;&nbsp;&nbsp;-0.5, 0.5,  0.5,   // top left front<br />
                &nbsp;&nbsp;&nbsp;0.5,  0.5,  0.5,   // top right front<br />
                &nbsp;&nbsp;&nbsp;0.5,  0.5,  -0.5,  // top right back<br />
                &nbsp;&nbsp;&nbsp;-0.5, 0.5,  -0.5,  // top left back<br />
                ];<br /><br />
                this.indices = [<br />
                &nbsp;&nbsp;&nbsp;0, 3, 2,  <br />
                &nbsp;&nbsp;&nbsp;2, 1, 0,  <br />
                &nbsp;&nbsp;&nbsp;0, 1, 5,  <br />
                &nbsp;&nbsp;&nbsp;5, 4, 0,  <br />
                &nbsp;&nbsp;&nbsp;0, 4, 7,  <br />
                &nbsp;&nbsp;&nbsp;7, 3, 0,  <br />
                &nbsp;&nbsp;&nbsp;3, 7, 6,  <br />
                &nbsp;&nbsp;&nbsp;6, 2, 3,  <br />
                &nbsp;&nbsp;&nbsp;2, 6, 5,  <br />
                &nbsp;&nbsp;&nbsp;5, 1, 2,  <br />
                &nbsp;&nbsp;&nbsp;4, 5, 6,  <br />
                &nbsp;&nbsp;&nbsp;6, 7, 4,  <br />
                ];
            </code>
        </td>
        <td><img src="screenshots/cg-t09g01tp2-3.png" width="300"/></td>
    </tr>
</table>

### Unit Cube Quad
For the last exercise, we were supposed to create another cube, but using six squares and transforming them using the transformations we learned.
This was the final result:

| MyUnitCubeQuad | Code |
| -------------- | ---- |
| <img src="screenshots/cg-t09g01tp2-4.png" /> | <img src="screenshots/cg-t09g01tp2-5.png" /> |


## TP 3 Notes