const toggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('#site-navigation');
if (toggle && navigation) {
  const mobile = window.matchMedia('(max-width: 800px)');
  function resetNavigation() {
    navigation.hidden = mobile.matches;
    toggle.setAttribute('aria-expanded', String(!navigation.hidden));
  }
  resetNavigation();
  mobile.addEventListener('change', resetNavigation);
  toggle.addEventListener('click', () => {
    navigation.hidden = !navigation.hidden;
    toggle.setAttribute('aria-expanded', String(!navigation.hidden));
  });
}
