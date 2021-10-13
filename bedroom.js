img = "";
status = "";
objects = []

function  preload()
{
    img = loadImage('hhhhhh.jpg');
}

function setup()
{
    canvas = createCanvas(600, 400);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}

function draw()
{
    image(img, 0, 0, 600, 400); 
}

function back()
{
    window.location = "home.html";
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }

    console.log(results);
    objects = results;
}

function draw()
{
    
    image(img, 0, 0, 640, 420);

    if(status != "")
    {
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("number_of_object").innerHTML = "Number of Objects detected are " + objects.length;

            fill('blue');

            percent = floor(objects[i].confidence * 100);

            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);

            noFill();

            stroke('green');

            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}