const G = 0.0000000000667;
//const M = 5972000000000000000000000;


/*Everything else*/

function EVfunction() {
    let M = document.getElementById("numberInput1").value;
    let d = document.getElementById("numberInput2").value;

    let escapevelocity = Math.sqrt((2 * G * M) / d);

    let escapevelocityinkg = escapevelocity / 1000;

    let roundednumber = Math.round(escapevelocityinkg);


    document.getElementById("result1").textContent = "The escape velocity of this object is: ";
    document.getElementById("result2").textContent = escapevelocity + " km/s";
    document.getElementById("result3").textContent = "Convert in kg: ";
    document.getElementById("result4").textContent = escapevelocityinkg + " km/s";
    document.getElementById("result5").textContent = "Rounded: ";
    document.getElementById("result6").textContent = roundednumber + " km/s";
}


function CTSNFunction() {
    let numtoconv = document.getElementById("numberInputdecimal1").value;

    let convertnum = Number.parseFloat(numtoconv).toExponential(4);


    document.getElementById("resulconv1").textContent = "Convert in scientific notation: ";
    document.getElementById("resulconv2").textContent = convertnum;

}


function CTDNFunction() {
    let numtoconvert = document.getElementById("numberInputscientificnotation1").value;

    let endnum = numtoconvert * 1;

    document.getElementById("resulconv3").textContent = "Convert in decimal notation: ";
    document.getElementById("resulconv4").textContent = endnum;

}


function flaecheninhaltstarnfunction() {
    let radius = document.getElementById("numberInputsurarst2").value;

    let flaecheninhalt = 4 * Math.PI * (radius * radius);

    document.getElementById("resultsurarst1").textContent = "The surface area is: ";
    document.getElementById("resultsurarst2").textContent = flaecheninhalt;

}

function spatialanglefunction() {
    let flaecheninhaltraumwinkel = document.getElementById("numberInputspatialangle1").value;
    let radiusraumwinkel = document.getElementById("numberInputspatialangle2").value;
    let raumwinkel = flaecheninhaltraumwinkel / (radiusraumwinkel * radiusraumwinkel);

    document.getElementById("finalresultspatialangle1").textContent = "The spatial angle is: ";
    document.getElementById("finalresultspatialangle2").textContent = raumwinkel;

}

function DOSRfunction() {
    let radiusDOSR = document.getElementById("numberInputDOSR2").value;

    let LO = 4 * Math.PI * (radiusDOSR * radiusDOSR);


    document.getElementById("finalresultDOSR1").textContent = "The distribution of solar radiation is: ";
    document.getElementById("finalresultDOSR2").textContent = LO;

}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

/*Image preloader*/

const images = document.querySelectorAll("img[data-src]");
images.forEach((image) => {
    const src = image.getAttribute("data-src");
    image.setAttribute("src", src);
});
