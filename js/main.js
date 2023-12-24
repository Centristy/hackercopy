"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:

const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");
const $navLeft = $("#nav-left");
const $navSubmit = $("#nav-submit")
const $submitForm = $("#submit-form") // this is table that you can submit new url
const favorite = document.querySelector("#favorited-stories") // this selects the favorite stories form
const $favorite = $("#favorited-stories") // this selects the favorite stories form (jquery not compatible with DOM)
const favoriteButton = document.querySelector("#nav-favorites") // this is the favorite button on the nav bar
const $storySubmit = $("#story-submit") // this is the submit button on the new url form

const $myStories =$('#nav-stories') //link for user stories
const $myStoriesForm = $('#my-stories') // form for user stories to appear


const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");
const $userProfile = $("#user-profile"); // user profile form

/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */





function hidePageComponents() {
  const components = [
    $allStoriesList,
    $submitForm,
    $myStoriesForm,
    $userProfile,
    $signupForm,
    $loginForm
  ];
  components.forEach(c => c.hide());
  $navLeft.show();
}

/** Overall function to kick off the app. */

async function start() {
  console.debug("start");

  // "Remember logged-in user" and log in, if credentials in localStorage
  await checkForRememberedUser();
  await getAndShowStoriesOnStart();

  // if we got a logged-in user
  if (currentUser) updateUIOnUserLogin();
}

// Once the DOM is entirely loaded, begin the app

console.warn("HEY STUDENT: This program sends many debug messages to" +
  " the console. If you don't see the message 'start' below this, you're not" +
  " seeing those helpful debug messages. In your browser console, click on" +
  " menu 'Default Levels' and add Verbose");
$(start);


