// Theme toggle logic
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('themeToggle');

  // Check if dark mode was previously enabled
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark');
    toggle.checked = true;
  }

  toggle.addEventListener("change",function (){
    if (toggle.checked) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "disabled");
    }
  });
});const toggle = document.getElementById('themeToggle');
toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark', toggle.checked);
});
 
  document.getElementById('feedbackForm').addEventListener('submit', function(event){
      event.preventDefault();

      var name = document.getElementById('name').value;
      var email = document.getElementById('email').value;
      var feedback = document.getElementById('feedback').value;

      alert('Thank you, ' + name + ', for your feedback!');

      this.reset();
    }); 