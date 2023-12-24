"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  putStoriesOnPage();
  favorite.style.display="none"
  $submitForm.hide();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  $allStoriesList.hide();
  $loginForm.show();
  $signupForm.show();
  $myStoriesForm.hide();

}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navLeft.show();
  $myStoriesForm.hide();
  favorite.style.display="none"
 
  $navUserProfile.text(`${currentUser.username}`).show();
}

function submitClick(){
  hidePageComponents()
  putStoriesOnPage();
  favorite.style.display ="none";
  $submitForm.show()
  $allStoriesList.show();

}

$navSubmit.on("click", submitClick);


function showFavorite(){
  hidePageComponents()
  favorite.style.display="block";
  $myStoriesForm.hide();
  putFavoritesListOnPage()


}

favoriteButton.addEventListener("click", function(){showFavorite()});

function showMyStories(){
hidePageComponents()
favorite.style.display="none";
putMyStoriesListOnPage()
$myStoriesForm.show();

}

$myStories.on("click", showMyStories);



function showProfile(){


  $('#profile-name')[0].innerText = currentUser.name
  $('#profile-username')[0].innerText = currentUser.username
  $('#profile-account-date')[0].innerText = currentUser.createdAt.slice(0, 10)

  hidePageComponents()
  favorite.style.display="none";
  $userProfile.show();


}

$navUserProfile.on("click", showProfile);




