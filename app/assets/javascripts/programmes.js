// Javascript specific to guide admin
$(function() {
 
 // collapse the parts using the bootstrap accordion
  $(".collapse").collapse();

  // simulate a click on the first part to open it
  $('#parts .part .accordion-body').first().collapse('show');

  $('input.title').
    live('change', function () {
      var title_field = $(this);
      var slug_field = title_field.closest('.part').find('.slug');
      if (slug_field.text() == '') {
        slug_field.val(GovUKGuideUtils.convertToSlug(title_field.val()));
      }
  });

  $('input.title').
    live('change', function () {
      var elem = $(this);
      var header = elem.closest('fieldset').prev('h3').find('a');
      header.text(elem.val());
    });

  $("#parts").accordion(accordion_opts);
  $('.add-associated').bind('associated-added', function () {
    var active_index = $('#parts div.part').length;
    var my_opts = accordion_opts;
    my_opts.active = active_index - 1;
    $('#parts').accordion("destroy").
      accordion(my_opts);//.sortable(sortable_opts);
    $('#parts .part:last-child').find('input.order').val(active_index);
  });
  $('body').bind('associated-removed', function () {
    $('#parts').accordion("destroy").
      accordion(accordion_opts);//.sortable(sortable_opts);
    return false;
  });
});