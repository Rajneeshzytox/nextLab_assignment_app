// IMAGE UPLOAD is a mess: so i am using imgbb to upload images temp {1 week}, and then store url to db
// imgbb api key
const apiKey = ""

export default async function uploadImage(fileInputID) {

  const fileInput = document.getElementById(fileInputID)
//   if file present 
  const file = fileInput.files[0]
  if(!file){
    alert("At least Upload a img")
    return;
  }

//   form object for img
  const formData = new FormData()
  formData.append("image", file)

  // imgs will expire auto. in 1 week (604800 seconds)
  const expiration = 604800;

  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?expiration=${expiration}&key=${apiKey}`, {
      method: "POST",
      body: formData,
    })

    const data = await res.json()

    if (data.success) {
      return {status: 200, imgUrl: data.data.url }
      
    } else {
        console.error("Error uploading image:", data)
        return {status: 400, message:"img upload failed" }
    }
} catch (error) {
    console.error("Error uploading image:", error)
    return {status: 400, message:"img upload failed" }
  }
}



// SAMPLE RES: 
// feom : ====>>>  https://api.imgbb.com/
/*
{
    "success": true, 
    "status": 200,

    "data": {

        "url": "https://i.ibb.co/w04Prt6/c1f64245afb2.gif",

      "id": "2ndCYJK",
      "title": "c1f64245afb2",
      "url_viewer": "https://ibb.co/2ndCYJK",
      "display_url": "https://i.ibb.co/98W13PY/c1f64245afb2.gif",
      "width":"1",
      "height":"1",
      "size": "42",
      "time": "1552042565",
      "expiration":"0",
      "image": {
        "filename": "c1f64245afb2.gif",
        "name": "c1f64245afb2",
        "mime": "image/gif",
        "extension": "gif",
        "url": "https://i.ibb.co/w04Prt6/c1f64245afb2.gif",
      },
      "thumb": {
        "filename": "c1f64245afb2.gif",
        "name": "c1f64245afb2",
        "mime": "image/gif",
        "extension": "gif",
        "url": "https://i.ibb.co/2ndCYJK/c1f64245afb2.gif",
      },
      "medium": {
        "filename": "c1f64245afb2.gif",
        "name": "c1f64245afb2",
        "mime": "image/gif",
        "extension": "gif",
        "url": "https://i.ibb.co/98W13PY/c1f64245afb2.gif",
      },
      "delete_url": "https://ibb.co/2ndCYJK/670a7e48ddcb85ac340c717a41047e5c"
    },
  }
*/