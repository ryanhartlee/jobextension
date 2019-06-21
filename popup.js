const authenticJobsAPIKey = "84d108dcaeb8e00c51cc4ae1be33268d";
let company = "nothing";

let results = [];

let authJobs = function() {
  fetch(
    "https://authenticjobs.com/api/?api_key=" +
      authenticJobsAPIKey +
      "&method=aj.jobs.search&company=" +
      company +
      "&format=json"
  )
    // .then(function(response) {
    //   alert(response);
    // })
    .then(function(response) {
      response.json().then(function(data) {
        if (data.listings.total == 0) {
          document.getElementById("resultTarget").innerHTML +=
            "<div class='jobResultLine'><h5>No Jobs Found</h5></div><br>";
        } else {
          // results = JSON.stringify(data.listings.listing);
          for (let i = 0; i < 10; i++) {
            document.getElementById("resultTarget").innerHTML +=
              "<div class='jobResultLine' id='job'" +
              i +
              "><h5>" +
              data.listings.listing[i].title +
              "</h5><a href=" +
              data.listings.listing[i].url +
              " target='_blank'>Link</a></div><br>";
          }
        }
        // alert(results)
      });
    });
};

function onPageDetailsReceived(pageDetails) {
  let site = pageDetails.url;
  site = site.replace("https://", "");
  site = site.replace("http://", "");
  site = site.replace("www.", "");
  site = site.substring(0, site.indexOf(".com"));

  company = site;
  document.getElementById("companyName").innerHTML = company;
  authJobs();
}

// Global reference to the status display SPAN
var statusDisplay = null;

// When the popup HTML has loaded
window.addEventListener("load", function(evt) {
  // Cache a reference to the status display SPAN
  statusDisplay = document.getElementById("status-display");

  // Handle the bookmark form submit event with our addBookmark function
  // document.getElementById('addbookmark').addEventListener('submit', addBookmark);
  // Get the event page
  chrome.runtime.getBackgroundPage(function(eventPage) {
    // Call the getPageInfo function in the event page, passing in
    // our onPageDetailsReceived function as the callback. This injects
    // content.js into the current tab's HTML
    eventPage.getPageDetails(onPageDetailsReceived);
  });
  // authJobs();
});
