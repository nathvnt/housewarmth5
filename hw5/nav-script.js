document.addEventListener('DOMContentLoaded', (event) => {
  const buttons = document.querySelectorAll('#homebtn, #portbtn, #gallbtn, #menubtn, #settbtn');
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
    '2ndamber': '#451a03',
    '2ndrose': '#fb7185'
  };

  const pages = {
    homebtn: document.getElementById('homepage'),
    portbtn: document.getElementById('portfoliopage'),
    gallbtn: document.getElementById('gallerypage'),
    menubtn: null, // No page associated
    settbtn: null  // No page associated
  };

  const title = document.getElementById('title');
  const menubtn = document.getElementById('menubtn');
  const menudrop = document.getElementById('menudrop');
  const settbtn = document.getElementById('settbtn');
  const settingsdrop = document.getElementById('settingsdrop');
  const speedSlider = document.getElementById('speedSlider');

  let selectedPrimaryColorDiv = document.getElementById('1stemerald');
  let selectedSecondaryColorDiv;

  buttons.forEach(button => {
    button.addEventListener('mouseover', handleMouseEnter);
    button.addEventListener('mouseout', handleMouseLeave);
    button.addEventListener('click', handleButtonClick);
  });

  title.addEventListener('mouseover', () => updateBannerAnimationDuration('8s'));
  title.addEventListener('mouseout', () => updateBannerAnimationDuration('30s'));

  menubtn.addEventListener('click', () => {
    settingsdrop.style.display = 'none';
    if (menudrop.style.display != 'block') {
      menudrop.style.display = 'block';
      menubtn.style.backgroundColor = '#047857';
    } else {
      menudrop.style.display = 'none';
      menubtn.style.backgroundColor = '';
    }
  });

  settbtn.addEventListener('click', () => {
    menudrop.style.display = 'none';
    if (settingsdrop.style.display != 'block') {
      settingsdrop.style.display = 'block';
      settbtn.style.backgroundColor = '#047857';
    } else {
      settingsdrop.style.display = 'none';
      settbtn.style.backgroundColor = '';
    }
  });

  speedSlider.addEventListener('input', () => {
    const duration = `${speedSlider.value}s`;
    updateBannerAnimationDuration(duration);
    console.log(duration);
  });

  Object.keys(primaryColorSelectors).forEach(id => {
    const colorDiv = document.getElementById(id);
    colorDiv.addEventListener('click', () => {
      updateAccentColor(primaryColorSelectors[id]);
      updateSelectedPrimaryColorDiv(colorDiv);
    });
  });

  Object.keys(secondaryColorSelectors).forEach(id => {
    const colorDiv = document.getElementById(id);
    colorDiv.addEventListener('click', () => {
      updateSecondaryAccentColor(secondaryColorSelectors[id]);
      updateSelectedSecondaryColorDiv(colorDiv);
    });
  });

  function handleMouseEnter(event) {
    const element = event.currentTarget;
    if (!element.classList.contains('active')) {
      element.style.backgroundColor = '#047857';
    }
  }

  function handleMouseLeave(event) {
    const element = event.currentTarget;
    if (!element.classList.contains('active')) {
      element.style.backgroundColor = '';
    }
  }

  function handleButtonClick(event) {
    const clickedButtonId = event.currentTarget.id;

    if (clickedButtonId === 'menubtn' || clickedButtonId === 'settbtn') {
      return;
    }

    Object.values(pages).forEach(page => {
      if (page) {
        page.style.display = 'none';
      }
    });

    if (pages[clickedButtonId]) {
      pages[clickedButtonId].style.display = 'block';
    }

    buttons.forEach(button => {
      if (button.id !== 'menubtn' && button.id !== 'settbtn') {
        button.classList.remove('active');
        button.style.backgroundColor = '';
      }
    });

    const clickedButton = document.getElementById(clickedButtonId);
    clickedButton.classList.add('active');
    clickedButton.style.backgroundColor = '#047857';
  }

  function setInitialState() {
    Object.values(pages).forEach(page => {
      if (page) {
        page.style.display = 'none';
      }
    });
    pages.gallbtn.style.display = 'block';

    const initialButton = document.getElementById('gallbtn');
    initialButton.classList.add('active');
    initialButton.style.backgroundColor = '#047857';

    speedSlider.value = 30;
    updateBannerAnimationDuration('30s');
    console.log('Banner animation speed reset to: 30s');

    selectedPrimaryColorDiv.style.border = '2px solid white';
  }

  function updateSelectedPrimaryColorDiv(newSelectedDiv) {
    if (selectedPrimaryColorDiv) {
      selectedPrimaryColorDiv.style.border = '';
    }
    selectedPrimaryColorDiv = newSelectedDiv;
    selectedPrimaryColorDiv.style.border = '2px solid white';
  }

  function updateSelectedSecondaryColorDiv(newSelectedDiv) {
    if (selectedSecondaryColorDiv) {
      selectedSecondaryColorDiv.style.border = '';
    }
    selectedSecondaryColorDiv = newSelectedDiv;
    selectedSecondaryColorDiv.style.border = '2px solid white';
  }

  setInitialState();
});

function updateBannerAnimationDuration(duration) {
  const banner = document.getElementById("banner");
  banner.style.animationDuration = duration;
}

function updateAccentColor(color) {
  const elements = document.querySelectorAll('#homebtn, #portbtn, #gallbtn, #menubtn, #settbtn, #speedSlider, #menudrop > div');

  elements.forEach(element => {

    if (element.classList.contains('active')) {
      element.style.backgroundColor = color;
    }
    if (element.id !== 'speedSlider') {
      element.addEventListener('mouseover', () => {
        if (!element.classList.contains('active')) {
          element.style.backgroundColor = color;
        }
      });

      element.addEventListener('mouseout', () => {
        if (!element.classList.contains('active')) {
          element.style.backgroundColor = '';
        }
      });
      if (['homebtn', 'portbtn', 'gallbtn', 'menubtn', 'settbtn'].includes(element.id)) {
        element.addEventListener('click', (event) => {
          elements.forEach(btn => {
            if (btn !== event.currentTarget && ['homebtn', 'portbtn', 'gallbtn', 'menubtn', 'settbtn'].includes(btn.id)) {
              btn.classList.remove('active');
              btn.style.backgroundColor = '';
            }
          });

          element.classList.add('active');
          element.style.backgroundColor = color;
        });
      }
    }
    if (element.id === 'speedSlider' || element.parentElement.id === 'menudrop') {
      element.style.backgroundColor = color;
    }
  });
}


function updateSecondaryAccentColor(color) {
  const elementsWithBorders = [
    document.getElementById('banner'),
    document.getElementById('menudrop'),
    document.getElementById('settingsdrop')
  ];
  const buttons = document.querySelectorAll('#homebtn, #portbtn, #gallbtn, #menubtn, #settbtn');

  elementsWithBorders.forEach(element => {
    if (element) {
      element.style.borderColor = color;
    }
  });

  buttons.forEach(button => {
    button.style.borderColor = color;
  });
}
