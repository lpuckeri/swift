(function () {
  'use strict';

  //mobile menu
  var toggles = document.querySelectorAll('.burger-menu');

  for (var i = toggles.length - 1; i >= 0; i--) {
    var toggle = toggles[i];
    toggleHandler(toggle);
  };

  function toggleHandler(toggle) {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      (this.classList.contains('is-active') === true) ? this.classList.remove('is-active') : this.classList.add('is-active');
      var elMenu = document.querySelector('.menu');
      elMenu.classList.toggle('responsive');
    });
  }
  //open popup
  var openpopup = document.getElementsByClassName('openpopup');
  var popup = document.querySelector('.popup');

  for (var i = 0; i < openpopup.length; i++) {
    openpopup[i].addEventListener('click', function () {
      popup.style.display = 'block';
    });
  }

  document.addEventListener('mousedown', function (e) {
    if (e.target.closest('.popup__inner') === null) {
      popup.style.display = 'none';
    }
  });

})();

MAILER_URL = "https://apiswiftgrade.it-support.company:8085/api/v1/send_email_notification/v1/"


$(".alert").alert('close')

//form validation
function validate(e) {
  e.preventDefault();
  var emailerror = document.querySelector('.email');
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  var address = document.forms['form_id'].elements['email'].value;

  var label = document.createElement('label');
  label.className = "error";
  label.innerHTML = "A valid email is required";

  var error = document.querySelector('.error')

  if (reg.test(address) == false) {

    if (error == null) {
      emailerror.after(label);
    }
    return false;
  } else {
    if (document.querySelector('.error')) {
      document.querySelector('.error').remove();
    }
  }

  var xhr = new XMLHttpRequest();
  xhr.open("POST", MAILER_URL);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      var popup = document.querySelector('.popup');
      popup.style.display = 'none';
      document.forms['form_id'].reset();
      document.querySelector('.popup-thank-you').style.display = "block";
      setTimeout(function () { location.reload(); }, 8000);
    };
  }
  xhr.send(JSON.stringify({ "email": address }));
}



