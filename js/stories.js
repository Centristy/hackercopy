"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  
  const hostName = story.getHostName();



  return $(`
      <li id="${story.storyId}">
        <span class = "star">
        <i class = "far fa-star" id = "star"></i>
        </span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);

}


/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  putFavoritesListOnPage() 

  for (let list of favorite.children) {
    for(let i = 0; i < $allStoriesList[0].children.length; i++){
      if ($allStoriesList[0].children[i].id === list.id){
        $allStoriesList[0].children[i].children[0].children[0].className = "fas fa-star"
      }

      
    }
  }

$allStoriesList.show();
$myStoriesForm.hide();



}


async function submitNewStory(evt) {
  console.debug("submitNewStory");
  evt.preventDefault();

  // grab all info from form
  const title = document.querySelector("#create-title").value
  const url = document.querySelector("#create-url").value
  const author = document.querySelector("#create-author").value
  const username = currentUser.username
  const storyData = { title, url, author, username };

  const story = await storyList.addStory(currentUser, storyData);

  const $story = generateStoryMarkup(story);
  $allStoriesList.prepend($story);
  
  $myStoriesForm.prepend($story);

  // hide the form and reset it
  $submitForm.slideUp("slow");
  $submitForm.trigger("reset");

  putStoriesOnPage();
  favorite.style.display ="none";
}

$submitForm.on("submit", submitNewStory);



async function toggleStar(e){ // add or removes favorite stories

  
  const $tgt = $(e.target);
  const $closestLi = $tgt.closest("li");
  const storyId = $closestLi.attr("id");
  const story = storyList.stories.find(s => s.storyId === storyId);
  

  if (e.target.className === 'far fa-star' || e.target.className === 'fa-star far'){
    e.target.className = 'fas fa-star';
    await currentUser.addFavorite(story)
    
  }
  else if(e.target.className === 'fas fa-star'){
    e.target.className = 'far fa-star';
    await currentUser.removeFavorite(story)

  }
      
  if (favorite.children.length === 1){

    $(".blank_favorites").removeClass('hidden')

  }else{$(".blank_favorites").addClass('hidden')}
  

}


async function deleteButton(e){ // add or removes favorite stories

  const $tgt = $(e.target);
  const $closestLi = $tgt.closest("li");
  const storyId = $closestLi.attr("id");
  const story = storyList.stories.find(s => s.storyId === storyId);
  



  putMyStoriesListOnPage()

      
  if ($myStoriesForm.children.length){

    $(".blank_stories").removeClass('hidden')

  }else{$(".blank_stories").addClass('hidden')}
  

}

$allStoriesList.on("click", toggleStar)



/** Put favorites list on page. */

function putFavoritesListOnPage() {

$favorite.empty()
$favorite.append(`<h5 class="blank_favorites">No favorites added!</h5>`)

    // loop through all of users favorites and generate HTML for them
    
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $story[0].children[0].children[0].className = "fas fa-star"
      $favorite.append($story);

    }

    if (favorite.children.length === 1){

      $(".blank_favorites").removeClass('hidden')

    }else{
      $(".blank_favorites").addClass('hidden')}

    
  

    favorite.style.display ="block";
}

$favorite.on("click", toggleStar);



function putMyStoriesListOnPage() { //exactly the same as the favorites page but for stories page

  $myStoriesForm.empty()
  $myStoriesForm.append(`<h5 class="blank_stories">No stories added!</h5>`)
  
      // loop through all of users favorites and generate HTML for them
      putFavoritesListOnPage()

      for (let story of currentUser.ownStories) {
        const $story = generateStoryMarkup(story);
        $story.prepend(`<span class="trash-can"><i class= "fas fa-trash alt"></i></span>`)
        $myStoriesForm.append($story);
  
      }
  
      if ($myStoriesForm.children().length === 1){
  
        $(".blank_stories").removeClass('hidden')
  
      }else{
        $(".blank_stories").addClass('hidden')}
  
    
        for (let list of favorite.children) {
          for(let i = 1; i < $myStoriesForm.children().length; i++){
            if ($myStoriesForm.children()[i].id === list.id){
    
              $myStoriesForm.children()[i].children[1].children[0].className = 'fas fa-star'
            }
      
            
          }
        }

      
      


  
      favorite.style.display ="none";
  }
  
  $myStories.on("click",putMyStoriesListOnPage);
  $myStoriesForm.on("click", toggleStar);
  
  
  /** Handle deleting a story. */

async function deleteStory(evt) {
  console.debug("deleteStory");

  const $closestLi = $(evt.target).closest("li");
  const storyId = $closestLi.attr("id");

  await storyList.removeStory(currentUser, storyId);

  // re-generate story list
  putMyStoriesListOnPage();
}

$myStoriesForm.on("click", ".trash-can", deleteStory);
  
