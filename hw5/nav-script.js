$(document).ready(function () {
  const buttons = {
    homepage: "#homebtn",
    portfoliopage: "#portbtn",
    gallerypage: "#gallbtn",
    menudrop: "#menubtn",
    settingsdrop: "#settbtn"
  };

  const pagecontainers = {
    homepage: "#homepage",
    portfoliopage: "#portfoliopage",
    gallerypage: "#gallerypage",
    menudrop: "#menudrop",
    settingsdrop: "#settingsdrop"
  };

  const primaryColorSelectors = {
    '1stemerald': '#047857',
    '1stviolet': '#6d28d9',
    '1stteal': '#14b8a6',
    '1storange': '#f97316',
    '1stred': '#ef4444'
  };

  const secondaryColorSelectors = {
    '2ndwhite': '#ecfdf5',
    '2ndgrey': '#a3a3a3',
    '2ndcyan': '#a5f3fc',
    '2ndred': '#991b1b',
    '2ndrose': '#fb7185'
  };

  const fontColorSelectors = {
    'fontwhite': '#ecfdf5',
    'fontblack': '#a3a3a3',
    'fontlime': '#65a30d',
    'fontteal': '#14b8a6',
    'fontred': '#f43f5e'
  }

  const backgroundColorSelectors = {
    'lighttheme': '#FFFFF0',
    'darktheme': '#000000'
  }

  let fontColor = '#ecfdf5';
  let selectedFontColor = "fontwhite";
  let bgcolor = '#000000';
  let selectedbgcolor = 'bgblack';
  let primaryColor = "#047857"; // Default primary color
  let selectedPrimaryColorSelector = "1stemerald"; // Default selected color
  let secondaryColor = '#ecfdf5';
  let selectedSecondaryColorSelector = "2ndwhite";


  speedSlider.addEventListener('input', () => {
    const duration = `${speedSlider.value}s`;
    updateBannerAnimationDuration(duration);
    console.log(duration);
  });

  function updateButtonColors() {
    const defaultColor = "black"; // Replace with your default color

    // Reset all button backgrounds to default color
    Object.values(buttons).forEach(button => {
      $(button).css("background-color", defaultColor);
    });

    // Check which page container is visible and update the corresponding button color
    for (let page in pagecontainers) {
      if ($(pagecontainers[page]).is(":visible")) {
        $(buttons[page]).css("background-color", primaryColor);
      }
    }

    // Update the background color of buttons inside #menudrop on hover
    document.documentElement.style.setProperty('--primary-color', primaryColor);
  }

  function upodateBgColor() {
    document.body.style.backgroundColor = bgcolor;
    document.getElementById("nav").style.backgroundColor = bgcolor;
    if (bgcolor === '#FFFFF0') {
      fontColor = '#000000';
      secondaryColor = '#a3a3a3';
      updateSecondaryColors();
      updateFontColor();
      document.getElementById("menudrop").style.backgroundColor = '#FFFFF0';
      document.getElementById("settingsdrop").style.backgroundColor = '#FFFFF0';
    }

  }
  function updateFontColor() {
    document.body.style.color = fontColor;
  }

  function updateSecondaryColors() {
    Object.values(buttons).forEach(button => {
      $(button).css("border-color", secondaryColor);
    });
    document.getElementById("dash").style.borderColor = secondaryColor;
    document.getElementById("banner").style.borderColor = secondaryColor;
    document.getElementById("menudrop").style.borderColor = secondaryColor;
    document.getElementById("settingsdrop").style.borderColor = secondaryColor;
  }

  function updatePrimaryColorBorder() {
    // Remove border from all primary color selectors
    Object.keys(primaryColorSelectors).forEach(selector => {
      $("#" + selector).css("border", "none");
    });

    // Add border to the selected primary color selector
    $("#" + selectedPrimaryColorSelector).css("border", "2px solid white");

    Object.keys(secondaryColorSelectors).forEach(selector => {
      $("#" + selector).css("border", "none");
    });

    // Add border to the selected primary color selector
    $("#" + selectedSecondaryColorSelector).css("border", "2px solid white");

    Object.keys(fontColorSelectors).forEach(selector => {
      $("#" + selector).css("border", "none");
    });

    // Add border to the selected primary color selector
    $("#" + selectedFontColor).css("border", "2px solid white");

    Object.keys(backgroundColorSelectors).forEach(selector => {
      $("#" + selector).css("border", "none");
    });

    // Add border to the selected primary color selector
    $("#" + selectedbgcolor).css("border", "2px solid white");
  }

  // Update button colors on page load
  updateButtonColors();
  updateSecondaryColors();
  // Set initial border for the default primary color selector
  updatePrimaryColorBorder();

  // Update button colors on button clicks
  $("#homebtn").click(function () {
    $("#homepage").css("display", "block");
    $("#portfoliopage").css("display", "none");
    $("#gallerypage").css("display", "none");
    updateButtonColors();
  });

  $("#portbtn").click(function () {
    $("#portfoliopage").css("display", "block");
    $("#homepage").css("display", "none");
    $("#gallerypage").css("display", "none");
    updateButtonColors();
  });

  $("#gallbtn").click(function () {
    $("#gallerypage").css("display", "block");
    $("#homepage").css("display", "none");
    $("#portfoliopage").css("display", "none");
    updateButtonColors();
  });

  $("#menubtn").click(function () {
    if ($("#menudrop").is(":visible")) {
      $("#menudrop").css("display", "none");
    } else {
      $("#menudrop").css("display", "block");
      $("#settingsdrop").css("display", "none");
    }
    updateButtonColors();
  });

  $("#settbtn").click(function () {
    if ($("#settingsdrop").is(":visible")) {
      $("#settingsdrop").css("display", "none");
    } else {
      $("#settingsdrop").css("display", "block");
      $("#menudrop").css("display", "none");
    }
    updateButtonColors();
  });

  // Add click event handlers for primary color selectors
  for (let selector in primaryColorSelectors) {
    $("#" + selector).click(function () {
      primaryColor = primaryColorSelectors[selector];
      selectedPrimaryColorSelector = selector;
      updatePrimaryColorBorder();
      updateButtonColors();
    });
  }
  for (let selector in secondaryColorSelectors) {
    $("#" + selector).click(function () {
      secondaryColor = secondaryColorSelectors[selector];
      selectedSecondaryColorSelector = selector;
      updatePrimaryColorBorder();
      updateSecondaryColors();
    });
  }
  for (let selector in fontColorSelectors) {
    $("#" + selector).click(function () {
      fontColor = fontColorSelectors[selector];
      selectedFontColor = selector;
      updatePrimaryColorBorder();
      updateFontColor();
    });
  }
  for (let selector in backgroundColorSelectors) {
    $("#" + selector).click(function () {
      bgcolor = backgroundColorSelectors[selector];
      selectedbgcolor = selector;
      updatePrimaryColorBorder();
      upodateBgColor();
    });
  }

  $("#menudrop div").addClass("hover-primary");
});

function setInitialState() {
  speedSlider.value = 30;
  updateBannerAnimationDuration('30s');
  console.log('Banner animation speed reset to: 30s');
}

setInitialState();
function updateBannerAnimationDuration(duration) {
  const banner = document.getElementById("banner");
  banner.style.animationDuration = duration;
}


