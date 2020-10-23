$(document).ready(function () {
  $('#demo-form').on('submit', function (e) {
    e.preventDefault();
    var form = $(this);

    form.parsley().validate();

    if (form.parsley().isValid()) {
      myResult();
    }
  });

  window.Parsley.addValidator('pattern', {
    validateString: function (value) {
      let regexp = /^[A-Za-zА-Яа-я -]+$/g;

      let result = value.match(regexp);

      if (result === null) {
        return false;
      }
    },
    messages: {
      en: 'Full name may only contain letters, spaces, and dashes',
    },
  });

  window.Parsley.addValidator('pattern_two', {
    validateString: function (value) {
      let regexp = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/g;

      let result = value.match(regexp);

      if (result === null) {
        return false;
      }
    },
    messages: {
      en: 'Invalid date format. Correct format is DD/MM/YYYY',
    },
  });

  window.ParsleyValidator.addValidator(
    'mindate',
    function (value, requirement) {
      value = value.split('/').reverse().join('-');

      let timestamp = Date.parse(value),
        minTs = Date.parse(requirement);

      return isNaN(timestamp) ? false : timestamp > minTs;
    },
    32
  ).addMessage('en', 'mindate', 'This date should be greater than %s');

  function myResult() {
    let path = $('#fileName').val().split('\\');

    let checked = '';

    if ($('#contactMethodMale')[0].checked === true) {
      checked = 'male';
    } else {
      checked = 'famale';
    }

    let checkedSub = '';

    if ($('#subscribe')[0].checked === true) {
      checkedSub = 'yes';
    } else {
      checkedSub = 'no';
    }

    $('#result').append(`
          <h2>Result</h2>
          <table style="width:70%">
          <tr>
            <td>Full name</td>
            <td>${$('#userName').val()}</td>
          </tr>
          <tr>
            <td>Avatar</td>
            <td>${path[path.length - 1]}</td>
          </tr>
          <tr>
            <td>Birthday</td>
            <td>${$('#contact-date')[0].value}</td>
          </tr>
          <tr>
          <td>Gender</td>
          <td>${checked}</td>
        </tr>
        <tr>
        <td>Sabscribe</td>
        <td>${checkedSub}</td>
      </tr>
        </table>
   `);

    $('#userName').val('');
    $('#fileName').val('');
    $('#contact-date').val('');
    $('#contactMethodMale').prop('checked', false);
    $('#contactMethodFemale').prop('checked', false);
    $('#subscribe').prop('checked', false);

    $('input').removeClass('parsley-success');
  }
});
