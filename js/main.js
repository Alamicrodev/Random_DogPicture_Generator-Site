
// a past images var that stores src links of all previous images
let pastImages;


// get it from localstorage if it exists otherwise create it in local storage. 
if (localStorage.getItem("pastImages") != undefined) {
    pastImages = JSON.parse(localStorage.getItem("pastImages"))
} 
else 
{
    localStorage.setItem("pastImages", "[]")
    pastImages = []
}

// Getting the 4 main components
let getButton = document.getElementById("main_getButton")
let mainPicture = document.getElementById("main__picture")
let prevPicturesList = document.getElementById("prevPictures_list")
let clearPreviousButton = document.getElementById("clearprevious")


// getRandomPicture function 
let getRandomPicture = () => {

   

    fetch("https://dog.ceo/api/breeds/image/random").then((resp) => {
        if (resp.ok) {
            return resp.json()
        }
        else {
            console.log("Unable to get the image", resp.statusText)
        }
    }).then((data) => {
        // extract and set link of picture from the recieved data
        let link = data.message; 
        mainPicture.setAttribute("src", link)
        mainPicture.style.visibility = "visible"
        
        // adding the link in front of the previous images list
        // and updating it in local storage
        pastImages.unshift(link)
        localStorage.setItem("pastImages", JSON.stringify(pastImages))
       
       

        // reloading push previous images to include the last image
        pushPreviousImages()

       
        
    }).catch((err) => {
        console.log("Looks like there is no internet connection:", err)
    })
    }

//running the above function on the click of the button
getButton.onclick = getRandomPicture


// pushes previous images from local storage 
let pushPreviousImages = () => 
{

    
   //clearing the children of the ul if any exists before 
   prevPicturesList.innerHTML = ""

   // incase there are no images links stored in local storage. 
   if (pastImages.length == 0) {
    prevPicturesList.style.display = "block";
    prevPicturesList.innerText = "No records found in local storage."
    return
   }

   //returning the style display to block    
   prevPicturesList.style.display = "grid";


   //going through each link in past image 
   pastImages.forEach(link => {
    
    // creating a new list item having image inside
    let listItem = document.createElement("li")
    let image = document.createElement("img")
    image.setAttribute("src", link)
    image.onclick = () => {
        mainPicture.src = link;
        mainPicture.scrollIntoView({behavior: "smooth", "block": "center"})
    }
    listItem.appendChild(image)
    
    // pushing that list item (image) to the unordered list
    prevPicturesList.appendChild(listItem)
   });

   

}

// clear previous images function 
let clearPreviousPictures = () => {
    localStorage.setItem("pastImages", "[]")
    pastImages = []

    // recalls the function to empty the prev images list
    pushPreviousImages()
}

// on the click of button calling the clear previous images list 
clearPreviousButton.onclick = clearPreviousPictures


// on load of the page executing the two functions
pushPreviousImages()
getRandomPicture()