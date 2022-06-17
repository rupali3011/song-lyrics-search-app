const form=document.querySelector("#form");
const search=document.querySelector("#text");
const result=document.querySelector("#result");
const btnSearch=document.querySelector("#btn");
const apiURL='https://api.lyrics.ovh';
//get input value
form.addEventListener("submit",function(e){
    e.preventDefault();
   let searchValue=search.value.trim();
   
   if(searchValue==""){
        alert("Nothing to Search");
    }
    else{
        firstlySearch(searchValue);
    }
});
//create search function
async function firstlySearch(searchValue){
    const searchResult=await fetch(`${apiURL}/suggest/${searchValue}`);
    const data=await searchResult.json();
    displayData(data);
    }
//display search result 
function displayData(data){
  result.innerHTML = `
                      <ul class="songs">
                      ${data.data
                      .map(song=>
                        `<li>
                      <div><strong>${song.artist.name}</strong> - ${song.title}
                       </div>
                       <span data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</span>
                      </li>`
        )
        }
    </ul>
  `;
 }
    //get lyrics function
    result.addEventListener("click", e => {
        const clickedElement=e.target;
        console.log("text");
        //check get lyrics button
        if(clickedElement.tagName === 'SPAN'){
        const artist=clickedElement.getAttribute('data-artist');
        console.log(artist,"output");
        const songTitle=clickedElement.getAttribute('data-songtitle');
        console.log(songTitle,"oup");
        getLyrics(artist,songTitle);
        }
    });
    async function getLyrics(artist,songTitle) {
        const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
        const data = await response.json();
        
        const lyrics = data.lyrics;
        if (lyrics === undefined){
            alert('lyrics doesnt exist in this api');
            console.log('lyrics doesnt exist in this api');
        }
        const lyrics1=lyrics.replace(/(\r\n|\r|\n)/g, '</br>');
        result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
                              <p>${lyrics1}</p> `;
    }
