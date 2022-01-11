
// trims extra whitespace
function isEmpty(el) { return !$.trim(el.html()) };

// search and search results from PLG
function searchByZip(action) {
  $('#errSearch').css('visibility', 'hidden');
  $('#errSearchAgain').css('visibility', 'hidden');
  if (action == 'search') {
    var zip = $('#txtZip_Search').val();
    $('#txtZip_SearchAgain').val(zip);
    $.ajax({
      type: 'GET',
      url: 'search.php?x=' + Math.random(),
      async: false,
      // locale either en-CA or fr-CA
      // ShortName = name of dealership
      data: {'zip': zip, 'Locale': 'en-CA', 'ShortName': '/PacificMazda'},
      success: function(response) { if ($.trim(response) != 'no data') {
        $('#dealerlist').html(response);
        $('#txtZip_Search').val('');
        $('#txtZip_Search').attr('placeholder', 'Enter 6 digit postal code');
        $('#myModal').modal('hide');
        $('#myModalSearch').modal('show');
        } else {
        $('#errSearch').css('visibility', 'visible');
      }},
      error: function(xhr, ajaxOptions, thrownError) { $('#errSearch').css('visibility', 'visible'); }
    });
  } else {
    var zip = $('#txtZip_SearchAgain').val();
    $.ajax({
      type: 'GET',
      url: 'search.php?x=' + Math.random(),
      async: false,
      // locale either en-CA or fr-CA
      // ShortName = name of dealership
      data: {'zip': zip, 'Locale': 'en-CA', 'ShortName': '/PacificMazda'},
      success: function(response) { if ($.trim(response) != 'no data') {
        $('#dealerlist').html(response);
      } else {
        $('#dealerlist').html('');
        $('#errSearchAgain').css('visibility', 'visible');
      }},
      error: function(xhr, ajaxOptions, thrownError) {
        $('#dealerlist').html('');
        $('#errSearchAgain').css('visibility', 'visible');
      }
    });
  }
  return false;
}

$(document).ready(function() {

  // prevents orphaned words
  // from http://justinhileman.info/article/a-jquery-widont-snippet/
  $(function($) {
    $('h1,h2,h3,h4,h5,h6,p,li,span').each(function() {
      $(this).html($(this).html().replace(/\s([^\s<]{0,10})\s*$/,'&nbsp;$1'));
    });
  });

  // hides .offer-intro-headline and .offer-intro-pricing if no content to remove excess whitespace
  $(function($) {
    $('.offer-intro-special, .offer-intro-pricing').each(function() {
      if ((isEmpty($(this))) || ($(this).is(':empty'))) { $(this).css('display', 'none') }
    });
  });

  // controls spacing between paragraphs if br tags are used instead of p tags
  $('.offer-details-copy p').each(function() {
    $(this).html($.trim($(this).html().replace(/\s+/g, " ")));
    $(this).html($(this).html().replace(/(<br\s*\/?>)\s*(<br\s*\/?>)/,'<br class="break"/><br class="break"/>'));
  });

  // adds onsubmit response to modal 'search' button
  $(function($) {
    $('#myModal form').on('submit', function() {
      return searchByZip('search');
    });

    $('#myModalSearch form').on('submit', function() {
      return searchByZip('searchAgain');
    });
  });

});