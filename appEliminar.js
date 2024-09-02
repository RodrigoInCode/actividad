function eliminar() {
  let input = document.getElementById("campo").value;
  
  let formData = new FormData();
  formData.append("campo", input);


  fetch("eliminar.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      
    })
    .catch((err) => console.log(err));
}
