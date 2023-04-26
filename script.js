//CAROUSEL
$(document).ready(function () {
  const carouselItems = $(".carousel-item");
  let currentItem = 0;

  // Function to move to the next slide
  function moveToNextSlide() {
    carouselItems.eq(currentItem).removeClass("active");
    currentItem = (currentItem + 1) % carouselItems.length;
    carouselItems.eq(currentItem).addClass("active");
  }

  // Set an interval to move to the next slide every 3 seconds (3000 milliseconds)
  setInterval(moveToNextSlide, 8000);
});

//CALL FUNCTION
$(document).ready(function () {
  // add an event listener (executeSearch) to the form
  $("#query-form").submit(function (event) {
    executeSearch(event);
  });
});

var pat,
  flag = 0;
function formatSearchResults(jsonResults) {
  var jsonObject = jsonResults;

  //var siteCount = 0;

  $("#search-results-heading");
  var formatedText = "";

  jsonObject.Countries.forEach(function (item, index) {
    //console.log("hello"+data);

    if (item.Country.toLowerCase() == pat.toLowerCase()) {
      var thumbnail = item.NewConfirmed;

      //const href = item.href;

      //formatedText += "<div class='dish-image-div'><a " + " href='" + href + "' target='_blank'><img class='dish-image' width='80' src='" + thumbnail + "' alt='recipe picture, link to recipe page'></a></div>";
      //formatedText += "<div " + "class='dish-title-div'><a href='" + href + "' target='_blank'>" + item.title + "</a></div>";
      formatedText +=
        "<div class='called-details-div'><h5>History Cases: " +
        item.TotalConfirmed +
        "<h5></div>";
      formatedText +=
        "<div class='called-details-div'><h5>Recent Deaths: " +
        item.NewDeaths +
        "<h5></div>";
      formatedText +=
        "<div class='called-details-div'><h5>New Confirmed Cases: " +
        item.NewConfirmed +
        "<h5></div>";
      formatedText +=
        "<div class='called-details-div'><h5>Recent Recovers: " +
        item.NewRecovered +
        "<h5></div>";
      flag = 1;
      return;
    }
  });

  $("#results").html(formatedText);
  if (!flag) {
    setNotFoundMessages();
  }
}

// This functions handles sending off the search request as well as
// error and success handling when the request calls back

function executeSearch(event) {
  // Variable to hold request
  var request;

  // Prevent default posting of form - put here to work in case of errors
  event.preventDefault();

  // Abort any pending request
  if (request) {
    request.abort();
  }
  // setup some local variables
  var $form = $(this);

  // disable the inputs and buttons for the duration of the request.
  setFormDisabledProps(true);

  //$("#search-results-heading").text("Searching ...");
  $("#results").text("");

  // Send the request

  request = $.ajax({
    url: "https://api.covid19api.com/summary",
    type: "GET",
    // data: { i: , q: $("#contains").val()}
  });

  pat = $("#details").val();

  // Callback handler for success

  request.done(function (response, textStatus, jqXHR) {
    formatSearchResults(response);
    console.log(pat);
  });

  // Callback handler for failure

  request.fail(function (jqXHR, textStatus, errorThrown) {
    $("#search-results-heading").text(
      "Sorry We Unable to fetch Covid Data.Try again."
    );
    $("#results").text("");
  });

  // Callback handler that will be called in any case

  request.always(function () {
    // Reenable the inputs
    setFormDisabledProps(false);
  });
}

// This function clears the search results and the heading "Search Results"

function resetResults() {
  $("#search-results-heading").text("");
  $("#results").text("");
  flag = 0;
  $("#result").text("");
}

// This function checks the user input fields for any unacceptable characters
// and removes them if found

function validInputs() {
  var str = $("#details").val();
  str = str.replace(/[^a-zA-Z 0-9,]/gim, "");
  str = str.trim();
  $("#details").val(str);
}

// This function disables the text fields and the two buttons

function setFormDisabledProps(statusToSet) {
  document.getElementById("details").disabled = statusToSet;
  document.getElementById("resetButton").disabled = statusToSet;
  document.getElementById("searchButton").disabled = statusToSet;
}
function setNotFoundMessages() {
  $("#search-results-heading").text("Please provide a valid country name.");
  $("#results").text("");
}
//Currency Converter
$(document).ready(function () {
  $("#searchButton").on("click", function () {
    var amount = $("#amount").val();
    var from = $("#from").val();
    var to = $("#to").val();
    const settings = {
      async: true,
      crossDomain: true,
      url:
        "https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=" +
        "" +
        from +
        "" +
        "&want=" +
        "" +
        to +
        "" +
        "&amount=" +
        "" +
        amount +
        "",
      method: "GET",
      headers: {
        "content-type": "application/octet-stream",
        "X-RapidAPI-Key": "6a2036696amsh0dd6b32a96b61f5p1bc5c2jsn9d83d54643e6",
        "X-RapidAPI-Host": "currency-converter-by-api-ninjas.p.rapidapi.com",
      },
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      // var currencyIcon;
      // if (to === "PLN") {
      //   currencyIcon = "&#122;&#322;";
      // } else if (to === "EUR") {
      //   currencyIcon = "&euro;";
      // }

      $("#result").html(to + " " + response.new_amount);
    });
  });
});
